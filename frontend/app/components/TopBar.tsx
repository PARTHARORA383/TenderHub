import Image from "next/image"

export const TopBar = ()=>{

  return <div>
    <div className="bg-neutral-900 w-full h-14 ">

      <Image src={"/images/logo.png"} width={250} height={100} alt="Logo" className=""/>
    </div>
  </div>
}