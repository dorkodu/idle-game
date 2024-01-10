import { IItemData } from "../core/item";
import { ItemType } from "../types/item_type";

function createItemData(type: ItemType): IItemData {
  if (type === "other") return { type };
  return {
    type,
    stats: {
      health: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
      damage: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
      speed: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
    }
  }
}

const weapons = {
  we_ancient_sword: createItemData("weapon"),
  we_ankus: createItemData("weapon"),
  we_axe: createItemData("weapon"),

  we_bardiche_1: createItemData("weapon"),
  we_bardiche_2: createItemData("weapon"),
  we_bardiche_4: createItemData("weapon"),
  we_bardiche_5: createItemData("weapon"),

  we_battle_axe_1: createItemData("weapon"),
  we_battle_axe_2: createItemData("weapon"),
  we_battle_axe_3: createItemData("weapon"),
  we_battle_axe_4: createItemData("weapon"),
  we_battle_axe_5: createItemData("weapon"),
  we_battle_axe_6: createItemData("weapon"),
  we_battle_axe_7: createItemData("weapon"),

  we_blessed_blade: createItemData("weapon"),

  we_broad_axe_1: createItemData("weapon"),
  we_broad_axe_2: createItemData("weapon"),
  we_broad_axe_3: createItemData("weapon"),
  we_broad_axe_4: createItemData("weapon"),
  we_broad_axe_5: createItemData("weapon"),
}

const armors = {
  ar_animal_skin_1: createItemData("armor"),
  ar_animal_skin_2: createItemData("armor"),
  ar_animal_skin_3: createItemData("armor"),

  ar_banded_mail_1: createItemData("armor"),
  ar_banded_mail_2: createItemData("armor"),

  ar_blue_dragon_scale_mail: createItemData("armor"),

  ar_chain_mail_1: createItemData("armor"),
  ar_chain_mail_2: createItemData("armor"),
  ar_chain_mail_3: createItemData("armor"),

  ar_crystal_plate_mail: createItemData("armor"),

  ar_dwarven_ringmail: createItemData("armor"),

  ar_elven_leather_armor: createItemData("armor"),
  ar_elven_ringmail: createItemData("armor"),
  ar_elven_scalemail: createItemData("armor"),

  ar_gold_dragon_armor: createItemData("armor"),
  ar_green_dragon_scale_mail: createItemData("armor"),
  ar_ice_dragon_armor: createItemData("armor"),

  ar_leather_armor_1: createItemData("armor"),
  ar_leather_armor_2: createItemData("armor"),
  ar_leather_armor_3: createItemData("armor"),
}

const amulets = {
  am_bone_gray: createItemData("amulet"),

  am_cameo_blue: createItemData("amulet"),
  am_cameo_orange: createItemData("amulet"),

  am_celtic_blue: createItemData("amulet"),
  am_celtic_red: createItemData("amulet"),
  am_celtic_yellow: createItemData("amulet"),

  am_crystal_green: createItemData("amulet"),
  am_crystal_red: createItemData("amulet"),
  am_crystal_white: createItemData("amulet"),

  am_cylinder_gray: createItemData("amulet"),

  am_eye_cyan: createItemData("amulet"),
  am_eye_green: createItemData("amulet"),
  am_eye_magenta: createItemData("amulet"),

  am_face_1_gold: createItemData("amulet"),
  am_face_2: createItemData("amulet"),

  am_penta_green: createItemData("amulet"),
  am_penta_orange: createItemData("amulet"),

  am_ring_cyan: createItemData("amulet"),
  am_ring_green: createItemData("amulet"),
  am_ring_red: createItemData("amulet"),
}

const runes = {
  ru_generic: createItemData("rune"),
  ru_abyss: createItemData("rune"),
  ru_cerebov: createItemData("rune"),
  ru_cocytus: createItemData("rune"),
  ru_demonic_1: createItemData("rune"),
  ru_demonic_2: createItemData("rune"),
  ru_demonic_3: createItemData("rune"),
  ru_demonic_4: createItemData("rune"),
  ru_demonic_5: createItemData("rune"),
  ru_demonic_6: createItemData("rune"),
  ru_dis: createItemData("rune"),
  ru_elven: createItemData("rune"),
  ru_gehenna: createItemData("rune"),
  ru_gloorx_vloq: createItemData("rune"),
  ru_lom_lobon: createItemData("rune"),
  ru_mnoleg: createItemData("rune"),
  ru_shoals: createItemData("rune"),
  ru_slime: createItemData("rune"),
  ru_spider: createItemData("rune"),
  ru_swamp: createItemData("rune"),
}

const rings = {
  ri_agate: createItemData("ring"),
  ri_brass: createItemData("ring"),
  ri_bronze: createItemData("ring"),
  ri_clay: createItemData("ring"),
  ri_copper: createItemData("ring"),
  ri_coral: createItemData("ring"),
  ri_diamond: createItemData("ring"),
  ri_emerald: createItemData("ring"),
  ri_glass: createItemData("ring"),
  ri_gold_blue: createItemData("ring"),
  ri_gold_green: createItemData("ring"),
  ri_gold_red: createItemData("ring"),
  ri_gold: createItemData("ring"),
  ri_granite: createItemData("ring"),
  ri_iron: createItemData("ring"),
  ri_jade: createItemData("ring"),
  ri_moonstone: createItemData("ring"),
  ri_opal: createItemData("ring"),
  ri_pearl: createItemData("ring"),
  ri_plain_black: createItemData("ring"),
}

const other = {
  ot_gold: createItemData("other"),
  ot_gem: createItemData("other"),
  ot_food: createItemData("other"),
}

export type ItemId = keyof typeof items
export const items = {
  ...weapons,
  ...armors,
  ...amulets,
  ...runes,
  ...rings,

  ...other,
}