"use client"

import { hover, motion } from 'motion/react'


export default function LoginEffect() {

  return <div>
    <div

      className="w-full h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute bottom-5 left-6 overflow-hidden">

      
        <motion.div 
             initial = {{opacity : 0 , y : 10}}
      animate = {{opacity :1 , y : 0}}
      transition={{ duration : 0.3 , ease : 'easeIn'}}
        
        className="text-2xl text-neutral-400 "> Publish tenders, manage bids, and connect<br /> with companies on one platform.</motion.div>

        <motion.div 
                     initial = {{opacity : 0 , y : 10}}
      animate = {{opacity :1 , y : 0}}
      transition={{ duration : 0.3 , ease : 'easeIn'}}
        
        className='relative'>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: "100%" }}
            whileHover={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, ease: "easeIn" }}
            className=" absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent ">
          </motion.div>
          <motion.div className='  relative -translate-x-30  text-9xl font-bold mt-2 '>
            TENDERHUB
          </motion.div>
        </motion.div>



      </div>

      <div className=" absolute top-1/2 border-2 border-neutral-900 w-full "></div>


       <motion.div className="absolute top-5 right-6 overflow-hidden rotate-180"              initial = {{opacity : 0 , y : 10}}
      animate = {{opacity :1 , y : 0}}
      transition={{ duration : 0.3 , ease : 'easeIn'}}>
            
        <motion.div 
             initial = {{opacity : 0 , y : 10}}
          animate = {{opacity :1 , y : 0}}
      transition={{ duration : 0.3 , ease : 'easeIn'}}
        
        className="text-2xl text-neutral-400 translate-x-8"> Publish tenders, manage bids, and connect<br /> with companies on one platform.</motion.div>


          <motion.div className='relative'>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: "100%" }}
            whileHover={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, ease: "easeIn" }}
            className=" absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent ">
          </motion.div>
          <motion.div className='  relative translate-x-8  text-9xl font-bold mt-2 '>
            TENDERHUB
          </motion.div>
        </motion.div>
      </motion.div>


    </div>

  </div>
}