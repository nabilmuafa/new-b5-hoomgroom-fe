import ProductList from "../../../components/product-card"
import { getFilteredProduct } from "../../../../libs/api-libs"

const Page = async () => {

    const allProducts = await getFilteredProduct("price", 10, false)

    return (
        <div className="gap-2 m-2">
            <ProductList api={allProducts}/>
            <h2>Test</h2>
        </div>
    )
}

export default Page