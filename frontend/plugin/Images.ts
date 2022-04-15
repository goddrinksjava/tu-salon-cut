import { Editor, Transforms } from 'slate';
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';
import { ImageElement } from '../types/slate';

export const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      const promises = [];
      for (let file of files) {
        const [mime] = file.type.split('/');
        if (mime != 'image') continue;

        let filePromise = new Promise<string>((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.result);
          reader.readAsDataURL(file);
        });
        promises.push(filePromise);
      }

      Promise.all(promises).then((urls) => insertImages(editor, urls));
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertImages = (editor: Editor, urlList: string[]) => {
  const images = urlList.map<ImageElement>((url) => {
    return { type: 'image', url, children: [{ text: '' }] };
  });

  Transforms.insertNodes(editor, images);
};
