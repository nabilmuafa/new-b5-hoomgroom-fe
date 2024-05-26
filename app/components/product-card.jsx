'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ProductList = ({api}) => {

    const router = useRouter()

    const navigator = (type, sorting) => {
        event.preventDefault()
        router.push(`/product/${type}/${sorting}`, undefined, { shallow: true })
    }

    return (
        <div>
            <div className="flex">
                <h1>Filter by: </h1>
                <button onClick={(e) => {navigator("price", "asc")}}>Price (Asc)</button>
                <button onClick={(e) => {navigator("price", "desc")}}>Price (Desc)</button>
                <button onClick={(e) => {navigator("tag", "asc")}}>Tag (Asc)</button>
                <button onClick={(e) => {navigator("tag", "desc")}}>Tag (Desc)</button>
                <button onClick={(e) => {navigator("sales", "asc")}}>Sales (Asc)</button>
                <button onClick={(e) => {navigator("sales", "desc")}}>Sales (Desc)</button>
            </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 m-2">
            {api.map((product, index) => {
                return (
                    <Link href={`/product/${product.id}`} className="cursor-pointer text-color-primary hover:text-color-accent transition-all hover:scale-105" key={index}>
                        <Image src={ product.picture } alt="..." width={220} height={220} className="w-full max-h-64 object-cover"/>
                        <h2 className="font-bold text-2xl p-2">{ product.productName }</h2>
                        <p className="font-bold text-l p-2">{ product.description }</p>
                        <h5 className="font-bold text-l p-2">Normal price: { product.realPrice }</h5>
                        <h5 className="font-bold text-l text-red-500 p-2">Discount price: { product.discPrice }</h5>
                        <p className="font-bold text-l p-2">{ product.tag.join(', ') }</p>
                    </Link>
                )        
            })}
        </div>
        </div>

    )
}

export default ProductList