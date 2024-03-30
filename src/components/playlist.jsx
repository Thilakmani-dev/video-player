import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiPlayCircleLine } from "react-icons/ri";

import { VideoThumbnail } from "./video.thumbnail";
import { PlaylistContext } from "../App";
import { findPlaylist, getImageURL } from "../utils";

const Playlist = () => {
  const { playlists, updatePlaylists } = useContext(PlaylistContext);

  const playlistState = useLocation();
  const navigate = useNavigate();
  const draggingVideoRef = useRef(null);
  const hoveringVideoRef = useRef(null);

  const { playlistId } = playlistState.state;
  const currentPlaylist = findPlaylist(playlistId, playlists);
  const { title, description, total, videos } = currentPlaylist;

  useEffect(function manageEventHandlers() {
    const draggableElements = document.querySelectorAll(".draggable");
    draggableElements.forEach((draggableElement, key) => {
      draggableElement.addEventListener("dragstart", () => {
        console.log("dragging start index", key);

        draggingVideoRef.current = key;
        draggableElement.classList.add("isDragging");
      });
      draggableElement.addEventListener("dragenter", () => {
        console.log("dragging enter index", key);

        hoveringVideoRef.current = key;
      });
      draggableElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      draggableElement.addEventListener("dragend", () => {
        draggableElement.classList.remove("isDragging");
        handleSort();
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

  function handleSort() {
    const clonedVideos = [...videos];
    const currentlyDragging = videos[draggingVideoRef.current];
    clonedVideos[draggingVideoRef.current] =
      clonedVideos[hoveringVideoRef.current];
    clonedVideos[hoveringVideoRef.current] = currentlyDragging;
    updatePlaylists([
      ...playlists.filter((playlist) => playlist.id !== playlistId),
      { id: playlistId, ...currentPlaylist, videos: clonedVideos },
    ]);
  }

  function playVideo() {
    navigate(`/video/${currentPlaylist.videos[0].id}`, {
      state: { videoInfo: currentPlaylist.videos[0] },
    });
  }

  return (
    <div className="w-full h-[90%] max-h-[90%] grid sm:grid-col-1 md:grid-cols-[1fr,5fr] grid-rows-1 p-2 bg-slate-200 mt-20">
      <section className="sm:hidden md:flex flex-col px-4">
        <img
          className="w-full h-40 object-fill cursor-pointer rounded-lg"
          src={getImageURL(videos[0].thumb)}
          alt={title}
          draggable={false}
        />
        <h3 className="font-medium text-lg mt-2">{title}</h3>
        <div className="my-4">
          <p>{description}</p>
          <p>{total} videos</p>
        </div>
        <button
          className="flex gap-2 items-center bg-white p-2 w-full hover:bg-blue-300 justify-center rounded-3xl"
          onClick={playVideo}
        >
          <RiPlayCircleLine />
          Play all
        </button>
      </section>
      {videos && (
        <section className="grid h-full max-h-full overflow-y-scroll sm:grid-cols-2 md:grid-cols-4 grid-rows-[max-content] gap-4 bg-slate-100 p-2">
          {videos.map((videoInfo, index) => (
            <VideoThumbnail
              key={videoInfo.id}
              videoInfo={videoInfo}
              fileIndex={index}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Playlist;
