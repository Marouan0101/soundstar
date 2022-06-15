import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Center from '../components/Center';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>Soundstar</title>
        <link rel='icon' href='/musicIcon.svg' />
      </Head>

      <main className='flex'>
        <Sidebar />
        <div className='flex-1'>
          <Header />
          <Center />
        </div>
      </main>
    </div>
  );
};

export default Home;
