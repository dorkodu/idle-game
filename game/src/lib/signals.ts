import { Signal } from "./signal"
import { IPlayer } from "../core/player"

export const signals = {
  progressCampaign: new Signal<{ player: IPlayer }>(),
  collectCampaignFarm: new Signal<{ player: IPlayer }>(),

  progressTower: new Signal<{ player: IPlayer }>(),

  // TODO: Currently unused.
  buySpecialOffer: new Signal<{ player: IPlayer }>(),
  buyShopItem: new Signal<{ player: IPlayer }>(),

  upgradeItem: new Signal<{ player: IPlayer }>(),

  summonMonster: new Signal<{ player: IPlayer }>(),
  evolveMonster: new Signal<{ player: IPlayer }>(),
  sacrificeMonsters: new Signal<{ player: IPlayer }>(),
}