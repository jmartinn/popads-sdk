import { Client } from 'popads-sdk';

const client = new Client(process.env.POPADS_API_KEY as string);

async function main() {
  const campaigns = await client.campaign.getCampaign(123);
  console.log(campaigns);
}

main().catch(console.error);
