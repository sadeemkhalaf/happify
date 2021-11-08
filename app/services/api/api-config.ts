// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
export const API_URL = "https://api.happi.dev/v1/music";
export const API_KEY = "8742c6U7Yzl8udLqg17aGJUwmAZos5Bj9SY9pPMd25jGsMnaWKQkA1IY";

export enum searchKey {
  ARTIST = "artists",
  TRACK = "tracks",
  ALBUM = "albums",
  SMART_PLAYLIST = "smart-playlist"
}

// base urls
export const artist_url = `/${searchKey.ARTIST}`
export const album_url = `/${searchKey.ALBUM}`
export const smart_playlist = `/${searchKey.SMART_PLAYLIST}`

export const generateTrackUrl = (artistId: number, albumId: number) => {
  //  /artists/:id_artist/albums/:id_album/tracks/:id_track
  return `${artist_url}/${artistId}${album_url}/${albumId}`
}


/*
https://api.happi.dev/v1/music?q=happy&limit=15&
apikey=8742c6U7Yzl8udLqg17aGJUwmAZos5Bj9SY9pPMd25jGsMnaWKQkA1IY&type=artist&lyrics=0
*/

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
}
