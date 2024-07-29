import { FC } from 'react';

const DashboardHeader: FC = () => {
  return (
    <header className="fixed z-10 w-full bg-purple-500 p-4 text-white">
      <div className="mx-auto">
        <h2 className="text-xl font-bold">Event Management Dashboard</h2>
      </div>
    </header>
  );
};

export default DashboardHeader;
