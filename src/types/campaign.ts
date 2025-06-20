import { BaseApiResponse } from './client';

/**
 * API response for campaign operations (create, update, retrieve).
 */
export interface CampaignResponse extends BaseApiResponse {
  /** Optional status or error messages from the API */
  messages?: string[];

  /** Campaign data wrapper */
  data?: {
    /** The campaign object (may be partial depending on the operation) */
    campaign: Partial<Campaign>;
  };
}

/**
 * Possible campaign status values returned by the API.
 */
export type CampaignStatus =
  | 'Approved'
  | 'Out of Budget'
  | 'Pending Approval'
  | 'Paused'
  | 'Rejected';

/**
 * Utility type for creating numeric ranges.
 * @internal
 */
export type Range<Start extends number, End extends number> =
  | Exclude<Enumerate<End>, Enumerate<Start>>
  | End;

/**
 * Utility type for enumerating numbers up to N.
 * @internal
 */
export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * Valid minute values for frequency cap settings (0, 5, 10, 15, ..., 55).
 */
export type Minutes = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;

/**
 * Quality levels for website targeting (1-10, where 10 is highest quality).
 */
export type QualityLevel = Range<1, 10>;

/**
 * Valid day values for frequency cap settings (0-31).
 */
export type DaysRange = Range<0, 31>;

/**
 * Valid hour values for frequency cap settings (0-23).
 */
export type HoursRange = Range<0, 23>;

/**
 * Main campaign interface combining all components
 */
export interface Campaign {
  /** Unique campaign identifier */
  id: number;

  /** Current campaign status */
  status: CampaignStatus;

  /** Basic campaign information and settings */
  general_information: CampaignGeneralInformation;

  /** Budget and bidding configuration */
  budget: Budget;

  /** Traffic throttling settings */
  throttling: Throttling;

  /** Content category targeting */
  categories: Categories;

  /** Geographic targeting configuration */
  countries: Countries;

  /** Language and population targeting */
  society: Society;

  /** Browser and OS targeting */
  environment: Environment;

  /** Device and form factor targeting */
  device: Device;

  /** Connection type and ISP targeting */
  connections: Connection;

  /** Time-based targeting configuration */
  time: Time;

  /** Website-specific targeting rules */
  website_targeting: WebsiteTargeting;

  /** Traffic quality and fraud prevention settings */
  adscore: AdScore;
}

/**
 * Common fields between create and update requests
 */
export interface BaseCampaignRequest {
  /** Traffic throttling settings */
  throttling?: Partial<Throttling>;

  /** Content category targeting */
  categories?: Partial<Categories>;

  /** Geographic targeting configuration */
  countries?: Partial<Countries>;

  /** Language and population targeting */
  society?: Partial<Society>;

  /** Browser and OS targeting */
  environment?: Partial<Environment>;

  /** Device and form factor targeting */
  device?: Partial<Device>;

  /** Connection type and ISP targeting */
  connections?: Partial<Connection>;

  /** Time-based targeting configuration */
  time?: Partial<Time>;

  /** Website-specific targeting rules */
  website_targeting?: WebsiteTargeting;

  /** Traffic quality and fraud prevention settings */
  adscore?: Partial<AdScore>;
}

/**
 * Campaign creation request - developer-friendly interface
 * Only truly essential fields are required, everything else has intelligent defaults
 */
export interface CampaignCreateRequest extends BaseCampaignRequest {
  /** Basic campaign information (name, URLs, etc.) */
  general_information: CampaignGeneralInformationInput;

  /** Budget and bidding configuration */
  budget: BudgetInput;
}

/**
 * Campaign update request
 */
export interface CampaignUpdateRequest extends Partial<BaseCampaignRequest> {
  /** Basic campaign information (adult flag cannot be changed) */
  general_information?: Partial<Omit<CampaignGeneralInformation, 'adult'>>;

  /** Budget configuration (total budget cannot be changed) */
  budget?: Partial<Omit<Budget, 'budget'>>;
}

/**
 * Represents the general information of a campaign (for responses and full campaign objects)
 */
export interface CampaignGeneralInformation {
  /** The name of the campaign (1-100 characters). */
  name: string;

  /** List of landing page URLs (1-300 items, must be valid URLs). */
  urls: string[];

  /** Optional: Prefetch URL if different from campaign URL. */
  prefetch_url?: string;

  /**
   * Quality level of the websites to advertise on (1-10).
   * @default 1
   */
  minimum_quality?: QualityLevel;

  /**
   * Quality mode: "minimum" or "exact".
   * @default "minimum"
   */
  minimum_quality_mode?: 'minimum' | 'exact';

