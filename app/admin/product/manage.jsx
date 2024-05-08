import { useState, useEffect } from 'react';
import Link from 'next/link';

const ManageProduct = () => {
    // State to store products data
    const [products, setProducts] = useState([]);

    // Fetch products data from API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Fetch data from your API endpoint
            const response = await fetch('https://localhost:8080/admin/product/list');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            // Update state with fetched products
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <Link href="/create">
                <a className="bg-blue-500 text-white py-2 px-4 rounded inline-block mb-4">Create Product</a>
            </Link>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Original Price</th>
                        <th className="border border-gray-400 px-4 py-2">Discount Price</th>
                        <th className="border border-gray-400 px-4 py-2">Description</th>
                        <th className="border border-gray-400 px-4 py-2">Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border border-gray-400">
                            <td className="border border-gray-400 px-4 py-2">{product.productName}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.realPrice}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.discPrice}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.description}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;
