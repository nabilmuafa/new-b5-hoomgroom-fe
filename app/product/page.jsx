import ProductList from "../components/product-card"
import { getAllProducts, getFilteredProduct } from "../../libs/api-libs"
import FilterButton from "../components/filter-button"

const Page = async () => {

    const allProducts = await getAllProducts()

    return (
        <div className="gap-2 m-2">
            <ProductList api={allProducts}/>
            <h2>Test</h2>
        </div>
    )
}

export default Page