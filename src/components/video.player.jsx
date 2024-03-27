import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const { isControllable, data } = props;
  return <video controls src={data[0].sources[0]} />;
};

VideoPlayer.propTypes = {
  isControllable: PropTypes.bool,
  data: PropTypes.arrayOf(Object),
};

export default VideoPlayer;
