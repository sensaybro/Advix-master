-- CreateTable
CREATE TABLE "Connect" (
    "id" SERIAL NOT NULL,
    "token" BIGINT NOT NULL,
    "telegram_id" INTEGER NOT NULL,

    CONSTRAINT "Connect_pkey" PRIMARY KEY ("id")
);
