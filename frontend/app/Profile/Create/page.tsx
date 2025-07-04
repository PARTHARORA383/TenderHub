
"use client"

import CompanyProfileForm from "@/app/components/CompanyProfileForm";
import { DragandDrop } from "@/app/components/DragandDrop";
import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react'
import { Services } from "@/app/components/Services";
import axios from "axios";
import { useRouter } from "next/navigation";




export default function CreateProfile() {

  const [step, setStep] = useState(0)
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [selectedServices, setSelectedServices] = useState([])
  const [lastStep, setLastStep] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  const router = useRouter()

  const steps = [
    <CompanyProfileForm companyName={companyName} setCompanyName={setCompanyName} industry={industry} setIndustry={setIndustry} description={description} setDescription={setDescription} />,
    <DragandDrop setImageUrl={setLogo}/>,
    <Services selectedServices={selectedServices} setSelectedServices={setSelectedServices}  />

  ]

  const handleCreateCompany = async () => {

    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const token = localStorage.getItem("token")

      const data = {
        name: companyName,
        industry: industry,
        description: description,
        Logo: logo,
        Services: selectedServices
      }

      console.log(data)
      console.log(token)  

      const response = await axios.post(`${apiUrl}/company`, data,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )


      if (response.status == 200) {
        setTimeout(() => {
          router.push('/')
        }, 1000)
        localStorage.setItem("companyid" , response.data.company.id)

      }

    } catch (e) {

      setLoading(false)
    }
  }


  const handleProceed = () => {
    if (step === steps.length - 2) {
      setLastStep(true)
      setStep((prev) => prev + 1)
    }
    else if (step === steps.length - 1) {
      if (!companyName || !industry) {
        setError(true);

      }
      else {
        handleCreateCompany()
      }
    }
    else {
      setStep((prev) => prev + 1)
    }
  }

  return <div>
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-3 shadow-md z-50"
        >
          Please go back and fill in Company name and Industry. Note: Each user can create only one company.

        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>

      {loading && <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeIn' }}

        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 ">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg">Wait while we create your company...</p>
        </div>
      </motion.div>}
    </AnimatePresence>

    <div className="flex flex-col items-center  mt-24">{steps[step]}</div>

    <div className="fixed bottom-0 w-screen h-[80px] bg-neutral-900 flex justify-between items-center pl-20 pr-20">

      <motion.button

        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        disabled={step === 0}
        className=" px-8 bg-gradient-to-br from-[#6D8F77] to-[#4E6B58] py-2 rounded-md text-neutral-100 flex items-center justify-center cursor-pointer disabled:opacity-30 border-2 shadow-sm border-neutral-900 active:border-neutral-400 transition-all duration-200 disabled:border-0"
        onClick={() => {
          setStep((prev) => prev - 1)
          setLastStep(false)
          setError(false)
        }}
      >
        Move back
      </motion.button>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className=" px-8 bg-gradient-to-br from-[#6D8F77] to-[#4E6B58] py-2 rounded-md text-neutral-100 flex items-center justify-center cursor-pointer disabled:opacity-30 border-2 shadow-sm border-neutral-900 active:border-neutral-400 transition-all duration-200 "
        onClick={handleProceed}
      >
        {` ${lastStep ? " Create Profile" : "Move ahead"}`}
      </motion.button>

    </div>

  </div>
}