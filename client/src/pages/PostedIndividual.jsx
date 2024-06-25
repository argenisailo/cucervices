import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "../api/axios"
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth.context'

export default function PostedIndividual() {
    const params = useParams()
    const { register, formState: { errors }, handleSubmit, setValue } = useForm()
    const { updateProductService, isUpdated, setIsUpdated, setErrorsUpdated, errorsUpdated } = useAuth()
    const [pieces, setPieces] = useState("")
    const [imageId, setImageId] = useState(undefined)

    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(`https://modular-cucervices.onrender.com/api/cliente/products/${params.id}`)
            console.log(data)
            setPieces(data.data.pieces)
            setValue("name", data.data.name)
            setValue("description", data.data.description)
            setValue("price", data.data.price)
            setValue("pieces", data.data.pieces)
            setImageId(data.data.image)
        }
        getData()
        setIsUpdated(undefined)
    }, [])

    return (
        <main className='bg-[#01021C] text-white'>
            <section className='py-[110px]'>
                <form method="post" className='max-w-fit mx-auto border p-6 rounded-md flex flex-col gap-y-3' onSubmit={handleSubmit(values => {
                    values.id = params.id
                    if (values.image.length > 0) {
                        values.image = values.image[0]
                        values.imageId = imageId
                    }
                    console.log(values)
                    updateProductService(values)
                })}>
                    <h1 className='uppercase font-black text-[1.7rem] text-center'>Edita la información</h1>
                    {
                        isUpdated !== undefined ? <div className='w-full bg-green-500 p-3 rounded-md'>{isUpdated}</div> : ""
                    }
                    {
                        errorsUpdated !== undefined ? <div className='w-full bg-red-500 p-3 rounded-md'>{errorsUpdated}</div> : ""
                    }
                    <div className='flex flex-col'>
                        <label htmlFor="name">Nombre</label>
                        <input className='text-black p-1' type="text" {...register("name", { required: true })} />
                        {
                            errors.name && (
                                <p className="text-red-500">Ingrese un email</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="description">Descripción</label>
                        <textarea className='text-black p-1' {...register("description", { required: true })} name="description" cols="30" rows="5"></textarea>
                        {
                            errors.description && (
                                <p className="text-red-500">Ingrese una descripción</p>
                            )
                        }
                    </div>
                    {
                        pieces !== undefined ?
                            <div className='flex flex-col'>
                                <label htmlFor="pieces">Disponibles</label>
                                <input className='text-black p-1' type="text" name="pieces" id="pieces" {...register("pieces", { required: true })} />
                                
                            </div>
                            : ""
                    }
                    <div className='flex flex-col'>
                        <label htmlFor="price">Precio</label>
                        <input className='text-black p-1' type="text" name="price" id="price" {...register("price", { required: true })} />
                        {
                            errors.price && (
                                <p className="text-red-500">Ingrese un número válido</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="image">Imagen</label>
                        <input type="file" name="image" {...register("image")} />
                    </div>
                    <div>
                        <button className='w-full bg-[#457B9D] hover:bg-[#31587A] py-1 px-6 text-[1.2rem] rounded-md transition-colors'>Actualizar</button>
                    </div>
                </form>
            </section>
        </main>
    )
}
