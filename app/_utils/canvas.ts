export type Vector = [number, number]
export function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!;

  const dpr = window.devicePixelRatio || 1;
  // @ts-expect-error
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

  const dpi = _dpi || dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx.scale(dpi, dpi);

  return { ctx, dpi };
}

export function square(a: number) {
  return a ** 2;
}

export function random(max = 1, min = 0) {
  return Math.random() * (max - min) + min;
}

export function distance([x1, y1]: Vector, [x2, y2]: Vector) {
  return Math.sqrt(square(x1 - x2) + square(y1 - y2));
}

export const timestamp = () => +Date.now();

export function toHex(c: number) {
  return c.toString(16).padStart(2, '0');
}

// eslint-disable-next-line no-unused-vars
export function reqFrame(fn: (args: any) => void, options: any = {}) {
  const {
    immediate = true,
  } = options;

  let isActive = false;
  let previousFrameTimestamp = 0;
  let rafId: null | number = null;

  function loop(stamp: any) {
    if (!isActive || !window) { return; }

    const delta = stamp - previousFrameTimestamp;
    fn({ delta, timestamp });

    previousFrameTimestamp = stamp;
    rafId = window.requestAnimationFrame(loop);
  }

  function resume() {
    if (!isActive && window) {
      isActive = true;
      rafId = window.requestAnimationFrame(loop);
    }
  }

  function pause() {
    isActive = false;
    if (rafId != null && window) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  if (immediate) { resume(); }

  return {
    pause,
    resume,
  };
}
