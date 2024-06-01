'use client'
import Image from "next/image"
import Link from "next/link"

const ProductList = ({api}) => {
    return api.length !== 0 ? (
        <div className="flex-shrink">
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {api.map((product, index) => {
                    let price = "Rp" + new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 0,
                    }).format(product.realPrice)
                    let discountPrice = "Rp" + new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 0,
                    }).format(product.discPrice)

                    return (
                        <Link href={`/product/${product.id}`} className="cursor-pointer text-color-primary hover:text-color-accent transition-all border rounded-md" key={index}>
                            <Image src={ product.picture.startsWith("http://") || product.picture.startsWith("https://") ? product.picture : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png" } alt="..." width={150} height={200} className="w-full max-h-48 object-cover rounded-t-md"/>
                            <div className="py-2 px-3">
                                <h2 className="line-clamp-2 text-sm">
                                { product.productName }
                                </h2>
                            </div>
                            <h5 className="px-3 font-bold text-red-500 text-ellipsis overflow-hidden">{ discountPrice }</h5>
                            <h5 className="px-3 font-medium text-gray-400 text-sm line-through">{ price }</h5>
                            <p className="p-3 text-xs pt-8"><span className="font-medium">Tags: </span>{ product.tag.join(', ') }</p>
                        </Link>
                    )        
                })}
            </div>
        </div>

    ) : <div>kosong</div>;
}

export function ProductListPlaceholder() {
    return (
    <div className="flex-shrink">
            <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-3">
                {Array.from({ length: 18 }).map((_, index) => {
                    return (
                        <div className="text-color-primary hover:text-color-accent transition-all border rounded-md w-full animate-pulse" key={index}>
                            <div className="w-full max-h-48 object-cover rounded-t-md bg-slate-300 h-[200px]"></div>
                            <div className="py-2 px-3">
                                <div className="line-clamp-2 text-sm bg-slate-300 w-32 h-4 rounded-full"></div>
                            </div>
                            <div className="mx-3 bg-slate-300 w-28 h-4 rounded-full"></div>
                            <div className="mx-3 bg-slate-300 w-20 h-4 rounded-full my-1"></div>
                            <div className="m-4 mt-8 bg-slate-300 w-28 h-2 rounded-full"></div>
                        </div>
                    )        
                })}
            </div>
        </div>
    )
}

export default ProductList