/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Connect` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Connect_token_key" ON "Connect"("token");
