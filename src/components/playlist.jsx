import PropTypes from "prop-types";

import VideoThumbnail from "./video.thumbnail";

const Playlist = (props) => {
  const { title, videos, description, total } = props;
  return (
    <div className="grid grid-cols-[300px_minmax(900px,_1fr)_100px] p-2">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{total} videos</p>
      </div>
      {videos && (
        <div className="grid grid-cols-4 gap-4 bg-slate-100 p-2">
          {videos.map((videoInfo) => {
            console.log("video", videoInfo);
            return <VideoThumbnail key={videoInfo.id} videoInfo={videoInfo} />;
          })}
        </div>
      )}
    </div>
  );
};

Playlist.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  total: PropTypes.number,
  videos: PropTypes.arrayOf(PropTypes.object),
};

export default Playlist;
