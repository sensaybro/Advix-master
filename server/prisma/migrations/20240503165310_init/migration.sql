/*
  Warnings:

  - Added the required column `ERR` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_subscribers` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_views` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "ERR" INTEGER NOT NULL,
ADD COLUMN     "count_subscribers" INTEGER NOT NULL,
ADD COLUMN     "count_views" INTEGER NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;
