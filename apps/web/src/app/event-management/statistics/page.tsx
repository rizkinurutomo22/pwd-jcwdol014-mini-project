// 'use client';

// import React, { useState, useEffect } from 'react';
// import EventsTable from '../../../components/EventsTable';
// import PurchaseChart from '../../../components/PurchaseChart';
// import { decodeJwt } from 'jose';
// import { getCookie } from '@/actions/cookies';

// const OrganizerPage: React.FC = () => {
//   const [organizerId, setOrganizerId] = useState<number | null>(null);
//   const [groupBy, setGroupBy] = useState<string>('month');

//   useEffect(() => {
//     const token = getCookie('token');
//     const decoded = decodeJwt(token);
//     const id = decoded.id;

//     if (typeof id === 'number') {
//       setOrganizerId(id);
//     }
//   }, []);

//   if (organizerId === null) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Organizer&apos;s Events
//       </h1>
//       <EventsTable organizerId={organizerId} />
//       <div className="mb-4">
//         <label htmlFor="groupBy" className="mr-2">
//           Group By:
//         </label>
//         <select
//           id="groupBy"
//           value={groupBy}
//           onChange={(e) => setGroupBy(e.target.value)}
//           className="border p-2"
//         >
//           <option value="year">Year</option>
//           <option value="month">Month</option>
//           <option value="day">Day</option>
//         </select>
//       </div>
//       <PurchaseChart organizerId={organizerId} groupBy={groupBy} />
//     </div>
//   );
// };

// export default OrganizerPage;
