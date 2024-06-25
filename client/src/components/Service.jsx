import React from "react";
import { Link } from "react-router-dom";


export default function Service({ data }) {
  return (
    <div className="text-white max-w-[22rem] border flex flex-col items-center p-6 rounded-xl">
      <p className="font-bold text-[2rem] mb-4 text-center">{data.name}</p>
      <div className="w-[20rem]">
        <img
          className="w-full h-auto aspect-square"
          src={data.image.link}
          alt=""
        />
      </div>
      <p className="my-4 text-[1.2rem]">Descripción: {data.description}.</p>
      <div className="flex gap-4 text-[1.2rem] w-full justify-center">
        <p>Precio: ${data.price} c/u</p>
      </div>
      <Link
        className="mt-8 text-[1.6rem] bg-[#31587A] hover:bg-[#457B9D] transition-colors w-full text-center rounded-lg py-2"
        to={`/servicios/${data._id}`}
      >
        Ver este servicio
      </Link>
    </div>
  );
}
