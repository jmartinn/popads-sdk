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

### Example Usage

```typescript
import { 
  Client, 
  BaseApiResponse, 
  CampaignTypes, 
  FeedTypes 
} from 'popads-sdk';

// Use campaign-specific types
const createCampaign = (campaign: CampaignTypes.CampaignCreateRequest) => {
  const client = new Client('your-api-key');
  // Implementation...
};

// Use feed-specific types
const createFeed = (feed: FeedTypes.FeedCreateRequest) => {
  // Implementation...
};
```
