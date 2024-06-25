import axios from "axios"

export const iaVerify = (img1, img2) => axios.get(`https://docker-ia-fftenhmqca-uc.a.run.app/procesar?url1=${img1}&url2=${img2}`)