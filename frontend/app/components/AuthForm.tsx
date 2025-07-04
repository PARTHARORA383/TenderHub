"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


interface Props {
  isLogin : boolean,
  handleSubmit : any ,
  email : string ,
  setEmail : React.Dispatch<React.SetStateAction<string>>
  password : string,
  setPassword : React.Dispatch<React.SetStateAction<string>>
  isloading : boolean
}

export const AuthForm = ({isLogin , handleSubmit , email , setEmail , password , setPassword , isloading} : Props) => {
  const router = useRouter()

  return (
    <div>
      <div className="min-h-screen max-h-screen pl-16 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <Image src={"/images/logo.png"} height={200} width={200} alt='Logo' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className=""
        >
          <span className="text-4xl text-neutral-400 font-sans font-extralight">Hello,</span>
          <span className="text-4xl font-semibold"> {isLogin ? "Welcome Back!" : "Create Account"}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="text-neutral-400 mt-3 text-lg"
        >
          {isLogin ? "We are happy to see you again, let's publish some tenders" : "Join us today and start publishing tenders easily"}
        </motion.div>



        <div className="mt-8 ">

          <form onSubmit={handleSubmit}>

          <div className="flex flex-col gap-2 justify-center items-start">
            <motion.label
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className="text-neutral-200 ml-1"
            >Email address</motion.label>
            <motion.input
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            required
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              type='email' placeholder="Partharora@gmail.com" className="w-2/3 shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200" />
          </div>

       

          <div className="flex flex-col gap-2 justify-center items-start mt-8">
            <motion.label
            
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className="text-neutral-200 ml-1"
            >Password</motion.label>
            <motion.input
            required
               value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              type='password' placeholder="Enter your password" className="w-2/3 shadow-lg rounded-md py-[8px] bg-neutral-900 px-2 outline-none border-2 border-neutral-950 focus:border-neutral-400 transition-colors duration-200" />
          </div>

          <motion.button
            type='submit'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="w-2/3 bg-gradient-to-br from-[#6D8F77] to-[#4E6B58] mt-12 py-2 rounded-md text-neutral-100 flex items-center justify-center cursor-pointer"
            >

              
              {isloading ? <div className=' w-6 h-6 rounded-full border-2 border-neutral-100 border-t-transparent animate-spin'>
                    
              </div> :<div>

                     { isLogin ? "Login" : "Sign Up"}
              </div>
               }
          </motion.button>
            </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="mt-4 text-center w-2/3"
          >
            {isLogin ? (
              <>
                <span className="text-neutral-400">Don't have an account? </span>
                <span className="font-sans hover:underline cursor-pointer" onClick={() => router.push('/auth/Signup')}>Sign up</span>
              </>
            ) : (
              <>
                <span className="text-neutral-400">Already have an account? </span>
                <span className="font-sans hover:underline cursor-pointer" onClick={() => router.push('/auth/Login')}>Login</span>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="flex justify-center items-center w-2/3 mt-8"
          >
            <div className="border-[1px] border-neutral-400 w-full"></div>
            <div className="w-full text-center text-neutral-400">Or continue with</div>
            <div className="border-[1px] border-neutral-400 w-full"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="flex w-2/3 space-x-4 mt-8"
        >
          <button className="flex items-center justify-center flex-1 bg-neutral-900 shadow-md py-[7px] rounded-md text-white space-x-2 cursor-pointer border-2 border-neutral-900 hover:border-neutral-400 transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.2 32.4 29 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.9 6.3 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.2 16.2 18.8 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.9 6.3 29.2 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5 0 9.7-1.9 13.2-5.1l-6.1-5.1C29.6 35.9 26.9 37 24 37c-5 0-9.2-3.4-10.7-8.1l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.4 3.9-5.2 7-9.3 7-5 0-9.2-3.4-10.7-8.1l-6.6 5.1C9.6 39.6 16.3 44 24 44c8.8 0 16-7.2 16-16 0-1.2-.1-2.5-.4-3.5z"/></svg>
            <span>Google</span>
          </button>

          <button className="flex items-center justify-center flex-1 bg-neutral-900 shadow-md py-2 rounded-md text-white space-x-2 cursor-pointer border-2 border-neutral-900 hover:border-neutral-400 transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.4 2.9 1.8.1-.8.4-1.4.8-1.8-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3 0-.3-.5-1.5.1-3.2 0 0 1-.3 3.4 1.2.9-.2 1.9-.4 2.8-.4s1.9.1 2.8.4c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.1 2.9.1 3.2.7.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z"/></svg>
            <span>GitHub</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
