/*
  Warnings:

  - You are about to drop the column `currently_date` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `hot_date` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "currently_date",
DROP COLUMN "hot_date",
ADD COLUMN     "selected" INTEGER,
ADD COLUMN     "url_background_channel" TEXT,
ALTER COLUMN "ERR" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL;
