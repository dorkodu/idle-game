import { game } from "..";
import { IPlayer } from "../core/player";
import { Content } from "../types/content";

type Props = {
  toAdd?: Content[];
  toRemove?: Content[];
}

export function actable(_player: IPlayer, props: Props): boolean {
  // If adding and removing nothing
  if (!props.toAdd && !props.toRemove) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  props.toAdd?.forEach(c => {
    if (c.item) {
      if (c.item.id === "ot_xp") {
        const { level, xp } = game.player.handleXp(player.level, player.xp + c.item.count);
        const levelChange = level - player.level;
        player.level = level;
        player.xp = xp;

        // If player has leveled up, also give the player gems
        if (levelChange > 0) {
          act(player, { toAdd: [{ item: game.constants.createGem(levelChange * game.constants.levelUpGemReward) }] });
        }

        return;
      }

      const itemId = game.item.id(c.item);
      if (player.items[itemId]) player.items[itemId]!.count += c.item.count;
      else player.items[itemId] = c.item;
    }

    if (c.monster) {
      const monsterId = game.monster.id(c.monster);
      player.monsters[monsterId] = c.monster;
    }
  });

  props.toRemove?.forEach(c => {
    if (c.item) {
      if (c.item.id === "ot_xp") throw "Can not remove xp from the player!";

      const itemId = game.item.id(c.item);
      if (player.items[itemId]) {
        player.items[itemId]!.count -= c.item.count;
        if (player.items[itemId]!.count <= 0) delete player.items[itemId];
      }
    }

    if (c.monster) {
      const monsterId = game.monster.id(c.monster);
      delete player.monsters[monsterId];
    }
  });
}

export * as changePlayerContents from "./change_player_contents";