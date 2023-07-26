import React from 'react';
import { notFound } from 'next/navigation';
import { existFile } from '@/app/_utils/file';
import { getFileBySlug, mdFromatter } from '@/app/_utils/md';
import MdxComponent from '@/app/_components/MdxComponent';

export async function generateStaticParams() {
  const posts = mdFromatter('blog');
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export default async function Page({ params }:{ params:{ slug: string[] } }) {
  const file = params.slug.join('/');

  if (!existFile('blog', `${file}.md`) && !existFile('blog', `${file}.mdx`)) {
    notFound();
  }
  const res = await getFileBySlug('blog', params.slug.join('/'));
  return (
    <div>
      <MdxComponent mdxSource={res.mdxSource} frontMatter={res.frontMatter} toc={res.toc} />
    </div>
  );
}
