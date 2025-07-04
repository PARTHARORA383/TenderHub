"use client"
import {motion , AnimatePresence} from 'motion/react'
import { useState } from 'react'

export const ErrorMessage = ({text} : {text:string})=>{
  const [error , setError] = useState(true)
  return <>


      {error && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-3 shadow-md z-50"
        >
         {text}

        </motion.div>
      )}
 
  </>
}