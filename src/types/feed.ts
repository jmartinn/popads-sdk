import { BaseApiResponse } from './client';

/**
 * API response for feed operations (create, update, retrieve).
 */
export interface FeedResponse extends BaseApiResponse {
  status: 'success';
  code: 200;
  records: number;

  /** Feed data wrapper */
  data: {
    /** The complete feed object */
    feed: Feed;
  };
}

/**
 * Possible feed status values returned by the API.
 */
export type FeedStatus =
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
 * Quality levels for website targeting (1-10, where 10 is highest quality).
 */
export type QualityLevel = Range<1, 10>;

/**
 * Traffic speed percentage range for throttling (1-100%).
 */
export type SpeedRange = Range<1, 100>;

/**
 * Main feed interface combining all components
 */
export interface Feed {
  /** Unique feed identifier */
  id: number;

  /** Current feed status */
  status: FeedStatus;

  /** Basic feed information and settings */
  general_information: FeedGeneralInformation;

  /** OpenRTB configuration for programmatic advertising */
  open_rtb?: OpenRTB;

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
export interface BaseFeedRequest {
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
 * Feed creation request
 */
export interface FeedCreateRequest extends BaseFeedRequest {
  /** Basic feed information and settings */
  general_information: FeedGeneralInformation;

  /** OpenRTB configuration for programmatic advertising */
  open_rtb: OpenRTB;
}

/**
 * Feed update request
 */
export interface FeedUpdateRequest extends Partial<BaseFeedRequest> {
  /** Basic feed information and settings */
  general_information?: Partial<FeedGeneralInformation>;

  /** OpenRTB configuration for programmatic advertising */
  open_rtb?: Partial<OpenRTB>;
}

/**
 * Represents the general information of a campaign
 */
export interface FeedGeneralInformation {
  /** The name of the campaign (1-100 characters). */
  name: string;

  /** List of landing page URLs (1 items, must be a valid URL). */
  urls: string[];

  /** Quality level of the websites to advertise on (1-10). */
  minimum_quality: QualityLevel;

  /** Quality mode: "minimum" or "exact". */
  minimum_quality_mode: 'minimum' | 'exact';

  /** Placement preference for PrimeSpot ads. */
  primespot: 'all' | 'primespot' | 'no_primespot';

  /** Referrer tracking mode. (details in API documentation) */
  referrer: number;

  /** Whether the ad targets users with ad blockers. */
  ad_block: 'all' | 'adblock' | 'no_adblock';

  /** Whether the ad is shown in incognito mode. */
  incognito: 'all' | 'incognito' | 'no_incognito';

  /** Type of ad being run. */
  ad_type:
    | 'popup'
    | 'popunder'
    | 'tabunder'
    | 'tabup'
    | 'bbr'
    | 'floatingbanner';

  /** Bid modifier. E.g. `80` means `80%` of returned bid. */
  bid_modifier: Range<0, 100>;

  /** Allow other methods when the chosen one is not available */
  ad_type_other: boolean;
}

/**
 * OpenRTB (Real-Time Bidding) configuration for programmatic advertising.
 *
 * These settings allow customization of OpenRTB bid requests and responses
 * by adding extensions to different parts of the RTB protocol.
 */
export interface OpenRTB {
  /** Extensions to add to the root level of OpenRTB requests */
  root_ext?: JSON;

  /** Extensions to add to impression objects in OpenRTB requests */
  imp_ext?: JSON;

  /** Extensions to add to site objects in OpenRTB requests */
  site_ext?: JSON;

  /** Extensions to add to device objects in OpenRTB requests */
  device_ext?: JSON;

  /** Extensions to add to user objects in OpenRTB requests */
  user_ext?: JSON;
}

/**
 * Traffic throttling configuration.
 */
export interface Throttling {
  /**
   * The throttling mode.
   *
   * - `"none"`: No throttling, impressions are delivered without limits.
   * - `"manual"`: (Legacy) Manually reduce traffic speed by a percentage.
   */
  type: 'none' | 'manual';

  /**
   * The campaign speed. A floating number (0.1-100).
   */
  speed: SpeedRange;
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
   */
  list: number[];

  /** Include subcategories in targeting */
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
   */
  language_mode: 'any' | 'first' | 'exact';

  /**
   * List of language codes to target.
   *
   * - Retrieve valid language IDs from [GET /languages](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1languages/get).
   * - Leave empty to target *all available* languages.
   */
  languages: string[];

  /**
   * List of population segment IDs to target.
   *
   * - Retrieve valid population IDs from [GET /populations](https://www.popads.net/docs/api_v2.html#tag/options/paths/~1options~1list~1population/get).
   * - Leave empty to target *all* population groups.
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
   * - Retrieve valid OS IDs from [GET /os](#).
   * - Leave empty to target *all* operating systems.
   */
  os: number[];

  /**
   * List of browser IDs to target.
   *
   * - Retrieve valid browser IDs from [GET /browser](#).
   * - Leave empty to target *all* browsers.
   */
  browser: number[];

  /**
   * List of screen resolution IDs to target.
   *
   * - Retrieve valid resolution IDs from [GET /resolutions](#).
   * - Leave empty to target *all* screen resolutions.
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
   * - Retrieve valid device IDs from [GET /device](#).
   * - Leave empty to target *all* devices.
   */
  device: number[];

  /**
   * List of form factor IDs to target (e.g., mobile, tablet, desktop).
   *
   * - Retrieve valid form factor IDs from [GET /form_factor](#).
   * - Leave empty to target *all* form factors.
   */
  form_factor: number[];

  /**
   * Whether to allow "Request as Desktop" traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   *
   * Mobile browsers can request pages in desktop mode. This setting detects those cases.
   */
  request_as_desktop?: 0 | 1;
}

/**
 * Network connection targeting.
 */
export interface Connection {
  /**
   * Choose a predefined IP Targeting List.
   *
   * - If set, all other targeting options are ignored.
   */
  ip_targeting_id?: number;

  /**
   * List of connection type IDs to target (e.g., Wi-Fi, 4G, etc.).
   *
   * - Retrieve valid connection type IDs from [GET /conntype](#).
   * - Leave empty to target *all* connection types.
   */
  conntype: number[];

  /**
   * List of connection speed IDs to target.
   *
   * - Retrieve valid connection speed IDs from [GET /connspeed](#).
   * - Leave empty to target *all* connection speeds.
   */
  connspeed: number[];

  /**
   * List of ISP (Internet Service Provider) IDs to target.
   *
   * - Retrieve valid ISP IDs from [GET /internet_service_providers](#).
   * - Leave empty to target *all* ISPs.
   * - **Note:** ISP targeting requires selecting *up to three* countries in the `countries` object.
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
   * - Retrieve valid time slot IDs from [GET /time](#).
   */
  time: string[];

  /**
   * Timezone in which time targeting applies.
   *
   * - Retrieve valid timezone values from [GET /timezone](#).
   */
  timezone: string;
}

/**
 * Website targeting configuration.
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
      id: number;
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
   */
  valid_traffic: 0 | 1;

  /**
   * Whether to allow proxy or VPN traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   */
  proxy_traffic: 0 | 1;

  /**
   * Whether to filter based on true geographic location.
   *
   * - `0` = Disabled
   * - `1` = Enabled
   */
  true_location?: 0 | 1;

  /**
   * Whether to allow junk traffic.
   *
   * - `0` = Disabled
   * - `1` = Enabled
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
