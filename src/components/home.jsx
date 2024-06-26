import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiPlayList2Fill, RiPlayCircleLine } from "react-icons/ri";

import { PlaylistContext } from "../App";

import { getImageURL } from "../utils";

const Home = () => {
  const { playlists } = useContext(PlaylistContext);
  return (
    <main className="my-8 mt-20 py-2 px-4">
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
                <div className="w-full h-64 max-h-64 min-h-64 flex flex-col p-2 bg-white hover:bg-blue-300 rounded-lg draggable cursor-pointer [&_img]:hover:opacity-75 [&_div]:hover:flex">
                  <img
                    className="w-full h-full object-fill cursor-pointer rounded-lg"
                    src={getImageURL(videos[0].thumb)}
                    alt={title}
                    draggable={false}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-lg">{title}</h3>
                    <div className="hidden gap-1 items-center">
                      <p>View all</p>
                      <RiPlayCircleLine />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Home;
