import { game } from "..";
import { IMonsterData } from "../core/monster"

function createMonsterData(index: number, health: number, damage: number, speed: number): IMonsterData {
  return {
    index,

    health,
    damage,
    speed,

    skills: {
      active: { id: "basic" },
      passive: [{ id: "basic" }, { id: "basic" }, { id: "basic" }],
    },

    onTurn(battle, monster) {
      const enemies = game.battle.getEnemyMonsters(battle, monster);
      const target = game.battle.getAliveMonsters(enemies)[0];
      if (!target) return;

      this.onHit(battle, monster, target);
    },
    onHit(battle, attacker, target) {
      let damage = game.stats.value(attacker.stats.damage);

      if (attacker.energy > 100) {
        attacker.energy = 0;
        damage *= game.constants.energyDamageMultiplier;
      }
      else {
        attacker.energy += game.constants.hitEnergyIncrease;
      }

      attacker.animation = { id: "hit", anim: battle.animation++ }

      game.monsters[target.id].onGetHit(
        battle,
        attacker,
        target,
        { damage }
      );
    },
    onGetHit(battle, _attacker, target, data) {
      target.energy += game.constants.getHitEnergyIncrease;
      target.animation = { id: "getHit", anim: battle.animation++, data }

      target.health -= data.damage;
    },
    onSkillHit(_battle, _monster) { },
    onSkillGetHit(_battle, _monster) { },
    onKill(_battle, _monster) { },
    onDie(_battle, _monster) { },
  }
}

// Monster data is generated as:
// Health 300-1000
// Damage 50-200
// Speed 10-100

export type MonsterId = keyof typeof monsters
export const monsters = {
  angel: createMonsterData(0, 336, 50, 10),
  death_knight: createMonsterData(1, 361, 55, 11),
  deep_dwarf: createMonsterData(2, 482, 57, 12),
  jelly: createMonsterData(3, 484, 58, 13),
  ogre: createMonsterData(4, 501, 61, 15),
  phoenix: createMonsterData(5, 525, 70, 18),
  raven: createMonsterData(6, 566, 75, 22),
  slave_freed: createMonsterData(7, 597, 83, 25),
  stone_giant: createMonsterData(8, 599, 84, 30),
  wizard: createMonsterData(9, 601, 85, 32),
  hell_sentinel: createMonsterData(10, 634, 99, 33),
  red_devil: createMonsterData(11, 662, 110, 35),
  draconic_base_black: createMonsterData(12, 712, 113, 36),
  golden_dragon: createMonsterData(13, 718, 123, 39),
  shining_eye: createMonsterData(14, 721, 129, 43),
  paladin: createMonsterData(15, 722, 136, 49),
  molten_gargoyle: createMonsterData(16, 741, 139, 50),
  bone_dragon: createMonsterData(17, 759, 145, 53),
  lich: createMonsterData(18, 766, 147, 56),
  gigabat: createMonsterData(19, 774, 148, 57),
  anubis_guard: createMonsterData(20, 782, 155, 59),
  big_kobold: createMonsterData(21, 786, 158, 65),
  boggart: createMonsterData(22, 798, 159, 75),
  brown_ooze: createMonsterData(23, 818, 173, 78),
  centaur: createMonsterData(24, 820, 177, 85),
  cyclops: createMonsterData(25, 826, 178, 89),
  fire_giant: createMonsterData(26, 827, 182, 90),
  gnome: createMonsterData(27, 833, 189, 93),
  lindwurm: createMonsterData(28, 859, 190, 96),
  minotaur: createMonsterData(29, 999, 191, 99),
}