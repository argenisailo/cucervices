import axios from "../api/axios.js"
import { useEffect, useState } from "react"
import Product from "../components/Product.jsx"
import { useAuth } from "../context/auth.context.jsx"
import { useNavigate } from "react-router-dom"

export default function Ventas() {
  const [isProduct, setIsProduct] = useState(undefined)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated)
  const navigation = useNavigate();

  useEffect(() => {
    async function handleData() {
      const productsData = await axios.get("https://modular-cucervices.onrender.com/api/home-ventas")
      if(productsData.data.length > 0) {
        setProducts(productsData.data)
        setIsProduct(true)
      }else {
        setIsProduct(false)
      }
    }
    
    if(isAuthenticated) {
      handleData()
    } else {
      navigation("/")
    }

  }, [])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="bg-[#01021C]">
      <div className="px-10 pt-10">
        <input className=" focus:outline-none bg-transparent border-b p-1 text-[1.5rem] text-white" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Busca el producto..." />
      </div>
      <div className="grid grid-cols-3 p-10 justify-items-center gap-7">
        {
          isProduct !== false ? filteredProducts.map((product, index) => <Product data={product} key={index}/>) : ""
        }
      </div>
    </main>
  )
}
