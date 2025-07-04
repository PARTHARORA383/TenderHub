"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from 'motion/react'
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Tender {
  id : string,
  title: string,
  description: string,
  deadline: string,
  budget: string,
  type: string
}

export default function FetchAllTenders() {

  const [tenders, setTenders] = useState<Tender[] | []>([])
  const [loading, setloading] = useState(false)
  const [search, setSearch] = useState('')
  const [visible  , setVisible] = useState(10)
  const router = useRouter()

  const handlefetchtenders = async () => {

    try {
      setloading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${apiUrl}/tender`)

      if (response.status == 200) {
        setTenders(response.data.fetchTender)
      }

    } catch (e) {


    }
    finally {
      setTimeout(() => {

        setloading(false)
      }, 500);
    }

  }

  useEffect(() => {
    handlefetchtenders()
  }, [])


  const filtertenders = tenders.filter((item)=>{
   return (item.title.toLowerCase().includes(search.toLowerCase()) )
  })

  const visibleTenders = filtertenders.slice(0 , visible)

  const handleloadmore = ()=>{

    setVisible((prev)=>prev + 10)
  }

  if (loading) {
    return <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
    > 
      <div className="text-3xl ml-6 mt-4"> Tenders</div>

      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-10 animate-pulse rounded-md mr-8 ml-6 mt-4 w-1/3"></div>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-42 animate-pulse rounded-md mr-8 ml-6 mt-4"></div>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-42 animate-pulse rounded-md mr-8 ml-6 mt-4"></div>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-42 animate-pulse rounded-md mr-8 ml-6 mt-4"></div>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-42 animate-pulse rounded-md mr-8 ml-6 mt-4"></div>

    </motion.div>
  }

  return <div>

    <div className="text-3xl ml-6 mt-4">Tenders</div>


  <div className="flex justify-between items-baseline mr-8">


    <div className="flex items-center bg-neutral-100 rounded-lg px-3 py-2 w-full max-w-md ml-6 mt-8">
      <AiOutlineSearch className="w-5 h-5 text-neutral-900" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-neutral-100 text-neutral-950 outline-none ml-2 w-full placeholder-gray-500 "
        onChange={(e)=>{
          setSearch(e.target.value)
        }}
        />
    </div>

    <div className="px-6 py-2 border-2 border-neutral-950 rounded-md shadow-sm max-w-xs hover:bg-neutral-700 cursor-pointer transition-all duration-200 active:border-neutral-500 bg-gradient-to-br from-neutral-700 to-neutral-800 hover:bg-gradient-to-b" onClick={()=>{
      router.push('/Tender/create')
    }}> Create Tender</div>

        </div>

    {visibleTenders.map((tender, index) => (

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        key={index}
        className="relative flex flex-col  mt-4 bg-neutral-900 p-3 rounded-md mr-8 ml-6 mb-8">

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
            <div className="">{tender.type ? tender.type : "N/A"}</div>
          </div>


        </div>

        <div className="absolute right-5 bottom-3"><button className=" border-2 border-neutral-500 active:border-neutral-200 hover:bg-neutral-800 cursor-pointer transition-colors duration-200 text-neutral-100 px-10 py-2 rounded-md " onClick={()=>{
       router.push(`/tender/apply?tenderid=${tender?.id}`);
        }}>Apply</button></div>

      </motion.div>
    
    ))}

    {visible < filtertenders.length && (
      <div className="mt-8 flex items-center mb-10 ml-6 mr-8">
        <div className="border-2 border-neutral-800 flex-grow "></div>
          <div className="ml-8 mr-8 cursor-pointer hover:text-neutral-400 transition-colors duration-200 "
          onClick = {handleloadmore}>Load more</div>

        <div className="border-2 border-neutral-800 flex-grow "></div>
        

        </div>
    )}

  </div>
}