  /**
   * Defines how often the ad is shown.
   * @default { days: 1, hours: 0, minutes: 0 } (once per day)
   */
  frequency_cap: FrequencyCap;

  /**
   * Action after approval: 1 = Start immediately, 3 = Manual start
   * @default 1
   */
  after_approval: 1 | 3;

  /**
   * Whether the campaign is marked as adult content.
   * @default false
   */
  adult: boolean;

  /**
   * Placement preference for PrimeSpot ads.
   * @default "all"
   */
  primespot: 'all' | 'primespot' | 'no_primespot';

  /**
   * Referrer tracking mode. (details in API documentation)
   * 0 = Standard
   * 1 = Blank
   * 2 = Random
   * @default 0
   */
  referrer: 0 | 1 | 2;

  /**
   * Whether the ad targets users with ad blockers.
   * @default "all"
   */
  ad_block?: 'all' | 'adblock' | 'no_adblock';

  /**
   * Whether the ad is shown in incognito mode.
   * @default "all"
   */
  incognito: 'all' | 'incognito' | 'regular';

  /**
   * Type of ad being run.
   * @default "popunder"
   */
  ad_type:
    | 'popup'
    | 'popunder'
    | 'tabunder'
    | 'tabup'
    | 'bbr'
    | 'floatingbanner';

  /**
   * Allow other methods when the chosen one is not available
   * @default true
   */
  ad_type_other: boolean;
}

/**
 * Frequency cap configuration
 */
export interface FrequencyCap {
  /** Number of days (0-31) */
  days: DaysRange;

  /** Number of hours (0-23) */
  hours: HoursRange;

  /** Minutes interval */
  minutes: Minutes;
}

/**
 * Budget configuration for campaign spending
 */
export interface Budget {
  /** Budget allocation mode */
  mode: 'smart_bid' | 'legacy_bid';

  /** Maximum bid per popunder (decimal string) */

  /**
   * Maximum bid per popunder (decimal string)
   * Has to be equal or greater than 0.0005
   */
  max_bid: number;

  /**
   * Daily budget limit (0 = unlimited)
   * Has to be equal or greater than 2.5
   */
  max_per_day: number;

  /**
   * Daily traffic shaping
   * Only aplicable when daily budget is set
   *
   * - `"adaptive"`: Adaptive traffic shaping distributes remaining daily budget over the remaining hours of activity.
   * - `"hourly"`: Hourly traffic shaping distributes total daily budget across the number of active hours of activity.
   */
  daily_traffic_shaping: 'adaptive' | 'hourly';

  /** Total campaign budget */
  budget: number;

  /**
   * Enable use of account balance instead of local budgets
   * @default false
   */
  global_budget?: boolean;
}

/**
 * Traffic throttling configuration.
 */
export interface Throttling {
  /**
   * The throttling mode.
   * @default "auto"
   *
   * - `"none"`: No throttling, impressions are delivered without speed limits.
   * - `"manual"`: (Legacy) Manually reduce traffic speed by a percentage.
   * - `"auto"`: Set a maximum number of impressions or spending per time unit.
   */
  type: 'none' | 'manual' | 'auto';

  /**
   * Specifies how the throttling threshold is measured.
   *
   * - `"imps"`: Impressions per second.
   * - `"spent"`: Spending (USD) per second.
   */
  mode: 'imps' | 'spent';

  /**
   * Time unit for the throttling limit.
   *
   * - `"s"`: Per second.
   * - `"m"`: Per minute.
   * - `"h"`: Per hour.
   */
  unit: 's' | 'm' | 'h';

  /**
   * The throttling value, defining the rate limit.
   *
   * The value must adhere to the following constraints:
   * | Mode  | Type | Minimum | Maximum |
   * |-------|------|---------|---------|
   * | imps  | s    | 0.5     | 10,000  |
   * | imps  | m    | 30      | 600,000 |
   * | imps  | h    | 1,800   | 36,000,000 |
   * | spent | s    | 0.001   | 1,000   |
   * | spent | m    | 0.06    | 60,000  |
   * | spent | h    | 3.6     | 3,600,000 |
   */
  value: number;
}

/**
 * Category targeting settings
 */
export interface Categories {
  /**
   * List of categories to retrieve.
   *
   * - Retrieve valid values from [GET /countries](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1categories/get).
   * - Leave empty to retrieve all categories.
   * @default [] (all categories)
   */
  list: number[];

  /**
   * Include subcategories in targeting
   * @default true
   */
  include_subcategories: boolean;
}

/**
 * Geographic targeting configuration
 */
export interface Countries {
  /**
   * List of country codes to target.
   *
   * - Retrieve valid values from [GET /countries](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1countries/get).
   * - Leave empty to target all countries.
   */
  codes: string[];

