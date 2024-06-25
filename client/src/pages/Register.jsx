import Logo from "../assets/logoLogin.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errorsSign} = useAuth();
  const navigate = useNavigate();
  const [sended, setSended] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }else {
      setSended(false)
    }
  }, [isAuthenticated]);

  return (
    <main className="bg-[#01021C] h-screen grid">
      <div className="grid grid-cols-2 items-center justify-items-center">
        <div className="max-w-[36rem]">
          <img className="w-full" src={Logo} alt="" />
        </div>
        <div className="flex p-4 border rounded-md mx-12">
          <div>
            {
              errorsSign.length !== 0 ? <div className="bg-red-500 p-2 rounded-md text-[1.2rem]">{errorsSign[0]}</div> : ""
            }
            <form
            className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(async (values) => {
                setSended(true)
                values.image = values.image[0];
                await signUp(values);
              })}
            >
              <div>
                <input
                className="bg-transparent border-b p-1 text-[1.5rem] text-white focus:outline-none"
                  placeholder="Ingresa tu nombre"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Ingrese un nombre</p>
                )}
              </div>
              <div>
                <input
                className="bg-transparent border-b p-1 text-[1.5rem] text-white focus:outline-none"
                  placeholder="Ingresa tu correo"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Ingrese un correo</p>
                )}
              </div>
              <div>
                <input
                  className="bg-transparent border-b p-1 text-[1.5rem] text-white focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500">Ingrese una contraseña</p>
                )}
              </div>
              <div>
                <label htmlFor="file" className="text-white text-[1.5rem]">Coloca tu foto de perfil</label>
                <input
                  className="bg-transparent text-white focus:outline-none"
                  id="file"
                  type="file"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <p className="text-red-500">Ingrese una imagen</p>
                )}
              </div>
              {
                !sended ?
                <button className="bg-[#31587A] hover:bg-[#A8DADC] transition-colors text-[1.5rem] rounded-lg text-white hover:text-[#01021C]">
                  Registrarse
                </button>
                :
                <button disabled className="bg-gray-500 transition-colors text-[1.5rem] rounded-lg text-white">
                  Registrando...
                </button>
              }
            </form>
          </div>
          <div className="text-white">
            <h2 className="font-black uppercase text-[2rem] text-center">registrar una cuenta</h2>
            <p className="text-[1.3rem]">
              Este es el momento en que como estudiante puedes obtener un acceso
              inicial en el que puedas entrar a nuestro sitio web para ver
              algunos de los productos y servicios que nos puede ofrecer nuestra
              comunidad universitaria y que ademas, tenga un facil acceso.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
