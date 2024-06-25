import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Logo from "../assets/logoLogin.png";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, errorsSignIn, setErrorsSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setErrorsSignIn([])
    if (isAuthenticated) {
      navigate("/ventas");
    }
  }, [isAuthenticated]);

  return (
    <main className="bg-[#01021C] h-screen grid">
      <div className="grid grid-cols-2 items-center justify-items-center">
        <div className="max-w-[36rem]">
          <img className="w-full" src={Logo} alt="" />
        </div>
        <div className="flex flex-col items-center gap-3 border border-[#A8DADC] p-4 rounded-md">
          <h1 className="text-white uppercase font-black text-[3rem]">Inicia sesión</h1>
          {
              errorsSignIn.length !== 0 ? <div className="bg-red-500 p-2 rounded-md text-[1.2rem]">{errorsSignIn[0]}</div> : ""
            }
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(async (values) => {
              await signIn(values);
            })}
          >
            <input
              className="bg-transparent border-b p-1 text-[1.5rem] text-white focus:outline-none"
              type="email"
              placeholder="Ingresa tu correo"
              {...register("email", { required: true })}
            />
            {errors.email && (
                  <p className="text-red-500">Ingrese un email</p>
                )}
            <input
              className="bg-transparent border-b p-1 text-[1.5rem] text-white focus:outline-none"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && (
                  <p className="text-red-500">Ingrese una contraseña</p>
                )}
            <button type="submit" className="bg-[#31587A] hover:bg-[#A8DADC] transition-colors text-[1.5rem] rounded-lg text-white hover:text-[#01021C]">Iniciar Sesión</button>
          </form>
          <Link to='/register' className="text-white underline underline-offset-1">¿No tienes cuenta? Crea una aquí</Link>
        </div>
      </div>
    </main>
  );
}
