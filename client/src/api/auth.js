import axios from "./axios.js"
export const login = user => axios.post(`/login`, user)

export const registerUser = user => axios.post(`/register`, user, {headers: {'content-type': 'multipart/form-data'}})

export const logOut = () => axios.post('/logout')

export const verifyUser = async dataUser => await axios.post("/verify-user", dataUser, {headers: {'content-type': 'multipart/form-data'}})

export const updateUserInfo = id => axios.post("/update-user-info", id)

export const updateUser = user => axios.post('/cliente/actualizar', user, {headers: {'content-type': 'multipart/form-data'}})

export const verifyTokenRequest = () => axios.get('/verify')

// Product
export const uploadContent = data => axios.post('/cliente/crear', data, {headers: {'content-type': 'multipart/form-data'}})

export const updateContent = data => axios.post(`/cliente/products/update`, data, {headers: {'content-type': 'multipart/form-data'}})
