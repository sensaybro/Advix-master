/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_telegram]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_telegram` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link_image` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "User_id" SERIAL NOT NULL,
ADD COLUMN     "id_telegram" INTEGER NOT NULL,
ADD COLUMN     "link_image" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("User_id");

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "User_id" INTEGER NOT NULL,
    "Category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "id_telegram" INTEGER NOT NULL,
    "desc_channel" TEXT NOT NULL,
    "link_Cannel" TEXT NOT NULL,
    "link_Type_Boolean" BOOLEAN NOT NULL,
    "url_Image_Channel" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_telegram_key" ON "Channel"("id_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_telegram_key" ON "User"("id_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
