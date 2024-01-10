import { ICampaignData } from "../core/campaign"

function createCampaingData(index: number): ICampaignData {
  return { index }
}

export type CampaignId = keyof typeof campaigns
export const campaigns = {
  tree_of_life: createCampaingData(0),
  mossy_tower: createCampaingData(1),
  ruins: createCampaingData(2),
  sand_castle: createCampaingData(3),
  icy_kingdom: createCampaingData(4),
  forgotten_gateway: createCampaingData(5),
  eternal_temple: createCampaingData(6),
  weird_forest: createCampaingData(7),
}