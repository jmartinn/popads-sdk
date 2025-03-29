// Example of using the types from popads-sdk

import { Client, BaseApiResponse, OptionList, CampaignTypes, FeedTypes } from '../src';

// Using BaseApiResponse type
const handleResponse = (response: BaseApiResponse) => {
  if (response.status === 'success') {
    console.log(`Request succeeded with ${response.records} records`);
  } else {
    console.log(`Request failed with code ${response.code}`);
  }
};

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
  categories.forEach(category => {
    console.log(`Category ID: ${category.id}, Label: ${category.label}`);
  });
};

// This is how you would use campaign-specific enums and types
type QualityLevel = CampaignTypes.QualityLevel; // Range from 1-10 