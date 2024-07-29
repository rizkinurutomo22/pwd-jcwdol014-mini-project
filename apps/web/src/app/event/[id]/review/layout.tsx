import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div id="review-event" className="bg-gradient-main">
        {children}
      </div>
    </>
  );
};

export default Layout;
