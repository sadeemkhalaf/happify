import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import {
  album_url,
  ApiConfig,
  API_KEY,
  artist_url,
  DEFAULT_API_CONFIG,
  smart_playlist,
} from "./api-config"
import { ApiResponseType } from "./api.types"
import { Alert } from "react-native"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.setup()
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "x-happi-key": API_KEY,
      },
    })
  }

  handleAPIError(error) {
    let errorType = error
    if (!error.kind) {
      errorType = { kind: "bad-data", message: "Bad Data" }
    }
    Alert.alert("Error", errorType.message)
    throw errorType
  }

  /**
   * Creates a GET request
   *
   * @param endpoint The endpoint of the API
   * @param params The params for the request
   */
  public async getRequest(endpoint: string, params?: any): ApiResponseType {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(endpoint, { ...params })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) throw problem
      } else {
        return response.data
      }
    } catch (err) {
      this.handleAPIError(err)
    }
  }

  // get smart playlist
  public async getSmartPlaylist(artist_id = 19155) {
    return this.getRequest(`${artist_url}/${artist_id}${smart_playlist}`)
  }

  // get tracks
  public async getAllTracks(artist_id: number = 19155, album_id: number) {
    return this.getRequest(`${artist_url}/${artist_id}${album_url}/${album_id}`)
  }

  // get albums
  public async getAllArtistAlbums(artist_id: number = 19155) {
    return this.getRequest(`${artist_url}/${artist_id}${album_url}/`)
  }

  // get albums
  public async getAllArtistAlbum(artist_id: number = 19155, album_id: number) {
    return this.getRequest(`${artist_url}/${artist_id}${album_url}/${album_id}`)
  }

  // get aartist
  public async getArtist(artist_id: number = 19155) {
    return this.getRequest(`${artist_url}/${artist_id}`)
  }

  // get search results
  public async getSearchResults(searchQuery: string, type: string[] = ["track"]) {
    const stringifyType = type.join(',');
    return this.getRequest(``, { q: searchQuery, lyrics: 1, limit: 50, type: stringifyType })
  }
}

export const AuthApiService = new Api()
