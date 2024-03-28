import PropTypes from "prop-types";
import { getImageURL } from "../utils/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./video.thumbnail.css";

const VideoThumbnail = (props) => {
  const { videoInfo } = props;
  const { thumb, title, description } = videoInfo;

  useEffect(function manageEventHandlers() {
    const draggableElements = document.querySelectorAll(".draggable");
    draggableElements.forEach((draggableElement) => {
      draggableElement.addEventListener("dragstart", () => {
        draggableElement.classList.add("isDragging");
      });
      draggableElement.addEventListener("dragend", () => {
        draggableElement.classList.remove("isDragging");
      });
    });
    return () => {
      draggableElements.forEach((draggableElement) => {
        draggableElement.removeEventListener("dragstart", () => {
          draggableElement.classList.add("isDragging");
        });
        draggableElement.removeEventListener("dragend", () => {
          draggableElement.classList.remove("isDragging");
        });
      });
    };
  }, []);

  return (
    <Link to="/play" state={{ videoInfo: videoInfo }}>
      <div
        className="w-full h-60 max-h-60 flex flex-col p-2 bg-white hover:bg-slate-300 rounded-lg draggable cursor-move"
        draggable
      >
        <img
          className="w-full h-full object-fill cursor-pointer"
          src={getImageURL(thumb)}
          alt={title}
          draggable={false}
        />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="truncate">{description}</p>
        </div>
      </div>
    </Link>
  );
};

VideoThumbnail.propTypes = {
  videoInfo: PropTypes.object,
};

export default VideoThumbnail;
