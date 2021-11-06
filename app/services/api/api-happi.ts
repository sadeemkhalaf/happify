import { ApiResponse } from "apisauce"
import { AuthApiService } from "."
import { generateTrackUrl, API_KEY } from "./api-config"
import { getGeneralApiProblem } from "./api-problem"
import * as Types from "./api.types"

/**
 * Gets a list of Albums by artist id.
 */
/**
 * Gets a single user by ID
 */

export const getAlbumTracksTest: Promise<Types.GetArtistAlbumTracksResult> = async (
  artistId: number,
  albumId: number,
) => {
  // make the api call
  const url = generateTrackUrl(artistId, albumId)
  const response: ApiResponse<any> = await AuthApiService.getRequest(
    `${url}/tracks?apikey=${API_KEY}`,
  )

  // the typical ways to die when calling an api
  if (!response.status) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  try {
    return response
  } catch {
    return { status: "bad-data" }
  }
}
