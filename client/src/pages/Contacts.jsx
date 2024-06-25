import React, { useEffect, useState } from 'react'
import axios from "../api/axios.js"

export default function Contacts() {
    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        const useGetContacts = async () => {
            const contacts = await axios.get("https://modular-cucervices.onrender.com/api/contacts")
            setContacts(contacts.data)
        }
        useGetContacts()
    }, [])

    const handleSearchChange = event => {
        setSearchTerm(event.target.value)
    }

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <main className='bg-[#01021C] text-white'>
            <section>
                <div className="px-10 pt-10">
                    <input className=" focus:outline-none bg-transparent border-b p-1 text-[1.5rem] text-white" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Busca el contacto..." />
                </div>
                <div className='grid grid-cols-5 p-12 gap-5'>
                    {
                        contacts.length > 0 ?
                            filteredContacts.map((contact, index) => (
                                <div key={index} className='border flex flex-col p-4 rounded-md items-center'>
                                    <p className='text-center'>{contact.name}</p>
                                    <div className='w-[200px] my-4 rounded-md overflow-hidden'>
                                        <img className='w-full aspect-square' src={contact.image.link} alt="Imagen del usuario" />
                                    </div>
                                    {
                                        contact.social !== "" ? <a className='underline' target='_blank' href={contact.social}>Red Social</a> : ""
                                    }
                                    <p>Tel: +52 {contact.tel}</p>
                                    <p>{contact.email}</p>
                                </div>
                            ))
                            : ""
                    }
                </div>
            </section>
        </main>
    )
}
