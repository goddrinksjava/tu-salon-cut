import {
  H1,
  H2,
  MindmapList,
  OrderedList,
  Picture,
  TextBold,
  TextItalic,
  TextUnderline,
  UploadTwo,
} from '@icon-park/react';
import React, { FC, useMemo } from 'react';
import {
  Transforms,
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  useSlateStatic,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { Image } from '../../components/Image';
import Toolbar from '../../components/Toolbar';
import { withCorrectVoidBehavior } from '../../plugin/CorrectVoidBehaviour';
import { withImages } from '../../plugin/Images';
import { withLayout } from '../../plugin/Layout';
import { withNormalizedTitle } from '../../plugin/NormalizedTitle';

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
        withNormalizedTitle(
          withLayout(withImages(withHistory(withReact(createEditor())))),
        ),
      ),

    [],
  );

  return (
    <div className="absolute flex justify-center min-w-full min-h-full bg-gray-100">
      <div className="bg-white md:w-5/6 lg:w-3/4 h-fit my-8 p-4 rounded border shadow">
        <Slate editor={editor} value={initialValue}>
          <Toolbar>
            <MarkButton type="bold">
              <TextBold theme="filled" size="18" />
            </MarkButton>
            <MarkButton type="italic">
              <TextItalic theme="filled" size="18" />
            </MarkButton>
            <MarkButton type="underline">
              <TextUnderline theme="filled" size="18" />
            </MarkButton>
            <MarkButton type="h1">
              <H1 theme="filled" size="18" />
            </MarkButton>
            <MarkButton type="h2">
              <H2 theme="filled" size="18" />
            </MarkButton>

            <BlockButton type="numbered-list">
              <OrderedList theme="filled" size="18" />
            </BlockButton>
            <BlockButton type="bulleted-list">
              <MindmapList theme="filled" size="18" />
            </BlockButton>

            <button>
              <Picture theme="filled" size="18" />
            </button>

            <button>
              <UploadTwo theme="filled" size="18" />
            </button>
          </Toolbar>

          <Editable
            className="h-full w-full mt-4"
            renderElement={(props) => <Element {...props} />}
            renderLeaf={Leaf}
          />
        </Slate>
      </div>
    </div>
  );
};
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

type MarkType = 'bold' | 'italic' | 'underline' | 'h1' | 'h2';

const MarkButton: FC<{
  type: MarkType;
}> = ({ type, children }) => {
  const editor = useSlateStatic();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, type);
      }}
    >
      {children}
    </button>
  );
};

type BlockType = 'bulleted-list' | 'numbered-list';

const BlockButton: FC<{
  type: BlockType;
}> = ({ type, children }) => {
  const editor = useSlateStatic();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, type);
      }}
    >
      {children}
    </button>
  );
};

const isMarkActive = (editor: Editor, format: MarkType) => {
  const marks: any = Editor.marks(editor)!;
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, mark: MarkType) => {
  const { selection } = editor;
  if (!selection) return;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => SlateElement.isElement(n) && n.type == 'title',
    }),
  );

  if (match) {
    return;
  }

  const isActive = isMarkActive(editor, mark);

  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    if (mark == 'h1') {
      Editor.removeMark(editor, 'h2');
    } else if (mark == 'h2') {
      Editor.removeMark(editor, 'h1');
    }

    Editor.addMark(editor, mark, true);
  }
};

const toggleBlock = (
  editor: Editor,
  format: 'numbered-list' | 'bulleted-list',
) => {
  const { selection } = editor;
  if (!selection) return;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => SlateElement.isElement(n) && n.type == 'title',
    }),
  );

  if (match) {
    return;
  }

  const isActive = isBlockActive(editor, format);
  const isList = true;

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),

    split: true,
  });

  let newProperties: Partial<SlateElement>;

  newProperties = {
    type: isActive ? 'paragraph' : 'list-item',
  };

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );
  return !!match;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'image':
      return (
        <Image attributes={attributes} children={children} element={element} />
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return (
        <ol className="list-inside list-decimal" {...attributes}>
          {children}
        </ol>
      );
    case 'bulleted-list':
      return (
        <ul className="list-inside list-disc" {...attributes}>
          {children}
        </ul>
      );
    case 'title':
      const isEmpty = (element.children.at(0)?.text?.length ?? 1) == 0;
      console.log(isEmpty);
      return (
        <div className="z-10 relative">
          <p
            className="placeholder text-5xl whitespace-normal text-justify"
            {...attributes}
          >
            {children}
          </p>
          {isEmpty ? (
            <div
              suppressContentEditableWarning={true}
              contentEditable="false"
              className="-z-10 text-5xl absolute top-0 left-0 select-none text-neutral-400"
              style={{ pointerEvents: 'none' }}
            >
              Title...
            </div>
          ) : null}
        </div>
      );
    case 'paragraph':
      return (
        <p className="whitespace-normal text-justify" {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.h1) {
    children = <span className="text-xl">{children}</span>;
  }

  if (leaf.h2) {
    children = <span className="text-3xl">{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
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
