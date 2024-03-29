import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import Header from '../components/Header';
import NewReleases from '../components/NewReleases';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>Soundstar</title>
        <link rel='icon' href='/musicIcon.svg' />
      </Head>

      <NewReleases />
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

export default Home;
