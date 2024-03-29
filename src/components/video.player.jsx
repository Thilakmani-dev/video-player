import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { VideoThumbnail } from "./video.thumbnail";

import { VIDEO_THUMBNAIL_TYPES } from "../utils/constants";

import Videos from "../videos.json";

const VideoPlayer = () => {
  const data = useLocation();
  const videoInfo = data.state.videoInfo;
  return (
    <div className="w-full h-screen bg-slate-200 p-8">
      <div className="w-full h-full grid sm:grid-cols-1 md:grid-cols-[5fr,2fr] gap-4 p-2 pt-8">
        <div className="h-[80%] bg-white rounded-lg p-2">
          <video
            controls
            src={videoInfo.sources[0]}
            className="w-full h-[90%] rounded-lg"
            autoPlay
          />
          <p className="pt-4 font-medium text-xl">{videoInfo.title}</p>
        </div>
        <PlaylistVideos videos={Videos} />
      </div>
    </div>
  );
};

function PlaylistVideos(props) {
  const { videos } = props;
  return (
    <div className="grid grid-cols-1 sm:h-auto h-[80%] max-h-[80%] overflow-y-scroll bg-white rounded-lg p-2 px-2 gap-2">
      <p className="font-medium text-xl">{videos.playlists[0].title}</p>
      <p className="font-medium text-sm">
        {videos.playlists[0].videos.length} Videos
      </p>
      {videos.playlists[0].videos.map((videoInfo) => (
        <VideoThumbnail
          key={videoInfo.id}
          videoInfo={videoInfo}
          type={VIDEO_THUMBNAIL_TYPES.RECTANGLE}
        />
      ))}
    </div>
  );
}

PlaylistVideos.propTypes = {
  videos: PropTypes.array,
};

VideoPlayer.propTypes = {
  isControllable: PropTypes.bool,
  data: PropTypes.arrayOf(Object),
  location: PropTypes.object,
};

export default VideoPlayer;
