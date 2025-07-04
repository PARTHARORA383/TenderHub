"use client"

import { useRouter } from "next/navigation"
import {motion} from "motion/react"
import Image from 'next/image'
export const SideBar = ()=>{
const router = useRouter()

  return<div>
    <div className="w-[280px] bg-neutral-900 h-screen fixed left-0 top-0 flex flex-col p-2 gap-4">
        
          <div className="p-2 flex justify-center border-2 border-neutral-900 items-center rounded-lg  cursor-pointer transition-colors duration-200 " onClick={()=>{
            router.push('/Home')
          }}><Image src={"/images/logo.png"} width={200} height={100} alt="Logo" className=""/>

          </div>

        <motion.div className="p-2 flex justify-center border-2 border-neutral-900 items-center rounded-lg hover:bg-gradient-to-br hover:from-[#6D8F77] hover:to-[#4E6B58] cursor-pointer transition-colors duration-200 active:border-neutral-400" 
        onClick={()=>{
          router.push('/Home')
        }}>
          Home
        </motion.div>
        <motion.div className="p-2 flex justify-center border-2 border-neutral-900 items-center rounded-lg hover:bg-gradient-to-br hover:from-[#6D8F77] hover:to-[#4E6B58] cursor-pointer transition-colors duration-200 active:border-neutral-400" 
        onClick={()=>{
          router.push('/Tender')
        }}>
          Tenders
        </motion.div>

               <motion.div className="p-2 flex justify-center border-2 border-neutral-900 items-center rounded-lg hover:bg-gradient-to-br hover:from-[#6D8F77] hover:to-[#4E6B58] cursor-pointer transition-colors duration-200 active:border-neutral-400" 
        onClick={()=>{  
          router.push('/Company')
        }}>
          Companies
        </motion.div>

        <motion.div className="p-2 flex justify-center border-2 border-neutral-900 items-center rounded-lg hover:bg-gradient-to-br hover:from-[#6D8F77] hover:to-[#4E6B58] cursor-pointer transition-colors duration-200 active:border-neutral-400" 
        onClick={()=>{  
          router.push('/CompanyProfile')
        }}>
          Profile
        </motion.div>

 

    </div>

  </div>
}