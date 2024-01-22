import { IItem } from "../core/item";

export type ShopType = "premium" | "gold" | "gem";

export interface IShopSpecialOffer {
  asset: { image?: string; emoji?: string; };
  name: string;
  items: IItem[];
  money: number;
}

export interface IShopItem {
  item: IItem;

  price: { money?: number, gold?: number, gem?: number };

  /**
   * - Positive -> Buy limit has not been reached.
   * - Negative -> No buy limit.
   */
  limit: number;
}