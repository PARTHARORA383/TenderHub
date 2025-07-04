"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { MdBusiness, MdWorkOutline, MdLogout } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import Image from "next/image"

export const SideBar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (path: string) => {
    router.push(path)
    setIsOpen(false) // hide sidebar after navigation
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/auth/Login")
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <AiOutlineMenu size={30} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      </div>

      {/* Sidebar */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block fixed top-0 left-0 h-screen w-[240px] bg-neutral-900 p-4 z-40`}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center cursor-pointer mb-4" onClick={() => handleNavigate("/Home")}>
            <Image src={"/images/logo.png"} width={180} height={80} alt="Logo" />
          </div>

          <div className="flex flex-col gap-2">
            <div onClick={() => handleNavigate("/Home")} className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 cursor-pointer">
              <AiOutlineHome size={20} /> Home
            </div>
            <div onClick={() => handleNavigate("/Tender")} className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 cursor-pointer">
              <MdWorkOutline size={20} /> Tenders
            </div>
            <div onClick={() => handleNavigate("/Company")} className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 cursor-pointer">
              <MdBusiness size={20} /> Companies
            </div>
            <div onClick={() => handleNavigate("/CompanyProfile")} className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 cursor-pointer">
              <FaUserCircle size={20} /> Profile
            </div>
            <div onClick={handleLogout} className="flex items-center gap-3 p-2 rounded hover:bg-neutral-800 cursor-pointer mt-4">
              <MdLogout size={20} /> Logout
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile when sidebar open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
