'use client';

import { useState, useEffect } from 'react';
import EventList from '@/components/template/EventList';
import Filters from '@/components/template/Filters';
import Pagination from '@/components/template/Pagination';

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    label: '',
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // Fetch events based on filters and pagination
      const response = await fetch(
        `../../../../api/src/events?category=${filters.category}&location=${filters.location}&label=${filters.label}&page=${page}`,
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    };

    fetchEvents();
  }, [filters, page]);

  return (
    <div className="container mx-auto px-4 pb-16">
      <h2 className="mb-4 text-2xl font-bold">Let's Find Your Event</h2>
      <Filters filters={filters} setFilters={setFilters} />
      <EventList events={events} loading={loading} />
      <div className="mt-20">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default AllEvent;
