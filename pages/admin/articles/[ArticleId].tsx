import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleId = () => {
  const router = useRouter();
  const { ArticleId } = router.query;

  return (
      <>
    <Head>
      <title>Tworzenie nowego artykułu</title>
    </Head>
    <p>{ArticleId}</p>
    </>
  );
};

export default ArticleId;
