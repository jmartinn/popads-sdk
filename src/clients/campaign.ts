import merge from 'lodash.merge';

import { CAMPAIGN_DEFAULTS } from '../config/defaults';
import {
  CampaignCreateRequest,
  CampaignResponse,
  CampaignUpdateRequest,
} from '../types/campaign';
import { ClientOptions } from '../types/client';
import { makeRequest } from '../utils/request';

/**
 * Client for managing advertising campaigns through the API.
 *
 * This client provides methods for creating, retrieving, and updating campaign configurations.
 * It handles authentication and request formatting for all campaign-related operations.
 */
export class CampaignClient {
  private apiKey: string;
  private options: ClientOptions;

  /**
   * Creates a new instance of the CampaignClient.
   *
   * @param apiKey - The API key used for authentication with the campaign management API.
   *                 This key should have appropriate permissions for campaign operations.
   * @param options - Optional client configuration for logging, debugging, etc.
   */
  constructor(apiKey: string, options: ClientOptions = {}) {
    this.apiKey = apiKey;
    this.options = options;
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
      'GET',
      undefined,
      this.options,
    );
  }

  /**
   * Creates a new advertising campaign with the specified configuration.
   *
   * @param data - The campaign configuration. Only name, urls, max_bid, and budget are required.
   *               All other fields have sensible defaults that will be applied automatically.
   * @returns A promise that resolves to the newly created campaign's details.
   * @throws Will throw an error if the campaign creation fails or if required fields are missing.
   *
   * @example
   * ```typescript
   * // Minimal required configuration
   * const newCampaign = await client.campaign.createCampaign({
   *   general_information: {
   *     name: "Summer Promotion 2025",
   *     urls: ["https://example.com/promo"]
   *   },
   *   budget: {
   *     max_bid: 0.5,
   *     budget: 1000
   *   }
   * });
   *
   * // With additional configuration
   * const advancedCampaign = await client.campaign.createCampaign({
   *   general_information: {
   *     name: "Advanced Campaign",
   *     urls: ["https://example.com/advanced"],
   *     minimum_quality: 8,
   *     adult: false
   *   },
   *   budget: {
   *     mode: "smart_bid",
   *     max_bid: 0.75,
   *     budget: 5000,
   *     max_per_day: 100
   *   },
   *   countries: {
   *     codes: ["US", "CA", "GB"]
   *   }
   * });
   * ```
   */
  async createCampaign(data: CampaignCreateRequest): Promise<CampaignResponse> {
    const requestData = merge({}, CAMPAIGN_DEFAULTS, data);

    return makeRequest<CampaignResponse>(
      this.apiKey,
      '/campaign/add',
      'POST',
      requestData,
      this.options,
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
      'PUT',
      data,
      this.options,
    );
  }

  /**
   * Partially updates an existing campaign's configuration using PATCH HTTP method.
   *
   * This method allows for more granular updates compared to PUT, only modifying
   * the specific fields that are provided in the request.
   *
   * Note that some fields cannot be modified after campaign creation, such as the
   * adult content flag and total budget. These fields are automatically omitted
   * from the update request type.
   *
   * @param campaignId - The unique identifier of the campaign to update.
   * @param data - The partial campaign configuration containing only the fields to update.
   * @returns A promise that resolves to the updated campaign's details.
   * @throws Will throw an error if the campaign update fails or if the campaign is not found.
   *
   * @example
   * ```typescript
   * const updatedCampaign = await client.patchCampaign(123, {
   *   general_information: {
   *     name: "Updated Campaign Name",
   *   },
   *   // Only the specified fields will be updated
   * });
   * ```
   */
  async patchCampaign(
    campaignId: number,
    data: CampaignUpdateRequest,
  ): Promise<CampaignResponse> {
    return makeRequest<CampaignResponse>(
      this.apiKey,
      `/campaign/update/${campaignId}`,
      'PATCH',
      data,
      this.options,
    );
  }
}
