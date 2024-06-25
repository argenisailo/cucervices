import {z} from "zod"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const registerSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email inválido"
    }),
    name: z.string({
        required_error: "Nombre es requerido"
    }),
    password: z.string({
       required_error: "Contraseña es requerida" 
    }).min(6, {
        message: "El password debe contener minimo 6 carácteres"
    }),
    image: z.any({
        required_error: "Imagen es requerida"
    }).refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
    "El archivo debe ser una imagen")
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email inválido"
    }),
    password: z.string({
        required_error: "Contraseña es requerida"
    }).min(6, {
        message: "Contraseña debe de tener mínimo 6 carácteres"
    })
})