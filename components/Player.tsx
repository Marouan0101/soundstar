import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { VolumeUpIcon } from '@heroicons/react/outline';
import { debounce } from 'lodash';
import { millisToMinutesAndSeconds } from '../lib/time';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import tailwindConfig from '../tailwind.config.js';
import { LOGIN_URL } from '../lib/spotify';

const Player = () => {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks().then((data) => {
        setRecentlyPlayedTrack(data.body.items[0].track);
      });
    }
  }, [spotifyApi, session]);

  if (session) {
    if (recentlyPlayedTrack && spotifyApi.getAccessToken()) {
      return (
        <div>
          <SpotifyWebPlayer
            token={spotifyApi.getAccessToken()}
            uris={[`${recentlyPlayedTrack.uri}`]}
            autoPlay
            name='Soundstar'
            initialVolume={0.5}
            persistDeviceSelection
            showSaveIcon
            play
            styles={{
              activeColor: tailwindConfig.theme.extend.colors.pink,
              bgColor: window.matchMedia('(prefers-color-scheme: dark)').matches
                ? tailwindConfig.theme.extend.colors.dark
                : tailwindConfig.theme.extend.colors.light,
              color: tailwindConfig.theme.extend.colors.primary,
              loaderColor: '#fff',
              sliderColor: tailwindConfig.theme.extend.colors.primary,
              sliderHandleColor: tailwindConfig.theme.extend.colors.primary,
              sliderTrackColor: tailwindConfig.theme.extend.colors['my-gray'],
              trackArtistColor: tailwindConfig.theme.extend.colors['my-gray'],
              trackNameColor: window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? '#fff'
                : '#000',
            }}
          />
        </div>
      );
    } else {
      return;
    }
  } else {
    return;
  }
};

export default Player;
