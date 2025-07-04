"use client"
import { useSearchParams } from "next/navigation";
import { CompanyDetails } from "@/app/components/CompanyDetails";



export default function ProfilePage (){

  const searchParams = useSearchParams();
  const companyid = searchParams.get('companyid');

  return<div>
      <CompanyDetails companyid = {companyid}/>
  </div>
}