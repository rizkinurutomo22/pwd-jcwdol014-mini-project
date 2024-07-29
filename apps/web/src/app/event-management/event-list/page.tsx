'use client';

import React, { useState, useEffect } from 'react';
import EventsTable from '../../../components/EventsTable';
import { decodeJwt } from 'jose';
import { getCookie } from '@/actions/cookies';

const OrganizerPage: React.FC = () => {
  const [organizerId, setOrganizerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');

      if (token) {
        try {
          const decodedToken = decodeJwt(token);
          const id = decodedToken.id;

          if (typeof id === 'number') {
            setOrganizerId(id);
          } else if (typeof id === 'string') {
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
              setOrganizerId(parsedId);
            } else {
              console.error('Invalid ID format:', id);
            }
          } else {
            console.error('ID is not a string or number:', id);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.error('No token found in cookies');
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (organizerId === null)
    return <p>Error: Organizer ID could not be retrieved.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Organizer&apos;s Events
      </h1>
      <EventsTable organizerId={organizerId} />
    </div>
  );
};

export default OrganizerPage;
