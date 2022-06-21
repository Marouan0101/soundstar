import { SearchIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import styles from '/styles/Search.module.css';
import { debounce } from 'lodash';

const Search = () => {
  const spotifyApi = useSpotify();
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState('');

  const search = () => {
    if (query) {
      spotifyApi
        .search(
          query,
          ['track', 'artist', 'album', 'show', 'episode', 'playlist'],
          { limit: 5 }
        )
        .then((data) => {
          setResults(data.body);
        });
    }
  };

  const searchResults = () => {
    if (query === '') {
      return;
    } else if (query !== '' && !results) {
      return <div className='absolute'>No Results</div>;
    } else if (query !== '' && results) {
      return (
        <div className='absolute left-0 flex max-h-[27rem] max-w-full space-x-3 overflow-y-hidden overflow-x-scroll rounded-br-xl border border-l-0 border-t-0 border-gray-400/50 bg-slate-50 p-3 scrollbar-hide dark:bg-dark'>
          {/* Track list */}
          {results.tracks.items.length ? (
            <div className='border-r border-gray-400/50 pr-3'>
              <div className='mb-2 text-xl font-bold'>Songs</div>
              <div className='space-y-2'>
                {results?.tracks?.items.map((track) => {
                  return (
                    <div
                      key={track.id}
                      className={`${styles.item} flex items-center overflow-hidden rounded-lg bg-gray-300/30 hover:bg-gray-300/50 dark:bg-gray-400/10 dark:hover:bg-gray-400/20`}
                    >
                      <div
                        className={`relative w-16 items-center ${styles.imageAndPlayContainer}`}
                      >
                        <img
                          src='/playIcon.svg'
                          className={`${styles.playIcon} item-center absolute top-2 left-2 z-50 hidden h-12 w-12 cursor-pointer rounded-full border-2 border-transparent p-1 pl-2 hover:border-primary`}
                          onClick={() =>
                            spotifyApi
                              .play({
                                uris: [track.uri],
                              })
                              .catch((err) => {})
                          }
                        />
                        <img
                          className={`${styles.image} object-cover`}
                          src={track.album.images[0]?.url}
                        />
                      </div>
                      <div className='px-2'>
                        <div className='whitespace-nowrap'>{track.name}</div>
                        <div className='flex space-x-2'>
                          {track.artists.map((artist) => {
                            return (
                              <div className='cursor-pointer whitespace-nowrap text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80'>
                                {artist.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ''
          )}

          {/* Album List */}
          {results.albums.items.length ? (
            <div className='border-r border-gray-400/50 pr-3'>
              <div className='mb-2 text-xl font-bold'>Albums</div>
              <div className='space-y-2'>
                {results?.albums?.items.map((album) => {
                  return (
                    <div
                      key={album.id}
                      className={`${styles.item} flex items-center overflow-hidden rounded-lg bg-gray-300/30 hover:bg-gray-300/50 dark:bg-gray-400/10 dark:hover:bg-gray-400/20`}
                    >
                      <div
                        className={`relative w-16 items-center ${styles.imageAndPlayContainer}`}
                      >
                        <img
                          src='/playIcon.svg'
                          className={`${styles.playIcon} item-center absolute top-2 left-2 z-50 hidden h-12 w-12 cursor-pointer rounded-full border-2 border-transparent p-1 pl-2 hover:border-primary`}
                        />
                        <img
                          className={`${styles.image} object-cover`}
                          src={album.images[0]?.url}
                        />
                      </div>
                      <div className='px-2'>
                        <div className='whitespace-nowrap'>{album.name}</div>
                        <div className='flex space-x-2'>
                          {album.artists.map((artist) => {
                            return (
                              <div className='cursor-pointer whitespace-nowrap text-gray-500 hover:text-primary hover:underline dark:text-gray-300/50 dark:hover:text-gray-200/80'>
                                {artist.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ''
          )}

          {/* Artist List */}
          {results.artists.items.length ? (
            <div className='border-r border-gray-400/50 pr-3'>
              <div className='mb-2 text-center text-xl font-bold'>Artists</div>
              <div className='space-y-4'>
                {results?.artists?.items.map((artist) => {
                  return (
                    <div
                      key={artist.id}
                      className={`${styles.item} text-center`}
                    >
                      <div
                        className={`m-auto h-16 w-16 items-center overflow-hidden rounded-full  ${styles.imageAndPlayContainer}`}
                      >
                        <img
                          src='/playIcon.svg'
                          className={`${styles.playIcon} item-center absolute z-50 m-auto hidden h-12 w-12 cursor-pointer rounded-full border-2 border-transparent p-1 pl-2 hover:border-primary`}
                        />
                        <img
                          className={`${styles.image} object-cover`}
                          src={artist.images[0]?.url}
                        />
                      </div>
                      <div className='px-2'>
                        <div>{artist.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ''
          )}

          {/* Shows List */}
          {results.shows.items.length ? (
            <div className=''>
              <div className='mb-2 text-xl font-bold'>Shows</div>
              <div className='space-y-2'>
                {results?.shows?.items.map((show) => {
                  return (
                    <div
                      key={show.id}
                      className={`${styles.item} flex items-center overflow-hidden rounded-lg bg-gray-300/30 hover:bg-gray-300/50 dark:bg-gray-400/10 dark:hover:bg-gray-400/20`}
                    >
                      <div
                        className={`relative w-16 items-center ${styles.imageAndPlayContainer}`}
                      >
                        <img
                          src='/playIcon.svg'
                          className={`${styles.playIcon} item-center absolute top-2 left-2 z-50 hidden h-12 w-12 cursor-pointer rounded-full border-2 border-transparent p-1 pl-2 hover:border-primary`}
                        />
                        <img
                          className={`${styles.image} object-cover`}
                          src={show.images[0]?.url}
                        />
                      </div>
                      <div className='whitespace-nowrap px-2'>
                        <div>{show.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex w-80 rounded-full border-2 border-primary pr-2'>
        <SearchIcon className='mx-2 w-6' />
        <input
          className='flex-1 rounded-r-full bg-transparent py-2 text-lg  outline-none'
          onChange={(e) => {
            setQuery(e.target.value);
            search();
          }}
          placeholder='songs, artist, albums, shows'
        />
      </div>

      {searchResults()}
    </div>
  );
};

export default Search;
