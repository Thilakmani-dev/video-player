import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { RiFileVideoFill } from "react-icons/ri";

import { getImageURL } from "../utils/index";
import { VIDEO_THUMBNAIL_TYPES } from "../utils/constants";

export const VideoThumbnail = (props) => {
  const {
    videoInfo,
    type = VIDEO_THUMBNAIL_TYPES.SQUARE,
    fileIndex = 0,
  } = props;
  const { thumb, title, id: videoId } = videoInfo;

  if (type === VIDEO_THUMBNAIL_TYPES.RECTANGLE) {
    return (
      <Link to={`/video/${videoId}`} state={{ videoInfo: videoInfo }}>
        <div className="flex gap-4 items-center bg-slate-100 p-2 border-[1px] border-gray-500 rounded-lg hover:bg-blue-300">
          <img
            className="w-[25%] rounded-lg"
            src={getImageURL(thumb)}
            alt={title}
            draggable={false}
          />
          <h3 className="text-lg pt-2 truncate">{title}</h3>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/video/${videoId}`} state={{ videoInfo: videoInfo }}>
      <div
        className="w-full sm:h-auto sm:max-h-80 md:h-60 md:max-h-60 flex flex-col p-2 bg-white hover:bg-blue-300 rounded-lg draggable cursor-move"
        draggable
      >
        <img
          className="w-full sm:h-[50%] md:h-full object-fill cursor-pointer rounded-lg"
          src={getImageURL(thumb)}
          alt={title}
          draggable={false}
        />
        <div className="flex items-center justify-between">
          <h3 className="text-lg pt-2 truncate max-w-[80%]">
            {fileIndex + 1}.&nbsp;{title}
          </h3>
          <RiFileVideoFill />
        </div>
      </div>
    </Link>
  );
};

VideoThumbnail.propTypes = {
  videoInfo: PropTypes.object,
  type: PropTypes.string,
  fileIndex: PropTypes.string,
};
