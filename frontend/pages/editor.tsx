import React from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { NextPage } from 'next';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const Editor: NextPage = () => {
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor />
    </div>
  );
};
export default Editor;
