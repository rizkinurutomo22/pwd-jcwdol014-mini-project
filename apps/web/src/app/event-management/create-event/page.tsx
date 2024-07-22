'use client';

import EventForm from '@/components/EventForm';

export default function CreateEvent() {
  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-bold">Create a New Event</h3>
      <div className="mb-8 mt-4 h-1 rounded-full bg-purple-600"></div>
      <EventForm />
      <br />
    </div>
  );
}
