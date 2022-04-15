import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';
import { ImageElement } from '../types/slate';

export const Image = ({
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
      <div
        contentEditable={false}
        className="relative"
        onDrag={(ev) => console.log('yo')}
      >
        <div
          className={`z-0 absolute bg-blue-700 w-full h-full top-0 left-0`}
        />

        <img
          src={element.url}
          className={`relative z-10 w-full ${
            selected && focused ? 'opacity-70' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};
