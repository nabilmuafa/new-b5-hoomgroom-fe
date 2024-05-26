'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from "../../auth-provider";

const ManagePromoCode = () => {
    const [promoCodes, setPromoCode] = useState([]);
    const context = useContext(AuthContext);
    const token = context.token[0];
    const role = context.role[0]

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const fetchPromoCodes = async () => {
        try {
            const response = await fetch('http://35.197.129.191/admin/promo-code/manage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
            const response = await fetch(`http://35.197.129.191/admin/promo-code/delete/${promoCodeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

    if (role == 'ADMIN'){
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Promo Codes List</h1>
                <Link href="/admin/promo-code/create">
                    <button className="bg-emerald-500 text-white py-2 px-4 rounded inline-block mb-4">Create Promo Code</button>
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
                                    <button className="bg-emerald-500 text-white py-1 px-3 rounded">Update</button>
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
    }
};

export default ManagePromoCode;
