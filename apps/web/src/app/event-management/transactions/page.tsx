'use client';

import React, { useState, useEffect } from 'react';
import PurchaseList from '../../../components/PurchaseList';
import { decodeJwt } from 'jose';
import { getCookie } from '@/actions/cookies';

const OrganizerPage: React.FC = () => {
  const [organizerId, setOrganizerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');

      if (token) {
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
          console.error('ID is not a valid type:', id);
        }
      } else {
        console.error('No token found in cookies');
      }
    };

    fetchData();
  }, []);

  if (organizerId === null) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Organizer&apos;s Event Purchases
      </h1>
      <PurchaseList organizerId={organizerId} />
    </div>
  );
};

export default OrganizerPage;
