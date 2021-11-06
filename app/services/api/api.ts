import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, API_KEY, DEFAULT_API_CONFIG } from "./api-config"
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
}

export const AuthApiService = new Api()
