import app from "./config.js"
import {collection, getDocs, getFirestore} from "firebase/firestore/lite"

export const getDataFireBase = async db => {
    try{
        const dataCol = collection(getFirestore(app), db)
        const dataSnapshot = await getDocs(dataCol)
        const dataList = dataSnapshot.docs.map(doc => doc.data())
        return dataList
    }catch(error){
        throw error
    }
}