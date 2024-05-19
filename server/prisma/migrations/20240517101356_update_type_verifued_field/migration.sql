/*
  Warnings:

  - Added the required column `verified` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "verified",
ADD COLUMN     "verified" BOOLEAN NOT NULL;
