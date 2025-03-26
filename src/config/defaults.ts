import { PartialDeep } from 'type-fest';

import { CampaignCreateRequest } from '../types/campaign';

export const CAMPAIGN_DEFAULTS: PartialDeep<CampaignCreateRequest> = {
  general_information: {
    minimum_quality: 1,
    minimum_quality_mode: 'minimum',
    frequency_cap: {
      days: 1,
      hours: 0,
      minutes: 0,
    },
    after_approval: 1,
    primespot: 'all',
    adult: false,
    referrer: 0,
    ad_block: 'all',
    incognito: 'all',
    ad_type: 'popunder',
    ad_type_other: true,
  },
  budget: {
    max_per_day: 0,
  },
  categories: {
    list: [],
    include_subcategories: true,
  },
  countries: {
    regions: [],
  },
  society: {
    language_mode: 'any',
    languages: [],
    populations: [],
  },
  environment: {
    os: [],
    browser: [],
    resolutions: [],
  },
  device: {
    device: [],
    request_as_desktop: 1,
  },
  connections: {
    conntype: [],
    connspeed: [],
    internet_service_providers: [],
  },
  website_targeting: {
    type: 'none',
  },
  adscore: {
    valid_traffic: 1,
    proxy_traffic: 0,
    junk_traffic: 0,
    bot_traffic: 0,
    compliance: 1,
    compliance_intelligence: 1,
  },
};
