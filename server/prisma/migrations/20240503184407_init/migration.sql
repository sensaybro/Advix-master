/*
  Warnings:

  - Added the required column `CPM` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "CPM" INTEGER NOT NULL;
