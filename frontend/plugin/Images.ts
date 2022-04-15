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

  editor.insertData = async (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      const { filenames } = await uploadImages(files);
      insertImages(
        editor,
        filenames.map((filename) => `/api/notices/images/${filename}`),
      );
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const uploadImages = async (
  files: FileList,
): Promise<{ filenames: string[] }> => {
  var data = new FormData();
  for (const file of files) {
    const [mime] = file.type.split('/');
    if (mime != 'image') continue;
    data.append('files', file, file.name);
  }

  const response = await fetch('/api/editor/imageUpload', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: data, // This is your file object
  });

  return await response.json();
};

export const insertImages = (editor: Editor, urlList: string[]) => {
  const images = urlList.map<ImageElement>((url) => {
    return { type: 'image', url, children: [{ text: '' }] };
  });

  Transforms.insertNodes(editor, images);
};
