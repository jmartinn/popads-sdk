import { Client } from '../src';

// API Key should be stored in environment variables for security
const apiKey = process.env.POPADS_API_KEY || 'your-api-key-here';

async function basicExample() {
  const client = new Client(apiKey);

  try {
    console.log('🚀 PopAds SDK Basic Example\n');

    // ✨ Simplified campaign creation with minimal required fields
    console.log('📝 Creating a campaign with minimal configuration...');
    const minimalCampaign = await client.campaign.createCampaign({
      general_information: {
        name: 'My First Campaign',
        urls: ['https://example.com'],
      },
      budget: {
        max_bid: 0.001, // Minimum bid
        budget: 10, // $10 total budget
      },
      // That's it! All other fields use sensible defaults:
      // - frequency_cap: once per day
      // - adult: false
      // - ad_type: popunder
      // - time: all time slots (24/7)
      // - countries: all countries
      // - etc.
    });

    console.log('✅ Minimal campaign created:', {
      id: minimalCampaign.data?.campaign?.id,
      name: minimalCampaign.data?.campaign?.general_information?.name,
      status: minimalCampaign.data?.campaign?.status,
    });

    // 🎯 Example with some custom targeting
    console.log('\n📝 Creating a campaign with custom targeting...');
    const targetedCampaign = await client.campaign.createCampaign({
      general_information: {
        name: 'Targeted Campaign',
        urls: ['https://example.com/landing'],
        minimum_quality: 8, // High quality traffic only
        adult: false,
        ad_type: 'popunder',
      },
      budget: {
        mode: 'smart_bid',
        max_bid: 0.01,
        budget: 100,
        max_per_day: 20, // $20 per day limit
      },
      countries: {
        codes: ['US', 'CA', 'GB'], // English-speaking countries
      },
      device: {
        device: [], // All devices (default)
        form_factor: [1, 2], // Desktop and tablet only (example IDs)
      },
    });

    console.log('✅ Targeted campaign created:', {
      id: targetedCampaign.data?.campaign?.id,
      name: targetedCampaign.data?.campaign?.general_information?.name,
      status: targetedCampaign.data?.campaign?.status,
    });

    // 📊 Retrieve campaign details
    if (minimalCampaign.data?.campaign?.id) {
      console.log('\n📋 Retrieving campaign details...');
      const campaign = await client.campaign.getCampaign(
        minimalCampaign.data.campaign.id,
      );
      console.log('✅ Campaign retrieved:', {
        id: campaign.data?.campaign?.id,
        name: campaign.data?.campaign?.general_information?.name,
        budget: campaign.data?.campaign?.budget?.budget,
        maxBid: campaign.data?.campaign?.budget?.max_bid,
      });
    }

    // 🎛️ Get available options for targeting
    console.log('\n⚙️ Fetching available targeting options...');
    const countries = await client.options.getCountries();
    console.log(`✅ Available countries: ${countries.data?.length || 0}`);

    const categories = await client.options.getCategories();
    console.log(`✅ Available categories: ${categories.data?.length || 0}`);

    console.log('\n🎉 Example completed successfully!');
    console.log('\n💡 Key benefits of the new interface:');
    console.log('   • Only name, urls, max_bid, and budget are required');
    console.log('   • All other fields have intelligent defaults');
    console.log('   • Still fully type-safe with TypeScript');
    console.log('   • Backward compatible with full configuration');
  } catch (error) {
    console.error('❌ Error in basic example:', error);
  }
}

// Run the example
basicExample().catch(console.error);
