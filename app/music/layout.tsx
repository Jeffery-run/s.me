import React, { memo } from 'react';

const layout = memo(({ children } : { children:React.ReactNode }) => (
  <div className="px-4 pt-4 max-w-mw mx-[auto]">
    {children}
  </div>
));

export default layout;
