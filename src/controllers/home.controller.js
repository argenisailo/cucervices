import Product from "../models/product.model.js"
import Service from "../models/service.model.js"

export const getProducts = async (req, res) => {
  const products = await Product.find().populate('image')
  res.json(products)
}

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("image").populate("user").populate({
      path: "user",
      populate: "image"
    })
    if(!product) {
      res.status(404).json({ message: "Producto no encontrado" })
    }else {
      res.status(200).json(product)
    }
  }catch(error){
    res.status(404).json({ message: "Producto no encontrado" })
  }
}

export const getServices = async (req, res) => {
  const services = await Service.find().populate('image')
  res.json(services)
}

export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('image').populate('user').populate({
      path: "user",
      populate: "image"
    })
    res.status(200).json(service)
  }catch(error){
    res.status(404).json({ message: "Servicio no encontrado" })
  }
}


