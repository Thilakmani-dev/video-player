import { useLocation } from "react-router-dom";

import { VideoThumbnail } from "./video.thumbnail";

const Playlist = () => {
  const playlistState = useLocation();
  const playlistInfo = playlistState.state.playlistInfo;
  const { title, description, total, videos } = playlistInfo;
  return (
    <div className="grid grid-cols-[1fr,5fr] grid-rows-1 p-2">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{total} videos</p>
      </div>
      {videos && (
        <div className="grid grid-cols-4 gap-4 bg-slate-100 p-2">
          {videos.map((videoInfo) => (
            <VideoThumbnail key={videoInfo.id} videoInfo={videoInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
