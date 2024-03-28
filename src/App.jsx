import { Route, Routes } from "react-router-dom";
import Playlist from "./components/playlist";
import VideoPlayer from "./components/video.player";
import PlaylistData from "./videos.json";

function App() {
  const { title, videos, description, total } = PlaylistData.playlists[0];
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Playlist
            title={title}
            videos={videos}
            description={description}
            total={total}
          />
        }
      />
      <Route path="/play" element={<VideoPlayer />} />
    </Routes>
  );
}

export default App;
