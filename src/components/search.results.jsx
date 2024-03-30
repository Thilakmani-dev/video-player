import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiPlayList2Fill, RiFileVideoFill } from "react-icons/ri";

import { PlaylistContext } from "../App";

const SearchResults = () => {
  const { searchResults } = useContext(PlaylistContext);

  const dialog = document.getElementById("searchResultsModal");

  function dialogCloseHandler(e) {
    if (e.currentTarget.id === "searchResultsModal")
      dialog.style.display = "none";
  }

  return (
    <div
      id="searchResultsModal"
      className="dialog w-full mt-20 bg-opacity-90 h-screen bg-slate-400"
      onClick={dialogCloseHandler}
    >
      {searchResults && searchResults.length ? (
        <ul id="searchResults" className="w-[100%] flex flex-col items-center">
          {searchResults
            .filter((item) => item.thumb)
            .map((searchResult) => {
              const { type, id, title = "", playlistId = "" } = searchResult;
              return (
                <Link
                  key={id}
                  to={`/${type === "playlist" ? "playlist" : "video"}/${id}`}
                  state={{
                    [type === "playlist" ? "playlistInfo" : "videoInfo"]:
                      searchResult,
                    playlistId: type === "playlist" ? id : playlistId,
                  }}
                  className="flex w-[80%] my-2 mx-2 gap-4 items-center bg-white p-2 border-[1px] border-gray-500 rounded-lg hover:bg-blue-300"
                >
                  <li className="flex items-center gap-2">
                    {type === "playlist" ? (
                      <RiPlayList2Fill />
                    ) : (
                      <RiFileVideoFill />
                    )}
                    {title}
                  </li>
                </Link>
              );
            })}
        </ul>
      ) : (
        <div className="w-[100%] flex flex-col items-center">
          <div className="rounded-lg w-[80%] h-10 my-2 mx-2 gap-4 items-center bg-white p-2 border-[1px] border-gray-500">
            <p>No results found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
