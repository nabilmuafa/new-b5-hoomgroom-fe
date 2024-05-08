// pages/create.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productRealPrice, setProductRealPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productTag, setProductTag] = useState('');
    const [productDiscPrice, setProductDiscPrice] = useState(0);
    const [productSales, setProductSales] = useState(0);
    const [productPicture, setProductPicture] = useState('');

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can add form validation logic here if needed
        try {
            // Send the form data to your API endpoint to create the product
            const response = await fetch('https://localhost:8080/admin/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: productName,
                    realPrice: productRealPrice,
                    description: productDescription,
                    discPrice: productDiscPrice,
                    tags: productTag.split(',').map(tag => tag.trim()),
                    picture: productPicture,
                    sales: productSales
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            // Redirect to the product list page after successful creation
            router.push('/manage');
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error states or display error message to the user
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Create New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block mb-1">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productRealPrice" className="block mb-1">Product Original Price</label>
                    <input
                        type="number"
                        id="productRealPrice"
                        value={productRealPrice}
                        onChange={(e) => setProductRealPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productPicture" className="block mb-1">Product Picture URL</label>
                    <input
                        type="text"
                        id="productPicture"
                        value={productPicture}
                        onChange={(e) => setProductPicture(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productTag" className="block mb-1">Product Tags (comma-separated)</label>
                    <input
                        type="text"
                        id="productTag"
                        value={productTag}
                        onChange={(e) => setProductTag(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productDescription" className="block mb-1">Product Description</label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="productDiscPrice" className="block mb-1">Product Discounted Price</label>
                    <input
                        type="number"
                        id="productDiscPrice"
                        value={productDiscPrice}
                        onChange={(e) => setProductDiscPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="productSales" className="block mb-1">Product Total Sales</label>
                    <input
                        type="number"
                        id="productSales"
                        value={productSales}
                        onChange={(e) => setProductSales(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                    />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
