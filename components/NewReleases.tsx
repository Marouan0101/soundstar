import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

const NewReleases = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases().then((data) => {
        setNewReleases(data.body);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className='h-screen overflow-y-scroll p-4 pb-52 scrollbar-hide'>
      {newReleases?.albums?.items?.map((item) => {
        return (
          <div key={item.id} className='flex'>
            <img className='h-72 w-72 rounded-2xl' src={item?.images[0]?.url} />

            <div>
              <div className='text-4xl font-bold'>{item?.name}</div>
              <div className='flex space-x-4'>
                {item?.artists?.map((artist) => {
                  return <div key={artist.id}>{artist?.name}</div>;
                })}
              </div>

              <div>{item?.album_type}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewReleases;
