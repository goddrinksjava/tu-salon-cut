import { Transforms, Element, Node, Editor } from 'slate';
import { TitleElement } from '../types/slate';

export const withNormalizedTitle = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (Element.isElement(node) && node.type === 'title') {
      let newProperties: Partial<TitleElement>;

      newProperties = {
        children: node.children.map((c) => {
          return {
            text: c.text,
            bold: false,
            italic: false,
            underline: false,
            h1: false,
            h2: false,
          };
        }),
      };

      Transforms.setNodes<Element>(editor, newProperties, { at: path });
      return;
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode(entry);
  };

  return editor;
};
