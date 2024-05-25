import { getAllProducts } from "@/libs/api-libs"
import ProductList from "../components/product-card"

const Page = async () => {

    const allProducts = await getAllProducts()

    return (
        <div>
            <h1>Test</h1>
            <ProductList api={allProducts}/>
            <h2>Test</h2>
        </div>
    )
}

export default Page