import React from 'react';
/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link';

function CustomLink({ href, ...rest } : any) {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href} legacyBehavior>
        <a {...rest} className="relative -top-10" />
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
}

export default CustomLink;
