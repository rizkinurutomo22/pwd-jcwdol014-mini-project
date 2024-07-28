'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface Event {
  id: string;
  name: string;
  type: string;
  price: number;
  seat: number;
  location: string;
  category: string;
  dateTime: string;
  thumbnail: string;
  description: string;
}

interface PurchaseState {
  ticketCount: number;
  totalPrice: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

const CheckoutPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseState, setPurchaseState] = useState<PurchaseState | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id && typeof id === 'string') {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/events/${id}`,
          );
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();

    // Retrieve purchase state from localStorage or sessionStorage
    const storedPurchaseState = sessionStorage.getItem('purchaseState');
    if (storedPurchaseState) {
      setPurchaseState(JSON.parse(storedPurchaseState));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!purchaseState) {
      setError('Failed to retrieve purchase state');
      return;
    }

    const checkoutData = {
      event_id: event?.id,
      event_name: event?.name,
      buyer_name: purchaseState.buyerName,
      buyer_email: purchaseState.buyerEmail,
      buyer_phone: purchaseState.buyerPhone,
      ticket_count: purchaseState.ticketCount,
      total_price: purchaseState.totalPrice,
    };

    try {
      const response = await axios.post('/api/event/checkout', checkoutData);
      if (response.status === 201) {
        router.push(`/event/${id}/confirmation`);
      } else {
        setError('Failed to complete purchase');
      }
    } catch (error) {
      console.error('Error completing purchase:', error);
      setError('Failed to complete purchase');
    }
  };

  if (loading)
    return (
      <div className="col-span-full py-52 text-center text-3xl font-bold text-gray-400">
        <p className="mb-3">Loading... Please wait</p>
      </div>
    );

  if (!event)
    return (
      <div className="col-span-full py-52 text-center text-3xl font-bold text-gray-400">
        <p className="mb-3">404. Event not found</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">Checkout</h1>
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Event Details Section */}
        <div className="mb-4 w-full md:mb-0 md:w-2/5 md:pr-8">
          <div className="relative mb-4 h-80 w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={`/images/${event.category}/${event.thumbnail}`}
              alt={event.name}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <p className="mt-2 text-lg text-gray-600">{event.description}</p>
            <p className="mt-4 text-2xl font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(event.price)}{' '}
              <span className="text-sm">/ticket</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Available Ticket: {event.seat}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Date:{' '}
              {new Date(event.dateTime).toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Location: {event.location}
            </p>
          </div>
        </div>

        {/* Invoice Section */}
        {purchaseState && (
          <div className="w-full md:w-3/5">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-2xl font-bold">Invoice</h2>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Name: {purchaseState.buyerName}
                </p>
                <p className="text-lg font-semibold">
                  Email: {purchaseState.buyerEmail}
                </p>
                <p className="text-lg font-semibold">
                  Phone: {purchaseState.buyerPhone}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-bold">
                  Number of Tickets: {purchaseState.ticketCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-bold">
                  Total Price:{' '}
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(purchaseState.totalPrice)}
                </p>
              </div>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <button
                type="submit"
                className="mt-6 w-full bg-purple-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-500 xl:mt-0 xl:w-auto"
              >
                Complete Purchase
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
