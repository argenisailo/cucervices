import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth.context'

export default function UpdateProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    image: "",
    socialMedia: "",
    phoneNumber: ""
  })

  const {user, UpdateDataUser, isLoading, setIsLoading, isUpdated, setIsUpdated} = useAuth()
  const {register, formState: {errors}, handleSubmit, setValue} = useForm()

  useEffect(() => {
    setIsLoading(false)
    setIsUpdated(undefined)
    const loadInfo = () => {
      setValue("id", user.data._id)
      setValue("name", user.data.name)
      setValue("email", user.data.email)
      if(user.data.description) {
        setValue("description", user.data.description)
      }
      if(user.data.tel) {
        setValue("tel", user.data.tel)
      }
      if(user.data.social) {
        setValue("social", user.data.social)
      }
    }
    loadInfo()
  }, [])

  return (
    <main className='bg-[#01021C]'>
      <section className='grid justify-center py-6'>
        <div className='border p-6 rounded-md'>
          <h1 className='text-white uppercase text-center font-black text-[1.7rem]'>Actualiza tu información</h1>
          <form className='text-white text-[1.2rem] flex flex-col gap-y-2' method="post"
            onSubmit={handleSubmit(async (values) => {
              values.image = values.image[0]
              UpdateDataUser(values)
            })}
          >
            {
              isUpdated ? 
              <div className='w-full bg-green-500 p-2 text-white rounded-sm'>{isUpdated}</div>
              :
              ""
            }
            <div className='flex flex-col'>
              <label htmlFor="name">Nombre</label>
              <input className='text-black px-2 py-1 rounded-sm' type="text" name="name" id="name" {...register("name")} />
              {
                errors.name && (
                  <p className="text-red-500">Ingrese un email</p>
                )
              }
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email">Email</label>
              <input className='text-black px-2 py-1 rounded-sm' type="email" name="email" id="email" {...register("email")} />
              {
                errors.email && (
                  <p className="text-red-500">Ingrese un email</p>
                )
              }
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password">Contraseña</label>
              <input className='text-black px-2 py-1 rounded-sm' type="password" name="" id="" {...register("password")}/>
              {
                errors.password && (
                  <p className="text-red-500">Ingrese un email</p>
                )
              }
            </div>
            <div className='flex flex-col'>
              <label htmlFor="image">Foto de perfil</label>
              <input className='image' type="file" name="image" id="image" {...register("image")}/>
            </div>
            {
              user.data.verified ?
              <> 
                <div className='flex flex-col'>
                  <label htmlFor="description">Descripción</label>
                  <textarea className='text-black w-full px-2 py-1 rounded-sm' {...register("description")} name="description" id="description" cols="30" rows="5"></textarea>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="tel">Teléfono</label>
                  <input {...register("tel")} className='text-black px-2 py-1 rounded-sm' type="text" name="tel" id="tel" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="social">Red Social</label>
                  <input {...register("social")} className='text-black px-2 py-1 rounded-sm' type="text" name="social" id="social" />
                </div>
              </> : 
              ""
            }
            <div className=''>
              {
                !isLoading ? 
                <button className='w-full bg-[#457B9D] hover:bg-[#31587A] py-1 px-6 text-[1.2rem] rounded-md transition-colors'>Actualizar</button>
                :
                <button disabled className='bg-gray-500 w-full transition-colors text-[1.1rem] py-2 rounded-lg text-white'>Actualizando... Por favor espere</button>
              }
                
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
