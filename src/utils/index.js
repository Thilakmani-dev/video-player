export function getImageURL(fileName) {
  return new URL(`../assets/images/${fileName}`, import.meta.url).href;
}

export function findPlaylist(playlistId, playlists = []) {
  console.log("playlists", playlists);
  if (playlists.length === 0) return;
  return playlists.find((playlist) => playlist.id === playlistId);
}
