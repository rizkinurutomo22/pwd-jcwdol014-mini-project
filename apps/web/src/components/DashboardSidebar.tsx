import { FC } from 'react';
import Link from 'next/link';

const DasboardSidebar: FC = () => {
  return (
    <aside className="fixed h-full w-64 bg-slate-50 text-black">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/event-management/create-event"
              className="block px-4 py-2 hover:bg-slate-100"
            >
              Create Event
            </Link>
          </li>
          <hr />
          <li>
            <Link
              href={'/event-management/event-list'}
              className="block px-4 py-2 hover:bg-slate-100"
            >
              Event List
            </Link>
          </li>
          <li>
            <Link
              href={'/event-management/attendee'}
              className="block px-4 py-2 hover:bg-slate-100"
            >
              Attendee
            </Link>
          </li>
          <li>
            <Link
              href={'/event-management/transactions'}
              className="block px-4 py-2 hover:bg-slate-100"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href={'/event-management/statistics'}
              className="block px-4 py-2 hover:bg-slate-100"
            >
              Statistics
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DasboardSidebar;
