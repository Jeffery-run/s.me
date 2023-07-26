'use client';

import React, { memo, useState } from 'react';
import Link from 'next/link';
import { Chip } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { TextField } from '@/app/_components/TextField';
import type { BlogForm } from '../_utils/md';

type ListProps = {
  posts:BlogForm[],
  title:string
}

const listLayout = memo(({ posts, title } : ListProps) => {
  const [searchValue, setSearchValue] = useState('');
  const filterResult = posts.filter((post) => {
    const str = post.title + post.tags + post.summary;
    return str.toLowerCase().includes(searchValue.toLowerCase());
  });
  const displayPost = searchValue ? filterResult : posts;
  return (
    <div>
      <div className="text-2xl text-center pb-4">
        <span className="bg-clip-text font-bold text-4xl text-transparent bg-linear-1">{ title }</span>
      </div>
      <div className="w-[400px] mx-[auto] max-w-full">
        <TextField onChange={(e) => setSearchValue(e.target.value)} label="search" variant="outlined" size="small" />
      </div>
      <div className="pt-4">
        { !filterResult.length
        && <div className="text-center">no result found.</div> }
        <ul>
          {
            displayPost.map((p) => (
              <li
                key={p.title}
                className="inline-block align-top w-full
                 h-52 px-2 md:w-1/2 lg:w-1/3"
              >
                <div className="shadow-md border border-[--bg-scroll] transition-all p-2">
                  <div className="text-center relative">
                    <span className="bg-linear-2 text-transparent bg-clip-text text-2xl font-bold">{ p.title }</span>
                    <Link className="absolute text-green-400 top-0.5 right-0 hover:animate-pulse" href={`/blog/${p.slug}`}>
                      <DoubleArrowIcon />
                    </Link>
                  </div>
                  <p className="h-28">{p.summary}</p>
                  <div className="text-end">
                    {
                      p.tags.map((tag) => (
                        <Chip key={tag} className="mx-1" color="primary" size="small" label={tag} />
                      ))
                    }
                  </div>
                </div>
              </li>
            ))
          }
        </ul>

      </div>
    </div>
  );
});

export default listLayout;
