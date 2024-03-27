import Playlist from "./components/playlist";
import PlaylistData from "./videos.json";

function App() {
  const { title, videos, description, total } = PlaylistData.playlists[0];
  return (
    <Playlist
      title={title}
      videos={videos}
      description={description}
      total={total}
    />
  );
}

export default App;
