import {
  FeedResponse,
  FeedCreateRequest,
  FeedUpdateRequest,
} from "../types/feed";
import { makeRequest } from "../utils/request";

/**
 * Client for managing RTB feeds through the API.
 *
 * This client provides methods for creating, retrieving, and updating feed configurations.
 * It handles authentication and request formatting for all feed-related operations.
 *
 * @example
 * ```typescript
 * const client = new FeedClient('your-api-key');
 *
 * // Get feed details
 * const feed = await client.getFeed(123);
 *
 * // Create a new feed
 * const newFeed = await client.createFeed({
 *   general_information: { ... },
 *   open_rtb: { ... },
 *   // ... other required fields
 * });
 * ```
 */
export class FeedClient {
  private apiKey: string;

  /**
   * Creates a new instance of the FeedClient.
   *
   * @param apiKey - The API key used for authentication with the feed management API.
   *                 This key should have appropriate permissions for feed operations.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Retrieves detailed information about a specific feed.
   *
   * @param feedId - The unique identifier of the feed to retrieve.
   * @returns A promise that resolves to the feed details response.
   * @throws Will throw an error if the feed is not found or if the request fails.
   *
   * @example
   * ```typescript
   * const feedDetails = await client.getFeed(123);
   * console.log(feedDetails.data.feed.general_information.name);
   * ```
   */
  async getFeed(feedId: number): Promise<FeedResponse> {
    return makeRequest<FeedResponse>(
      this.apiKey,
      `/feed/details/${feedId}`,
      "GET",
    );
  }

  /**
   * Creates a new RTB feed with the specified configuration.
   *
   * @param data - The complete feed configuration, including all required fields
   *               such as general information, OpenRTB settings, and targeting options.
   * @returns A promise that resolves to the newly created feed's details.
   * @throws Will throw an error if the feed creation fails or if required fields are missing.
   *
   * @example
   * ```typescript
   * const newFeed = await client.createFeed({
   *   general_information: {
   *     name: "RTB Feed 2025",
   *     urls: ["https://example.com/rtb"],
   *     minimum_quality: 8,
   *     // ... other required fields
   *   },
   */
  async createFeed(data: FeedCreateRequest): Promise<FeedResponse> {
    return makeRequest<FeedResponse>(
      this.apiKey,
      "/campaign/add",
      "POST",
      data,
    );
  }

  /**
   * Updates an existing feed's configuration.
   *
   * @param feedId - The unique identifier of the feed to update.
   * @param data - The feed configuration containing the fields to update.
   * @returns A promise that resolves to the updated feed's details.
   * @throws Will throw an error if the feed update fails or if the feed is not found.
   *
   * @example
   * ```typescript
   * const updatedFeed = await client.updateFeed(123, {
   *   general_information: {
   *     name: "Updated RTB Feed",
   *     minimum_quality: 9,
   *     // ... other fields to update
   *   },
   *   open_rtb: {
   *     // ... updated OpenRTB settings
   *   },
   *   // ... other fields to update
   * });
   * ```
   */
  async updateFeed(
    feedId: number,
    data: FeedUpdateRequest,
  ): Promise<FeedResponse> {
    return makeRequest<FeedResponse>(
      this.apiKey,
      `/feed/update/${feedId}`,
      "PUT",
      data,
    );
  }
}
