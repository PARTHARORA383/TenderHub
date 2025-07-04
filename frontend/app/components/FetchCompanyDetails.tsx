"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CompanyDetails {
  id: number;
  name: string;
  industry: string;
  description: string;
  Logo: string | null;
  Services: string[];
  tenders: Tender[];
  createdAt: string;
  updatedAt: string;
}

interface Tender {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  type: string;
}

export default function FetchCompanyDetails() {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [activeTab, setActiveTab] = useState<"profile" | "tenders">("profile");
  const params = useParams();
  const router = useRouter()
  const fetchCompanyDetail = async () => {
    try {
      const companyid = localStorage.getItem("companyid");
      const apiurl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiurl}/company/${companyid}`);

      if (response.status === 200) {
        setCompany(response.data.companydetails);
        if (response.data.companydetails.tenders) {
          setTenders(response.data.companydetails.tenders);
        }
      }
    } catch (e) {
      console.error("Error fetching company details", e);
    }
  };

  useEffect(() => {
    fetchCompanyDetail();
  }, []);

  return (
    <div className="p-6">
      {company ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="flex flex-col gap-8"
        >
          <div className="text-xl mt-10 ml-5">Company Profile</div>

          {/* Navbar */}
          <div className="flex justify-start gap-8 ml-5 mr-10 border-b border-neutral-800">
            <button
              onClick={() => setActiveTab("profile")}
              className={` py-2 px-3 text-center cursor-pointer  ${
                activeTab === "profile" ? "text-white" : "text-neutral-400"
              }`}
            >
              Profile
            </button>
            <div className="w-[1px] bg-neutral-800"></div>
            <button
              onClick={() => setActiveTab("tenders")}
              className={`py-2 text-center cursor-pointer ${
                activeTab === "tenders" ? "text-white" : "text-neutral-400"
              }`}
            >
              Tenders
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center bg-neutral-900 p-6 px-10 ml-5 mr-10 rounded-lg gap-4">
                {company.Logo ? (
                  <img
                    src={company.Logo}
                    alt={`${company.name} logo`}
                    className="w-20 h-20 object-contain rounded-full bg-white"
                  />
                ) : (
                  <div className="bg-neutral-950 rounded-full w-20 h-20 flex items-center justify-center text-3xl">
                    {company.name[0]}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="text-lg">{company.name}</div>
                  <div className="text-neutral-400">{company.industry}</div>
                </div>
              </div>

              <div className="flex flex-col bg-neutral-900 p-6 px-10 ml-5 mr-10 rounded-lg gap-4">
                <div className="text-lg flex flex-col w-full">
                  Company Details
                  <div className="border-[1px] border-neutral-800 w-full mt-4"></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <div className="text-neutral-400">Company Name</div>
                    <div className="mt-2">{company.name}</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-neutral-400">Industry</div>
                    <div className="mt-2">{company.industry}</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-neutral-400">Created on</div>
                    <div className="mt-2">
                      {new Date(company.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col col-span-3 mt-8">
                    <div className="text-neutral-400">Services</div>
                    <ul className="list-disc list-inside mt-2">
                      {company.Services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-neutral-900 p-6 px-10 ml-5 mr-10 rounded-lg gap-4">
                <div className="text-neutral-400">Description</div>
                <div>{company.description}</div>
              </div>
            </motion.div>
          )}

          {/* Tenders Tab */}
          {activeTab === "tenders" && (
            <motion.div
              key="tenders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col bg-neutral-900 p-6 px-10 ml-5 mr-10 rounded-lg gap-4">
                <div className="text-xl mb-2">Tenders</div>
                {tenders.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {tenders.map((tender) => (
                      <div
                        key={tender.id}
                        className="relative bg-neutral-900 border-2 border-neutral-800 shadow-sm rounded-md p-4"
                      >
                        <div className="text-lg">{tender.title}</div>
                        <div className="text-neutral-400 mb-2 ">
                          {tender.type}
                        </div>
                        <div className="mb-4 text-neutral-400 max-w-4xl ">
                          {tender.description}
                        </div>
                        <div className="text-neutral-200">
                          Budget: ₹{tender.budget}
                        </div>
                        <div className="text-neutral-200">
                          Deadline:{" "}
                          {new Date(tender.deadline).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="absolute right-5 bottom-3">
                          <button className="border-2 border-neutral-500 active:border-neutral-200 hover:bg-neutral-800 cursor-pointer transition-colors duration-200 text-neutral-100 px-10 py-2 rounded-md " onClick={()=>{
                            router.push(`/Tender/${tender.id}/applications`)
                          }}>
                            See applications
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No tenders available for this company.</div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <div>Loading company details...</div>
      )}
    </div>
  );
}
