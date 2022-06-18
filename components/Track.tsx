import React from 'react';
import { GrPlay } from 'react-icons/gr';

const Track = ({ track, order }) => {
  return (
    <div key={track?.id} className='flex items-center py-1 pr-2'>
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
              className='mr-2 h-10 w-10 cursor-pointer rounded-full border border-transparent p-1 pl-2 hover:border-primary 2xl:h-12 2xl:w-12'
            />

            <div className='leading-5'>
              {/* song name */}
              <div className='font-medium'>{track?.name}</div>

              {/* artists */}
              <div className='flex space-x-4'>
                {track?.artists?.map((artist) => {
                  return (
                    <div className='cursor-pointer text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80'>
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
        <div className='text-gray-500 dark:text-gray-200/80 '>
          {Math.floor(track.duration_ms / 60000)}:
          {((track.duration_ms % 60000) / 1000).toFixed(0)}
        </div>
      </div>
    </div>
  );
};

export default Track;
