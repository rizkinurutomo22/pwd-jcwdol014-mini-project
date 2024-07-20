'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

interface EventGridProps {
  events: Event[];
  h: string;
}

const EventGrid: React.FC<EventGridProps> = ({ events, h }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{h}</h2>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="group rounded-full bg-gray-200 hover:bg-purple-500 hover:shadow-xl"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-black group-hover:text-white"
            />
          </button>
          <button
            onClick={scrollRight}
            className="group rounded-full bg-gray-200 hover:bg-purple-500 hover:shadow-xl"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-black group-hover:text-white"
            />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="no-scrollbar flex space-x-6 overflow-x-auto"
      >
        {events.map((event) => (
          <div key={event.id} className="mb-4 w-64 flex-none">
            <Link href={`/event/${event.id}`}>
              <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="25vw"
                  className="object-cover duration-200 ease-in hover:scale-105"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl p-4">
                <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
