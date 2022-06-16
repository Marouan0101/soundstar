import { BookmarkIcon, HeartIcon, PlusIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className='h-screen max-w-[14rem] overflow-x-hidden overflow-y-scroll border-r border-gray-400/50 p-4 scrollbar-hide'>
      <div className=' space-y-2 text-lg font-medium'>
        <div className='cursor-pointer hover:text-primary'>Home</div>
        <div className='cursor-pointer hover:text-primary'>Your Library</div>
      </div>

      <hr className='my-4 border-gray-400/50' />

      <div className='space-y-2 text-lg font-medium '>
        <div className='flex cursor-pointer space-x-3 rounded-lg border-2 border-secondary p-2 pl-3 transition-colors hover:bg-secondary '>
          <PlusIcon className='w-6' />

          <div>Create Playlist</div>
        </div>
        <div className='flex cursor-pointer space-x-3 rounded-lg border-2 border-pink p-2 pl-3 transition-colors hover:bg-pink '>
          <HeartIcon className='w-6' />
          <div>Liked Songs</div>
        </div>
        <div className='flex cursor-pointer space-x-3 rounded-lg border-2 border-green p-2 pl-3 transition-colors hover:bg-green '>
          <BookmarkIcon className='w-6' />
          <div>Your Episodes</div>
        </div>
      </div>

      <hr className='my-4 border-gray-400/50' />

      <div className='space-y-4 text-lg font-medium leading-5'>
        {playlists.map((playlist) => {
          return (
            <div
              className='cursor-pointer hover:text-primary'
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
