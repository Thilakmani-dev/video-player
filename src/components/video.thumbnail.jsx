import PropTypes from "prop-types";
import { getImageURL } from "../utils/index";

const VideoThumbnail = (props) => {
  const { data } = props;
  const { thumb, title, description } = data;

  return (
    <div className="w-full h-40 max-h-40 grid grid-cols-2">
      <img
        className="w-full h-full object-fill cursor-pointer hover:opacity-80"
        src={getImageURL(thumb)}
        alt={title}
      />
      <div>
        <h3>{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

VideoThumbnail.propTypes = {
  data: PropTypes.object,
};

export default VideoThumbnail;
