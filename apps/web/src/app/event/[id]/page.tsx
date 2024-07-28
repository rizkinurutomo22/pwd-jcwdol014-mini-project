'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  type: string;
  price: number;
  seat: number;
  premiere: Boolean;
  location: string;
  category: string;
  dateTime: string;
  thumbnail: string;
  description: string;
}

const EventDetails = () => {
  const params = useParams();
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id && typeof id === 'string') {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/events/${id}`,
          );
          setEvent(response.data);
          setTotalPrice(response.data.price);
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      setTotalPrice(event.price * ticketCount);
    }
  }, [ticketCount, event]);

  const handleTicketCountChange = (increment: boolean) => {
    setTicketCount((prevCount) => {
      const newCount = increment ? prevCount + 1 : prevCount - 1;
      if (newCount < 1) return 1; // Min 1 tiket
      if (event && newCount > event.seat) return event.seat; // Max jumlah kursi yang tersedia
      return newCount;
    });
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
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Bagian Kiri: Thumbnail Event */}
        <div className="mb-4 flex w-full justify-center md:mb-0 md:w-3/5">
          <div className="relative h-screen w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={`/images/${event.category}/${event.thumbnail}`}
              alt={event.name}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        </div>
        {/* Bagian Kanan: Detail Event */}
        <div className="w-full md:w-2/5 md:pl-8">
          <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="truncate text-3xl font-bold">{event.name}</h2>
          </div>
          <div className="mb-6 rounded-2xl bg-slate-100 p-6 shadow-sm ring-1 ring-slate-300">
            <div className="my-2 mb-4 flex gap-2 text-sm text-black">
              <p
                className={`rounded-full px-4 py-1 font-semibold ${
                  event.category === 'Music'
                    ? 'bg-rose-500 text-white'
                    : event.category === 'Stand Up'
                      ? 'bg-orange-400 text-white'
                      : event.category === 'Festival'
                        ? 'bg-teal-400 text-white'
                        : 'bg-slate-200 text-black'
                }`}
              >
                {event.category}
              </p>
              {event.premiere && (
                <p className="rounded-full bg-amber-300 px-4 py-1 font-semibold">
                  Premiere
                </p>
              )}
              {event.type == 'free' && (
                <p className="rounded-full bg-lime-300 px-4 py-1 font-semibold">
                  Free
                </p>
              )}
            </div>
            <br />
            <p className="mb-2 truncate font-bold italic text-purple-500">
              {new Date(event.dateTime).toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mb-2 truncate font-bold italic text-purple-500">
              {event.location}
            </p>
            <br />
            <p className="mb-2 truncate text-3xl font-extrabold italic text-purple-500">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(event.price)}
            </p>
            <p className="mb-2 truncate font-semibold italic text-slate-500">
              Available Seats: {event.seat}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-4 truncate font-bold">
              Total Price:&ensp;
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalPrice)}
            </p>
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                <button
                  className="rounded-full bg-slate-100 px-8 py-2 hover:bg-white hover:shadow-sm"
                  onClick={() => handleTicketCountChange(false)}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={'sm'}
                    className="text-black"
                  />
                </button>
                <div className="mx-6">
                  <span className="text-lg font-bold">{ticketCount}</span>
                </div>
                <button
                  className="rounded-full bg-slate-100 px-8 py-2 hover:bg-white hover:shadow-sm"
                  onClick={() => handleTicketCountChange(true)}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={'sm'}
                    className="text-black"
                  />
                </button>
              </div>
              <Link href={`/event/${id}/checkout`}>
                <button className="mt-6 w-full bg-purple-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-500 xl:mt-0 xl:w-auto">
                  Buy Tickets
                </button>
              </Link>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <p className="mb-2 font-bold">Event Description:</p>
          <p className="mb-4">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
