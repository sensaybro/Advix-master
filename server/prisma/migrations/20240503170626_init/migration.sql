/*
  Warnings:

  - You are about to drop the column `default_state` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `currently_date` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default_time_day` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hot_date` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "default_state",
ADD COLUMN     "currently_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "default_time_day" INTEGER NOT NULL,
ADD COLUMN     "hot_date" TIMESTAMP(3) NOT NULL;
