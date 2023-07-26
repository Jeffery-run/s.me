'use client';

import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from './custom/Image';
import CustomLink from './custom/CustomLink';
import TOCInline from './custom/TOCInline';
import Pre from './custom/Pre';
import ScrollTop from './ScrollTop';

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ frontMatter, children } : any) => (
    <div>
      <div className="text-center">
        <span className="bg-linear-2 text-transparent bg-clip-text text-2xl font-bold">{frontMatter.title}</span>
      </div>
      <ScrollTop />
      <div className="prose dark:prose-dark max-w-none">
        {children}
      </div>
    </div>
  ),
};

export default function MdxComponent({ mdxSource, ...rest } : any) {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
  return (
    <MDXLayout components={MDXComponents} {...rest} />
  );
}
