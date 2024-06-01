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

    ) : <div className="flex-grow">
        <div className="text-center">
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={75} height={75}>
                <path
                    style={{lineHeight: "normal",WebkitTextIndent: "0",textIndent: "0",WebkitTextAlign: "start",textAlign: "start",WebkitTextDecorationLine: "none",textDecorationLine: "none",WebkitTextDecorationStyle: "solid",textDecorationStyle: "solid",WebkitTextDecorationColor: "#6b7280",textDecorationColor: "#6b7280",WebkitTextTransform: "none",textTransform: "none",blockProgression: "tb",isolation: "auto",mixBlendMode: "normal"}}
                    d="M19 3C13.489 3 9 7.489 9 13c0 2.397.851 4.597 2.264 6.322l-7.971 7.971 1.414 1.414 7.97-7.97A9.947 9.947 0 0019 23c5.511 0 10-4.489 10-10S24.511 3 19 3zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm-3 5a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm6 0a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm-3 4c-2.207 0-3.654 1.244-3.654 1.244a1 1 0 101.308 1.512S17.515 16 19 16s2.346.756 2.346.756a1 1 0 101.308-1.512S21.207 14 19 14z"
                    fill="#9ca3af"
                    fontFamily="sans-serif"
                    fontWeight="400"
                    overflow="visible"
                    ></path>
            </svg>
            <p className="text-gray-500 mt-4">The product you&#39;re looking for isn&#39;t yet available at HoomGroom.</p>
        </div>
    </div>;
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