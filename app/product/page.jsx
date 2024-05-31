"use client"

import ProductList, { ProductListPlaceholder } from "../components/product-card"
import FilterBar from "../components/FilterBar"
import { getAllProducts, getFilteredProduct } from "../../libs/api-libs"
import { useEffect, useState } from "react"

const Page = () => {
    const [sortCategory, setSortCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState(null);

    async function fetchData() {
        const products = await getAllProducts();
        setAllProducts(products);
        setIsLoading(false);
    }

    async function handleSort() {
        setIsLoading(true);

        let newProducts = {};

        if (!sortOrder) {
            setSortOrder("asc")
        } 
        if (sortCategory) {
            newProducts = await getFilteredProduct(sortCategory, 12, sortOrder === "asc")
        }
        else {
            newProducts = await getAllProducts();
        }
        setAllProducts(newProducts);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="flex max-w-screen-2xl mx-auto m-8 gap-8 px-8">
            <FilterBar setSortCategory={setSortCategory} setSortOrder={setSortOrder} handleSort={handleSort} />
            <div className="flex-grow">
                {isLoading ? <ProductListPlaceholder /> : <ProductList api={allProducts}/>}
            </div>
        </div>
    )
}

export default Page