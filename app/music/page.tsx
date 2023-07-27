'use client';

import React, {
  memo, useState, useRef, useEffect,
} from 'react';
import Image from 'next/image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Visualizer from '../_utils/player/index';
import { debounce } from '../_utils/throttle';

export const revalidate = 0;
const page = memo(() => {
  const [playIndex, setPlayIndex] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const data = useRef([
    { name: 'cantina', url: '/mp3/cantina.mp3' },
    { name: 'super mega sexy star', url: '/mp3/smss.mp3' },
    { name: '一笑江湖', url: '/mp3/yxjh.mp3' },
  ]);
  useEffect(() => {
    const resizeHandler = debounce(150, () => {
      playerRef.current.resize(containerRef.current?.offsetWidth, containerRef.current?.offsetHeight);
    });
    window.addEventListener('resize', resizeHandler);
    return () => {
      playerRef.current.clear();
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  const itemPlay = (item: any, index:number) => {
    if (!playerRef.current) {
      playerRef.current = new Visualizer({
        canvas: canvasRef.current!,
        done: () => setPlayIndex(-1),
        width: containerRef.current?.offsetWidth,
        height: containerRef.current?.offsetHeight,
      });
    }
    playerRef.current.play(item.url);
    setPlayIndex(index);
  };
  const itemPause = () => {
    playerRef.current.pause();
    setPlayIndex(-1);
  };
  return (
    <div className="relative">
      <Image className="w-full object-cover min-h-[600px]" src="/mbg.png" width={300} height={300} alt="mbg" unoptimized />
      <div className="absolute inset-0 backdrop-blur-sm overflow-hidden" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute top-0 right-0">
        <List>
          { data.current.map((item, index) => (
            <ListItem key={item.url}>
              <ListItemIcon>
                {
                  playIndex === index
                    ? <PauseCircleIcon className="cursor-pointer text-white" onClick={() => itemPause()} />
                    : <PlayCircleIcon className="cursor-pointer text-white" onClick={() => itemPlay(item, index)} />
                }
              </ListItemIcon>
              <ListItemText primary={item.name} className="text-white" />
            </ListItem>
          )) }
        </List>
      </div>
    </div>
  );
});

export default page;
