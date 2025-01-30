-- CreateTable
CREATE TABLE "References" (
    "id" SERIAL NOT NULL,
    "ref" TEXT NOT NULL,
    "refPeinture" TEXT NOT NULL,

    CONSTRAINT "References_pkey" PRIMARY KEY ("id")
);
