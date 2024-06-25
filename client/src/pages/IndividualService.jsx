import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { useParams } from "react-router-dom";
import UnknownUser from "../assets/unknown.jpg"

export default function IndividualService() {
  const params = useParams();
  const [service, setService] = useState({
    name: "",
    image: { link: "" },
    price: "",
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
    async function getService() {
      const serviceData = await axios.get(
        `https://modular-cucervices.onrender.com/api/home-ser/servicios/${params.id}`
      );
      console.log(serviceData.data);
      setService(serviceData.data);
    }
    getService();
  }, []);

  return (
    <main className="bg-[#01021C] h-screen">
      <div className="text-white grid grid-cols-2 justify-items-center items-center pt-12">
        <div className="max-w-[450px] flex flex-col border rounded-md items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Servicio</h2>
          <div className="flex flex-col items-center">
            <p className="text-center text-[0.7rem]">{service._id}</p>
            <div className="w-[20rem]">
              <img className="w-full" src={service.image.link} alt="" />
            </div>
            <div className="flex flex-col gap-2 text-[1.5rem]">
              <p>Nombre: {service.name}</p>
              <p>Descripción: {service.description}</p>
              <p>Precio: ${service.price} por hora</p>
            </div>
          </div>
        </div>
        <div className="border rounded-md flex flex-col items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem] text-center">Contacto</h2>
          <div className="w-[20rem]">
            <img className="w-full h-auto aspect-square rounded-full" src={service.user.image.link} alt="" />
          </div>
          <div className="text-[1.5rem]">
            <p>Nombre: {service.user.name}</p>
            <p>Email: {service.user.email}</p>
          </div>
          <div className="text-[1.5rem] flex flex-col w-full">
            <p>Tel: +52 {service.user.tel}</p>
            {
              service.user.social !== "" ? <a target="_blank" className="text-center underline" href={service.user.social}>Click para ir a Red social</a> : ""
            }
          </div>
        </div>
      </div>
    </main>
  );
}
