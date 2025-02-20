import { CampaignClient } from "./campaign";
import { FeedClient } from "./feed";
import { OptionsClient } from "./options";

export class PopAdsClient {
  public campaign: CampaignClient;
  public feed: FeedClient;
  public options: OptionsClient;

  constructor(apiKey: string) {
    this.campaign = new CampaignClient(apiKey);
    this.feed = new FeedClient(apiKey);
    this.options = new OptionsClient(apiKey);
  }
}
