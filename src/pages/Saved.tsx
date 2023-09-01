import React from 'react';
import usePlayer from '../hooks/usePlayer';
import SongCard from '../components/SongCard';


const Saved: React.FC = () => {
  const { likedSongs, nextSong, prevSong } = usePlayer();
  const [playLiked] = usePlayer(state => [state.playLiked])

  return (
    <div className='w-full'>
      <h1>Liked Songs</h1>
      <h2 onClick={nextSong}>prev</h2>

      <h2 onClick={playLiked}>Play all</h2>
      <h2 onClick={prevSong}>next</h2>
      {likedSongs.length === 0 ? (
        <p>No liked songs available.</p>
      ) : (
        <div className='w-full'>
          {[...likedSongs].reverse().map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
