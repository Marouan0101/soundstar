import { ChevronLeftIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSpotify from '../hooks/useSpotify';
import styles from '../styles/MoreOptions.module.css';

const MoreOptions = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const [availableDevices, setAvailableDevices] = useState([]);
  const [playlists, setPlaylists] = useState();

  const showMoreOptions = () => {
    const options = document.getElementsByClassName('options')[order];

    options.classList.toggle('hidden');
  };

  const addTrackToPlaylist = (playlistId) => {
    spotifyApi.addTracksToPlaylist(playlistId, {
      uris: [track.uri],
    });
  };

  useEffect(() => {
    spotifyApi
      .getUserPlaylists()
      .then((data) => {
        setPlaylists(data.body.items);
      })
      .catch((err) => {});
  }, [spotifyApi]);

  useEffect(() => {
    spotifyApi
      .getMyDevices()
      .then((data) => {
        setAvailableDevices(data.body.devices);
      })
      .catch((err) => {});
  }, [spotifyApi]);

  const addTrackToQueue = () => {
    if (availableDevices.length > 0) {
      spotifyApi.addToQueue(track.uri);
      toast.success(`'${track.name}' added to queue`);
    } else {
      toast.error('No available devices');
    }
    console.log(spotifyApi);
  };

  return (
    <div className='relative'>
      <div className='options absolute right-0 bottom-8 hidden rounded-xl border border-gray-400/50 bg-dark text-right'>
        <div
          className={`${styles.addToPlaylist} flex cursor-pointer items-center space-x-1 whitespace-nowrap rounded-t-xl  rounded-l-none px-2 py-1 dark:hover:bg-gray-400/20`}
        >
          <ChevronLeftIcon className='h-4 w-4' />
          <div>Add to playlist</div>

          <div
            className={`${styles.playlists} absolute -left-40 hidden max-h-52 max-w-[10rem] overflow-y-scroll rounded-lg bg-secondary  text-left scrollbar-hide`}
          >
            {playlists?.map((playlist) => {
              return (
                <div
                  key={playlist.id}
                  className='truncate px-2 font-semibold hover:bg-dark hover:text-white'
                  onClick={() => addTrackToPlaylist(playlist.id)}
                >
                  {playlist.name}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className='cursor-pointer items-center whitespace-nowrap rounded-b-xl px-2 py-1 dark:hover:bg-gray-400/20'
          onClick={() => {
            addTrackToQueue();
          }}
        >
          Add to queue
        </div>
      </div>

      <DotsHorizontalIcon
        className='w-6 cursor-pointer'
        onClick={showMoreOptions}
      />
    </div>
  );
};

export default MoreOptions;
