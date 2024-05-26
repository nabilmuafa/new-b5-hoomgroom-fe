'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { username } = useParams();
  const [promoCodeUsed, setPromoCodeUsed] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cart/get/${username}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart! status: ${response.status}`)
      }
      
      const data = await response.json();
      setItems(data.items);
      setTotalPrice(data.totalPrice)
      setWallet(data.wallet)
      console.log('Cart fetched succesfully:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchCart();
  }, [username]);

  const handleBuy = async (e) => {
    e.preventDefault();

    if (totalPrice > wallet) {
      setErrorMessage('Insufficient wallet balance.')
    }

    const payload = {
        username,
        promoCodeUsed,
        deliveryMethod
    }

    try {
        const response = await fetch('http://localhost:8080/transaction/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to create transaction! status: ${response.status}`)
        }

        const data = await response.json();
        console.log('Transaction created successfully:', data)
        router.push('/')
    } catch (error) {
        console.error('Error:', error)
    }
  }

  const removeItem = async (productId) => {
    const payload = {
      username,
      productId
    }

    try {
      const response = await fetch('http://localhost:8080/cart/delete-items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete items! status: ${response.status}`);
      }

      fetchCart();
    } catch (error) {
      console.error('Error:', error)
    }
  };

  const handleTopUpClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = async (amount) => {
    const payload = {
      username,
      amount: parseInt(amount, 10)
    }

    try {
      const response = await fetch('http://localhost:8080/cart/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to top up wallet! status: ${response.status}`);
      }
      
      setIsModalOpen(false);
      fetchCart();
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cart</h2>
        <div className="mb-6">
          {items.length != 0 ? (items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))) : <h2 className="text-l font-medium mb-6 text-center text-gray-600">Cart is empty</h2>}
        </div>
        <CartSummary
        totalPrice={totalPrice}
        promoCodeUsed={promoCodeUsed}
        setPromoCodeUsed={setPromoCodeUsed}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        wallet={wallet}
        errorMessage={errorMessage}
        handleBuy={handleBuy}
        onTopUpClick={handleTopUpClick}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex justify-between items-center mb-4 p-4 border rounded">
      <div>
        <p className="font-bold">{item.name}</p>
        <p>Price: Rp{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button onClick={() => onRemove(item.productId)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
    </div>
  );
};

const CartSummary = ({ totalPrice, promoCodeUsed, setPromoCodeUsed, deliveryMethod, setDeliveryMethod, wallet, errorMessage, handleBuy, onTopUpClick }) => {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <span>Total price:</span>
        <span className="font-bold">Rp{totalPrice}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span>Wallet balance:</span>
        <span className="font-bold">Rp{wallet}</span>
      </div>

      {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}

      <div className="text-center mb-4">
        <button onClick={onTopUpClick} className="bg-gray-500 text-white px-4 py-2 rounded">Top Up</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span>Promo code:</span>
        <select
          className="bg-gray-200 text-black px-4 py-2 rounded"
          value={promoCodeUsed}
          onChange={(e) => setPromoCodeUsed(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="PROMO10">PROMO10</option>
          <option value="PROMO20">PROMO20</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span>Delivery Method:</span>
        <select
          className="bg-gray-200 text-black px-4 py-2 rounded"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="MOTOR">MOTOR</option>
          <option value="TRUK">TRUK</option>
          <option value="TRUK">PESAWAT</option>
        </select>
      </div>

      <div className="text-center">
        <button onClick={handleBuy} className="bg-emerald-500 text-white px-4 py-2 rounded">Buy</button>
      </div>
    </div>
  );
};


const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [topUpAmount, setTopUpAmount] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-72">
        <h2 className="text-2xl font-bold mb-4">Top Up</h2>
        <div className="mb-4">
          <label className="block mb-2">Select amount:</label>
          <select
            className="bg-gray-200 text-black px-4 py-2 rounded w-full"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
          >
            <option value="">Choose</option>
            <option value="10000">Rp10000</option>
            <option value="25000">Rp25000</option>
            <option value="50000">Rp50000</option>
            <option value="100000">Rp100000</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
          <button
            onClick={() => onConfirm(topUpAmount)}
            className="bg-emerald-500 text-white px-4 py-2 rounded"
            disabled={!topUpAmount}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page