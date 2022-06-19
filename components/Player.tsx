import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playbackState, setPlaybackState] = useState();

  if (spotifyApi.getAccessToken()) {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      setPlaybackState(data.body);
      console.log(playbackState);
    });
  }

  console.log(spotifyApi);

  if (session) {
    return (
      <div className='absolute bottom-0 left-0 flex w-screen items-center border-t border-gray-400/50 bg-slate-50 p-2 dark:bg-dark'>
        <div className='flex flex-1 items-center space-x-4'>
          {/* Image */}
          <img
            className='h-14 w-14 rounded-sm object-cover'
            src={playbackState?.item?.album?.images[0]?.url}
          />

          <div>
            {/* song name */}
            <div className='font-medium'>{playbackState?.item?.name}</div>

            {/* artists */}
            <div className='flex space-x-4'>
              {playbackState?.item?.artists?.map((artist) => {
                return (
                  <div className='cursor-pointer text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80'>
                    {artist?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='flex-1'>
          {playbackState?.is_playing ? (
            <img
              className='h-12 w-12 cursor-pointer'
              src='/pauseIconSolid.svg'
              onClick={() => spotifyApi.pause()}
            />
          ) : (
            <img
              className='h-12 w-12 cursor-pointer'
              src='/playIconSolid.svg'
              onClick={() => spotifyApi.play()}
            />
          )}
        </div>
      </div>
    );
  } else {
    return;
  }
};

export default Player;
