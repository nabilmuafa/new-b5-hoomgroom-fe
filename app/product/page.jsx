"use client"

import ProductList, { ProductListPlaceholder } from "../components/product-card"
import FilterBar from "../components/FilterBar"
import { getAllProducts, getFilteredProduct } from "../../libs/api-libs"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

const Page = () => {
    const [sortCategory, setSortCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState(null);
    const searchParams = useSearchParams()
 
    const keyword = searchParams.get('search')

    async function handleSort() {
        setIsLoading(true);

        let newProducts = {};

        if (sortCategory) {
            newProducts = await getFilteredProduct(sortCategory, 12, sortOrder === "" || sortOrder === "asc")
        }
        else {
            newProducts = await getAllProducts();
        }
        setAllProducts(newProducts);
        setIsLoading(false);
    }

    async function clearSort() {
        setIsLoading(true);
        setSortCategory("");
        setSortOrder("");

        let products = {}

        if (!keyword) {
            products = await getAllProducts();
        }
        else {
            products = await getFilteredProduct("search", 10, true, `${keyword}`);
        }
        setAllProducts(products);
        setIsLoading(false);
    }

    useEffect(() => {
        async function fetchData() {
            let products = {}
            if (!keyword) {
                products = await getAllProducts();
            }
            else {
                products = await getFilteredProduct("search", 10, true, `${keyword}`);
            }
            setAllProducts(products);
            setIsLoading(false);
        }

        fetchData();
    }, [keyword])

    return (
        <Suspense>
            <div className="flex max-w-screen-2xl mx-auto m-8 gap-8 px-8">
                <FilterBar 
                    sortCategory={sortCategory}
                    setSortCategory={setSortCategory}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    handleSort={handleSort}
                    clearSort={clearSort}
                    />
                <div className="flex-grow">
                    {isLoading ? <ProductListPlaceholder /> : <ProductList api={allProducts}/>}
                </div>
            </div>
        </Suspense>
    )
}

export default Page