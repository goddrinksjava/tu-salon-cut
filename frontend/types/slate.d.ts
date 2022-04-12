// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

type ParagraphElement = { type: 'paragraph'; children: CustomText[] };
type ImageElement = { type: 'image'; url: string; children: CustomText[] };

type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | ImageElement;
    Text: CustomText;
  }
}
