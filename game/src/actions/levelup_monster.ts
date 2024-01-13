import { game } from "..";
import { IPlayer } from "../core/player";

type Props = {
  monster: string;
}

export function actable(player: IPlayer, props: Props): boolean {
  const monster = game.player.getMonsterById(player, props.monster);
  if (!monster) return false;

  if (monster.level >= game.constants.maxLevel) return false;

  const cost = game.monster.getLevelUpCost(monster);
  const playerGold = player.items[game.constants.goldId]?.count ?? 0;
  const playerFood = player.items[game.constants.foodId]?.count ?? 0;
  if (playerGold < cost.gold || playerFood < cost.food) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const monster = game.player.getMonsterById(player, props.monster);
  if (!monster) return;

  const cost = game.monster.getLevelUpCost(monster);

  // Reduce gold and food
  game.actions.changePlayerContents.act(
    player,
    {
      toRemove: [
        { item: game.constants.createGold(cost.gold) },
        { item: game.constants.createFood(cost.food) },
      ]
    }
  );

  // Upgrade the monster
  monster.level++;
}

export * as levelupMonster from "./levelup_monster";