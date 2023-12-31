'use client';

import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = memo(() => {
  const router = useRouter();
  useEffect(() => {
    router.push('/other/piecesSlider');
  }, [router]);

  return <div />;
});

export default page;
