import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Editor: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div></div>;
};
export default Editor;
