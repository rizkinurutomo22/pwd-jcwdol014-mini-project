import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/actions/cookies';

interface Purchase {
  id: number;
  userId: number;
  eventId: number;
  totalTickets: number;
  totalPrice: number;
  user: {
    username: string;
    email: string;
  };
  event: {
    name: string;
  };
}

interface Props {
  organizerId: number;
}

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};

const PurchaseList: React.FC<Props> = ({ organizerId }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = getCookie('token');

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/organizer/${organizerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPurchases(response.data.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [organizerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Purchase List</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Event Name</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Total Tickets</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="border border-gray-300 px-4 py-2">
                {purchase.event.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {purchase.user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {purchase.user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {purchase.totalTickets}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {formatRupiah(purchase.totalPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseList;
