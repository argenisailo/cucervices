import React from 'react'
import ErrorD from "../assets/404error.png"
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <section className='bg-[#01021C] h-screen grid items-center justify-center'>
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-white font-black uppercase text-[2.4rem]'>¡Error 404! Página no encontrada</h1>
                <Link to="/" className='text-white hover:underline text-[1.2rem]'>Click aquí para volver al inicio</Link>
            </div>
            <div>
                <img src={ErrorD} alt="" />
            </div>
        </div>
    </section>
  )
}
