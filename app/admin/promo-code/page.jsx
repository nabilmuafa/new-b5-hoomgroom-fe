'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ManagePromoCode = () => {
    const [promoCodes, setPromoCode] = useState([]);

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const fetchPromoCodes = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/promo-code/manage');
            if (!response.ok) {
                throw new Error('Failed to fetch promo codes');
            }
            const data = await response.json();
            setPromoCode(data);
        } catch (error) {
            console.error('Error fetching promo codes:', error);
        }
    };

    const deletePromoCode = async (promoCodeId) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/promo-code/delete/${promoCodeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete promo code');
            }
            fetchPromoCodes();
        } catch (error) {
            console.error('Error deleting promo code:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Promo Codes List</h1>
            <Link href="/admin/promo-code/create">
                <button className="bg-blue-500 text-white py-2 px-4 rounded inline-block mb-4">Create Promo Code</button>
            </Link>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Valid Until</th>
                        <th className="border border-gray-400 px-4 py-2">Minimum Transaction</th>
                        <th className="border border-gray-400 px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {promoCodes.map(promoCode => (
                        <tr key={promoCode.codeId} className="border border-gray-400">
                            <td className="border border-gray-400 px-4 py-2">{promoCode.codeName}</td>
                            <td className="border border-gray-400 px-4 py-2">{promoCode.endDate}</td>
                            <td className="border border-gray-400 px-4 py-2">{promoCode.minimumPayment}</td>
                            <td className="border border-gray-400 px-4 py-2">{promoCode.description}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                    onClick={() => deletePromoCode(promoCode.codeId)}>
                                    Delete
                                </button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                            <Link href={`/admin/promo-code/update/${promoCode.codeId}`}>
                                <button className="bg-blue-500 text-white py-1 px-3 rounded">Update</button>
                            </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePromoCode;
