import { Client } from 'popads-sdk';

const client = new Client(process.env.POPADS_API_KEY || 'your-api-key');

async function main() {
  try {
    // Get an existing campaign
    const campaign = await client.campaign.getCampaign(123);
    console.log('Original campaign:', campaign);

    // Partially update campaign using PATCH (only updates specified fields)
    const patchedCampaign = await client.campaign.patchCampaign(123, {
      general_information: {
        name: 'Patched Campaign Name',
      },
      // Only the name will be updated, other fields remain unchanged
    });
    console.log('Campaign after PATCH update:', patchedCampaign);

    // Compare with a full update using PUT
    console.log('\nDemonstrating difference between PATCH and PUT:');
    console.log('PATCH - Only updates specified fields');
    console.log('PUT - Replaces the entire resource with the request payload');
  } catch (error) {
    console.error('Error in example:', error);
  }
}

main();
