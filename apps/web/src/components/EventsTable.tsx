import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/actions/cookies';
import * as jose from 'jose';

interface Event {
  id: number;
  name: string;
}

interface Props {
  organizerId: number;
}

const EventsTable: React.FC<Props> = ({ organizerId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = getCookie('token');
      const decode = await jose.decodeJwt(token);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/events/organizer/${decode.id}`,
        );

        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead className="bg-gray-100 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-gray-700 font-semibold">
            Event Name
          </th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200">
                {event.name}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={1} className="px-6 py-4 text-center text-gray-500">
              No events found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EventsTable;
