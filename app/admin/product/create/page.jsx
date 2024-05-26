'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../../auth-provider";

const CreateProduct = () => {
    const context = useContext(AuthContext);
    const token = context.token[0];
    const role = context.role[0]

    const [productName, setProductName] = useState('');
    const [productRealPrice, setProductRealPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productTag, setProductTag] = useState('');
    const [productDiscPrice, setProductDiscPrice] = useState(0);
    const [productSales, setProductSales] = useState(0);
    const [productPicture, setProductPicture] = useState('');

    const [realPriceError, setRealPriceError] = useState('');
    const [discPriceError, setDiscPriceError] = useState('');
    const [salesError, setSalesError] = useState('');
    const [pictureURLError, setpictureURLError] = useState('');

    const router = useRouter();

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setRealPriceError('');
        setDiscPriceError('');
        setSalesError('');
        setpictureURLError('');

        let isValid = true;
        if (productDiscPrice > productRealPrice) {
            setDiscPriceError('Discounted price cannot be higher than original price');
            isValid = false;
        }
        if (productRealPrice < 0) {
            setRealPriceError('Original price cannot be negative');
            isValid = false;
        }
        if (productDiscPrice < 0) {
            setDiscPriceError('Discounted price cannot be negative');
            isValid = false;
        }
        if (productSales < 0) {
            setSalesError('Total sales cannot be negative');
            isValid = false;
        }
        if (!isValidUrl(productPicture)){
            setpictureURLError('Must be a valid URL');
            isValid = false;
        }

        if (!isValid) return;

        try {
            const response = await fetch('https://api.b5-hoomgroom.com/admin/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productName: productName,
                    realPrice: productRealPrice,
                    description: productDescription,
                    discPrice: productDiscPrice,
                    tag: productTag.split(',').map(tag => tag.trim()),
                    picture: productPicture,
                    sales: productSales
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            router.push('/admin/product');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    if (role == 'ADMIN'){
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
                        {realPriceError && <p className="text-red-500 text-sm mt-1">{realPriceError}</p>}
                    </div>
                    <div>
                        <label htmlFor="productPicture" className="block mb-1">Product Picture URL</label>
                        <input
                            type="text"
                            id="productPicture"
                            value={productPicture}
                            onChange={(e) => setProductPicture(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                        {pictureURLError && <p className="text-red-500 text-sm mt-1">{pictureURLError}</p>}
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
                        {discPriceError && <p className="text-red-500 text-sm mt-1">{discPriceError}</p>}
                    </div>
                    <div>
                        <label htmlFor="productSales" className="block mb-1">Product Total Sales</label>
                        <input
                            type="number"
                            id="productSales"
                            value={productSales}
                            onChange={(e) => setProductSales(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        {salesError && <p className="text-red-500 text-sm mt-1">{salesError}</p>}
                    </div>
                    <div>
                        <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded">Create</button>
                    </div>
                </form>
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

export default CreateProduct;
