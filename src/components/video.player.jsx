import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiPlayList2Fill } from "react-icons/ri";
import { CgPlayTrackNextR } from "react-icons/cg";

import { VideoThumbnail } from "./video.thumbnail";
import { PlaylistContext } from "../App";

import { VIDEO_THUMBNAIL_TYPES } from "../utils/constants";
import { findPlaylist } from "../utils";

const VideoPlayer = () => {
  const { playlists } = useContext(PlaylistContext);
  const data = useLocation();
  const { id: videoId } = useParams();
  const navigate = useNavigate();
  const [allPlaylistVideos, setAllPlaylistVideos] = useState([]);
  const { videoInfo, playlistId } = data.state;

  const currentPlaylist = findPlaylist(playlistId, playlists);
  const currentPlaylistVideos = currentPlaylist.videos;

  const currentIndex = currentPlaylistVideos.findIndex(
    (video) => video.id === videoId
  );

  const nextVideos = useMemo(() => {
    return currentPlaylistVideos.slice(
      currentIndex + 1,
      currentPlaylistVideos.length
    );
  }, [currentPlaylistVideos, currentIndex]);

  const previousVideos = useMemo(() => {
    return currentPlaylistVideos.slice(0, currentIndex);
  }, [currentPlaylistVideos, currentIndex]);

  const playNextVideo = useCallback(
    function updatedPlayNextVideo() {
      navigate(`/video/${allPlaylistVideos[0].id}`, {
        state: {
          videoInfo: allPlaylistVideos[0],
          playlistId,
        },
      });
    },
    [allPlaylistVideos, navigate, playlistId]
  );

  useEffect(
    function updatePlaylistVideos() {
      setAllPlaylistVideos([...nextVideos, ...previousVideos]);
    },
    [videoId, nextVideos, previousVideos]
  );

  useEffect(
    function eventHandlers() {
      function playNextVideoFromPlaylist() {
        //playnextvideo after 2 seconds
        setTimeout(() => playNextVideo(), 2000);
      }
      const videoElement = document.getElementById("video-player");
      videoElement.addEventListener("ended", playNextVideoFromPlaylist);
      return () => {
        videoElement.removeEventListener("ended", playNextVideoFromPlaylist);
      };
    },
    [playNextVideo]
  );

  return (
    <div className="w-full h-[90%] max-height-[90%] overflow-y-hidden bg-slate-200 p-4 mt-10">
      <div className="w-full h-full md:h-full sm:flex md:grid sm:flex-col md:grid-cols-[5fr,2fr] gap-4 p-2 pt-8">
        <div className="sm:h-[70%] md:h-[90%] bg-white rounded-lg p-2">
          <video
            controls
            src={videoInfo.sources[0]}
            className="w-full h-[90%] rounded-lg"
            autoPlay
            id="video-player"
          />
          <div className="flex justify-between items-center p-2">
            <p className="font-medium text-xl">{videoInfo.title}</p>
            <button
              onClick={playNextVideo}
              className="flex items-center gap-2 bg-slate-100 p-2 border-[1px] border-gray-500 rounded-lg hover:bg-blue-300"
            >
              <span>Play Next</span>
              <CgPlayTrackNextR />
            </button>
            {/* <p className="pt-4 font-normal text-sm">{videoInfo.description}</p> */}
          </div>
        </div>
        <PlaylistVideos
          videos={allPlaylistVideos}
          playlistTitle={currentPlaylist.title}
          playlistId={playlistId}
        />
      </div>
    </div>
  );
};

function PlaylistVideos(props) {
  const { videos = [], playlistTitle, playlistId } = props;
  return (
    <section className="sm:h-[100%] md:h-[90%] md:max-h-[90%] overflow-y-scroll bg-white rounded-lg p-2 px-2 gap-2 md:videoPlaylists">
      <p className="font-medium text-xl flex items-center gap-2">
        <RiPlayList2Fill />
        <span>{playlistTitle}</span>
      </p>
      <p className="font-medium text-sm mt-2 mb-4">{videos.length} Videos</p>
      <div className="h-auto flex flex-col gap-2">
        {videos.map((videoInfo) => (
          <VideoThumbnail
            key={videoInfo.id}
            videoInfo={videoInfo}
            type={VIDEO_THUMBNAIL_TYPES.RECTANGLE}
            playlistId={playlistId}
          />
        ))}
      </div>
    </section>
  );
}

PlaylistVideos.propTypes = {
  videos: PropTypes.array,
  playlistTitle: PropTypes.string,
  playlistId: PropTypes.string,
};

VideoPlayer.propTypes = {
  isControllable: PropTypes.bool,
  data: PropTypes.arrayOf(Object),
  location: PropTypes.object,
};

export default VideoPlayer;
