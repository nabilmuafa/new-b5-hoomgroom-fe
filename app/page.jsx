import ProductList from "./components/product-card"
import { getAllProducts } from "../libs/api-libs"

const Page = async () => {

    const allProducts = await getAllProducts()

    return (
        <div className="gap-2 m-2 max-w-screen-2xl mx-auto">
            <ProductList api={allProducts}/>
        </div>
    )
}

export default Page