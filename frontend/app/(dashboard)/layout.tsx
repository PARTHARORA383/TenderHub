import { SideBar } from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideBar/> 
      <div className="  lg:ml-72">
      {children}
        </div> 
    </div>
  );
}
