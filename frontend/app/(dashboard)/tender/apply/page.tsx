import { TenderApply } from "@/app/components/TenderApply";

export default function TenderApplyPage({ searchParams }: { searchParams: any }) {
  const tenderid = searchParams.tenderid;

  return (
    <div>
      <TenderApply tenderid={tenderid} />
    </div>
  );
}
