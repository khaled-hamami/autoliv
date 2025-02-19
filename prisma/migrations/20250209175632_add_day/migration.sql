-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "amca" JSONB NOT NULL,
    "amcb" JSONB NOT NULL,
    "amcc" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);
