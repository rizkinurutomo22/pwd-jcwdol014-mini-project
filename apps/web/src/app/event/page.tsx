'use client';

// src/apps/events/page.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      // Contoh fetch data statis, bisa diganti dengan fetching dari API
      const events: Event[] = [
        {
          id: '1',
          title: 'Concert A',
          date: '2024-08-20',
          location: 'Stadium XYZ',
        },
        {
          id: '2',
          title: 'Festival B',
          date: '2024-09-10',
          location: 'Park ABC',
        },
      ];
      setEvents(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <Link
              href={`/events/${event.id}`}
              className="text-blue-500 hover:underline"
            >
              {event.title} - {event.date} - {event.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
