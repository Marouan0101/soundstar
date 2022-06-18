import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

const FeaturedPlaylists = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getFeaturedPlaylists().then((data) => {
        setPlaylists(data.body);
      });
    }
  }, [session, spotifyApi]);

  return <div>FeaturedPlaylists</div>;
};

export default FeaturedPlaylists;
