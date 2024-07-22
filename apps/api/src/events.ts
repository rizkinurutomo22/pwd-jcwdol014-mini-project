import { NextApiRequest, NextApiResponse } from 'next';

interface Event {
  title?: string;
  date?: string;
  location: string;
  category?: string;
  label?: string;
}

const events: Event[] = [
  {
    title: 'Concert A',
    date: '2024-08-20',
    location: 'Stadium XYZ',
  },
  {
    title: 'Festival B',
    date: '2024-09-10',
    location: 'Park ABC',
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { category, location, label, page } = req.query;

  const filteredEvents = events.filter(
    (event) =>
      (category ? event.category === category : true) &&
      (location ? event.location === location : true) &&
      (label ? event.label === label : true),
  );

  const pageSize = 10;
  const currentPage = parseInt(page as string, 10) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  res.status(200).json({ events: paginatedEvents });
};
