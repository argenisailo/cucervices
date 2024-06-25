import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/auth.context"
import {useNavigate} from "react-router-dom"

export default function Verificacion() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { verify, user, verification, isLoading, setIsLoading } = useAuth()
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        try {
            if(verification === true) {
                navigate("/ventas")
            } else if(verification === false){
                setError(true)
            }
        } catch {
            setError(false)
        }
        setIsLoading(false)
    }, [verification])
  return (
    <main className='bg-[#01021C] h-screen'>
        <section className='text-white grid justify-center'>
            <div className='max-w-[400px] border p-6 rounded-md mt-7'>
                <h1 className='uppercase font-extrabold text-center text-[2rem]'>Verifica tu cuenta</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(values => {
                    values.id = user.data._id
                    values.imageCredential = values.imageCredential[0]
                    values.imageUser = values.imageUser[0]
                    verify(values)
                })} method="post">
                    {
                        error ? <div className='w-full p-2 bg-red-500 text-white rounded-md'>ERROR. Sus imágenes no coinciden</div> : ""
                    }
                    <div className='flex flex-col'>
                        <label className='font-bold' htmlFor="imageUser">Imagen tuya de frente</label>
                        <input {...register("imageUser", {required: true})} type="file" name="imageUser" id="imageUser"/>
                        {
                            errors.imageUser && (
                                <p className="text-red-500">Ingrese una imagen</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold' htmlFor="imageCredential">Imagen de tu credencial</label>
                        <input {...register("imageCredential", {required: true})} type="file" name="imageCredential" id="imageCredential" />
                        {
                            errors.imageCredential && (
                                <p className="text-red-500">Ingrese una imagen</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold' htmlFor="tel">Número de teléfono</label>
                        <input className='text-black p-1 rounded-sm' {...register("tel", {required: true})} type="tel" name="tel" id="tel" maxLength={11}/>
                        {
                            errors.tel && (
                                <p className="text-red-500">Ingrese un número de teléfono</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold' htmlFor="social">Link a Red social</label>
                        <input className='text-black p-1 rounded-sm' {...register("social")} type="text" name="social" id="social" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold' htmlFor="description">Describe tu pefil</label>
                        <textarea className='text-black p-1 rounded-sm' {...register("description", {required: true})} name="description" id="description" cols="30" rows="3"></textarea>
                        {
                            errors.description && (
                                <p className="text-red-500">Ingresa una descripción</p>
                            )
                        }
                    </div>
                    <div>
                        {
                            !isLoading ? <button className='bg-[#31587A] w-full hover:bg-[#A8DADC] transition-colors text-[1.1rem] py-2 rounded-lg text-white hover:text-[#01021C]'>Verificar mi perfil</button> : 
                            <button disabled className='bg-gray-500 w-full transition-colors text-[1.1rem] py-2 rounded-lg text-white'>Verificando... Por favor espere</button> 
                        }
                        
                    </div>
                </form>
            </div>
        </section>
    </main>
  )
}
