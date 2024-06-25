import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { registerProductService, getClient, updateClient, productsPosted, productsPostedIndividual, productsPostedIndividualUpdate, deletePosted } from "../controllers/cliente.controller.js"
import multer from "multer"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/cliente/crear', upload.single('image'), registerProductService)
router.get('/cliente', getClient)
router.post("/cliente/products", productsPosted)
router.get("/cliente/products/:id", productsPostedIndividual)
router.post("/cliente/products/update", upload.single('image'), productsPostedIndividualUpdate)
router.post("/delete/:id", deletePosted)

export default router