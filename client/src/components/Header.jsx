import React, { useEffect, useState } from 'react'
import LogoHeader from "../assets/logoheader.png"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/auth.context.jsx'

export default function Header() {
  const navigate = useNavigate();
  const {logOutUser, user, isAuthenticated} = useAuth();
  const [imageUser, setImageUser] = useState("#")
  const [verified, setVerified] = useState("")

  useEffect(() => {
    
    if(isAuthenticated) {
      setImageUser(user.data.image.link)
      setVerified(user.data.verified)
    } else {
      setImageUser("")
      setVerified(false)
    }
  }, [user])

  const logOut = async () => {
    await logOutUser()
    navigate("/")
  }
  
  return (
    <div className="bg-[#01021C] px-8 py-6 border-b flex justify-between">
        <Link to='/' className="max-w-[32rem]">
          <img className="w-full" src={LogoHeader} alt="" />
        </Link>
        <div className="text-white flex gap-3 items-center">
          <Link to="/perfil" title='Perfil'>
            <img className='w-24 border rounded-full aspect-square' src={imageUser} alt="" />
          </Link>
          <Link to="/contactos" className='bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors'>Contactos</Link>
          {
            verified === false ? <Link to="/verificacion" className='bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors'>Verificación</Link>
            :
            <Link to="/publicar" className='bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors' >Publicar</Link>
          }
          <Link className="bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors" to='/servicios'>Servicios</Link>
          <Link className="bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors" to='/ventas'>Productos</Link>
          <button onClick={logOut} className="bg-[#E63946] transition-colors hover:bg-[#82374F] py-2 px-6 text-[1.2rem] rounded-md">Cerrar Sesión</button>
        </div>
      </div>
  )
}
