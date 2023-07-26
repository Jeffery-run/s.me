'use client';

import React, {
  memo, useEffect, useState, useCallback,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import ThemeSwitch from './_components/ThemeSwitch';
import Burger from './_components/Burger';
import { throttle } from './_utils';

const navBar = memo(() => {
  const [isTop, setIsTop] = useState(false);
  const [isOpenDrawer, toggleDrawer] = useState(false);
  const [navs] = useState([
    { href: '/', name: 'home' },
    { href: '/blog', name: 'blog' },
    { href: '/music', name: 'music' },
    { href: '/other', name: 'other' },
  ]);
  const toggleDrawerFalse = useCallback(() => {
    toggleDrawer(false);
  }, []);
  useEffect(() => {
    const tFn = throttle(30, () => {
      const { scrollY } = window;
      if (scrollY === 0) {
        setIsTop(true);
      }
      if (scrollY > 0) {
        setIsTop(false);
      }
    });
    tFn();
    window.addEventListener('scroll', tFn);
    return () => {
      window.removeEventListener('scroll', tFn);
    };
  }, []);
  return (
    <>
      <div className={
        `fixed z-50 w-full h-16 bg-[--background-color] border-b
        border-[--color] ${isTop ? 'bg-transparent' : ''}`
      }
      >
        <div className="flex items-center justify-between h-full max-w-mw m-0 mx-[auto] px-4">
          <div>
            <Image className="w-12 h-12" src="/logo.jpg" alt="" width={60} height={60} />
          </div>
          <div className="flex items-center">
            <div className="hidden md:block mr-2">
              {
                navs.map((nav) => (
                  <Link key={nav.href} href={nav.href} className="px-4 text-lg text-[--color-title]">{nav.name}</Link>
                ))
              }
            </div>
            <ThemeSwitch className="text-[--color-title] w-6 h-6" />
            <Burger
              onClick={() => toggleDrawer(true)}
              className="text-xl text-[--color-title] w-6 h-6 ml-3 cursor-pointer md:hidden"
            />
          </div>
        </div>
        <Drawer anchor="right" open={isOpenDrawer} onClose={toggleDrawerFalse}>
          <div className="flex justify-end px-6 py-4 cursor-pointer">
            <CloseIcon className="text-white" fontSize="large" onClick={toggleDrawerFalse} />
          </div>
          <ul className="w-[60vw]">
            {
              navs.map((nav) => (
                <li key={nav.href} className="py-2">
                  <Link href={nav.href} onClick={toggleDrawerFalse} className="px-4 text-lg text-white">{nav.name}</Link>
                </li>
              ))
            }
          </ul>
        </Drawer>
      </div>
      <div className="h-16" />
    </>
  );
});

export default navBar;
