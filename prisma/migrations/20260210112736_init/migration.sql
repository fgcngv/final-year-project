-- CreateTable
CREATE TABLE "ChatMatches" (
    "id" TEXT NOT NULL,
    "user1_id" TEXT NOT NULL,
    "user2_id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMatches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatMatches_user1_id_user2_id_key" ON "ChatMatches"("user1_id", "user2_id");

-- AddForeignKey
ALTER TABLE "ChatMatches" ADD CONSTRAINT "ChatMatches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMatches" ADD CONSTRAINT "ChatMatches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
