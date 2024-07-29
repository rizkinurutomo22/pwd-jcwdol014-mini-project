import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div id="purchase-event" className="bg-gradient-main">
        {children}
      </div>
    </>
  );
};

export default Layout;
