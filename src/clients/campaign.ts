import {
  CampaignResponse,
  CampaignCreateRequest,
  CampaignUpdateRequest,
} from "../types/campaign";
import { makeRequest } from "../utils/request";

/**
 * Client for managing advertising campaigns through the API.
 *
 * This client provides methods for creating, retrieving, and updating campaign configurations.
 * It handles authentication and request formatting for all campaign-related operations.
 */
export class CampaignClient {
  private apiKey: string;

  /**
   * Creates a new instance of the CampaignClient.
   *
   * @param apiKey - The API key used for authentication with the campaign management API.
   *                 This key should have appropriate permissions for campaign operations.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Retrieves detailed information about a specific campaign.
   *
   * @param campaignId - The unique identifier of the campaign to retrieve.
   * @returns A promise that resolves to the campaign details response.
   * @throws Will throw an error if the campaign is not found or if the request fails.
   */
  async getCampaign(campaignId: number): Promise<CampaignResponse> {
    return makeRequest<CampaignResponse>(
      this.apiKey,
      `/campaign/details/${campaignId}`,
      "GET",
    );
  }

  /**
   * Creates a new advertising campaign with the specified configuration.
   *
   * @param data - The complete campaign configuration, including all required fields
   *               such as general information, budget settings, and targeting options.
   * @returns A promise that resolves to the newly created campaign's details.
   * @throws Will throw an error if the campaign creation fails or if required fields are missing.
   *
   * @example
   * ```typescript
   * const newCampaign = await client.campaign.createCampaign({
   *   general_information: {
   *     name: "Summer Promotion 2025",
   *     urls: ["https://example.com/promo"],
   *     minimum_quality: 8,
   *     // ... other required fields
   *   },
   *   budget: {
   *     mode: "smart_bid",
   *     max_bid: "0.5",
   *     budget: 1000,
   *     // ... other budget settings
   *   },
   *   // ... other campaign configuration
   * });
   * ```
   */
  async createCampaign(data: CampaignCreateRequest): Promise<CampaignResponse> {
    return makeRequest<CampaignResponse>(
      this.apiKey,
      "/campaign/add",
      "POST",
      data,
    );
  }

  /**
   * Updates an existing campaign's configuration.
   *
   * Note that some fields cannot be modified after campaign creation, such as the
   * adult content flag and total budget. These fields are automatically omitted
   * from the update request type.
   *
   * @param campaignId - The unique identifier of the campaign to update.
   * @param data - The partial campaign configuration containing the fields to update.
   * @returns A promise that resolves to the updated campaign's details.
   * @throws Will throw an error if the campaign update fails or if the campaign is not found.
   *
   * @example
   * ```typescript
   * const updatedCampaign = await client.updateCampaign(123, {
   *   general_information: {
   *     name: "Updated Campaign Name",
   *     minimum_quality: 9,
   *     // ... other fields to update
   *   },
   *   budget: {
   *     max_bid: "0.75",
   *     // Note: total budget cannot be modified
   *   },
   *   // ... other fields to update
   * });
   * ```
   */
  async updateCampaign(
    campaignId: number,
    data: CampaignUpdateRequest,
  ): Promise<CampaignResponse> {
    return makeRequest<CampaignResponse>(
      this.apiKey,
      `/campaign/update/${campaignId}`,
      "PUT",
      data,
    );
  }
}
