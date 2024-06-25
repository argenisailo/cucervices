import axios from "axios"

const instance = axios.create({
    baseURL: "https://modular-cucervices.onrender.com/api",
    withCredentials: true
})

export default instance