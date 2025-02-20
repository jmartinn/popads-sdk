import {
  OptionsResponse,
  OptionList,
  Category,
  Symbols,
} from "../types/options";
import { makeRequest } from "../utils/request";

/**
 * Client for retrieving available configuration options.
 *
 * This client provides methods to fetch valid targeting parameters and configuration values
 * that can be used when creating or updating campaigns or feeds. Available options include targeting
 * by device types, operating systems, geographic locations, browsers, and other campaign
 * parameters.
 *
 * The retrieved options can be used to validate campaign settings and present valid choices
 * to advertisers when configuring their campaigns.
 */
export class OptionsClient {
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
   * Retrieves all possible ad-block targeting values.
   *
   * Returns options for targeting users based on their ad-block usage, including:
   * - All traffic
   * - Adblock only
   *
   * @returns Promise resolving to a list of ad-block targeting options
   * @throws Will throw an error if the API request fails
   */
  async getAdBlockValues(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/ad-block",
      "GET",
    );
  }

  /**
   * Retrieves all possible advertisement types.
   *
   * @returns Promise resolving to available advertisement type options
   * @throws Will throw an error if the API request fails
   */
  async getAdvertiseType(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/adv-type",
      "GET",
    );
  }

  /**
   * Retrieves all possible post-approval actions.
   *
   * Returns options for what should happen after campaign approval:
   * - Start: Begin the campaign immediately
   * - Pause: Keep campaign paused after approval
   *
   * @returns Promise resolving to available post-approval action options
   * @throws Will throw an error if the API request fails
   */
  async getAfterApprove(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/after-approve",
      "GET",
    );
  }

  /**
   * Retrieves all supported browsers for targeting.
   *
   * Returns hierarchical browser data including:
   * - Browser name
   * - Browser versions
   * - Parent-child relationships
   *
   * @returns Promise resolving to available browser targeting options
   * @throws Will throw an error if the API request fails
   */
  async getBrowsers(): Promise<OptionsResponse<Symbols>> {
    return makeRequest<OptionsResponse<Symbols>>(
      this.apiKey,
      "/options/list/browser",
      "GET",
    );
  }

  /**
   * Retrieves all available content categories.
   *
   * Returns hierarchical category data including:
   * - Category ID
   * - Category label
   * - Parent category ID (for subcategories)
   *
   * @returns Promise resolving to available content categories
   * @throws Will throw an error if the API request fails
   */
  async getCategories(): Promise<OptionsResponse<Category>> {
    return makeRequest<OptionsResponse<Category>>(
      this.apiKey,
      "/options/list/categories",
      "GET",
    );
  }

  /**
   * Retrieves supported connection speed options for targeting.
   *
   * Returns options like:
   * - Unknown
   * - Dialup
   * - Broadband
   *
   * @returns Promise resolving to available connection speed options
   * @throws Will throw an error if the API request fails
   */
  async getConnSpeed(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/connection-speeds",
      "GET",
    );
  }

  /**
   * Retrieves supported connection type options for targeting.
   *
   * Returns options like:
   * - Unknown
   * - Business
   * - Personal
   * - Mobile
   *
   * @returns Promise resolving to available connection type options
   * @throws Will throw an error if the API request fails
   */
  async getConnTypes(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/connection-types",
      "GET",
    );
  }

  /**
   * Retrieves available countries for geographic targeting.
   *
   * Returns country data including:
   * - Country code
   * - Country name
   *
   * @returns Promise resolving to available country options
   * @throws Will throw an error if the API request fails
   */
  async getCountries(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/countries",
      "GET",
    );
  }

  /**
   * Retrieves available positions for floating mode advertisements.
   *
   * Returns position options like:
   * - Top left
   * - Top right
   * - Bottom left
   * - Bottom right
   *
   * @returns Promise resolving to available floating position options
   * @throws Will throw an error if the API request fails
   */
  async getFloatingPositions(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/floating-mode-position",
      "GET",
    );
  }

  /**
   * Retrieves available device form factors for targeting.
   *
   * Returns hierarchical device form factor data including:
   * - Form factor type
   * - Parent-child relationships
   * - Device characteristics
   *
   * @returns Promise resolving to available form factor options
   * @throws Will throw an error if the API request fails
   */
  async getFormFactors(): Promise<OptionsResponse<Symbols>> {
    return makeRequest<OptionsResponse<Symbols>>(
      this.apiKey,
      "/options/list/form-factor",
      "GET",
    );
  }

  /**
   * Retrieves available daily frequency cap options.
   *
   * Returns options for limiting daily ad frequency:
   * - 0 days (unlimited)
   * - 1 day
   * - Multiple days
   *
   * @returns Promise resolving to available daily frequency cap options
   * @throws Will throw an error if the API request fails
   */
  async getFrequencyCapDays(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/frequency-cap-days",
      "GET",
    );
  }

  /**
   * Retrieves available hourly frequency cap options.
   *
   * Returns options for limiting hourly ad frequency:
   * - 0 hours (unlimited)
   * - 1 hour
   * - Multiple hours
   *
   * @returns Promise resolving to available hourly frequency cap options
   * @throws Will throw an error if the API request fails
   */
  async getFrequencyCapHours(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/frequency-cap-hours",
      "GET",
    );
  }

  /**
   * Retrieves available minute-based frequency cap options.
   *
   * Returns options for limiting per-minute ad frequency:
   * - 0 minutes (unlimited)
   * - 5 minutes
   * - Multiple minute intervals
   *
   * @returns Promise resolving to available minute-based frequency cap options
   * @throws Will throw an error if the API request fails
   */
  async getFrequencyCapMinutes(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/frequency-cap-minutes",
      "GET",
    );
  }

  /**
   * Retrieves available devices for targeting.
   *
   * Returns hierarchical device data including:
   * - Device type
   * - Device manufacturer
   * - Device models
   * - Parent-child relationships
   *
   * @returns Promise resolving to available device targeting options
   * @throws Will throw an error if the API request fails
   */
  async getDevices(): Promise<OptionsResponse<Symbols>> {
    return makeRequest<OptionsResponse<Symbols>>(
      this.apiKey,
      "/options/list/device",
      "GET",
    );
  }

  /**
   * Retrieves available incognito mode targeting options.
   *
   * Returns options for targeting based on browser incognito mode:
   * - All traffic
   * - Incognito only
   * - Non-incognito only
   *
   * @returns Promise resolving to available incognito mode targeting options
   * @throws Will throw an error if the API request fails
   */
  async getIncognitoModeValues(): Promise<OptionsResponse<Symbols>> {
    return makeRequest<OptionsResponse<Symbols>>(
      this.apiKey,
      "/options/list/incognito",
      "GET",
    );
  }

  /**
   * Retrieves available Internet Service Providers for targeting.
   *
   * @remarks
   * This endpoint requires a mandatory 'codes' query parameter specifying country codes.
   * Implementation needs verification for correct parameter handling.
   *
   * @returns Promise resolving to available ISP targeting options
   * @throws Will throw an error if the API request fails
   */
  async getISP(): Promise<OptionsResponse<unknown>> {
    return makeRequest<OptionsResponse<unknown>>(
      this.apiKey,
      "/options/list/internet-service-providers",
      "GET",
    );
  }

  /**
   * Retrieves available language matching modes.
   *
   * Returns options for how language targeting should be applied:
   * - Any match
   * - First match
   *
   * @returns Promise resolving to available language mode options
   * @throws Will throw an error if the API request fails
   */
  async getLanguageModes(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/language-mode",
      "GET",
    );
  }

  /**
   * Retrieves available languages for targeting.
   *
   * Returns language options including:
   * - Language code
   * - Language name
   *
   * @returns Promise resolving to available language targeting options
   * @throws Will throw an error if the API request fails
   */
  async getLanguages(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/languages",
      "GET",
    );
  }

  /**
   * Retrieves available operating systems for targeting.
   *
   * Returns hierarchical OS data including:
   * - OS name
   * - OS versions
   * - Parent-child relationships
   *
   * @returns Promise resolving to available OS targeting options
   * @throws Will throw an error if the API request fails
   */
  async getOperatingSystems(): Promise<OptionsResponse<Symbols>> {
    return makeRequest<OptionsResponse<Symbols>>(
      this.apiKey,
      "/options/list/languages",
      "GET",
    );
  }

  /**
   * Retrieves available population range options for targeting.
   *
   * Returns population bracket options like:
   * - Unknown
   * - 1 - 30,000
   * - 30,001 - 100,000
   *
   * @returns Promise resolving to available population targeting options
   * @throws Will throw an error if the API request fails
   */
  async getPopulations(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/populations",
      "GET",
    );
  }

  /**
   * Retrieves available PrimeSpot targeting options.
   *
   * Returns options for PrimeSpot feature targeting:
   * - All traffic
   * - PrimeSpot only
   *
   * @returns Promise resolving to available PrimeSpot targeting options
   * @throws Will throw an error if the API request fails
   */
  async getPrimeSpotValues(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/prime-spot",
      "GET",
    );
  }

  /**
   * Retrieves available quality rating options.
   *
   * Returns quality score options like:
   * - Rated 10/10
   * - Rated 9/10
   *
   * @returns Promise resolving to available quality rating options
   * @throws Will throw an error if the API request fails
   */
  async getQuality(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/quality",
      "GET",
    );
  }

  /**
   * Retrieves available quality matching modes.
   *
   * Returns options for how quality ratings should be applied:
   * - At least (minimum rating)
   * - Exactly (exact rating match)
   *
   * @returns Promise resolving to available quality mode options
   * @throws Will throw an error if the API request fails
   */
  async getQualityMode(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/quality-mode",
      "GET",
    );
  }

  /**
   * Retrieves available regions for specified countries.
   *
   * @remarks
   * This endpoint requires a mandatory 'codes' query parameter for country selection.
   * Implementation needs verification for correct parameter handling.
   *
   * @returns Promise resolving to available region options for the specified countries
   * @throws Will throw an error if the API request fails
   */
  async getRegionsByCountry(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/regions-by-countries",
      "GET",
    );
  }

  /**
   * Retrieves available screen resolution options for targeting.
   *
   * Returns resolution options like:
   * - Unknown
   * - 800x600
   * - 1024x768
   *
   * @returns Promise resolving to available resolution targeting options
   * @throws Will throw an error if the API request fails
   */
  async getResolutions(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/resolutions",
      "GET",
    );
  }
  /**
   * Retrieves available time slot values for campaign scheduling.
   *
   * Returns hourly time slots in 24-hour format for campaign timing configuration.
   * Each time slot is represented in a three-digit format:
   * - "000" representing 12:00 AM
   * - "001" representing 1:00 AM
   * - Through "023" representing 11:00 PM
   *
   * These values can be used to set specific hours when campaigns should be active
   * or inactive throughout the day.
   *
   * @returns Promise resolving to available time slot options
   * @throws Will throw an error if the API request fails
   */
  async getTimeValues(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/time",
      "GET",
    );
  }

  /**
   * Retrieves available timezone options for campaign scheduling.
   *
   * Returns a comprehensive list of timezone options including:
   * - "Detect" option for automatic timezone detection
   * - Standard timezone identifiers (e.g., "Africa/Abidjan")
   * - Major city-based timezone representations
   *
   * These timezone options can be used to specify the time context for campaign
   * scheduling and ensure correct timing across different geographic regions.
   *
   * @returns Promise resolving to available timezone options
   * @throws Will throw an error if the API request fails
   */
  async getTimezones(): Promise<OptionsResponse<OptionList>> {
    return makeRequest<OptionsResponse<OptionList>>(
      this.apiKey,
      "/options/list/timezones",
      "GET",
    );
  }
}
