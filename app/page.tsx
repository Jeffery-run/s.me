'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  timestamp, distance, initCanvas, random, toHex, reqFrame,
} from './_utils/canvas';

export default function Home() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const lineColorRef = useRef('#85e561');
  useEffect(() => {
    if (resolvedTheme === 'dark') {
      lineColorRef.current = '#85e561';
    }
    if (resolvedTheme === 'light') {
      lineColorRef.current = '#6a676f';
    }
  }, [resolvedTheme]);
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let { clientWidth, clientHeight } = document.documentElement;
    clientHeight -= 64;
    const canvas = canvasRef.current!;
    const { ctx } = initCanvas(canvas, clientWidth, clientHeight);
    const { width, height } = canvas;
    const { round, max } = Math;
    const D = 140;
    let points: [number, number, number][] = [];
    function getFade(t = 0, ts = 0) {
      return 1 - (ts - t) / 2000;
    }
    function updateCanvas() {
      const ts = timestamp();

      points.push([
        random(clientWidth + 100, -100),
        random(clientHeight + 100, -100),
        ts,
      ]);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      points = points.filter(([x, y, t], idx) => {
        const fade = getFade(t, ts);
        if (fade < 0) { return false; }
        if (idx !== 0) {
          for (let ni = 1; ni < idx; ni++) {
            const [x1, y1, t2] = points[ni - 1];
            if (distance([x1, y1], [x, y]) < D) {
              const fade2 = getFade(t2, ts);
              const color = max(0, round(fade * fade2 * 255));
              ctx.strokeStyle = lineColorRef.current + toHex(color);
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          }
        }
        return true;
      });
    }
    reqFrame(updateCanvas);
  }, []);
  return (
    <main className="overflow-hidden relative">
      <canvas style={{ width: '100%' }} ref={canvasRef} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="text-6xl bg-linear-1 bg-clip-text text-transparent">welcome</span>
      </div>
    </main>
  );
}
