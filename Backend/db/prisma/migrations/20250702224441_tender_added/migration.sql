-- CreateTable
CREATE TABLE "Tender" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "budget" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
