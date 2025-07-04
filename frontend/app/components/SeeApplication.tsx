"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Application {
  id: number;
  applicantName: string;
  applicantEmail: string;
  proposal: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bidamount: number;
  estimatedCompletion: string;
  companyid: number;
}

interface Company {
  id: number;
  name: string;
}

export default function SeeApplications({tenderid} : {tenderid : string}) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<Company | null>(null);

 
  const router = useRouter();

  const companyid = localStorage.getItem("companyid");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiurl}/application/${tenderid}`);
      if (response.status === 200) {
        setApplications(response.data.applications);
      }
    } catch (e) {
      console.error("Error fetching applications", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`${apiurl}/company/${companyid}`);
      if (response.status === 200) {
        setCompany(response.data.company);
      }
    } catch (e) {
      console.error("Error fetching company", e);
    }
  };

  const updateApplicationStatus = async (applicationId: number, status: "approved" | "rejected") => {
    try {
      const response = await axios.put(`${apiurl}/application/${applicationId}`, {
        status,
        tenderid: tenderid,
        companyid: companyid,
      });
      if (response.status === 200) {
        setApplications(prev =>
          prev.map(app =>
            app.id === applicationId ? { ...app, status } : app
          )
        );
      }
    } catch (e) {
      console.error("Error updating application status", e);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchCompany();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col gap-8"
      >
        {company && (
          <div
            onClick={() => router.push(`/company/${company.id}`)}
            className="text-2xl font-semibold mt-10 ml-5 cursor-pointer hover:text-blue-400 transition-colors"
          >
            {company.name}
          </div>
        )}

        <div className="text-xl ml-5">Applications for Tender</div>

        {loading ? (
          <div className="ml-5">Loading applications...</div>
        ) : (
          <div className="flex flex-col bg-neutral-900 p-6 px-10 ml-5 mr-10 rounded-lg gap-4">
            {applications.length > 0 ? (
              applications.map(application => (
                <div
                  key={application.id}
                  className="relative bg-neutral-900 border-2 border-neutral-800 shadow-sm rounded-md p-4"
                >
                  <div className="text-lg">{application.applicantName}</div>
                  <div className="text-neutral-400 mb-2">{application.applicantEmail}</div>

                  <div className="mb-4 text-neutral-400 max-w-4xl">{application.proposal}</div>

                  <div className="text-neutral-200 mb-2">
                    <span className="font-semibold">Bid Amount:</span> {formatAmount(application.bidamount)}
                  </div>

                  <div className="text-neutral-200 mb-2">
                    <span className="font-semibold">Estimated Completion:</span>{" "}
                    {formatDate(application.estimatedCompletion)}
                  </div>

                  <div className="text-neutral-200">
                    <span className="font-semibold">Status:</span> {application.status}
                  </div>

                  {application.status === "pending" && (
                    <div className="absolute right-5 bottom-3 flex gap-4">
                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "approved")
                        }
                        className="border-2 border-neutral-500 active:border-green-900 hover:bg-neutral-800 cursor-pointer transition-colors duration-200 text-neutral-100 px-4 py-2 rounded-md"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "rejected")
                        }
                        className="border-2 border-neutral-500 active:border-red-800 hover:bg-neutral-800 cursor-pointer transition-colors duration-200 text-neutral-100 px-4 py-2 rounded-md"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>No applications found for this tender.</div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
