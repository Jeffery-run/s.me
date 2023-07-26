import React from 'react';
import NextImage from 'next/image';

// eslint-disable-next-line jsx-a11y/alt-text
function Image({ ...rest }) {
  return <NextImage {...rest as any} />;
}

export default Image;
