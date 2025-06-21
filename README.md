# PopAds SDK (TypeScript)
A minimal and efficient TypeScript SDK for interacting with the PopAds API v2. This SDK simplifies campaign management, feed retrieval, and options handling, with zero dependencies.

## 🚀 Features
- 📌 Create, update, and manage PopAds campaigns.
- 📊 Fetch feed data programmatically.
- ⚙️ Retrieve available options (countries, categories, etc.).
- 🔒 Built with TypeScript for type safety.
- 📦 Zero dependencies, lightweight, and efficient.
- 🔄 Support for both PUT and PATCH campaign updates.

---

## 📦 Installation
Install using `pnpm`:

```sh
pnpm add popads-sdk
```

## 🔠 TypeScript Types
This SDK exports all its types, making it easy to use in your TypeScript projects. Types are organized into namespaces to prevent naming conflicts.

### Available Types
- Common types like `BaseApiResponse` and `OptionList` are exported directly
- Campaign-related types are under the `CampaignTypes` namespace  
- Feed-related types are under the `FeedTypes` namespace

### 🎯 Simplified Campaign Creation

The SDK provides a **developer-friendly interface** that only requires essential fields, while automatically applying sensible defaults for everything else:

```typescript
import { Client, CampaignTypes } from 'popads-sdk';

const client = new Client('your-api-key');

// ✨ Minimal required fields (recommended approach)
const campaign: CampaignTypes.CampaignCreateRequest = {
  general_information: {
    name: 'My Campaign',
    urls: ['https://example.com']
  },
  budget: {
    max_bid: 0.001,
    budget: 100
  }
  // That's it! Defaults handle the rest:
  // - frequency_cap: once per day
  // - adult: false
  // - ad_type: popunder
  // - time: all hours (24/7)
  // - countries: all countries
  // - etc.
};

await client.campaign.createCampaign(campaign);
```

### 🎛️ Advanced Configuration

When you need more control, you can specify any additional fields:

```typescript
// Advanced configuration example
const advancedCampaign: CampaignTypes.CampaignCreateRequest = {
  general_information: {
    name: 'Targeted Campaign',
    urls: ['https://example.com/promo'],
    minimum_quality: 8,
    adult: false,
    ad_type: 'popunder'
  },
  budget: {
    mode: 'smart_bid',
    max_bid: 0.01,
    budget: 500,
    max_per_day: 50
  },
  countries: {
    codes: ['US', 'CA', 'GB']
  },
  device: {
    form_factor: [1, 2] // Desktop + tablet
  },
  time: {
    time: ['800', '900', '1000'], // Morning hours only
    timezone: 'America/New_York'
  }
};
```

### 📋 Full Type Reference

For advanced users who need complete control, the full API structure is available:

```typescript
// Full API request type (what actually gets sent after applying defaults)
const fullCampaign: CampaignTypes.CampaignCreateRequest = {
  // ... all fields are required here
};

// Response types
const response: CampaignTypes.CampaignResponse = await client.campaign.getCampaign(123);
const campaign: CampaignTypes.Campaign = response.data?.campaign;

// Update operations
const updates: CampaignTypes.CampaignUpdateRequest = {
  general_information: { name: 'Updated Name' }
};
```
