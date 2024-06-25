import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import {getProducts, getProduct, getServices, getService} from "../controllers/home.controller.js"

const router = Router()
router.get('/home-ventas', getProducts)
router.get('/home-ventas/producto/:id', getProduct)
router.get("/home-ser", getServices)
router.get("/home-ser/servicios/:id", getService)


export default router