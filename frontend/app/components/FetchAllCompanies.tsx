"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export  function FetchAllCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter()
      const fetchCompanies = async () => {
    try {
      const apiurl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiurl}/company`);
      if (response.status === 200) {
        setCompanies(response.data.companydetails); 
      }
    } catch (e) {
      console.error("Error fetching companies", e);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <div className="text-2xl mb-4">All Companies</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div 
            key={company.id}
            className="relative bg-neutral-900 rounded-md p-4 flex flex-col h-[300px]  "
          > 
          {company.logo ? 
          <div className="w-full bg-neutral-700 h-[200px] rounded-lg">
            <img
            src={company.logo}
            alt={`${company.name} logo`}
            className=" h-full w-full object-cover  mb-3 rounded-md bg-neutral-800"
            /></div> : <div className="h-[200px] bg-neutral-800 rounded-lg">
              <div className="text-4xl flex items-center justify-center w-full h-full">
              {company.name[0]}
              </div>
            </div>
          }
            <div className="text-lg mt-4 ml-2">{company.name}</div>
            <div className="text-neutral-400 ml-2">{company.industry}</div>

              <div className="absolute bottom-4 right-3"><button
                className="cursor-pointer px-6 border-2 border-neutral-500 rounded-md py-1 hover:bg-neutral-800 transition-all duration-200 active:border-neutral-100"
                onClick={()=>{
                  router.push(`/Company/${company.id}`)
                }}
              >See Profile</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

