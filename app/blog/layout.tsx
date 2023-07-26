import React from 'react';

const layout = ({ children } : { children:React.ReactNode }) => (
  <div className="px-4 pt-4 max-w-mw mx-[auto]">
    {children}
  </div>
);

export default layout;
