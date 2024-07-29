import { FC, ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div id="filter-event" className="bg-gradient-main">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
