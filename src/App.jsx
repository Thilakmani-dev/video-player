import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Playlist from "./components/playlist";
import VideoPlayer from "./components/video.player";
import Home from "./components/home";
import PlaylistData from "./videos.json";

export const PlaylistContext = createContext("playlists");

function App() {
  const [playlists, setPlaylists] = useState(PlaylistData.playlists);

  function updatePlaylist(playlistId, data) {
    setPlaylists((prev) => ({ ...prev, playlistId: data }));
  }

  return (
    <PlaylistContext.Provider value={{ playlists, updatePlaylist }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </PlaylistContext.Provider>
  );
}

export default App;
