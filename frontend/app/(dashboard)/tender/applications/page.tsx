import SeeApplications from "@/app/components/SeeApplication";

export default function SeeApplicationsPage({ searchParams }: { searchParams: any }) {
  const tenderid = searchParams.tenderid;

  return (
    <div>
      <SeeApplications tenderid={tenderid} />
    </div>
  );
}
