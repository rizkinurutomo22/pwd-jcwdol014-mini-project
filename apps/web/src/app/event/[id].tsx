// src/apps/events/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

const EventDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        // Contoh data statis, bisa diganti dengan fetching dari API
        const event: Event = {
          id: id as string,
          title: `Event ${id}`,
          date: '2024-08-20',
          location: 'Stadium XYZ',
          description: 'Description of the event.',
        };
        setEvent(event);
        setLoading(false);
      };
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{event.title}</h1>
      <p className="mb-2">{event.date}</p>
      <p className="mb-2">{event.location}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;
