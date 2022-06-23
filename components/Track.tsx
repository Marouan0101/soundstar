import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React from 'react';
import { GrPlay } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';
import MoreOptions from './MoreOptions';

const Track = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const playSong = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .play({
          uris: [track.uri],
        })
        .catch((err) => {});
    }
  };

  return (
    <div className='flex items-center py-1 pr-2'>
      {/* Track Nr. */}
      <div className='w-10 text-center text-gray-500 dark:text-gray-200/80'>
        {order + 1}
      </div>

      <div className='flex flex-1 items-center rounded-lg bg-gray-300/30 p-2 hover:bg-gray-300/50 dark:bg-gray-400/10 dark:hover:bg-gray-400/20'>
        <div className='flex flex-1'>
          <div className='flex'>
            {/* Play Icon */}
            <img
              src='/playIcon.svg'
              className='mr-2 h-10 w-10 cursor-pointer rounded-full border-2 border-transparent p-1 pl-2 hover:border-primary 2xl:h-12 2xl:w-12'
              onClick={() => playSong()}
            />

            <div className='leading-5'>
              {/* song name */}
              <div className='font-medium'>{track?.name}</div>

              {/* artists */}
              <div className='flex space-x-4'>
                {track?.artists?.map((artist) => {
                  return (
                    <div
                      key={artist?.id}
                      className='cursor-pointer text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80'
                    >
                      {artist?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Album */}
        <div className='hidden flex-1 cursor-pointer text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80 lg:block'>
          {track?.album?.name}
        </div>

        {/* Song Duration */}
        <div className='flex space-x-3'>
          <div className='text-gray-500 dark:text-gray-200/80 '>
            {/*  {Math.floor(track.duration_ms / 60000)}:
            {((track.duration_ms % 60000) / 1000).toFixed(0)} */}

            {millisToMinutesAndSeconds(track.duration_ms)}
          </div>

          <MoreOptions track={track} order={order} />
        </div>
      </div>
    </div>
  );
};

export default Track;
