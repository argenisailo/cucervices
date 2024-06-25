import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, login, verifyTokenRequest, logOut, verifyUser, updateUserInfo, updateUser, uploadContent, updateContent } from "../api/auth.js"
import Cookies from "js-cookie"

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Contexto erroneo")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorsSign, setErrorsSign] = useState([])
    const [errorsSignIn, setErrorsSignIn] = useState([])
    const [verification, setVerification] = useState(undefined)
    const [errorsContent, setErrorsContent] = useState([])
    const [isRegistered, setIsRegistered] = useState(undefined)
    const [isUpdated, setIsUpdated] = useState(undefined)
    const [errorsUpdate, setErrorsUpdated] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const signUp = async (user) => {
        try {
            const res = await registerUser(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            setErrorsSign(await error.response.data.error)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await login(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            setErrorsSignIn(error.response.data.error)
        }
    }

    const logOutUser = async () => {
        try {
            const res = await logOut()
            if (res) setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.log("Error login out")
        }
    }

    const verify = async (data) => {
        setIsLoading(true)
        try {
            const res = await verifyUser(data)
            setIsLoading(false)
            if (res.data.message) {
                setVerification(true)
                const newInfo = await updateUserInfo({ id: user.data._id })
                setUser({ data: newInfo.data[0] })
            } else {
                setVerification(false)
            }
        } catch (error) {
            setIsLoading(false)
            setVerification(false)
        }
    }

    const UpdateDataUser = async userData => {
        setIsLoading(true)
        try {
            const userUpdated = await updateUser(userData)
            console.log(user.data)
            const newInfo = await updateUserInfo({ id: user.data._id })
            setIsLoading(false)
            setUser({ data: newInfo.data[0] })
            setIsUpdated(userUpdated.data.message)
            console.log(userUpdated)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const createProductService = async data => {
        setIsLoading(true)
        try {
            const response = await uploadContent(data)
            setIsLoading(false)
            setIsRegistered(response.data.message)
        } catch (error) {
            setIsLoading(false)
            setErrorsContent(error.response.data)
        }
    }

    const updateProductService = async data => {
        setIsLoading(false)
        try {
            const response = await updateContent(data)
            setIsLoading(false)
            setIsUpdated(response.data)
        } catch (error) {
            setIsLoading(false)
            setErrorsUpdated(error.response)
        }
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (cookies.token) {
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data) setIsAuthenticated(false)

                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            setErrorsSignIn,
            logOutUser,
            user,
            isAuthenticated,
            errorsSign,
            errorsSignIn,
            verify,
            verification,
            UpdateDataUser,
            createProductService,
            errorsContent,
            setErrorsContent,
            setIsRegistered,
            isRegistered,
            updateProductService,
            isUpdated,
            setIsUpdated,
            errorsUpdate,
            setErrorsUpdated,
            isLoading,
            setIsLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}