  /**
   * List of region codes for selected countries.
   *
   * - Retrieve valid values from [GET /regions](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1regions-by-countries/get).
   * - To enable region targeting, select up to **three countries** in `codes`.
   * - If only one country has assigned regions, add the rest of the country codes as regions.
   * - Leave empty to target all regions.
   * @default [] (all regions)
   */
  regions: string[];
}

/**
 * Demographic and language targeting settings.
 */
export interface Society {
  /**
   * Specifies how the system should match user languages.
   *
   * - **"any"** - Targets visitors whose browser provides *any* of the languages you are targeting.
   * - **"first"** - Targets visitors whose *primary (first)* language matches your targeting.
   * - **"exact"** - Targets visitors whose *entire* language list matches your targeting.
   *
   * Retrieve valid values from [GET /language-modes](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1language-mode/get).
   * @default "any"
   */
  language_mode: 'any' | 'first' | 'exact';

  /**
   * List of language codes to target.
   *
   * - Retrieve valid language IDs from [GET /languages](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1languages/get).
   * - Leave empty to target *all available* languages.
   * @default [] (all languages)
   */
  languages: string[];

  /**
   * List of population segment IDs to target.
   *
   * - Retrieve valid population IDs from [GET /populations](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1population/get).
   * - Leave empty to target *all* population groups.
   * @default [] (all population groups)
   */
  populations: number[];
}

/**
 * Technical environment targeting.
 */
export interface Environment {
  /**
   * List of operating system IDs to target.
   *
   * - Retrieve valid OS IDs from [GET /os](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1os/get).
   * - Leave empty to target *all* operating systems.
   * @default [] (all operating systems)
   */
  os: number[];

  /**
   * List of browser IDs to target.
   *
   * - Retrieve valid browser IDs from [GET /browser](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1browser/get).
   * - Leave empty to target *all* browsers.
   * @default [] (all browsers)
   */
  browser: number[];

  /**
   * List of screen resolution IDs to target.
   *
   * - Retrieve valid resolution IDs from [GET /resolutions](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1resolutions/get).
   * - Leave empty to target *all* screen resolutions.
   * @default [] (all screen resolutions)
   */
  resolutions: number[];
}

/**
 * Device targeting configuration.
 */
export interface Device {
  /**
   * List of device IDs to target.
   *
   * - Retrieve valid device IDs from [GET /device](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1device/get).
   * - Leave empty to target *all* devices.
   * @default [] (all devices)
   */
  device: number[];

  /**
   * List of form factor IDs to target (e.g., mobile, tablet, desktop).
   *
   * - Retrieve valid form factor IDs from [GET /form_factor](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1form_factor/get).
   * - Leave empty to target *all* form factors.
   */
  form_factor: number[];

  /**
   * Whether to allow "Request as Desktop" traffic.
   *
   * - `0` = Disabled (Block)
   * - `1` = Enabled (Target)
   * - Leave empty ('') to allow all traffic even if it pretends to be a desktop
   *
   * Mobile browsers can request pages in desktop mode. This setting detects those cases.
   * @default undefined (allow all traffic)
   */
  request_as_desktop?: 0 | 1 | '';
}

/**
 * Network connection targeting.
 */
export interface Connection {
  /**
   * Choose a predefined IP Targeting List.
   *
   * - If set, all other targeting options are ignored.
   * @default undefined (no predefined list)
   */
  ip_targeting_id?: number;

  /**
   * List of connection type IDs to target (e.g., Wi-Fi, 4G, etc.).
   *
   * - Retrieve valid connection type IDs from [GET /conntype](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1connection-types/get).
   * - Leave empty to target *all* connection types.
   * @default [] (all connection types)
   */
  conntype: number[];

  /**
   * List of connection speed IDs to target.
   *
   * - Retrieve valid connection speed IDs from [GET /connspeed](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1connection-speed/get).
   * - Leave empty to target *all* connection speeds.
   * @default [] (all connection speeds)
   */
  connspeed: number[];

  /**
   * List of ISP (Internet Service Provider) IDs to target.
   *
   * - Retrieve valid ISP IDs from [GET /internet_service_providers](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1internet-service-providers/get).
   * - Leave empty to target *all* ISPs.
   * - **Note:** ISP targeting requires selecting *up to three* countries in the `countries` object.
   * @default [] (all ISPs)
   */
  internet_service_providers: number[];
}

/**
 * Time targeting settings.
 */
export interface Time {
  /**
   * List of time slot IDs for ad delivery.
   *
   * - Retrieve valid time slot IDs from [GET /time](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1time/get).
   */
  time: string[];

