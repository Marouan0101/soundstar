import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { RecoilRoot } from 'recoil';
import Player from '../components/Player';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <main className='flex'>
          <Sidebar />
          <div className='flex-1'>
            <Header />
            <Component {...pageProps} />
          </div>
        </main>
        <div className='sticky bottom-0'>
          <Player />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
