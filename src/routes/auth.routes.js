import { Router } from "express"
import { login, logout, register, verifyToken, verifyUser, updateUserInfo, getContacts } from "../controllers/auth.controller.js"
import { updateClient } from "../controllers/cliente.controller.js" 

import {validateSchema} from "../middlewares/validator.middleware.js"
import {loginSchema, registerSchema} from "../schemas/auth.schema.js"
import multer from "multer"
import { authRequired } from "../middlewares/validateToken.js"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})
const uploadImages = upload.fields([{name: "imageUser", maxCount: 1}, {name: "imageCredential", maxCount: 1}])

router.post('/register', upload.single('image'), validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.post('/verify-user', uploadImages, verifyUser)
router.post('/update-user-info', updateUserInfo)
router.get('/verify', verifyToken)

router.post('/cliente/actualizar', upload.single('image'), updateClient)

router.get("/contacts", getContacts)

export default router