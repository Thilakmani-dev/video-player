import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiPlayList2Fill } from "react-icons/ri";

import { PlaylistContext } from "../App";

import { getImageURL } from "../utils";

const Home = () => {
  const { playlists } = useContext(PlaylistContext);
  return (
    <div className="my-8 mt-20 py-2 px-4">
      <p className="my-2 flex items-center gap-2">
        <RiPlayList2Fill />
        <span>Playlists</span>
      </p>
      {playlists && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {playlists.map((playlist) => {
            const { title, id: playlistId, videos } = playlist;
            return (
              <Link
                to={`/playlist/${playlistId}`}
                key={playlistId}
                state={{
                  playlistId: playlistId,
                }}
              >
                <div className="w-full h-64 max-h-64 min-h-64 flex flex-col p-2 bg-white hover:bg-blue-300 rounded-lg draggable cursor-pointer">
                  <img
                    className="w-full h-full object-fill cursor-pointer rounded-lg"
                    src={getImageURL(videos[0].thumb)}
                    alt={title}
                    draggable={false}
                  />
                  <div className="mt-2">
                    <h3 className="text-lg">{title}</h3>
                    {/* <p className="text-sm">View full playlist</p> */}
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
