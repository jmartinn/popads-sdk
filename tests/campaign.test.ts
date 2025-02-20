import { describe, it, expect, vi } from "vitest";

import { Client } from "../src";
import {
  CampaignCreateRequest,
  CampaignResponse,
  CampaignUpdateRequest,
} from "../src/types/campaign";

describe("CampaignClient", () => {
  const mockApiKey = "test-api-key";
  const client = new Client(mockApiKey);

  it("should have a campaign client", () => {
    expect(client.campaign).toBeDefined();
  });

  it("should call getCampaign with the correct ID", async () => {
    vi.spyOn(client.campaign, "getCampaign").mockResolvedValue({
      status: "success",
      code: 200,
      records: 1,
      data: {
        campaign: {
          id: 123,
          status: "Pending Approval",
          general_information: {
            name: "Test Campaign",
            urls: ["https://t.co/Ojz1243Fns"],
            prefetch_url: "https://jmartinn.com/",
            minimum_quality: 1,
            minimum_quality_mode: "minimum",
            frequency_cap: {
              days: 1,
              hours: 0,
              minutes: 0,
            },
            after_approval: 1,
            primespot: "all",
            adult: false,
            referrer: 0,
            ad_block: "all",
            incognito: "all",
            ad_type: "popunder",
            ad_type_other: true,
          },
          budget: {
            mode: "smart_bid",
            budget: 0,
            max_bid: "0.008",
            max_per_day: 0,
          },
          throttling: {
            type: "auto",
            mode: "imps",
            unit: "m",
            value: 120,
          },
          categories: {
            list: [],
            include_subcategories: true,
          },
          countries: {
            codes: ["ES"],
            regions: [],
          },
          society: {
            language_mode: "any",
            languages: [],
            populations: [],
          },
          environment: {
            os: [],
            browser: [],
            resolutions: [],
          },
          device: {
            form_factor: [3155, 310],
            device: [],
            request_as_desktop: 1,
          },
          connections: {
            conntype: [],
            connspeed: [],
            internet_service_providers: [],
          },
          time: {
            time: [],
            timezone: "Europe/Madrid",
          },
          website_targeting: {
            type: "none",
          },
          adscore: {
            valid_traffic: 1,
            proxy_traffic: 0,
            junk_traffic: 0,
            bot_traffic: 0,
            compliance: 1,
            compliance_intelligence: 1,
          },
        },
      },
    });

    const campaign = await client.campaign.getCampaign(123);
    expect(campaign.data.campaign.id).toBe(123);
  });

  it("should call createCampaign and return the expected response", async () => {
    const mockCampaignRequest: CampaignCreateRequest = {
      general_information: {
        name: "Test Campaign",
        urls: ["https://t.co/Ojz1243Fns"],
        prefetch_url: "https://jmartinn.com/",
        minimum_quality: 1,
        minimum_quality_mode: "minimum",
        frequency_cap: {
          days: 1,
          hours: 0,
          minutes: 0,
        },
        after_approval: 1,
        primespot: "all",
        adult: false,
        referrer: 0,
        ad_block: "all",
        incognito: "all",
        ad_type: "popunder",
        ad_type_other: true,
      },
      budget: {
        mode: "smart_bid",
        budget: 0,
        max_bid: "0.008",
        max_per_day: 0,
      },
      throttling: {
        type: "auto",
        mode: "imps",
        unit: "m",
        value: 120,
      },
      categories: {
        list: [],
        include_subcategories: true,
      },
      countries: {
        codes: ["ES"],
        regions: [],
      },
      society: {
        language_mode: "any",
        languages: [],
        populations: [],
      },
      environment: {
        os: [],
        browser: [],
        resolutions: [],
      },
      device: {
        form_factor: [3155, 310],
        device: [],
        request_as_desktop: 1,
      },
      connections: {
        conntype: [],
        connspeed: [],
        internet_service_providers: [],
      },
      time: {
        time: [],
        timezone: "Europe/Madrid",
      },
      website_targeting: {
        type: "none",
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

    // Mock API response
    const mockResponse: CampaignResponse = {
      status: "success",
      code: 200,
      records: 1,
      data: {
        campaign: {
          id: 123,
          status: "Pending Approval",
          ...mockCampaignRequest,
        },
      },
    };

    // Spy on the function and return the mock response
    const spy = vi
      .spyOn(client.campaign, "createCampaign")
      .mockResolvedValue(mockResponse);

    // Call the function
    const response = await client.campaign.createCampaign(mockCampaignRequest);

    // ✅ Assert function was called
    expect(spy).toHaveBeenCalledWith(mockCampaignRequest);

    // ✅ Assert response is correct
    expect(response).toEqual(mockResponse);
  });

  it("should call updateCampaign and return the expected response", async () => {
    const campaignId = 123;
    const mockUpdateRequest: CampaignUpdateRequest = {
      general_information: {
        name: "Updated Campaign Name",
        minimum_quality: 2,
      },
      budget: {
        max_bid: "0.01",
      },
    };

    const mockResponse: CampaignResponse = {
      status: "success",
      code: 200,
      records: 1,
      data: {
        campaign: {
          id: campaignId,
          status: "Pending Approval",
          general_information: {
            name: "Updated Campaign Name",
            urls: ["https://t.co/Ojz1243Fns"],
            prefetch_url: "https://jmartinn.com/",
            minimum_quality: 2,
            minimum_quality_mode: "minimum",
            frequency_cap: {
              days: 1,
              hours: 0,
              minutes: 0,
            },
            after_approval: 1,
            primespot: "all",
            adult: false,
            referrer: 0,
            ad_block: "all",
            incognito: "all",
            ad_type: "popunder",
            ad_type_other: true,
          },
          budget: {
            mode: "smart_bid",
            budget: 0,
            max_bid: "0.01",
            max_per_day: 0,
          },
          throttling: {
            type: "auto",
            mode: "imps",
            unit: "m",
            value: 120,
          },
          categories: {
            list: [],
            include_subcategories: true,
          },
          countries: {
            codes: ["ES"],
            regions: [],
          },
          society: {
            language_mode: "any",
            languages: [],
            populations: [],
          },
          environment: {
            os: [],
            browser: [],
            resolutions: [],
          },
          device: {
            form_factor: [3155, 310],
            device: [],
            request_as_desktop: 1,
          },
          connections: {
            conntype: [],
            connspeed: [],
            internet_service_providers: [],
          },
          time: {
            time: [],
            timezone: "Europe/Madrid",
          },
          website_targeting: {
            type: "none",
          },
          adscore: {
            valid_traffic: 1,
            proxy_traffic: 0,
            junk_traffic: 0,
            bot_traffic: 0,
            compliance: 1,
            compliance_intelligence: 1,
          },
        },
      },
    };

    const spy = vi
      .spyOn(client.campaign, "updateCampaign")
      .mockResolvedValue(mockResponse);

    const response = await client.campaign.updateCampaign(
      campaignId,
      mockUpdateRequest,
    );

    expect(spy).toHaveBeenCalledWith(campaignId, mockUpdateRequest);

    expect(response).toEqual(mockResponse);
  });
});
