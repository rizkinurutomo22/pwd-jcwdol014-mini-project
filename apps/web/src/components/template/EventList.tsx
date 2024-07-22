import React from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  loading: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, loading }) => {
  if (loading) return <p>Loading events...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div key={event.id} className="rounded border p-4">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p>{event.description}</p>
          <p>Location: {event.location}</p>
          <p>Date: {event.date}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
