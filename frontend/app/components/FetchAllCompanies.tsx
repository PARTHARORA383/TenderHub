"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export function FetchAllCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const router = useRouter();

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

  // Get unique industries for dropdown
  const industries = Array.from(new Set(companies.map((c) => c.industry)));

  // Filter companies based on searchQuery and selectedIndustry
  const filteredCompanies = companies.filter(
    (company) =>
      (selectedIndustry === "All" || company.industry === selectedIndustry) &&
      (company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="text-2xl mb-4">All Companies</div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or industry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 mb-3 md:mb-0"
        />

        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
        >
          <option value="All">All Industries</option>
          {industries.map((industry, index) => (
            <option key={index} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-neutral-900 rounded-md p-4 flex flex-col h-[300px]"
            >
              {company.logo ? (
                <div className="w-full bg-neutral-700 h-[200px] rounded-lg">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-cover mb-3 rounded-md bg-neutral-800"
                  />
                </div>
              ) : (
                <div className="h-[200px] bg-neutral-800 rounded-lg">
                  <div className="text-4xl flex items-center justify-center w-full h-full">
                    {company.name[0]}
                  </div>
                </div>
              )}

              <div className="text-lg mt-4 ml-2">{company.name}</div>
              <div className="text-neutral-400 ml-2">{company.industry}</div>

              <div className="absolute bottom-4 right-3">
                <button
                  className="cursor-pointer px-6 border-2 border-neutral-500 rounded-md py-1 hover:bg-neutral-800 transition-all duration-200 active:border-neutral-100"
                  onClick={() => {
                    router.push(`/Company/${company.id}`);
                  }}
                >
                  See Profile
                </button>
              </div>
            </motion.div>
          ))
        ) : (
       

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 col-span-full">
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
            <div className="h-[300px] bg-neutral-900 animate-pulse col-span-1 rounded-md"></div>
       
          </div>
        )}
      </div>
    </div>
  );
}

