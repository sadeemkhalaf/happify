import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export interface Artist {
  id_artist: number
  artist: string
  mbid: string
  gender: string
  country: string
  YouTube: string
  instagram: string
  twitter: string
  Facebook: string
  website: string
  spotify: string
  cover: string
  api_albums: string
}

export interface Track {
  track: string
  id_track: number
  haslyrics: boolean
  artist: string
  id_artist: number
  album: string
  id_album: number
  bpm: number
  lang: string
  cover: string
  api_artist: string
  api_albums: string
  api_album: string
  api_tracks: string
  api_track: string
  api_lyrics: string
}

export interface Album {
  album: string
  id_album: number
  id_artist: number
  artist: string
  cover: string
  upc: string
  asin: string
  mbid: string
  genres?: any
  realease: string
  label: string
  explicit: boolean
  api_artist: string
  api_albums: string
  api_album: string
  api_tracks: string
}


// get each type
export type GetArtistResult = { kind: "ok"; result: Artist } | GeneralApiProblem
export type GetAlbumResult = { kind: "ok"; result: Album } | GeneralApiProblem
export type GetTrackResult = { kind: "ok"; result: Track } | GeneralApiProblem

// artist albums and tracks
export type GetArtistAlbumsResult = { kind: "ok"; result: Album[], length?: number } | GeneralApiProblem
export type GetArtistAlbumTracksResult = { kind: "ok"; result: Track[], length?: number } | GeneralApiProblem

//search results
export type GetTracksSearchResult = { kind: "ok"; result: Track[], length?: number } | GeneralApiProblem
export type GetArtistsSearchResult = { kind: "ok"; result: Artist[], length?: number } | GeneralApiProblem

//Album tracks
export type GetAlbumsResult = { kind: "ok"; result: Track[], length?: number } | GeneralApiProblem

export type GetSmartPlaylistResult = { kind: "ok"; result: Track[], length?: number } | GeneralApiProblem


export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
