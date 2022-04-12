import React, { useMemo } from 'react';
import { Transforms, createEditor, Descendant, Editor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
  ReactEditor,
  RenderElementProps,
} from 'slate-react';
import { withCorrectVoidBehavior } from '../../plugin/CorrectVoidBehaviour';

export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

export type EmptyText = {
  text: string;
};

const ImagesExample = () => {
  const editor = useMemo(
    () =>
      withCorrectVoidBehavior(
        withImages(withHistory(withReact(createEditor()))),
      ),
    [],
  );

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        className="h-80 bg-gray-200"
        renderElement={(props) => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    for (const file of files) {
      const reader = new FileReader();
      const [mime] = file.type.split('/');

      if (mime === 'image') {
        reader.addEventListener('load', () => {
          const url = reader.result;
          insertImage(editor, url);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  return editor;
};

const insertImage = (editor: Editor, url: any) => {
  const text = { text: '' };
  const image: ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'image':
      return (
        <Image attributes={attributes} children={children} element={element} />
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Image = ({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ImageElement }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className="relative">
        <img
          src={element.url}
          className={`block w-full ${
            selected && focused ? 'border-8 border-blue-500' : ''
          }`}
        />
        <span
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={`${
            selected && focused ? 'inline' : 'hidden'
          } absolute top-2 left-2 bg-white`}
        >
          delete
        </span>
      </div>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'You can delete images with the cross in the top left. Try deleting this sheep:',
      },
    ],
  },
];

export default ImagesExample;
