import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  let data = useLocation();
  let videoInfo = data.state.videoInfo;
  return <video controls src={videoInfo.sources[0]} />;
};

VideoPlayer.propTypes = {
  isControllable: PropTypes.bool,
  data: PropTypes.arrayOf(Object),
  location: PropTypes.object,
};

export default VideoPlayer;
