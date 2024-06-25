import axios from "../api/axios.js"
import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import Service from "../components/Service.jsx"
import { useAuth } from "../context/auth.context.jsx"
import { useNavigate } from "react-router-dom"

export default function Servicio() {
  const [isService, setIsService] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [services, setServices] = useState([])
  const {isAuthenticated} = useAuth();
  const navigation = useNavigate()

  useEffect(() => {
    async function handleData() {
      const servicesData = await axios.get("https://modular-cucervices.onrender.com/api/home-ser")
      if(servicesData.data.length > 0) {
        setServices(servicesData.data)
        setIsService(true)
      }else {
        setIsService(false)
      }
    }
    if(isAuthenticated) {
      handleData()
    }
    else{
      navigation("/")
    }
  }, [])


  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="bg-[#01021C]">
      <div className="px-10 pt-10">
        <input className=" focus:outline-none bg-transparent border-b p-1 text-[1.5rem] text-white" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Busca el servicio..." />
      </div>
      <div className="grid grid-cols-3 p-10 justify-items-center gap-7">
        {
          isService ? filteredServices.map((service, index) => <Service data={service} key={index}/>)
          : ""
        }
      </div>
    </main>
  )
}
