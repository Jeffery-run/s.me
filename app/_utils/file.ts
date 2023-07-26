// const path = require('node:path');
// const fs = require('node:fs');
import * as fs from 'node:fs';
import path from 'path';

type AnyFn = {
  // eslint-disable-next-line no-unused-vars
  (arg:any):any
}

const pipe = (...fns : any[]) : AnyFn => (arg : any) => fns.reduce((prev, curr) => curr(prev), arg);

const flattenArray = (arr : any[]) => arr.reduce((prev, curr) => [...prev, ...(Array.isArray(curr) ? curr : [curr])], []);

const map = (fn: AnyFn) => (input:any[]) => input.map(fn);

// eslint-disable-next-line no-use-before-define
const walkDir = (fullPath : string) => (fs.statSync(fullPath).isFile() ? fullPath : getFileRecursively(fullPath));

const pathJoinPrefix = (dir:string) => (p:string) => path.join(dir, p);

function getFileRecursively(dir:string) {
  return pipe(fs.readdirSync, map(pipe(pathJoinPrefix(dir), walkDir)), flattenArray)(dir);
}

export function removeExt(filename: string) {
  return filename.replace(/\.[^.]+$/, '');
}

export function existFile(type:string, file:string) {
  return fs.existsSync(path.join(process.cwd(), 'app/_data', type, file));
}

export function getDir(dir:string) {
  const files = fs.readdirSync(path.join(process.cwd(), dir));
  return files.filter((item) => fs.statSync(path.join(process.cwd(), dir, item)).isDirectory());
}

export default getFileRecursively;
