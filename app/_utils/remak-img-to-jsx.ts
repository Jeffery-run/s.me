import * as fs from 'node:fs';
import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';

export default function remarkImgToJsx() {
  return (tree:any) => visit(
    tree,
    (node:any) => node.type === 'paragraph' && node.children.some((n:any) => n.type === 'image'),
    (node) => {
      const imageNode = node.children.find((n:any) => n.type === 'image');

      // only local files
      if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
        const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`);

        // convert original node to next/image
        imageNode.type = 'mdxJsxFlowElement';
        imageNode.name = 'Image';
        imageNode.attributes = [
          { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
          { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
          { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
          { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
        ];

        // change node type from p to div to avoid nesting error
        // eslint-disable-next-line no-param-reassign
        node.type = 'div';
        // eslint-disable-next-line no-param-reassign
        node.children = [imageNode];
      }
    },
  );
}
