import React from 'react';
import ListLayout from '../_layout/listLayout';
import { mdFromatter } from '../_utils/md';

async function getPosts() {
  return mdFromatter('blog');
}

const page = async () => {
  const posts = await getPosts();
  return (
    <ListLayout posts={posts} title="blog" />
  );
};

export default page;
