import { visit } from 'unist-util-visit';

export default function remarkCodeTitles() {
  return (tree: any) => visit(tree, 'code', (node, index, parent) => {
    const nodeLang : string = node.lang || '';
    let language : string = '';
    let title = '';
    if (nodeLang.includes(':')) {
      language = nodeLang.slice(0, nodeLang.search(':'));
      title = nodeLang.slice(nodeLang.search(`:${1}`), nodeLang.length);
    }

    if (!title) return;

    const className = 'remark-code-title';
    const titleNode = {
      type: 'mdxJsxFlowElement',
      name: 'div',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'className', value: className },
      ],
      children: [{ type: 'text', value: title }],
      data: { _xdmExplicitJsx: true },
    };

    parent.children.splice(index, 0, titleNode);
    // eslint-disable-next-line no-param-reassign
    node.lang = language;
  });
}
