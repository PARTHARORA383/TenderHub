"use client"

import LoginEffect from "@/app/components/LoginEffect"
import { AuthForm } from "@/app/components/AuthForm"
import { useState } from "react"

export default function Login()
{
  const [email ,setEmail] = useState("")
  const [password , setPassword ] = useState("")

  const handleSubmit = ()=>{
    //Backend request for login

  }

  return <div>
    <div className="grid grid-cols-2 min-h-screen max-h-screen ">

    <div className="col-span-1 h-full border-r-[2px] border-neutral-800">
    <AuthForm isLogin = {false} email= {email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit}/>
    </div>

    
    <div className="col-span-1 bg-neutral-900 h-screen">
        <LoginEffect/>
    </div>
    </div>
  </div>
}