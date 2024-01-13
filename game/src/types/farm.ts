/**
 * Farm is amount of resources player receive each minute.
 * Amount is increased as player progress through the campaign.
 * Player must manually collect resources from campaign route.
 */
export type Farm = {
  gold: number,
  food: number,
  xp: number,
}