import axios from "axios"

const instaceBase = axios.create({
    baseURL: "",
    withCredentials: false
})

export default instaceBase