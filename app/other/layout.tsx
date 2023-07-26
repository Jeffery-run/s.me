import React from 'react';
import Taps from '@/app/_components/taps';
import { getDir } from '../_utils/file';

export function getRoutes(dir:string) {
  return getDir(dir);
}

const layout = async ({ children } : { children:React.ReactNode }) => {
  const routes = await getRoutes('app/other');
  return (
    <div className="px-2">
      <Taps data={routes.map((path, index) => ({ index, path }))} />
      {children}
    </div>
  );
};

export default layout;
