import { useContext, useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";

import { PlaylistContext } from "../App";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { playlists, updateSearchResults } = useContext(PlaylistContext);

  const [searchText, setSearchText] = useState("");

  function updateSearchText(e) {
    setSearchText(e.target.value);
  }

  useEffect(
    function findSearchResults() {
      const dialog = document.getElementById("searchResultsModal");
      if (!searchText) {
        updateSearchResults([]);
        dialog.style.display = "none";
        return () => {};
      }
      let foundVideos = [];
      playlists?.forEach((playlist) => {
        foundVideos.push(
          ...playlist.videos
            .map((video) => ({ ...video, playlistId: playlist.id }))
            .filter((video) =>
              video.title.toLowerCase().includes(searchText.toLowerCase())
            )
        );
      });
      dialog.style.display = "flex";
      updateSearchResults([...foundVideos]);
    },
    [searchText]
  );

  return (
    <div className="searchBar w-full grid grid-cols-[1fr,8fr] justify-center mt-5 px-5">
      <Link to="/" className="m-auto">
        <FaVideo className="w-[50px] h-[50px]" />
      </Link>
      <div className="w-full justify-center flex items-center gap-2 p-1 rounded-lg bg-white focus:border-blue-400">
        <RiSearchLine />
        <input
          type=""
          placeholder="Search videos"
          className="w-full rounded-lg p-1 focus:outline-none"
          value={searchText}
          onChange={updateSearchText}
        />
      </div>
    </div>
  );
};

export default SearchBar;
