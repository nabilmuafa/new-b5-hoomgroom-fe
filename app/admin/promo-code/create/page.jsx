'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePromoCode = () => {
    const [promoCodeName, setPromoCodeName] = useState('');
    const [promoCodeEndDate, setPromoCodeEndDate] = useState('');
    const [promoCodeDescription, setPromoCodeDescription] = useState('');
    const [promoCodeMinimumPayment, setPromoCodeMinimumPayment] = useState(0);

    const [minimumPaymentError, setMinimumPaymentError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMinimumPaymentError('');
        setErrorMessage('');

        let isValid = true;
        if (promoCodeMinimumPayment < 0){
            isValid = false;
            setMinimumPaymentError('Minimum payment of a promo code cannot be negative');
        }

        if (!isValid) return;

        try {
            const response = await fetch('http://localhost:8080/admin/promo-code/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codeName: promoCodeName,
                    description: promoCodeDescription,
                    endDate: promoCodeEndDate,
                    minimumPayment: promoCodeMinimumPayment
                }),
            });
            if (!response.ok) {
                response.text().then((result) => {
                    setErrorMessage(result)
                });
                return;
            }
            router.push('/admin/promo-code');
        } catch (error) {
            console.error('Error creating promo code:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Create New Promo Code</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="promoCodeName" className="block mb-1">Promo Code Name</label>
                    <input
                        type="text"
                        id="promoCodeName"
                        value={promoCodeName}
                        onChange={(e) => setPromoCodeName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="promoCodeEndDate" className="block mb-1">Promo Code Valid Until</label>
                    <input
                        type="date"
                        id="promoCodeEndDate"
                        value={promoCodeEndDate}
                        onChange={(e) => setPromoCodeEndDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="promoCodeMinimumPayment" className="block mb-1">Minimum Transaction To Use Promo Code</label>
                    <input
                        type="number"
                        id="promoCodeMinimumPayment"
                        value={promoCodeMinimumPayment}
                        onChange={(e) => setPromoCodeMinimumPayment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                    {minimumPaymentError && <p className="text-red-500 text-sm mt-1">{minimumPaymentError}</p>}
                </div>
                <div>
                    <label htmlFor="promoCodeDescription" className="block mb-1">Promo Code Description</label>
                    <textarea
                        id="promoCodeDescription"
                        value={promoCodeDescription}
                        onChange={(e) => setPromoCodeDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                        required
                    ></textarea>
                </div>
                <div>
                {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePromoCode;
