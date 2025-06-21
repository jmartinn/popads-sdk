import { Client, ConsoleLogger } from '../src';

// Environment variable handling with graceful fallback
const getApiKey = (): string => {
  const apiKey = process.env.POPADS_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error('❌ API key not found!');
    console.log('Please set the POPADS_API_KEY environment variable:');
    console.log('export POPADS_API_KEY="your-api-key-here"');
    console.log('\nOr create a .env file in the examples directory with:');
    console.log('POPADS_API_KEY=your-api-key-here');
    process.exit(1);
  }

  return apiKey;
};

// Safe campaign ID for testing (you can override with CAMPAIGN_ID env var)
const getCampaignId = (): number => {
  const envCampaignId = process.env.CAMPAIGN_ID;
  return envCampaignId ? parseInt(envCampaignId, 10) : 123; // Default test ID
};

const apiKey = getApiKey();
const campaignId = getCampaignId();

const client = new Client(apiKey, {
  debug: true,
  logLevel: 'debug',
  timeout: 15000,
  enableInterception: true,
});

// Example with custom logger
const customLogger = new ConsoleLogger('debug');
const _clientWithCustomLogger = new Client(apiKey, {
  debug: true,
  logger: customLogger,
});

async function demonstrateLogging() {
  console.log('🔍 SDK Debugging Example');
  console.log('========================\n');

  try {
    // Enable debug mode dynamically
    client.setDebugMode(true);

    console.log('📋 Current client configuration:');
    console.log(JSON.stringify(client.getConfig(), null, 2));
    console.log('\n');

    // Make a request to see debug logs
    console.log('🚀 Making API request with debugging enabled...\n');

    const response = await client.campaign.getCampaign(campaignId);
    console.log(
      `✅ Request completed successfully - Status: ${response.status}`,
    );

    if (response.data?.campaign) {
      console.log(
        `📋 Campaign found: ${response.data.campaign.general_information?.name || 'Unnamed'}`,
      );
    }
  } catch (error) {
    console.error('❌ Request failed:', error);

    // The error will be logged with full details in debug mode
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
  }
}

// Example of production usage with minimal logging
async function productionExample() {
  const prodClient = new Client(apiKey, {
    debug: false, // No debug logs in production
    logLevel: 'error', // Only log errors
  });

  try {
    const response = await prodClient.campaign.getCampaign(campaignId);
    console.log(
      `✅ Production request completed silently - Status: ${response.status}`,
    );
  } catch (error) {
    // Only errors will be logged in production mode
    console.error('Production error occurred:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

// Run examples
demonstrateLogging()
  .then(() => {
    console.log('\n' + '='.repeat(50));
    console.log('🏭 Production Example (minimal logging)');
    console.log('='.repeat(50) + '\n');
    return productionExample();
  })
  .catch(console.error);
