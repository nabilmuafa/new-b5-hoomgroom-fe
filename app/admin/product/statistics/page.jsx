'use client';

import { useContext, useState } from 'react';
import { AuthContext } from "../../../auth-provider";

const Top10Products = () => {
    const context = useContext(AuthContext);
    const token = context.token[0];
    const role = context.role[0]

    const [criteria, setCriteria] = useState('sales');
    const [order, setOrder] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`http://35.197.129.191/admin/product/filter?filterType=${criteria}&amount=10&fromLowest=${order}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch top 10 products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (role == 'ADMIN'){
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Top 10 Products</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <label htmlFor="criteria" className="block mb-2">Select Criteria:</label>
                    <select
                        id="criteria"
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    >
                        <option value="sales">Total Sales</option>
                        <option value="price">Price</option>
                    </select>
                    <label htmlFor="order" className="block mb-2">Select Order:</label>
                    <select
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    >
                        <option value="false">Descending</option>
                        <option value="true">Ascending</option>
                    </select>
                    <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded">Submit</button>
                </form>
                
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
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
                            {products.map((product) => (
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
                )}
            </div>
        );
    } else {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">This Page Is Only For Admins</h1>
            </div>
        );
    }
};

export default Top10Products;
