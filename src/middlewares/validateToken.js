import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    console.log(token)
    console.log(req.cookies)
    if(!token) { 
        return res.status(401).json({
            message: "No token, autorización denegada"
        })
    }else {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if(err) {
                return res.status(403).json({
                    message: "Token inválido"
                })
            }
            req.user = user
            next()
        })
    }
}