import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import Image from "../models/images.model.js"
import { createAccessToken } from "../libs/jwt.js"
import app from "../firebase/config.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../config.js"
import { iaVerify } from "../libs/ia.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body
    const regex = /^[a-z]+\.[a-z]+\d{4}@alumnos.udg.mx$/
    // storage Firebase
    const storage = getStorage(app)
    try{
        const user_found = await User.findOne({email})
        if (user_found) {
            return res.status(400).json({
                error: ["Email en uso"]
            })
        }

        if(!regex.test(email)) {
            regex.test(email)
            return res.status(400).json({
                error: ["Email no perteneciente a UdG"]
            })
        }

        const encrypted_password = await bcrypt.hash(password, 10)
        const new_user = new User({
            name,
            email,
            password: encrypted_password,
            verified: false,
        })
        // Save in mongoDB
        const user_saved = await new_user.save()
        // Save in firebase
        const storageRef = ref(storage, `users/${user_saved._id}`)
        await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype })
        const get_link = await getDownloadURL(storageRef)
        const new_image = new Image({link: get_link})
        const image_saved = await new_image.save()
        await User.findByIdAndUpdate(user_saved._id, {image: image_saved._id})
        const token = await createAccessToken({id: user_saved._id})
        res.cookie("token", token)
        res.json({
            data: await User.findOne({email}).populate("image")
        })
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user_found = await User.findOne({email})
        if (!user_found) {
            return res.status(400).json({
                error: ["Usuario no encontrado"]
            })
        }
        const is_match = await bcrypt.compare(password, user_found.password)
        if (!is_match) {
            return res.status(400).json({
                error: ["Contraseña incorrecta"]
            })
        }
        
        const token = await createAccessToken({id: user_found._id})
        res.cookie("token", token)
        res.json({
            data: await User.findOne({email}).populate("image")
        })
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200).json({message: "Log out"})
}

export const verifyUser = async (req, res) => {
    const storage = getStorage(app)
    const {tel, social, description, id} = req.body

    try {
        const imageUser = req.files["imageUser"][0]
        const imageCredential = req.files["imageCredential"][0]
        // img 1
        const storageRef1 = ref(storage, `users/validate/${id}_user`)
        await uploadBytes(storageRef1, imageUser.buffer, { contentType: imageUser.mimetype })
        const linkImg1 = await getDownloadURL(storageRef1)
        // img 2
        const storageRef2 = ref(storage, `users/validate/${id}_credential`)
        await uploadBytes(storageRef2, imageCredential.buffer, { contentType: imageCredential.mimetype })
        const linkImg2 = await getDownloadURL(storageRef2)

        const coincidence = await iaVerify(linkImg1, linkImg2)
        
        const result = coincidence.data.resultado
        if(result.includes("misma")) {
            await User.findByIdAndUpdate(id, {
                verified: true,
                description: description,
                tel: tel,
                social: social
            })
            return res.status(200).json({
                message: true
            })
        }else {
            return res.status(500).json({
                message: false
            })
        }
    }catch {
        return res.status(500).json({message: false})
    }
}

export const updateUserInfo = async (req, res) => {
    const {id} = req.body
    console.log(id)
    try {
        const userInfoUpdated = await User.findById(id).populate("image")
        console.log(userInfoUpdated)
        return res.status(200).json([userInfoUpdated])
    }catch(error) {
        return res.status(500).json(
            []
        )
    }
}

export const verifyToken = (req, res) => {
    const {token} =  req.cookies
    if(!token) return res.status(400).json({message: "No autorizado"})
    
    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"})

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: "No autorizado"})

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email
        })
    })
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await User.find({verified: true}).populate("image")
        console.log(req.cookies)
        res.status(200).json(contacts)
    }catch{
        res.statu(500).json("Error obteniendo los contactos")
    }
}