import React from 'react';
import usePlayer from '../hooks/usePlayer';
import SongCard from '../components/SongCard';


const Saved: React.FC = () => {
  const { likedSongs } = usePlayer();

  return (
    <div>
      <h1>Liked Songs</h1>
      {likedSongs.length === 0 ? (
        <p>No liked songs available.</p>
      ) : (
        <div>
          {[...likedSongs].reverse().map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
