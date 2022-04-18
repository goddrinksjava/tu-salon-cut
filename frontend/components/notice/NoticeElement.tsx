import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { NoticeImage } from './NoticeImage';
import NoticeTitle from './NoticeTitle';

export const NoticeElement: FC<RenderElementProps & { noticeId: number }> = ({
  attributes,
  children,
  element,
  noticeId,
}) => {
  switch (element.type) {
    case 'image':
      return (
        <NoticeImage
          attributes={attributes}
          children={children}
          element={element}
          noticeId={noticeId}
        />
      );
    case 'list-item':
      return <li>{children}</li>;
    case 'numbered-list':
      return <ol className="list-inside list-decimal">{children}</ol>;
    case 'bulleted-list':
      return <ul className="list-inside list-disc">{children}</ul>;
    case 'title':
      return (
        <NoticeTitle
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case 'paragraph':
      return (
        <p className="text-justify" {...attributes}>
          {children}
        </p>
      );
  }
};
