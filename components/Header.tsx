import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const Header = () => {
  const { data: session, status } = useSession();
  console.log(session?.user.image);

  /* const prefersDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches; */

  /* typeof window !== 'undefined' && (window.matchMedia('(prefers-color-scheme: dark)').matches) */

  if (typeof window !== 'undefined') {
    const prefersDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  }

  const toggleProfileSettings = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const profile = document.querySelector('.profile');

    profile.classList.toggle('rounded-lg');
    profile.classList.toggle('rounded-full');
    profile.classList.toggle('bg-primary');

    dropdownMenu.classList.toggle('hidden');
  };

  return (
    <div className='relative flex items-center border-b border-gray-400/50 px-6 py-4'>
      <div className='flex items-center space-x-2'>
        <img className='h-8 w-8' src='/musicIcon.svg' />
        <div className='text-3xl font-bold uppercase'>Soundstar</div>
      </div>

      <div className='profile absolute top-2 right-6 rounded-full border-2 border-primary p-1 pr-3'>
        <div
          className='flex cursor-pointer items-center space-x-3'
          onClick={() => toggleProfileSettings()}
        >
          <img className='h-10 w-10 rounded-full' src={session?.user.image} />

          <div>{session?.user.username}</div>

          <ChevronDownIcon className='h-5 w-5' />
        </div>

        <div className='dropdown-menu mt-4 hidden'>
          <div className='mb-2 text-right'>
            <div>
              <input type='radio' name='theme' id='dark' />
              <label for='dark'>Dark</label>
            </div>

            <div>
              <input type='radio' name='theme' id='light' />
              <label for='light'>Light</label>
            </div>

            <div>
              <input type='radio' name='theme' id='system' checked />
              <label for='system'>System</label>
            </div>
          </div>

          <div className='cursor-pointer text-right' onClick={() => signOut()}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
