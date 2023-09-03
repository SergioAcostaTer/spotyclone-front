import { Link } from "react-router-dom";

const PlaylistButton = ({ name }: { name: string }) => {
  return (
    <Link to={`/playlist/${name}`}>
      <h1>{name}</h1>
    </Link>
  );
};

export default PlaylistButton;
