
"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import { DropDown } from "./DropDown";
import { DragandDrop } from "./DragandDrop";

interface Props {
  companyName: string
  setCompanyName: React.Dispatch<React.SetStateAction<string>>
  industry: string
  setIndustry: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>

}


export default function CompanyProfileForm({companyName , setCompanyName , industry , setIndustry , description , setDescription} : Props) {


  const industryOptions = [
    "Information Technology",
    "Construction",
    "Manufacturing",
    "Healthcare",
    "Finance",
    "Education",
    "Energy",
    "Transportation & Logistics",
    "Retail & E-commerce",
    "Hospitality",
    "Agriculture",
    "Consulting",
    "Telecommunications",
    "Real Estate",
    "Pharmaceuticals",
    "Automotive",
    "Media & Entertainment",
    "Legal Services",
    "Aerospace & Defense",
    "Other",
  ];



  return (
    <div className="flex flex-col justify-center items-center bg-neutral-950">
      <motion.div className="w-full max-w-xl px-4"
        initial={{ opacity: 0.5, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-3xl font-semibold text-neutral-100 mb-2"
        >
          Write the name of your company
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-neutral-400 mb-8 "
        >
          Tell us more about your company
        </motion.p>

        <form className="flex flex-col gap-8 items-center">

          {/* Company Name */}
          <div className="flex flex-col gap-2 justify-center items-start w-full">
            <motion.label
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity:  1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="text-neutral-200 ml-1"
            >
              Company Name
            </motion.label>
            <motion.input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              type="text"
              placeholder="Eg. Kibou Systems Pvt Ltd"
              className="w-full shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200"
            />
          </div>

          {/* Industry Dropdown (custom) */}
          <div className="flex flex-col gap-2 justify-center items-start min-w-full">
            <motion.label
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="text-neutral-200 ml-1"
            >
              Industry
            </motion.label>
            {/* Replace this with your custom dropdown */}
            <DropDown options={industryOptions} placeholder="Eg. Retail" selected={industry} setSelected={setIndustry} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 justify-center items-start w-full">
            <motion.label
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="text-neutral-200 ml-1"
            >
              Description
            </motion.label>
            <motion.textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              placeholder="Describe your company..."
              className="w-full shadow-lg rounded-md py-2  h-32 bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200 resize-none"
            />
          </div>


    
        </form>
      </motion.div>
    </div>
  );
}
