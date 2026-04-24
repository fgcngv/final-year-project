
"use server";

import prisma  from "@/lib/prisma";
import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  productId: z.string().optional(),
  farmerId: z.string().optional(),
  orderId: z.string(),
  type: z.enum(["PRODUCT", "FARMER"]),
});



// export async function AddReview(values: unknown) {
//   const { userId } = await auth();
//   const role = await getRole();

//   if (!userId) {
//     return {
//       success: false,
//       message: "Unauthorized",
//     };
//   }

//   const parsed = ReviewSchema.safeParse(values);

//   if (!parsed.success) {
//     return {
//       success: false,
//       message: "Invalid review data",
//     };
//   }

//   const { rating, comment, productId, farmerId, orderId, type } =
//     parsed.data;

//   try {
//     // 1️ Check order
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//     });

//     if (!order || order.user_id !== userId) {
//       return { success: false, message: "Order not found" };
//     }

//     if (order.status !== "CONFIRMED") {
//       return {
//         success: false,
//         message: "You can only review confirmed orders",
//       };
//     }

//     // 2️ Prevent duplicate
//     const existingReview = await prisma.review.findUnique({
//       where: {
//         order_id_type: {
//           order_id: orderId,
//           type,
//         },
//       },
//     });

//     if (existingReview) {
//       return {
//         success: false,
//         message: "You already submitted this review",
//       };
//     }

//     // 3️ Validate product/farmer
//     if (type === "PRODUCT") {
//       if (!productId)
//         return { success: false, message: "Product required" };

//       const product = await prisma.product.findUnique({
//         where: { id: productId },
//       });

//       if (!product)
//         return { success: false, message: "Product not found" };
//     }

//     if (type === "FARMER") {
//       if (!farmerId)
//         return { success: false, message: "Farmer required" };

//       const farmer = await prisma.farmer.findUnique({
//         where: { id: farmerId },
//       });

//       if (!farmer)
//         return { success: false, message: "Farmer not found" };
//     }
//     console.log({
//       user_id: userId,
//       order_id: orderId,
//       rating,
//       comment,
//       type,
//       product_id: type === "PRODUCT" ? productId : null,
//       farmer_id: type === "FARMER" ? farmerId : null,
//     });
    

//     // 4️ Create review
//    await prisma.review.create({
//       data: {
//         user_id: userId,
//         order_id: orderId,
//         rating,
//         comment,
//         type,
//         product_id: type === "PRODUCT" ? productId : null,
//         farmer_id: type === "FARMER" ? farmerId : null,
//       },
//     });


//     return { success: true };
//   } catch (error) {
//     console.error("Review Error:", error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to submit review",
//     };
//   }
// }


// export async function AddReview(values: unknown) {
//   const { userId } = await auth();
//   const role = await getRole();

//   if (!userId) {
//     return {
//       success: false,
//       message: "Unauthorized",
//     };
//   }

//   const parsed = ReviewSchema.safeParse(values);

//   if (!parsed.success) {
//     return {
//       success: false,
//       message: "Invalid review data",
//     };
//   }

//   const { rating, comment, productId, farmerId, orderId, type } =
//     parsed.data;

//   try {
//     // 1️ Check order
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//     });

//     if (!order) {
//       return { success: false, message: "Order not foundddd" };
//     }
    
//     if (order.user_id !== userId && role !== "admin") {
//       return {
//         success: false,
//         message: "You cannot review this order",
//       };
//     }

//     if (order.status !== "CONFIRMED" && role !== "admin") {
//       return {
//         success: false,
//         message: "You can only review confirmed orders",
//       };
//     }

//     // 2️ Prevent duplicate
//     const existingReview = await prisma.review.findUnique({
//       where: {
//         order_id_type: {
//           order_id: orderId,
//           type,
//         },
//       },
//     });

//     if (existingReview) {
//       return {
//         success: false,
//         message: "You already submitted this review",
//       };
//     }

//     // 3️ Validate product/farmer
//     if (type === "PRODUCT") {
//       if (!productId)
//         return { success: false, message: "Product required" };

//       const product = await prisma.product.findUnique({
//         where: { id: productId },
//       });

//       if (!product)
//         return { success: false, message: "Product not found" };
//     }

