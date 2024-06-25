import { Link } from "react-router-dom";
import axios from "../api/axios.js"
import { useNavigate } from "react-router-dom"

export default function Service({ data }) {
  const navigation = useNavigate();
  const deleteD = async () => {
    await axios.post(`https://modular-cucervices.onrender.com/api/delete/${data._id}`)
  }

  const deleteProduct = async () => {
    try {
      deleteD()
      navigation("/")
    }catch(error) {
      console.log(error)
    }
  }
  return (
    <div className="text-white border flex flex-col items-center p-6 rounded-xl">
      <p className="font-bold text-[2rem] mb-4 text-center">{data.name}</p>
      <div className="w-[20rem]">
        <img
          className="w-full h-auto aspect-square"
          src={data.image.link}
          alt=""
        />
      </div>
      <p className="my-4 text-[1.2rem]">Descripción: {data.description}.</p>
      {
        data.pieces ? 
        <div className="flex gap-4 text-[1.2rem] w-full justify-center">
          <p>Precio: ${data.price} c/u</p>
          <p>Disponible: {data.pieces}</p>
        </div>
        :
        <div className="flex gap-4 text-[1.2rem] w-full justify-center">
          <p>Precio: ${data.price} por hora</p>
        </div>
      }
      <Link
        className="mt-8 text-[1.6rem] bg-[#31587A] hover:bg-[#457B9D] transition-colors w-full text-center rounded-lg py-2"
        to={`/publicados/${data._id}`}
      >
        Editar
      </Link>
      <button className="mt-8 text-[1.6rem] bg-red-500 hover:bg-red-800 transition-colors w-full text-center rounded-lg py-2"
        onClick={deleteProduct}
      >
        Eliminar
      </button>
    </div>
  );
}