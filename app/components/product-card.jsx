import Image from "next/image"
import Link from "next/link"

const ProductList = ({api}) => {

    return (
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

    )
}

export default ProductList