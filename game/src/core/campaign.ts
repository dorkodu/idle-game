import { CampaignId } from "../data/campaigns";

export interface ICampaign {
  id: CampaignId;
}

export interface ICampaignData {
  index: number;
}

export * as campaign from "./campaign";