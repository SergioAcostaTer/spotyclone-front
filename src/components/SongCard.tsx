import useControl from '../hooks/useControls';
import { SearchResult } from '../types';

interface Props {
  song: SearchResult
}

const SongCard = ({ song }: Props) => {
  const {addAndPlay} = useControl()


  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200" onClick={() => addAndPlay(song)}>
      <img src={song.thumbnail} alt={`${song.title} Thumbnail`} className="w-16 h-16 rounded-md" />
      <div className="flex-grow">
        <h2 className="text-lg font-medium">{song.title}</h2>
        <p className="text-gray-500">{song.artist}</p>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M8 20V4" />
        </svg>
      </div>
    </div>
  );
};

export default SongCard;
