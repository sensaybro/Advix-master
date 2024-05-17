/*
  Warnings:

  - Added the required column `id_channel` to the `PriceObjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PriceObjects" DROP CONSTRAINT "PriceObjects_id_fkey";

-- AlterTable
ALTER TABLE "PriceObjects" ADD COLUMN     "id_channel" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PriceObjects" ADD CONSTRAINT "PriceObjects_id_channel_fkey" FOREIGN KEY ("id_channel") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
