import { useContext } from "react";
import { Link } from "react-router-dom";

import { PlaylistContext } from "../App";
import SearchBar from "./search.bar.jsx";

import { getImageURL } from "../utils";

const Home = () => {
  const { playlists } = useContext(PlaylistContext);
  return (
    <div>
      <SearchBar />
      <p>Playlists</p>
      {playlists && (
        <div>
          {playlists.map((playlist) => {
            const { title, id: playlistId, videos } = playlist;
            return (
              <Link
                to={`/playlist/${playlistId}`}
                key={playlistId}
                state={{
                  playlistInfo: playlist,
                }}
              >
                <div className="w-full h-60 max-h-60 flex flex-col p-2 bg-white hover:bg-slate-300 rounded-lg draggable cursor-move">
                  <img
                    className="w-full h-full object-fill cursor-pointer rounded-lg"
                    src={getImageURL(videos[0].thumb)}
                    alt={title}
                    draggable={false}
                  />
                  <div>
                    <h3 className="text-lg">{title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
