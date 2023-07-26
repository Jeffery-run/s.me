export { throttle, debounce } from './throttle';

export function getLimitSplice(length:number, index:number, limit:number) : [number, number] {
  if (length <= index) return [0, length];
  const half = Math.floor(limit / 2);
  let start = index;
  let end = index;
  for (let i = 0; i < half; i++) {
    if (start - 1 >= 0) {
      start--;
    } else {
      end++;
    }
    if (end + 1 < length) {
      end++;
    } else {
      start--;
    }
  }
  if (end + 1 > length) {
    return [start - 1, end];
  }
  return [start, end + 1];
}
