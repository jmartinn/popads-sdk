import { CampaignClient } from './campaign';
import { FeedClient } from './feed';
import { OptionsClient } from './options';
import { ClientOptions, Logger } from '../types/client';
import { createLogger } from '../utils/logger';

/**
 * Main PopAds SDK client for interacting with the PopAds API v2.
 *
 * This is the primary entry point for the SDK, providing access to all PopAds API
 * functionality through specialized sub-clients. It handles authentication, logging,
 * and shared configuration across all operations.
 *
 * @example
 * ```typescript
 * import { Client } from 'popads-sdk';
 *
 * // Basic initialization
 * const client = new Client('your-api-key');
 *
 * // With custom options
 * const client = new Client('your-api-key', {
 *   debug: true,
 *   timeout: 10000,
 *   logLevel: 'debug'
 * });
 *
 * // Access sub-clients
 * const campaign = await client.campaign.getCampaign(123);
 * const feeds = await client.feed.getFeed(456);
 * const countries = await client.options.getCountries();
 * ```
 */
export class PopAdsClient {
  /** Client for managing advertising campaigns */
  public campaign: CampaignClient;

  /** Client for managing RTB feeds */
  public feed: FeedClient;

  /** Client for retrieving configuration options and targeting parameters */
  public options: OptionsClient;

  private readonly clientOptions: ClientOptions;
  private readonly logger: Logger;

  /**
   * Creates a new PopAds SDK client instance.
   *
   * @param apiKey - Your PopAds API key. Get this from your PopAds account dashboard.
   * @param options - Optional client configuration for debugging, timeouts, and logging.
   *
   * @example
   * ```typescript
   * // Basic usage
   * const client = new Client('your-api-key');
   *
   * // Production configuration
   * const client = new Client('your-api-key', {
   *   timeout: 15000,
   *   debug: false
   * });
   *
   * // Development configuration with debugging
   * const client = new Client('your-api-key', {
   *   debug: true,
   *   logLevel: 'debug',
   *   timeout: 30000
   * });
   * ```
   */
  constructor(apiKey: string, options: ClientOptions = {}) {
    // Set up default options
    this.clientOptions = {
      debug: false,
      logLevel: 'info',
      timeout: 30000,
      enableInterception: false,
      ...options,
    };

    // Create logger instance
    this.logger = createLogger(
      this.clientOptions.logger,
      this.clientOptions.logLevel,
      this.clientOptions.debug,
    );

    // Log client initialization in debug mode
    if (this.clientOptions.debug) {
      this.logger.info('PopAds SDK client initialized', {
        version: '1.5.0',
        options: {
          ...this.clientOptions,
          // Don't log the actual logger instance
          logger: this.clientOptions.logger
            ? '[Custom Logger]'
            : '[Console Logger]',
        },
      });
    }

    // Initialize sub-clients with shared options
    this.campaign = new CampaignClient(apiKey, this.clientOptions);
    this.feed = new FeedClient(apiKey, this.clientOptions);
    this.options = new OptionsClient(apiKey, this.clientOptions);
  }

  /**
   * Get current client configuration.
   *
   * Returns a read-only copy of the current client configuration,
   * useful for debugging or creating new clients with similar settings.
   *
   * @returns A read-only copy of the current client options
   *
   * @example
   * ```typescript
   * const config = client.getConfig();
   * console.log('Debug mode:', config.debug);
   * console.log('Timeout:', config.timeout);
   * ```
   */
  getConfig(): Readonly<ClientOptions> {
    return { ...this.clientOptions };
  }

  /**
   * Enable or disable debug mode at runtime.
   *
   * When debug mode is enabled, the SDK will log detailed information about
   * API requests and responses, which is helpful for development and troubleshooting.
   *
   * @param enabled - Whether to enable debug mode
   *
   * @example
   * ```typescript
   * // Enable debug mode
   * client.setDebugMode(true);
   *
   * // Disable debug mode
   * client.setDebugMode(false);
   * ```
   */
  setDebugMode(enabled: boolean): void {
    this.clientOptions.debug = enabled;
    if (enabled) {
      this.logger.info('Debug mode enabled');
    }
  }
}
