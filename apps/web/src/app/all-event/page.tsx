'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import EventList from '@/components/template/EventList';
import Filters from '@/components/template/Filters';
import Pagination from '@/components/template/Pagination';
import axios from 'axios';

const AllEvent = () => {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  const queryLabel = searchParams.get('label');
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: queryCategory || '',
    label: queryLabel || '',
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Update filters state based on query parameters
  useEffect(() => {
    if (queryCategory) {
      setFilters((prev) => ({ ...prev, category: queryCategory }));
    }
    if (queryLabel) {
      setFilters((prev) => ({ ...prev, label: queryLabel }));
    }
  }, [queryCategory, queryLabel]);

  // Fetch events based on filters and page
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:8000/api/events/filter',
          {
            params: {
              category: filters.category,
              label: filters.label,
              page: page,
            },
          },
        );

        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters, page]);

  return (
    <div className="container mx-auto px-4 pb-16 pt-4">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Let's Find Your Event
      </h2>
      <Filters filters={filters} setFilters={setFilters} />
      <br />
      <EventList events={events} loading={loading} />
      <div className="mt-20">
        <Pagination page={page} setPage={setPage} />
      </div>
      <div>
        <p>Category: {queryCategory ? 'true' : 'false'}</p>
        <p>Label: {queryLabel}</p>
      </div>
    </div>
  );
};

export default AllEvent;