  /**
   * Timezone in which time targeting applies.
   *
   * - Retrieve valid timezone values from [GET /timezone](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1timezones/get).
   */
  timezone: string;
}

/**
 * Website targeting configuration.
 * @default { type: "none" } (no specific targeting)
 */
export type WebsiteTargeting =
  | {
      /** Target specific websites */
      type: 'include';
      /** List of website IDs to specifically target */
      items_incl: number[];
    }
  | {
      /** Exclude specific websites */
      type: 'exclude';
      /** List of website IDs to exclude from targeting */
      items_excl: number[];
    }
  | {
      /** Use a predefined targeting configuration */
      type: 'none';
      /** ID of the predefined targeting configuration */
      id?: number;
    };

/**
 * Traffic quality and compliance settings.
 */
export interface AdScore {
  /**
   * Whether to allow only verified valid traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   * @default 1 (verified traffic only)
   */
  valid_traffic: 0 | 1;

  /**
   * Whether to allow proxy or VPN traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   * @default 0 (exclude proxies)
   */
  proxy_traffic: 0 | 1;

  /**
   * Whether to filter based on true geographic location.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   * @default 0 (no geo-filtering)
   */
  true_location?: 0 | 1;

  /**
   * Whether to allow junk traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   * @default 0 (exclude junk)
   */
  junk_traffic: 0 | 1;

  /**
   * Whether to block bot traffic.
   *
   * - Always set to `0` (disabled).
   */
  bot_traffic: 0;

  /**
   * Compliance intelligence settings.
   *
   * - Always set to `1` (enabled).
   */
  compliance_intelligence: 1;

  /**
   * General compliance enforcement settings.
   *
   * - Always set to `1` (enabled).
   */
  compliance: 1;
}

/**
 * General information for campaign creation - only essential fields required
 */
export interface CampaignGeneralInformationInput {
  /** The name of the campaign (1-100 characters). */
  name: string;

  /** List of landing page URLs (1-300 items, must be valid URLs). */
  urls: string[];

  /** Optional: Prefetch URL if different from campaign URL. */
  prefetch_url?: string;

  /**
   * Quality level of the websites to advertise on (1-10).
   * @default 1
   */
  minimum_quality?: QualityLevel;

  /**
   * Quality mode: "minimum" or "exact".
   * @default "minimum"
   */
  minimum_quality_mode?: 'minimum' | 'exact';

  /**
   * Defines how often the ad is shown.
   * @default { days: 1, hours: 0, minutes: 0 } (once per day)
   */
  frequency_cap?: Partial<FrequencyCap>;

  /**
   * Action after approval: 1 = Start immediately, 3 = Manual start
   * @default 1
   */
  after_approval?: 1 | 3;

  /**
   * Whether the campaign is marked as adult content.
   * @default false
   */
  adult?: boolean;

  /**
   * Placement preference for PrimeSpot ads.
   * @default "all"
   */
  primespot?: 'all' | 'primespot' | 'no_primespot';

  /**
   * Referrer tracking mode. (details in API documentation)
   * 0 = Standard
   * 1 = Blank
   * 2 = Random
   * @default 0
   */
  referrer?: 0 | 1 | 2;

  /**
   * Whether the ad targets users with ad blockers.
   * @default "all"
   */
  ad_block?: 'all' | 'adblock' | 'no_adblock';

  /**
   * Whether the ad is shown in incognito mode.
   * @default "all"
   */
  incognito?: 'all' | 'incognito' | 'regular';

  /**
   * Type of ad being run.
   * @default "popunder"
   */
  ad_type?:
    | 'popup'
    | 'popunder'
    | 'tabunder'
    | 'tabup'
    | 'bbr'
    | 'floatingbanner';

  /**
   * Allow other methods when the chosen one is not available
   * @default true
   */
  ad_type_other?: boolean;
}

/**
 * Budget configuration for campaign creation - only essential fields required
 */
export interface BudgetInput {
  /**
   * Budget allocation mode
   * @default "smart_bid"
   */
  mode?: 'smart_bid' | 'legacy_bid';

  /**
   * Maximum bid per popunder (decimal string)
   * Has to be equal or greater than 0.0005
   */
  max_bid: number;

  /**
   * Daily budget limit (0 = unlimited)
   * Has to be equal or greater than 2.5
   * @default 0
   */
  max_per_day?: number;

  /**
   * Daily traffic shaping
   * Only aplicable when daily budget is set
   * @default "adaptive"
   */
  daily_traffic_shaping?: 'adaptive' | 'hourly';

  /** Total campaign budget */
  budget: number;

  /**
   * Enable use of account balance instead of local budgets
   * @default false
   */
  global_budget?: boolean;
}
