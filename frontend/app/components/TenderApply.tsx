
"use client"

import axios from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorMessage } from './Error';

interface Tender {
  title: string,
  description: string,
  deadline: string,
  budget: string,
  type: string
}

export function TenderApply() {

  const [tender, setTender] = useState<Tender | null>(null)
  const params = useParams()

  const [proposal , setProposal] = useState('')
  const [deadline , setDeadline] = useState('')
  const [budget , setBudget] = useState("")
  const [isApplying , setIsApplying] = useState(false)
  const [loading , setloading] = useState(false);
  const [error , setErrror] = useState(false) 
  const router = useRouter()
  const tenderid = params.tenderid
  const handlefetchtender = async () => {
    
    try {
      const apiurl = process.env.NEXT_PUBLIC_API_URL
      const companyid = localStorage.getItem("companyid")
      
      const response = await axios.get(`${apiurl}/tender/${tenderid}`)
      if (response.status == 200) {
        setTender(response.data.fetchTender)
      }
    } catch (e) {
      alert('Error fetching tender')
    }
    
  }
  
  const handleapply = async (e:any)=>{
    e.preventDefault()
    setIsApplying(true)
    
    try {
      const companyid = localStorage.getItem("companyid")
        const apiurl = process.env.NEXT_PUBLIC_API_URL
        const token = localStorage.getItem('token')

        const data = {
          proposal ,
          estimatedCompletion : new Date(deadline) , 
          bidamount : budget,
          tenderid : tenderid,
          status : "pending",
          companyid : companyid
        }

      const response = await axios.post(`${apiurl}/application` , data ,
        {headers : {
          Authorization : `${token}`
        }}
      )

      if(response.status == 200){
        setloading(true)
        router.push('/Tender')
      }


    }catch(e){
      setloading(false)
      setErrror(true);
    }
  }

  useEffect(() => {
    handlefetchtender()
  }, [])

  return <div>

<AnimatePresence>
      {error &&
        <ErrorMessage text='Error creating a tender. Pleae try again later' />
      }
    </AnimatePresence>

    <div className='text-2xl ml-6 mt-8'>Apply for this tender</div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      className="flex flex-col  mt-4 bg-neutral-900 p-3 rounded-md mr-8 ml-6 mb-8">

      <div className="text-lg">{tender?.title}</div>
      <div className="text-neutral-400 max-w-3xl mt-2">{tender?.description}</div>

      <div className="flex gap-8 mt-4">
        <div>
          <div className=" text-neutral-400 mb-1">Budget</div>
          ₹ {tender?.budget}
        </div>
        <div>
          <div className=" text-neutral-400 mb-1">Deadline</div>
          {tender?.deadline && new Date(tender.deadline).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</div>

        <div>
          <div className=" text-neutral-400 mb-1">Type</div>
          <div className="">{tender?.type || "N/A"}</div>
        </div>

      </div>
    </motion.div>


    <form onSubmit={handleapply}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      className="flex flex-col mt-4 bg-neutral-900 p-3 rounded-md mr-8 ml-6 mb-8"
    >


      <div className="text-lg">Submit your Proposal</div>

      <div className="flex flex-col gap-4 mt-4">
        <div>
          <div className="text-neutral-400 mb-1">Proposal</div>
          <textarea
            className="bg-neutral-800 rounded-md p-2 w-full text-neutral-100 outline-none border-2 border-neutral-900 focus:border-neutral-400 transition-all duration-200 h-32"
            placeholder="Enter your proposal..."
            rows={4}
            required
            value={proposal}
            onChange={(e)=>{
              setProposal(e.target.value)
            }}
            ></textarea>
        </div>


          <div className='flex gap-8  '>

          {
            //Datepicker
          }
        <div className='w-full'>
          <div className="text-neutral-400 mb-1 ">Proposed Deadline</div>
          <input
            type="date"
            className="bg-neutral-800 rounded-md p-2 w-full  text-neutral-100 outline-none"
            value={deadline}
            onChange={(e)=>{
              setDeadline(e.target.value)
            }}
            />
        </div>

        <div className='w-full'>
          <div className="text-neutral-400 mb-1">Proposed Budget (₹)</div>
          <input
            className="bg-neutral-800 rounded-md p-2 w-full text-neutral-100 outline-none border-2 border-neutral-900 focus:border-neutral-400 transition-all duration-200"
            required
            placeholder="Amount eg:1500000"
                value={budget}
            onChange={(e)=>{
              setBudget(e.target.value)
            }}
            />
        </div>
            </div>
      </div>

          <div className='flex justify-center items-center mt-8'><button className='bg-neutral-200 text-neutral-950 px-24 rounded-md py-2 border-2 border-neutral-900 outline-none active:opacity-70  transition-all duration-200  cursor-pointer mb-8'>{isApplying ? <div className='flex px-9 py-0.5 justify-center items-center '>
            <div className='border-2 border-t-transparent border-neutral-950 animate-spin rounded-full w-5 h-5 '>

            </div>
            
          </div> : <div>Send Proposal</div>}</button></div>

    </motion.div>
            </form>



  </div>
}