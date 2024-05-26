'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from "../../auth-provider";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const context = useContext(AuthContext);
    const token = context.token[0];
    const role = context.role[0]

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://35.197.129.191/admin/product/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://35.197.129.191/admin/product/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (role == 'ADMIN'){
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Product List</h1>
                <Link href="/admin/product/create">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded inline-block mb-4">Create Product</button>
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
                                <td className="border border-gray-400 px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded"
                                        onClick={() => deleteProduct(product.id)}>
                                        Delete
                                    </button>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                <Link href={`/admin/product/update/${product.id}`}>
                                    <button className="bg-blue-500 text-white py-1 px-3 rounded">Update</button>
                                </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">This Page Is Only For Admins</h1>
            </div>
        );
    };
};

export default ManageProduct;
