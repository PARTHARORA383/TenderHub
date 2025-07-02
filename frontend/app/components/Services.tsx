import {
  FaTools,
  FaTruckMoving,
  FaLaptopCode,
  FaPaintBrush,
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaBullhorn,
  FaPeopleCarry,
  FaWarehouse,
  FaRecycle,
  FaCogs,
  FaBoxOpen,
  FaHardHat,
  FaGlobe
} from "react-icons/fa";
import { MdDesignServices, MdCleaningServices, MdSupportAgent } from "react-icons/md";

interface Props {

  selectedServices : any 
  setSelectedServices : any
}

export const Services = ({selectedServices , setSelectedServices  
} : Props)=>{

const servicesArray = [
  { name: "Manufacturing", icon: <FaCogs /> },
  { name: "Logistics & Transportation", icon: <FaTruckMoving /> },
  { name: "Software Development", icon: <FaLaptopCode /> },
  { name: "Construction", icon: <FaHardHat /> },
  { name: "Consulting", icon: <FaHandshake /> },
  { name: "Marketing & Advertising", icon: <FaBullhorn /> },
  { name: "Design Services", icon: <MdDesignServices /> },
  { name: "Cleaning Services", icon: <MdCleaningServices /> },
  { name: "Warehousing", icon: <FaWarehouse /> },
  { name: "Trading & Distribution", icon: <FaBoxOpen /> },
  { name: "Facility Management", icon: <FaBuilding /> },
  { name: "Recycling & Waste Management", icon: <FaRecycle /> },
  { name: "Maintenance & Repairs", icon: <FaTools /> },
  { name: "Human Resources & Staffing", icon: <FaPeopleCarry /> },
  { name: "Business Support", icon: <MdSupportAgent /> },
  { name: "Research & Development", icon: <FaChartLine /> },
  { name: "Global Trade", icon: <FaGlobe /> },
  { name: "Creative & Arts", icon: <FaPaintBrush /> },
];
  const SelectService = (name:any)=>{

    if(selectedServices.includes(name)){
      setSelectedServices(selectedServices.filter((item:any)=>item !==name))
    }
    else{
      setSelectedServices([...selectedServices , name])
    }
    console.log(selectedServices)
  }

  return <div className="w-2/3 mb-30">


    <div className="text-4xl font-medium text-neutral-100">
      Tell us what services you provide
    </div>
    <div className="text-xl text-neutral-400 mt-2">
      You can add more services later 
    </div>

    <div></div>
<div className='grid grid-cols-4 gap-4 mt-10'>

{servicesArray.map((item :any ,index:any)=>{

const isSelected = selectedServices.includes(item.name); 

return(
  <div  className={`cursor-pointer flex flex-col items-start gap-4 p-5 border rounded-lg 
    ${isSelected ? " bg-neutral-900 border-neutral-400 transition-colors duration-200" : "bg-neutral-900 border-2 border-neutral-950 transition-colors duration-200"}`}
    key={index}
    onClick={()=>{
      SelectService(item.name)
    }}
>
   <div className="text-xl font-medium">{item.icon}</div>
    <div className="font-medium">{item.name}</div>
  </div>
)

})}
</div>


  </div>
}

