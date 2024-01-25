import { ItemId } from "@game/data/items";
import { MonsterId } from "@game/data/monsters";
import { CampaignId } from "@game/data/campaigns";
import { Tier } from "@game/types/tier";
import { game } from "@game/index";

const _assets = import.meta.glob("@/assets/**/*.(png|svg)", { eager: true, as: "url" });

export function asset(path: string) {
  return _assets[`/src/assets/${path}`];
}

export function item(id: ItemId | undefined): { emoji?: string, image?: string } {
  if (!id) return {};

  let emoji;
  let image;

  switch (id) {
    case "ot_gold": emoji = "🪙"; break;
    case "ot_gem": emoji = "💎"; break;
    case "ot_food": emoji = "🍏"; break;
    case "ot_xp": emoji = "⭐"; break;
    case "ot_monster_scroll": emoji = "📜"; break;
    case "ot_item_box": emoji = "📦"; break;
    case "ot_arena_trophy": emoji = "🏆"; break;
    case "ot_wheel_spin_token": emoji = "🎟"; break;
    default: image = _assets[`/src/assets/${game.items[id].type}/${id.substring(3)}.png`]; break;
  }

  return { emoji, image };
}

export function monster(id: MonsterId | undefined) {
  return id ? _assets[`/src/assets/monster/${id}.png`] : undefined;
}

export function campaign(id: CampaignId | undefined) {
  return id ? _assets[`/src/assets/campaign/${id}.png`] : undefined;
}

export const tierColors: Record<Tier, string> = {
  S: "#F21616",
  A: "#D9D02F",
  B: "#6B31B2",
  C: "#2BDD66",
  D: "#0969FF",
  E: "#F3F3FE",
  F: "#656A7E",
}

export const tierColorsBg: Record<Tier, string> = {
  S: "#632828",
  A: "#5C592F",
  B: "#3F2F51",
  C: "#2D5D3D",
  D: "#243E66",
  E: "#636366",
  F: "#3D3E44",
}

export const tierColorsHover: Record<Tier, string> = {
  S: "#7D2525",
  A: "#736F2F",
  B: "#473063",
  C: "#2D7445",
  D: "#204682",
  E: "#7D7D82",
  F: "#44464E",
}


export * as assets from "./assets";