import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id && typeof id === 'number') {
        const response = await fetch(`http:localhost:8000/api/events/${id}`);
        const data = await response.json();
        setEvent(data.event);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-4 text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      <button className="mt-4 rounded bg-purple-600 px-4 py-2 text-white">
        Buy Tickets
      </button>
    </div>
  );
};

export default EventDetails;
