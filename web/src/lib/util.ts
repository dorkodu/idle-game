import { IItem } from "@game/core/item";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";

export function wait<T>(
  start: () => Promise<T>,
  before: number = 100,
  after: number = 500
): () => Promise<T> {
  let out: T;

  return () => new Promise(async (resolve) => {
    let didBefore = false;
    let didAfter = false;
    let loaded = false;

    setTimeout(() => {
      if (loaded) resolve(out);
      didBefore = true;
    }, before);

    setTimeout(() => {
      if (loaded) resolve(out);
      didAfter = true;
    }, after);

    out = await start();

    if (!didBefore || didAfter) resolve(out);
    loaded = true;
  })
}

export function formatNumber(number: number, long?: boolean) {
  if (long) return Intl.NumberFormat("en").format(number);
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
}

export function clampNumber(number: number, min: number, max: number) {
  if (number < min) return min;
  if (number > max) return max;
  return number;
}

export function sortItems(items: IItem[]): IItem[] {
  return items.sort((a, b) => {
    if (a.id !== b.id) return game.items[b.id].index - game.items[a.id].index;
    if (a.tier !== b.tier) return game.tier.tierToIndex(b.tier) - game.tier.tierToIndex(a.tier);
    return b.stars - a.stars;
  });
}

export function sortMonsters(monsters: IMonster[]): IMonster[] {
  return monsters.sort((a, b) => {
    if (a.id !== b.id) return game.monsters[b.id].index - game.monsters[a.id].index;
    if (a.stars !== b.stars) return b.stars - a.stars;
    return b.level - a.level;
  });
}

export * as util from "./util";