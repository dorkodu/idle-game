import { MonsterId } from "../data/monsters";
import { IItem } from "./item";

export interface IMonster {
  uid: string;

  id: MonsterId;
  level: number;

  items?: {
    weapon?: IItem;
    armor?: IItem;
    rune?: IItem;
    ring?: IItem;
    amulet?: IItem;
  }

  /**
   * Stars are upgradeable.
   * Upgrade cost is significantly increased for the next type of star.
   * - Yellow stars: 1 to 5
   * - Orange stars: 1 to 3
   * - Red stars: 1 to 5
   * - Transcended stars: 1 to 3
   */
  stars: number;
}

export * as monster from "./monster";