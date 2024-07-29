import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  type: string;
  premiere: Boolean;
  location: string;
  category: string;
  dateTime: string;
  thumbnail: string;
  description: string;
}

interface EventListProps {
  events: Event[];
  loading: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, loading }) => {
  if (loading && !events.length)
    return (
      <div className="col-span-full py-28 text-center text-3xl font-bold text-gray-400">
        <div className="flex items-center justify-center">
          <div className="relative h-24 w-24">
            <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-8 border-solid border-purple-500 border-t-transparent"></div>
          </div>
        </div>
        <p className="mt-6">&ensp;Loading...</p>
      </div>
    );

  if (!loading && !events.length)
    return (
      <div className="col-span-full py-28 text-center text-3xl font-bold text-gray-400">
        <p className="mb-3">There are no events on this page</p>
      </div>
    );

  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="grid grid-cols-2 items-start justify-center lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <div key={event.id} className="flex justify-center">
          <div className="mb-6 w-40 flex-none place-self-center text-sm md:w-64 md:text-base">
            <Link href={`/event/${event.id}`} className="group">
              <div className="relative h-60 w-40 overflow-hidden rounded-xl shadow-lg md:h-96 md:w-full">
                <Image
                  src={`/images/${event.category}/${event.thumbnail}`}
                  alt={event.name}
                  fill
                  sizes="25vw"
                  className="object-cover duration-200 ease-in hover:scale-105"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl p-1 pt-2 md:p-2 md:pt-4">
                <h2 className="mb-2 truncate text-sm font-semibold md:text-xl">
                  {event.name}
                </h2>
                <p className="truncate text-gray-600 group-hover:text-purple-600">
                  {event.location}
                </p>
                <p className="truncate text-gray-600 group-hover:text-purple-600">
                  {new Date(event.dateTime).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <div className="my-4 mb-4 gap-2 text-sm text-black md:flex">
                  <p
                    className={`rounded-full px-4 py-1 text-center font-semibold ${
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
                    <p className="rounded-full bg-amber-300 px-4 py-1 text-center font-semibold">
                      Premiere
                    </p>
                  )}
                  {event.type == 'free' && (
                    <p className="rounded-full bg-lime-300 px-4 py-1 text-center font-semibold">
                      Free
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
