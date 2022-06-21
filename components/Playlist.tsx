import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Track from './Track';

const Center = () => {
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const startPlaylist = () => {
    if (spotifyApi.getAccessToken() && playlist) {
      var uris = Object.keys(playlist.tracks.items).map(
        (track) => playlist.tracks.items[track].track.uri
      );

      spotifyApi
        .play({
          uris: uris,
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [spotifyApi, playlistId]);

  return (
    <div className='h-screen overflow-y-scroll pb-44 scrollbar-hide'>
      <div className='mb-4 flex space-x-10 p-4'>
        <img
          className='h-44 w-44 object-cover shadow-xl shadow-black/40 2xl:h-60 2xl:w-60'
          src={playlist?.images?.[0]?.url}
        />
        <div className='space-y-5'>
          <div className='mb text-4xl font-bold'>{playlist?.name}</div>
          <div className='text-gray-500 dark:text-gray-300/50'>
            Made by{' '}
            <span className='cursor-pointer hover:text-primary hover:underline dark:hover:text-gray-200/80'>
              {playlist?.owner?.display_name}
            </span>
          </div>
          <div className=''>{playlist?.description}</div>
          <div>{playlist?.tracks?.total} Songs</div>

          <div className='cursor-pointer' onClick={() => startPlaylist()}>
            Play
          </div>
        </div>
      </div>

      <div className=''>
        {playlist?.tracks?.items?.map((track, i) => {
          return (
            <Track key={track?.track?.id} track={track?.track} order={i} />
          );
        })}
      </div>
    </div>
  );
};

export default Center;
