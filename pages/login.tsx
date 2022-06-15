import type { NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

const Login: NextPage = ({ providers }) => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center space-y-5'>
      <Image width={130} height={130} src='https://i.imgur.com/fPuEa9V.png' />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className='rounded-full border-2 border-primary px-4 py-2 transition-colors duration-200 hover:bg-primary'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
