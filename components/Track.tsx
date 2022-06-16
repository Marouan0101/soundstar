import React from 'react';
import { GrPlay } from 'react-icons/gr';

const Track = ({ track }) => {
  return (
    <div key={track?.id} className='flex  items-center py-3   px-2  '>
      <div className='flex flex-1'>
        <GrPlay className='mr-4 h-10 w-10 cursor-pointer rounded-full border border-transparent p-2 hover:border-primary' />

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

      <div className='hidden flex-1 cursor-pointer text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80 lg:block'>
        {track?.album?.name}
      </div>

      <div className='text-gray-500 dark:text-gray-200/80 '>
        {Math.floor(track.duration_ms / 60000)}:
        {((track.duration_ms % 60000) / 1000).toFixed(0)}
      </div>
    </div>
  );
};

export default Track;
