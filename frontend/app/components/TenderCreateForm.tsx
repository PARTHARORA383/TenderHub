"use client"
import { motion, AnimatePresence } from 'motion/react'
import { DropDown } from './DropDown'
import { useState } from 'react'
import axios from 'axios'
import { ErrorMessage } from './Error'
import { useRouter } from 'next/navigation'
import { DarkDatePicker } from './DatePicker'



export default function TenderCreateForm() {

  const tenderstypes = [
    "Construction",
    "Website Development",
    "Stationery Supply",
    "Security Services",
    "Digital Marketing",
    "Catering Services",
    "IT Equipment Supply",
    "Interior Designing",
    "Cloud Migration",
    "Printing Services",
    "Transportation Services",
    "Consultancy Services",
    "Electrical Maintenance",
    "Event Management",
    "Software Development"
  ]

  const [tendertype, setTendertype] = useState("")
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState("")
  const [deadline , setDeadlinie] =useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()





  const handleCreateTender = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const companyid = localStorage.getItem('companyid')

    const data = {
      title,
      description,
      type : tendertype,
      deadline,
      budget ,
      company_id : Number(companyid) ,
      locked : false
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const token = localStorage.getItem("token")

      const response = await axios.post(`${apiUrl}/tender`, data,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )
      if (response.status == 200){
        router.push('/tender')
      }

    } catch (e) {
      setError(true)
      setLoading(false)
    }


  }

  return <div className='ml-20 mt-10 '>
    <AnimatePresence>
      {error &&
        <ErrorMessage text='Error creating a tender. Please try again later' />
      }
    </AnimatePresence>


    <div className='text-2xl'>
      Create Your Tender
    </div>



    <form onSubmit={handleCreateTender}>
      <div className="flex flex-col gap-2 justify-center items-start mt-8">
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="text-neutral-200 ml-1 text-lg"
        >Title</motion.label>
        <motion.input
          required
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          onChange={(e)=>{setTitle(e.target.value)}}
          placeholder="Eg: Construction of New Office Building" className="w-2/3 shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-start w-2/3 mt-8">
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="text-neutral-200 ml-1 text-lg"
        >Type of Tender</motion.label>
        <DropDown options={tenderstypes} placeholder='Enter the type of tender' selected={tendertype} setSelected={setTendertype} />
      </div>

      <div className="flex flex-col gap-2 justify-center items-start mt-8">
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="text-neutral-200 ml-1 text-lg"
        >Description</motion.label>
        <motion.textarea
          required
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
             onChange={(e)=>{setDescription(e.target.value)}}
          placeholder="Eg: We are inviting tenders for the construction of a new 5-storey office building" className="w-2/3 shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 h-36 focus:border-neutral-400 transition-colors duration-200" />
      </div>
      
          <div className='flex w-2/3 gap-6'>
        <div className='w-1/2 mt-8'>
        <div className='text-neutral-400 text-lg mb-2'>Deadline</div>
        <DarkDatePicker onDateSelect={(date)=>setDeadlinie(date)}/></div>
      


        <div className='w-1/2 mt-8'>
          <div className='text-neutral-400 text-lg'>Budget</div>
            <motion.input
          required
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          onChange={(e)=>{setBudget(e.target.value)}}
          placeholder="Eg: Rs 140000" className="w-full shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200 mt-2 " />
        </div>
        </div>
        

        <div className='w-2/3 flex justify-center items-center'>

        <motion.button
          type='submit'
          
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="w-sm bg-gradient-to-br from-[#6D8F77] to-[#4E6B58] mt-12 py-2 rounded-md text-neutral-100 flex items-center justify-center cursor-pointer mb-8"
          > {loading ? <div className='flex
          w-6 h-6 rounded-full border-2 border-neutral-100 border-t-transparent animate-spin '>


          </div> : <div>Create</div>}</motion.button>
          </div>
    </form>


  </div>
}