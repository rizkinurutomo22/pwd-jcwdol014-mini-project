import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/actions/cookies';

interface Attendee {
  eventName: string;
  username: string;
  email: string;
}

interface Props {
  organizerId: number;
}

const AttendeesTable: React.FC<Props> = ({ organizerId }) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      const token = getCookie('token');

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/attendee/${organizerId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAttendees(response.data.data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [organizerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Event Name</th>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {attendees.map((attendee, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">
              {attendee.eventName}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {attendee.username}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {attendee.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendeesTable;
