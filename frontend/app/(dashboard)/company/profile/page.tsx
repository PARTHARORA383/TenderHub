
import { CompanyDetails } from "@/app/components/CompanyDetails";



export default function ProfilePage ({searchParams  } : {searchParams : any}){

 const companyid = searchParams.companyid;

  return<div>
      <CompanyDetails companyid = {companyid}/>
  </div>
}