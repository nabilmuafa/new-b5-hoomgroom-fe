'use client';
import { useEffect, useState } from "react";
import { useContext } from "react";

const Page = () => {
  const context = useContext(AuthContext);
  const token = context.token[0];
  const username = context.username[0];
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/transaction/get/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions! status: ${response.status}`)
      }
      
      const data = await response.json();
      setTransactions(data);
      console.log('Transactions fetched succesfully:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [username]);

  const formatDate = (dateString) => {
    return dateString.replace('T', ' ').substring(0, 19);
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <TransactionsList transactions={transactions} formatDate={formatDate}/>
    </div>
  )
}

const TransactionsList = ({ transactions, formatDate }) => {
    return (
      <div className="p-8 w-1/2">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} formatDate={formatDate} />
        ))}
      </div>
    );
  };

const TransactionCard = ({ transaction, formatDate }) => {
    return (
      <div className="border rounded-lg p-4 mb-4 shadow-lg">
        <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)} / {transaction.id}</p>
        {transaction.items.map((item) => (
          <div key={item.id} className="mt-2">
            <p className="font-medium">{item.name}</p>
            <p>{item.quantity} x Rp{item.price}</p>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between items-center mb-1">
            <span>Total price:</span>
            <span className="font-semibold">Rp{transaction.totalPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            <span>Promo code:</span>
            <span className="font-semibold">{transaction.promoCodeUsed}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            <span>Delivery method:</span>
            <span className="font-semibold">{transaction.deliveryMethod}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            <span>Delivery status:</span>
            <span className="font-semibold">{transaction.deliveryStatus}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            <span>Delivery code:</span>
            <span className="font-semibold">{transaction.deliveryCode}</span>
        </div>
      </div>
    );
  };

export default Page