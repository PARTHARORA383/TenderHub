"use client"

import LoginEffect from "@/app/components/LoginEffect"
import { AuthForm } from "@/app/components/AuthForm"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import {motion , AnimatePresence } from 'motion/react'

export default function Signup()
{
  const [email ,setEmail] = useState("")
  const [password , setPassword ] = useState("")
  const [isloading , setIsLoading] = useState(false)
  const [error , setError] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e:any)=>{
    try {
        e.preventDefault()
        setIsLoading(true);
        const data =  {
        email : email,
        password : password
      }
      const apiurl = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(`${apiurl}/auth/signup` , data)

      if(response.status == 200){
        localStorage.setItem("token" , response.data.token)
        router.push('/Profile/create')
      }
    }catch(e){
      setIsLoading(false)
      setError(true)
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
          className="fixed top-0 left-0 w-full bg-gradient-to-b from-red-500 to-red-600 text-white text-center py-3 shadow-md z-50"
        >
          There was an error in creating your account, Please try again later
       
        </motion.div>
      )}
    </AnimatePresence>
    <div className="grid grid-cols-2 min-h-screen max-h-screen ">

    <div className="col-span-2 lg:col-span-1 h-full border-r-[2px] border-neutral-800">
    <AuthForm isLogin = {false} email= {email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} isloading = {isloading}/>
    </div>

    
    <div className="hidden lg:block lg:col-span-1 bg-neutral-900 h-screen">
        <LoginEffect/>
    </div>
    </div>
  </div>
}