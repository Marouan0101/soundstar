<div className='sticky bottom-0 w-screen items-center space-y-4 border-t border-gray-400/50 bg-slate-50  dark:bg-dark'>
  <div className='flex items-center space-x-4 px-2'>
    <div>{millisToMinutesAndSeconds(currentSongProgress)}</div>
    <div className='range w-full flex-1'>
      <input
        className='hiddenRange w-full'
        type='range'
        min={0}
        max={songInfo?.duration_ms}
        value={currentSongProgress}
        /*  onChange={(e) => setCurrentSongProgress(Number(e.target.value))} */
      />
      <div className={`visualRange h-2 bg-primary`}></div>
    </div>
    <div>{millisToMinutesAndSeconds(songInfo?.duration_ms)}</div>
  </div>

  <div className='flex items-center justify-between p-2'>
    <div className='flex items-center space-x-4'>
      {/* Image */}
      <div className='h-14 w-14 overflow-hidden rounded-sm'>
        <img className='object-cover' src={songInfo?.album?.images[0]?.url} />
      </div>

      <div>
        {/* song name */}
        <div className='font-medium'>{songInfo?.name}</div>

        {/* artists */}
        <div className='flex space-x-4'>
          {songInfo?.artists?.map((artist) => {
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
    <div className='absolute left-1/2 h-12 w-12 -translate-x-1/2'>
      {isPlaying ? (
        <img
          className='cursor-pointer object-cover'
          src='/pauseIconSolid.svg'
          onClick={() => handlePlayPause()}
        />
      ) : (
        <img
          className='cursor-pointer object-cover'
          src='/playIconSolid.svg'
          onClick={() => handlePlayPause()}
        />
      )}
    </div>

    <div className='flex items-center space-x-2'>
      <input
        type='range'
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        min={1}
        max={100}
      />
      <VolumeUpIcon className='h-6 w-6' />
    </div>
  </div>
</div>;
