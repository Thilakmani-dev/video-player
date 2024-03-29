/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getImageURL } from "../utils/index";
import { VIDEO_THUMBNAIL_TYPES } from "../utils/constants";

import "./video.thumbnail.css";

export const VideoThumbnail = (props) => {
  const { videoInfo, type } = props;
  const { thumb, title, id: videoId } = videoInfo;

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
    <Link to={`/video/${videoId}`} state={{ videoInfo: videoInfo }}>
      <div
        className={
          type === VIDEO_THUMBNAIL_TYPES.RECTANGLE
            ? "flex gap-4 items-center bg-slate-200 p-2 border-[1px] border-gray-500 rounded-lg hover:bg-blue-400 hover:text-white"
            : "w-full h-60 max-h-60 flex flex-col p-2 bg-white hover:bg-slate-300 rounded-lg draggable cursor-move"
        }
        draggable
      >
        <img
          className={
            type === VIDEO_THUMBNAIL_TYPES.RECTANGLE
              ? "w-[25%] rounded-lg"
              : "w-full h-full object-fill cursor-pointer rounded-lg"
          }
          src={getImageURL(thumb)}
          alt={title}
          draggable={false}
        />
        <div>
          <h3 className="text-lg">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

VideoThumbnail.propTypes = {
  videoInfo: PropTypes.object,
  type: PropTypes.string,
};
