'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const UpdateProduct = () => {
    const { id } = useParams();
    const router = useRouter();

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

    useEffect(() => {
        fetchProduct();
    }, [id]);

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
      }

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/admin/product/update/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const product = await response.json();
            setProductName(product.productName);
            setProductRealPrice(product.realPrice);
            setProductDescription(product.description);
            setProductDiscPrice(product.discPrice);
            setProductSales(product.sales);
            setProductPicture(product.picture);
            setProductTag(product.tag.join(', '));
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

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
            const response = await fetch(`http://localhost:8080/admin/product/update/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
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
                throw new Error('Failed to update product');
            }
            router.push('/admin/product');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Update Product</h1>
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
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
