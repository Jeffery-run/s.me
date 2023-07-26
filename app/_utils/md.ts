import 'server-only';
import { cache } from 'react';
import { bundleMDX } from 'mdx-bundler';
import * as fs from 'node:fs';
import path from 'path';
// 提取信息
import matter from 'gray-matter';
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
// rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
// import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
// import rehypePresetMinify from 'rehype-preset-minify';
import remarkExtractFrontmatter from './remark-extract-frontmatter';
import getFileRecursively, { removeExt } from './file';
import remarkTocHeadings from './remark-toc-headings';
import remarkCodeTitles from './remark-code-title';
import remarkImgToJsx from './remak-img-to-jsx';

export const root = process.cwd();
const dataRoot = path.join(root, 'app/_data');
const componentRoot = path.join(root, 'app/_components');

export function dateSortDesc(a:string = '', b:string = '') {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export type BlogForm = {
  title : string,
  date : string | null,
  tags : string[],
  draft : boolean,
  summary : string,
  slug : string,
}

export type TocForm = {
  value: string,
  url: string,
  depth: number,
}

export async function getFileBySlug(type:string, slug:string) {
  const mdxPath = path.join(dataRoot, type, `${slug}.mdx`);
  const mdPath = path.join(dataRoot, type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8');

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe');
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild');
  }

  const toc: TocForm[] = [];
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: componentRoot,
    mdxOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        remarkMath,
        remarkImgToJsx,
      ];
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [
        ...(options.recmaPlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        // [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        // rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options) => {
      // eslint-disable-next-line no-param-reassign
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      };
      // eslint-disable-next-line no-param-reassign
      options.target = [
        'es2016',
      ];
      return options;
    },
  });

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
}

export const mdFromatter = cache((folder:string) : BlogForm[] => {
  const prefixFolder = path.join(dataRoot, folder);

  const result : BlogForm[] = [];

  const files = getFileRecursively(prefixFolder);

  files.forEach((f:string) => {
    const fileName = f.slice(prefixFolder.length + 1).replace(/\\/g, '/');
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') return;
    const source = fs.readFileSync(f, 'utf8');
    const { data } = matter(source);
    if (!data.draft) {
      result.push({
        ...data,
        slug: removeExt(fileName),
        date: data.date ? new Date(data.date).toISOString() : null,
      } as BlogForm);
    }
  });
  return result.sort((a:BlogForm, b:BlogForm) => dateSortDesc(a.date as string, b.date as string));
});

export const preFormat = (folder:string) => {
  mdFromatter(folder);
};
