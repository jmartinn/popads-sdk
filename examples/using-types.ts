// Example of using the types from popads-sdk

import {
  Client,
  BaseApiResponse,
  OptionList,
  CampaignTypes,
  FeedTypes,
} from '../src';

// API Key should be stored in environment variables for security
const apiKey = process.env.POPADS_API_KEY || 'your-api-key-here';

/**
 * This example demonstrates the different approaches to campaign creation
 * and how to use the exported types effectively.
 */
async function typesExample() {
  const client = new Client(apiKey);

  try {
    console.log('🎯 PopAds SDK Types Example\n');

    // ✨ APPROACH 1: Minimal Required Fields (Recommended for most users)
    console.log('📝 Approach 1: Minimal Required Fields');
    const minimalInput: CampaignTypes.CampaignCreateRequest = {
      general_information: {
        name: 'Minimal Campaign',
        urls: ['https://example.com'],
      },
      budget: {
        max_bid: 0.001,
        budget: 10,
      },
    };

    console.log('📊 Creating minimal campaign...');
    const minimalCampaign = await client.campaign.createCampaign(minimalInput);
    console.log('✅ Success! Only 4 fields required:', {
      name: minimalInput.general_information.name,
      urls: minimalInput.general_information.urls.length,
      max_bid: minimalInput.budget.max_bid,
      budget: minimalInput.budget.budget,
    });

    // ✨ APPROACH 2: Partial Configuration (Great for specific needs)
    console.log('\n📝 Approach 2: Partial Configuration');
    const partialInput: CampaignTypes.CampaignCreateRequest = {
      general_information: {
        name: 'Targeted Campaign',
        urls: ['https://example.com/promo'],
        minimum_quality: 8,
        adult: false,
        ad_type: 'popunder',
        frequency_cap: {
          days: 0,
          hours: 2,
          minutes: 0,
        },
      },
      budget: {
        mode: 'smart_bid',
        max_bid: 0.01,
        budget: 100,
        max_per_day: 25,
        daily_traffic_shaping: 'adaptive',
      },
      countries: {
        codes: ['US', 'CA', 'GB'],
        regions: [],
      },
      device: {
        device: [],
        form_factor: [1, 2], // Desktop + tablet
      },
      time: {
        time: ['800', '801', '802', '900', '901', '902'], // Morning hours
        timezone: 'America/New_York',
      },
    };

    console.log('📊 Creating targeted campaign...');
    const targetedCampaign = await client.campaign.createCampaign(partialInput);
    console.log('✅ Success! Custom targeting applied:', {
      name: partialInput.general_information.name,
      quality: partialInput.general_information.minimum_quality,
      countries: partialInput.countries?.codes?.length || 0,
      timeSlots: partialInput.time?.time?.length || 0,
    });

    // ✨ APPROACH 3: Working with Full API Types (Advanced users)
    console.log('\n📝 Approach 3: Understanding Full API Structure');

    // The CampaignCreateRequest type shows what actually gets sent to the API
    // (after defaults are applied). This is useful for understanding the complete structure.
    const fullStructureExample: CampaignTypes.CampaignCreateRequest = {
      general_information: {
        name: 'Full Structure Example',
        urls: ['https://example.com/full'],
        prefetch_url: 'https://example.com/prefetch',
        minimum_quality: 5,
        minimum_quality_mode: 'minimum',
        frequency_cap: { days: 1, hours: 0, minutes: 0 },
        after_approval: 1,
        adult: false,
        primespot: 'all',
        referrer: 0,
        ad_block: 'all',
        incognito: 'all',
        ad_type: 'popunder',
        ad_type_other: true,
      },
      budget: {
        mode: 'smart_bid',
        max_bid: 0.005,
        max_per_day: 50,
        daily_traffic_shaping: 'adaptive',
        budget: 500,
        global_budget: false,
      },
      throttling: {
        type: 'auto',
        mode: 'imps',
        unit: 'h',
        value: 1000,
      },
      countries: {
        codes: ['US'],
        regions: [],
      },
      categories: {
        list: [],
        include_subcategories: true,
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
        form_factor: [],
        request_as_desktop: undefined,
      },
      connections: {
        conntype: [],
        connspeed: [],
        internet_service_providers: [],
      },
      time: {
        time: ['000', '001'], // Just first two slots for example
        timezone: 'UTC',
      },
      website_targeting: {
        type: 'none',
      },
      adscore: {
        valid_traffic: 1,
        proxy_traffic: 0,
        true_location: 0,
        junk_traffic: 0,
        bot_traffic: 0,
        compliance_intelligence: 1,
        compliance: 1,
      },
    };

    console.log(
      '📊 Full structure has',
      Object.keys(fullStructureExample).length,
      'top-level properties',
    );
    console.log('🔍 But you only need to specify what matters to you!');

    // ✨ TYPE UTILITIES: Working with campaign responses
    console.log('\n📝 Working with API Responses');

    if (minimalCampaign.data?.campaign?.id) {
      const campaignDetails = await client.campaign.getCampaign(
        minimalCampaign.data.campaign.id,
      );

      // The response follows BaseApiResponse pattern
      const response: BaseApiResponse = campaignDetails;
      console.log('✅ Response status:', response.status);

      // Campaign-specific response data
      const campaignResponse: CampaignTypes.CampaignResponse = campaignDetails;
      if (campaignResponse.data?.campaign) {
        const campaign: CampaignTypes.Campaign = campaignResponse.data
          .campaign as CampaignTypes.Campaign;
        console.log('✅ Retrieved campaign:', {
          id: campaign.id,
          name: campaign.general_information?.name,
          status: campaign.status,
        });
      }
    }

    // ✨ UPDATE OPERATIONS: Using the update types
    console.log('\n📝 Campaign Update Types');

    const updateData: CampaignTypes.CampaignUpdateRequest = {
      general_information: {
        name: 'Updated Campaign Name',
        minimum_quality: 9,
      },
      budget: {
        max_bid: 0.015,
        max_per_day: 30,
      },
    };

    console.log(
      '📊 Update data prepared for campaign ID:',
      minimalCampaign.data?.campaign?.id,
    );
    console.log(
      '🔍 Update only changes specified fields, rest remain unchanged',
    );

    console.log('\n🎉 Types example completed successfully!');
    console.log('\n💡 Key takeaways:');
    console.log(
      '   • Use CampaignCreateRequest - only essential fields are required',
    );
    console.log(
      '   • Only specify fields you care about - defaults handle the rest',
    );
    console.log('   • Single interface approach: simple and intuitive');
    console.log('   • All types are properly exported and documented');
    console.log('   • TypeScript ensures type safety throughout');
  } catch (error) {
    console.error('❌ Error in types example:', error);
  }
}

