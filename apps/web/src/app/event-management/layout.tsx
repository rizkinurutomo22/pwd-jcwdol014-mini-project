import { FC, ReactNode } from 'react';
import Header from '@/components/Header';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1 pt-16">
          <DashboardSidebar />
          <main className="ml-64 flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
