
import prisma from "@/lib/prisma";

export async function evaluateProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      farmer: true,
    },
  });

  if (!product) {
    return { flagged: false, reason: "PRODUCT_NOT_FOUND" };
  }

  // 1. Reports count
  const reportsCount = await prisma.report.count({
    where: { product_id: productId },
  });

  // 2. Reviews
  const reviews = await prisma.review.findMany({
    where: { product_id: productId },
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5;

  // 3. Weighted risk score (IMPORTANT UPGRADE)
  const reportWeight = reportsCount * 1.2;
  const ratingRisk = (5 - avgRating) * 2;

  const riskScore = reportWeight + ratingRisk;

  // 4. Threshold (tunable)
  const SHOULD_FLAG = riskScore >= 10;

  if (SHOULD_FLAG && product.status !== "INACTIVE") {
    await prisma.product.update({
      where: { id: productId },
      data: { status: "INACTIVE" },
    });

    // 5. Notify farmer (IMPORTANT)
    if (product.farmer_id) {
      await prisma.notification.create({
        data: {
          user_id: product.farmer_id,
          title: "Product temporarily removed",
          message:
            "Your product has been deactivated due to multiple reports and low rating. Please review quality standards.",
          type: "SYSTEM",
          product_id: productId,
        },
      });
    }

    return {
      flagged: true,
      reason: "HIGH_RISK_SCORE",
      riskScore,
      reportsCount,
      avgRating,
    };
  }

  return {
    flagged: false,
    riskScore,
    reportsCount,
    avgRating,
  };
}

export async function evaluateFarmer(farmerId: string) {
    const reportsCount = await prisma.report.count({
      where: { farmer_id: farmerId },
    });
  
    const farmer = await prisma.farmer.findUnique({
      where: { id: farmerId },
    });
  
    // prevent duplicate notification / update
    if (reportsCount >= 10 && farmer?.status !== "PAUSED") {
      await prisma.farmer.update({
        where: { id: farmerId },
        data: { status: "PAUSED" },
      });
  
      //  ADD NOTIFICATION HERE
      await prisma.notification.create({
        data: {
          user_id: farmerId, // farmerId must match User.id (Clerk ID)
          title: "Account flagged",
          message:
            "Your account has been temporarily paused due to multiple reports.",
          type: "SYSTEM",
        },
      });
  
      return { flagged: true };
    }
  
    return { flagged: false };
  }