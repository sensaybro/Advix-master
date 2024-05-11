/*
  Warnings:

  - You are about to drop the column `count_views` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `posts_count` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactions` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_premium` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "count_views",
ADD COLUMN     "posts_count" INTEGER NOT NULL,
ADD COLUMN     "reactions" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL,
ALTER COLUMN "ERR" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_premium" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "PriceObjects" (
    "id" SERIAL NOT NULL,
    "price" BIGINT NOT NULL,
    "time" INTEGER NOT NULL,
    "hot" BOOLEAN NOT NULL,
    "for_hot" BOOLEAN NOT NULL,
    "hot_date" TIMESTAMP(3),
    "currently_date" TIMESTAMP(3),

    CONSTRAINT "PriceObjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceObjects" ADD CONSTRAINT "PriceObjects_id_fkey" FOREIGN KEY ("id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
