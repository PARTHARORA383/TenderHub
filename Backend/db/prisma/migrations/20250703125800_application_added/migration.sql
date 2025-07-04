-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'rejected', 'approved');

-- AlterTable
ALTER TABLE "Tender" ADD COLUMN     "companyname" TEXT,
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "tenderid" INTEGER NOT NULL,
    "companyid" INTEGER NOT NULL,
    "proposal" TEXT,
    "bidamount" INTEGER,
    "estimatedCompletion" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_tenderid_fkey" FOREIGN KEY ("tenderid") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
