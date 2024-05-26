"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {

    const searchRef = useRef()
    const router = useRouter()
    const handleSearch = (event) => {
        event.preventDefault()
        const keyword = searchRef.current.value
        if (!keyword || keyword.trim() === "") return
        router.push(`/search/${keyword}`)
    }

    return (
        <div className="rounded-full py-2 px-4 w-full bg-slate-200 text-black">
            <form className="flex items-center" onSubmit={handleSearch}>
                <input 
                    placeholder="Cari produk..." 
                    className="bg-slate-200 outline-none"
                    ref={searchRef}>
                </input>
                <button className="pl-2 text-emerald-500" onClick={handleSearch}>
                    <MagnifyingGlass size={20} />
                </button>
            </form>
        </div>
    )
}

export default InputSearch