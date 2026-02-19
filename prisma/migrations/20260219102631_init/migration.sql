-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('PRODUCT', 'FARMER');

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "type" "ReviewType" NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "product_id" TEXT,
    "farmer_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_product_id_idx" ON "Review"("product_id");

-- CreateIndex
CREATE INDEX "Review_farmer_id_idx" ON "Review"("farmer_id");

-- CreateIndex
CREATE INDEX "Review_user_id_idx" ON "Review"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_order_id_type_key" ON "Review"("order_id", "type");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
