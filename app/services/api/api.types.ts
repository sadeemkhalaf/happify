import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { ApiOkResponse } from "apisauce";

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

export type ApiResponseType = Promise<void | ApiOkResponse<any> | GeneralApiProblem>;

// get each type
export type GetArtistResult = { success: boolean, length?: number, result: Artist } | GeneralApiProblem
export type GetAlbumResult = { success: boolean, length?: number,result: Album } | GeneralApiProblem
export type GetTrackResult = { success: boolean, length?: number,result: Track } | GeneralApiProblem

// artist albums and tracks
export type GetArtistAlbumsResult = { success: boolean ,result: Album[]; length?: number } | GeneralApiProblem
export type GetArtistAlbumTracksResult = {success: boolean, result: Track[]; length?: number } | GeneralApiProblem

// search results
export type GetTracksSearchResult = { success: boolean, result: Track[]; length?: number } | GeneralApiProblem
export type GetArtistsSearchResult = { success: boolean, result: Artist[]; length?: number } | GeneralApiProblem

// Album tracks
export type GetAlbumsResult = { success: boolean, result: Track[]; length?: number } | GeneralApiProblem

export type GetSmartPlaylistResult = {success: boolean, result: Track[]; length?: number } | GeneralApiProblem

export type GetUsersResult = { users: User[] } | GeneralApiProblem
export type GetUserResult = { user: User } | GeneralApiProblem

export type GetCharactersResult = { characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { character: Character } | GeneralApiProblem
