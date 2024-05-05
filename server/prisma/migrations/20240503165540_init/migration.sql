/*
  Warnings:

  - You are about to drop the column `price` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `default_price` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default_state` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hot_price` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hot_state` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "price",
ADD COLUMN     "default_price" INTEGER NOT NULL,
ADD COLUMN     "default_state" BOOLEAN NOT NULL,
ADD COLUMN     "hot_price" INTEGER NOT NULL,
ADD COLUMN     "hot_state" BOOLEAN NOT NULL;
