import Image from "next/image"
import { getDetailProduct } from "../../../libs/api-libs"


const Page = async ({ params }) => {

    const { id } = params

    const productData = await getDetailProduct(id)



    return (
        <>
            <a href="/product" className="block mb-4 text-blue-500 hover:text-blue-700 text-center mt-2">Back</a>
            <div className="flex flex-col justify-center items-center h-screen">
                <Image height={200} width={200} alt="Product picture" src={ productData.picture }/>
                <h1>{ productData.productName }</h1>
                <p className="font-bold text-l p-2">{ productData.description }</p>
                <h5 className="font-bold text-l p-2">Normal price: { productData.realPrice }</h5>
                <h5 className="font-bold text-l text-red-500 p-2">Discount price: { productData.discPrice }</h5>
                <p className="font-bold text-l p-2">{ productData.tag.join(', ') }</p>
            </div>
        </>
    )

}

export default Page