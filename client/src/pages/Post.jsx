import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth.context.jsx'
import { useEffect } from 'react'

export default function Post() {
    const {
        register, handleSubmit, formState: { errors }, watch
    } = useForm()
    const { createProductService, errorsContent, setErrorsContent, setIsRegistered, isRegistered, isLoading, setIsLoading, user} = useAuth()
    useEffect(() => {
        setErrorsContent([])
        setIsRegistered(undefined)
        setIsLoading(false)
    }, [])
  return (
    <main className='bg-[#01021C] py-4'>
        <section className='text-white'>
            <h1 className='uppercase font-black text-center text-[1.4rem]'>publica tu producto/servicio</h1>
            <form action="post"
                className='flex flex-col gap-y-3 mt-5 px-8 py-6 border w-[400px] mx-auto'
                onSubmit={handleSubmit(async (values) => {
                    console.log(values)
                    values.image = values.image[0]
                    values.id = user.data._id
                    createProductService(values)
                })}
            >  
                {
                    errorsContent.map(error => <div className='bg-red-500 p-2 font-bold rounded-sm'>{error}</div>)
                }
                {
                    isRegistered !== undefined ? <div className='bg-green-500 p-2 font-bold rounded-sm'>{isRegistered}</div> : ""
                }
                <div className='flex flex-col'>
                    <h2 className='text-[1.2rem]'>Selecciona que quieres publicar</h2>              
                    <label htmlFor="register">
                        <input type="radio" value="product" {...register("register", {required: true}) } />
                        Producto
                    </label>
                    <label htmlFor="register">
                        <input className="text-black" type="radio" value="service" {...register("register", {required: true}) } />
                        Servicio
                    </label>
                    {
                        errors.register && (
                            <p className="text-red-500">Elija una opción válida</p>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="name">Nombre</label>
                    <input className="text-black rounded-sm p-1" type="text" name="name" id="name" {...register("name", {required: true})} />
                    {
                        errors.name && (
                            <p className="text-red-500">Escriba un nombre válido</p>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description">Descripción</label>
                    <textarea {...register("description", {required: true})} className='text-black p-1 rounded-sm' name="description" id="description" cols="30" rows="5"></textarea>
                    {
                        errors.description && (
                            <p className="text-red-500">Escriba una descripción básica</p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="image">Imagen de referencia</label>
                    <input type="file" name="image" id="image" {...register("image", {required: true})} />
                    {
                        errors.image && (
                            <p className="text-red-500">Elija una imágen válida</p>
                        )
                    }
                </div>
                {
                watch().register === "product" ? 
                <>
                    <div className='flex flex-col'>
                        <label htmlFor="price">Precio por pieza</label>
                        <input className="text-black p-1 rounded-sm" type="text" name="price" id="price" {...register("price", {required: true})} />
                        {
                        errors.price && (
                            <p className="text-red-500">Escriba un número válido</p>
                        )
                    }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="pieces">Total de pieza/s</label>
                        <input className="text-black p-1 rounded-sm" type="text" name="pieces" id="pieces" {...register("pieces", {required: true})} />
                        {
                        errors.pieces && (
                            <p className="text-red-500">Escriba un número válido</p>
                        )
                    }
                    </div>
                </>
                :
                <>
                    <div className='flex flex-col'>
                        <label htmlFor="price">Precio por hora</label>
                        <input className="text-black p-1 rounded-sm" type="text" name="price" id="price" {...register("price", {required: true})} />
                        {
                        errors.price && (
                            <p className="text-red-500">Escriba un número válido</p>
                        )
                    }
                    </div>
                </>
                }
                <div>
                    
                    {
                        !isLoading ? 
                        <button className='bg-[#457B9D] w-full text-center font-bold hover:bg-[#31587A] py-2 px-6 text-[1.4rem] rounded-md transition-colors' type="submit">Publicar</button>
                        : 
                        <button disabled className='bg-gray-500 w-full transition-colors text-[1.1rem] py-2 rounded-lg text-white'>Publicando... Por favor espere</button>
                    }
                </div>
            </form>
        </section>
    </main>
  )
}