// Helper function to demonstrate type usage
function createCampaignHelper(
  name: string,
  url: string,
  budget: number,
): CampaignTypes.CampaignCreateRequest {
  return {
    general_information: {
      name,
      urls: [url],
    },
    budget: {
      max_bid: 0.001,
      budget,
    },
  };
}

// Example of using the helper
console.log('🔧 Helper function example:');
const quickCampaign = createCampaignHelper(
  'Quick Campaign',
  'https://example.com',
  50,
);
console.log('✅ Quick campaign config:', {
  name: quickCampaign.general_information.name,
  budget: quickCampaign.budget.budget,
});

// Run the example
typesExample().catch(console.error);

// Using campaign types
const createCampaign = (data: CampaignTypes.CampaignCreateRequest) => {
  const client = new Client('your-api-key');
  // Implementation would go here
  console.log(`Creating campaign with name: ${data.general_information.name}`);
};

// Using feed types
const createFeed = (data: FeedTypes.FeedCreateRequest) => {
  const client = new Client('your-api-key');
  // Implementation would go here
  console.log(`Creating feed with name: ${data.general_information.name}`);
};

// Example of using option types
const processCategories = (categories: OptionList[]) => {
  categories.forEach((category) => {
    console.log(`Category ID: ${category.id}, Label: ${category.label}`);
  });
};

// This is how you would use campaign-specific enums and types
type QualityLevel = CampaignTypes.QualityLevel; // Range from 1-10
