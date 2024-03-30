import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Playlist from "./components/playlist";
import VideoPlayer from "./components/video.player";
import Home from "./components/home";
import PlaylistData from "./videos.json";
import SearchBar from "./components/search.bar";
import SearchResults from "./components/search.results";

import "./App.css";

export const PlaylistContext = createContext("playlists");

function App() {
  const [playlists, setPlaylists] = useState(PlaylistData.playlists);
  const [searchResults, setSearchResults] = useState([]);

  function updatePlaylists(updatedPlaylists) {
    setPlaylists(updatedPlaylists);
  }

  function updateSearchResults(searchedValues) {
    setSearchResults(searchedValues);
  }

  return (
    <PlaylistContext.Provider
      value={{ playlists, searchResults, updatePlaylists, updateSearchResults }}
    >
      <div className="w-full h-screen max-h-screen overflow-y-scroll bg-slate-200">
        <SearchBar />
        <SearchResults />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
        </Routes>
      </div>
    </PlaylistContext.Provider>
  );
}

export default App;
