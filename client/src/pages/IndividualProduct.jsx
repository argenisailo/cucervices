import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { useParams } from "react-router-dom";
import UnknownUser from "../assets/unknown.jpg"

export default function IndividualProduct() {
  const params = useParams();
  const [product, setProduct] = useState({
    name: "",
    image: { link: "" },
    price: "",
    description: "",
    pieces: "",
    user: {
        name: "",
        email: "",
        image: {
          link: UnknownUser
        },
        social: "",
        tel: ""
    }
  });
  useEffect(() => {
    async function getProduct() {
      const productData = await axios.get(
        `https://modular-cucervices.onrender.com/api/home-ventas/producto/${params.id}`
      );
      setProduct(productData.data);
      console.log(productData.data)
    }
    getProduct();
  }, []);

  return (
    <main className="bg-[#01021C] h-screen">
      <div className="text-white grid grid-cols-2 justify-items-center items-center py-12">
        <div className="max-w-[450px] flex flex-col border rounded-md items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Producto</h2>
          <div className="flex flex-col items-center">
            <p className="text-center text-[0.7rem]">{product._id}</p>
            <div className="w-[20rem]">
              <img className="w-full" src={product.image.link} alt="" />
            </div>
            <div className="flex flex-col gap-2 text-[1.5rem]">
              <p>Nombre: {product.name}</p>
              <p>Descripción: {product.description}.</p>
              <p>Precio: ${product.price}</p>
              <p>Disponible: {product.pieces}</p>
            </div>
          </div>
        </div>
        <div className="border rounded-md flex flex-col items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Contacto</h2>
          <div className="w-[20rem]">
            <img className="w-full h-auto aspect-square rounded-full" src={product.user.image.link} alt="" />
          </div>
          <div className="text-[1.5rem]">
            <p>Nombre: {product.user.name}</p>
            <p>Email: {product.user.email}</p>
          </div>
          <div className="text-[1.5rem] flex flex-col w-full">
            <p>Tel: +52 {product.user.tel}</p>
            {
              product.user.social !== "" ? <a target="_blank" className="text-center underline" href={product.user.social}>Click para ir a Red social</a> : ""
            }
          </div>
        </div>
      </div>
    </main>
  );
}
