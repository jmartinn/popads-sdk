# PopAds SDK Examples

This directory contains practical examples demonstrating how to use the PopAds TypeScript SDK.

## 🚀 Quick Start

1. Copy `.env.example` to `.env` and add your PopAds API key:
```bash
cp .env.example .env
# Edit .env and add your API key
```

2. Install dependencies:
```bash
pnpm install
```

3. Run an example:
```bash
npx ts-node basic.ts
```

## 📁 Available Examples

- `basic.ts` - Basic campaign creation and retrieval
- `using-types.ts` - Advanced usage with TypeScript types
- `debugging-example.ts` - Error handling and debugging
- `patch-example.ts` - Campaign updates using PATCH

## Environment Variables

The examples use environment variables for configuration. Copy `.env.example` to `.env` and configure:

- `POPADS_API_KEY` - Your PopAds API key (required)
- `CAMPAIGN_ID` - Optional campaign ID for testing specific campaigns