//     if (type === "FARMER") {
//       if (!farmerId)
//         return { success: false, message: "Farmer required" };

//       const farmer = await prisma.farmer.findUnique({
//         where: { id: farmerId },
//       });

//       if (!farmer)
//         return { success: false, message: "Farmer not found" };
//     }
//     console.log({
//       user_id: userId,
//       order_id: orderId,
//       rating,
//       comment,
//       type,
//       product_id: type === "PRODUCT" ? productId : null,
//       farmer_id: type === "FARMER" ? farmerId : null,
//     });
    

//     // 4️ Create review
//    await prisma.review.create({
//       data: {
//         user_id: userId,
//         order_id: orderId,
//         rating,
//         comment,
//         type,
//         product_id: type === "PRODUCT" ? productId : null,
//         farmer_id: type === "FARMER" ? farmerId : null,
//       },
//     });


//     return { success: true };
//   } catch (error) {
//     console.error("Review Error:", error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to submit review",
//     };
//   }
// }
export async function AddReview(values: unknown) {
  const { userId } = await auth();
  const role = await getRole();

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = ReviewSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Invalid review data" };
  }

  const { rating, comment, productId, farmerId, orderId, type } =
    parsed.data;

  try {
    // ✅ 1. Validate order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) return { success: false, message: "Order not found" };

    if (order.user_id !== userId && role !== "admin") {
      return { success: false, message: "Not your order" };
    }

    if (order.status !== "CONFIRMED" && role !== "admin") {
      return { success: false, message: "Order not confirmed" };
    }

    // ✅ 2. Prevent duplicate
    const existingReview = await prisma.review.findUnique({
      where: {
        order_id_type: {
          order_id: orderId,
          type,
        },
      },
    });

    if (existingReview) {
      return { success: false, message: "Already reviewed" };
    }

    // ✅ 3. Ensure product belongs to order
    if (type === "PRODUCT") {
      const bought = order.items.some(
        (item) => item.product_id === productId
      );

      if (!bought) {
        return {
          success: false,
          message: "You can only review purchased products",
        };
      }
    }

    // ✅ 4. Create review
    await prisma.review.create({
      data: {
        user_id: userId,
        order_id: orderId,
        rating,
        comment,
        type,
        product_id: type === "PRODUCT" ? productId : null,
        farmer_id: type === "FARMER" ? farmerId : null,
      },
    });

    // ✅ 5. UPDATE PRODUCT STATS
    if (type === "PRODUCT" && productId) {
      const stats = await prisma.review.aggregate({
        where: { product_id: productId },
        _avg: { rating: true },
        _count: true,
      });

      await prisma.product.update({
        where: { id: productId },
        data: {
          avgRating: stats._avg.rating || 0,
          reviewCount: stats._count,
        },
      });
    }

    // ✅ 6. UPDATE FARMER STATS
    if (type === "FARMER" && farmerId) {
      const stats = await prisma.review.aggregate({
        where: { farmer_id: farmerId },
        _avg: { rating: true },
        _count: true,
      });

      await prisma.farmer.update({
        where: { id: farmerId },
        data: {
          avgRating: stats._avg.rating || 0,
          reviewCount: stats._count,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Review Error:", error);
    return {
      success: false,
      message: "Failed to submit review",
    };
  }
}

function evaluateProduct(product: any) {
  if (product.reportCount >= 10) return "BAN";
  if (product.reportCount >= 5 || product.avgRating < 2.5) return "HIDE";
  if (product.reportCount >= 3 || product.avgRating < 3.5) return "WARNING";
  return "OK";
}


 const ReportSchema = z.object({
  orderId: z.string().optional(),
  farmerId: z.string().optional(),
  productId: z.string().optional(),
  type: z.enum(["FARMER", "PRODUCT", "ORDER", "USER"]),
  reason: z.enum([
    "SCAM",
    "POOR_QUALITY",
    "WRONG_ITEM",
    "LATE_DELIVERY",
    "ABUSE",
    "SPAM",
    "OTHER",
  ]),
  description: z.string().optional(),
});



// export async function AddReport(values: unknown) {
//   const { userId } = await auth();
//   if (!userId) {
//     return { success: false, message: "Unauthorized" };
//   }

//   const parsed = ReportSchema.safeParse(values);
//   if (!parsed.success) {
//     return { success: false, message: "Invalid report data" };
//   }

//   const { orderId, farmerId, productId, type, reason, description } =
//     parsed.data;

//   try {
//     if (!orderId && !farmerId && !productId) {
//       return { success: false, message: "No target provided for report" };
//     }

//     // Duplicate check
//     if (orderId) {
//       const existing = await prisma.report.findUnique({
//         where: {
//           reporter_id_order_id_type: {
//             reporter_id: userId,
//             order_id: orderId,
//             type,
//           },
//         },
//       });
//       if (existing) {
//         return { success: false, message: "You already reported this order/type" };
//       }
//     }

//     // Validate entities
//     if (type === "PRODUCT" && productId) {
//       const product = await prisma.product.findUnique({ where: { id: productId } });
//       if (!product) return { success: false, message: "Product not found" };
//     }

//     if (type === "FARMER" && farmerId) {
//       const farmer = await prisma.farmer.findUnique({ where: { id: farmerId } });
//       if (!farmer) return { success: false, message: "Farmer not found" };
//     }

//     if (type === "ORDER" && orderId) {
//       const order = await prisma.order.findUnique({ where: { id: orderId } });
//       if (!order) return { success: false, message: "Order not found" };
//     }

//     // Create report
//     const report = await prisma.report.create({
//       data: {
//         reporter_id: userId,
//         order_id: orderId || null,
//         farmer_id: farmerId || null,
//         product_id: productId || null,
//         type,
//         reason,
//         description,
//       },
//     });

//     // Increment farmer report count
//     if (farmerId) {
//       await prisma.farmer.update({
//         where: { id: farmerId },
//         data: { reportCount: { increment: 1 } },
//       });
//     }

//     return { success: true, report };
//   } catch (error) {
//     console.error("Report Error:", error);
//     return { success: false, message: error instanceof Error ? error.message : "Failed to submit report" };
//   }
// }
export async function AddReport(values: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = ReportSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Invalid report data" };
  }

  const { orderId, farmerId, productId, type, reason, description } =
    parsed.data;

  try {
    if (!orderId && !farmerId && !productId) {
      return { success: false, message: "No target provided" };
    }

    // ======================================================
    // 1. VERIFY PURCHASE FIRST (IMPORTANT FOR PRODUCT REPORT)
    // ======================================================
    if (productId) {
      const hasPurchased = await prisma.orderItem.findFirst({
        where: {
          product_id: productId,
          order: {
            user_id: userId,
            status: "CONFIRMED",
          },
        },
      });

      if (!hasPurchased) {
        return {
          success: false,
          message: "You can only report products you purchased",
        };
      }
    }

    // ======================================================
    // 2. PREVENT DUPLICATE REPORTS
    // ======================================================
    if (orderId) {
      const existing = await prisma.report.findUnique({
        where: {
          reporter_id_order_id_type: {
            reporter_id: userId,
            order_id: orderId,
            type,
          },
        },
      });

      if (existing) {
        return { success: false, message: "Already reported" };
      }
    }

    // ======================================================
    // 3. CREATE REPORT (ONLY AFTER VALIDATION)
    // ======================================================
    const report = await prisma.report.create({
      data: {
        reporter_id: userId,
        order_id: orderId || null,
        farmer_id: farmerId || null,
        product_id: productId || null,
        type,
        reason,
        description,
      },
    });

    // ======================================================
    // 4. UPDATE FARMER REPORT COUNT
    // ======================================================
    if (farmerId) {
      await prisma.farmer.update({
        where: { id: farmerId },
        data: {
          reportCount: { increment: 1 },
        },
      });
    }

    // ======================================================
    // 5. AUTO MODERATION (SAFE + CORRECT)
    // ======================================================
    if (productId) {
       evaluateProduct(productId);
    }

    return { success: true, report };
  } catch (error) {
    console.error("Report Error FULL:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to submit report",
    };
  }
}


export async function getReviewsByProductId(productId: string) {
  const reviews = await prisma.review.findMany({
    where: { product_id: productId, type: "PRODUCT" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt,
    name: r.user.first_name + " " + r.user.last_name,
  }));
}
