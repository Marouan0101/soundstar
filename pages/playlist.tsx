import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Playlist from '../components/Playlist';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const playlist: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>Soundstar</title>
        <link rel='icon' href='/musicIcon.svg' />
      </Head>

      <Playlist />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default playlist;
