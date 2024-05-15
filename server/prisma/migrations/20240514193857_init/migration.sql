/*
  Warnings:

  - Changed the type of `id_telegram` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_telegram` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "id_telegram",
ADD COLUMN     "id_telegram" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Connect" ALTER COLUMN "telegram_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_telegram",
ADD COLUMN     "id_telegram" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_telegram_key" ON "Channel"("id_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_telegram_key" ON "User"("id_telegram");
