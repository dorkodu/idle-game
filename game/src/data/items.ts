import { IItemData } from "../core/item";
import { ItemType, ItemTypeEquipment, ItemTypeOther } from "../types/item_type";

function createEquipmentData(type: ItemTypeEquipment, index: number, health: number, damage: number, speed: number): IItemData {
  return {
    type,
    index,
    stats: {
      health: { baseValue: health, valueBonus: 0, percentBonus: 0 },
      damage: { baseValue: damage, valueBonus: 0, percentBonus: 0 },
      speed: { baseValue: speed, valueBonus: 0, percentBonus: 0 },
    }
  }
}

function createOtherData(type: ItemTypeOther, index: number): IItemData {
  return { type, index };
}

let index = 1;

/**
 * Generated as:
 * - Health: 100-300
 * - Damage: 200-500
 * - Speed: 10-50
 */
const ring = {
  ri_agate: createEquipmentData("ring", index++, 110, 212, 11),
  ri_brass: createEquipmentData("ring", index++, 119, 215, 18),
  ri_bronze: createEquipmentData("ring", index++, 126, 217, 20),
  ri_clay: createEquipmentData("ring", index++, 153, 221, 21),
  ri_copper: createEquipmentData("ring", index++, 154, 231, 22),
  ri_coral: createEquipmentData("ring", index++, 155, 243, 25),
  ri_diamond: createEquipmentData("ring", index++, 174, 270, 26),
  ri_emerald: createEquipmentData("ring", index++, 187, 272, 29),
  ri_glass: createEquipmentData("ring", index++, 197, 295, 30),
  ri_gold_blue: createEquipmentData("ring", index++, 207, 309, 32),
  ri_gold_green: createEquipmentData("ring", index++, 215, 315, 33),
  ri_gold_red: createEquipmentData("ring", index++, 220, 374, 34),
  ri_gold: createEquipmentData("ring", index++, 230, 400, 36),
  ri_granite: createEquipmentData("ring", index++, 264, 437, 37),
  ri_iron: createEquipmentData("ring", index++, 265, 453, 38),
  ri_jade: createEquipmentData("ring", index++, 271, 459, 39),
  ri_moonstone: createEquipmentData("ring", index++, 281, 465, 40),
  ri_opal: createEquipmentData("ring", index++, 286, 467, 43),
  ri_pearl: createEquipmentData("ring", index++, 288, 486, 47),
  ri_plain_black: createEquipmentData("ring", index++, 293, 491, 49),
}

/**
 * Generated as:
 * - Health: 200-500
 * - Damage: 100-300
 * - Speed: 0
 */
const rune = {
  ru_generic: createEquipmentData("rune", index++, 201, 101, 0),
  ru_abyss: createEquipmentData("rune", index++, 215, 106, 0),
  ru_cerebov: createEquipmentData("rune", index++, 216, 123, 0),
  ru_cocytus: createEquipmentData("rune", index++, 220, 126, 0),
  ru_demonic_1: createEquipmentData("rune", index++, 228, 131, 0),
  ru_demonic_2: createEquipmentData("rune", index++, 234, 136, 0),
  ru_demonic_3: createEquipmentData("rune", index++, 243, 137, 0),
  ru_demonic_4: createEquipmentData("rune", index++, 274, 145, 0),
  ru_demonic_5: createEquipmentData("rune", index++, 275, 153, 0),
  ru_demonic_6: createEquipmentData("rune", index++, 282, 165, 0),
  ru_dis: createEquipmentData("rune", index++, 320, 168, 0),
  ru_elven: createEquipmentData("rune", index++, 327, 170, 0),
  ru_gehenna: createEquipmentData("rune", index++, 342, 185, 0),
  ru_gloorx_vloq: createEquipmentData("rune", index++, 360, 188, 0),
  ru_lom_lobon: createEquipmentData("rune", index++, 362, 207, 0),
  ru_mnoleg: createEquipmentData("rune", index++, 370, 271, 0),
  ru_shoals: createEquipmentData("rune", index++, 383, 276, 0),
  ru_slime: createEquipmentData("rune", index++, 434, 284, 0),
  ru_spider: createEquipmentData("rune", index++, 444, 294, 0),
  ru_swamp: createEquipmentData("rune", index++, 468, 300, 0),
}

/**
 * Generated as:
 * - Health: 100-300
 * - Damage: 200-500
 * - Speed: 0
 */
const amulet = {
  am_bone_gray: createEquipmentData("amulet", index++, 125, 208, 0),

  am_cameo_blue: createEquipmentData("amulet", index++, 142, 226, 0),
  am_cameo_orange: createEquipmentData("amulet", index++, 154, 259, 0),

  am_celtic_blue: createEquipmentData("amulet", index++, 158, 293, 0),
  am_celtic_red: createEquipmentData("amulet", index++, 177, 303, 0),
  am_celtic_yellow: createEquipmentData("amulet", index++, 193, 323, 0),

  am_crystal_green: createEquipmentData("amulet", index++, 211, 325, 0),
  am_crystal_red: createEquipmentData("amulet", index++, 214, 332, 0),
  am_crystal_white: createEquipmentData("amulet", index++, 225, 346, 0),

  am_cylinder_gray: createEquipmentData("amulet", index++, 226, 395, 0),

  am_eye_cyan: createEquipmentData("amulet", index++, 227, 400, 0),
  am_eye_green: createEquipmentData("amulet", index++, 233, 418, 0),
  am_eye_magenta: createEquipmentData("amulet", index++, 245, 426, 0),

  am_face_1_gold: createEquipmentData("amulet", index++, 252, 439, 0),
  am_face_2: createEquipmentData("amulet", index++, 258, 454, 0),

  am_penta_green: createEquipmentData("amulet", index++, 261, 459, 0),
  am_penta_orange: createEquipmentData("amulet", index++, 265, 479, 0),

  am_ring_cyan: createEquipmentData("amulet", index++, 284, 481, 0),
  am_ring_green: createEquipmentData("amulet", index++, 292, 485, 0),
  am_ring_red: createEquipmentData("amulet", index++, 294, 490, 0),
}


/** Generated as:
 * - Health: 100-750
 * - Damage: 0
 * - Speed: 1-25
 */
const armor = {
  ar_animal_skin_1: createEquipmentData("armor", index++, 103, 0, 1),
  ar_animal_skin_2: createEquipmentData("armor", index++, 111, 0, 2),
  ar_animal_skin_3: createEquipmentData("armor", index++, 124, 0, 3),

  ar_banded_mail_1: createEquipmentData("armor", index++, 178, 0, 4),
  ar_banded_mail_2: createEquipmentData("armor", index++, 206, 0, 5),

  ar_blue_dragon_scale_mail: createEquipmentData("armor", index++, 210, 0, 6),

  ar_chain_mail_1: createEquipmentData("armor", index++, 212, 0, 7),
  ar_chain_mail_2: createEquipmentData("armor", index++, 275, 0, 9),
  ar_chain_mail_3: createEquipmentData("armor", index++, 278, 0, 10),

  ar_crystal_plate_mail: createEquipmentData("armor", index++, 297, 0, 11),

  ar_dwarven_ringmail: createEquipmentData("armor", index++, 338, 0, 12),

  ar_elven_leather_armor: createEquipmentData("armor", index++, 404, 0, 13),
  ar_elven_ringmail: createEquipmentData("armor", index++, 406, 0, 14),
  ar_elven_scalemail: createEquipmentData("armor", index++, 447, 0, 15),

  ar_gold_dragon_armor: createEquipmentData("armor", index++, 460, 0, 17),
  ar_green_dragon_scale_mail: createEquipmentData("armor", index++, 474, 0, 19),
  ar_ice_dragon_armor: createEquipmentData("armor", index++, 557, 0, 21),

  ar_leather_armor_1: createEquipmentData("armor", index++, 563, 0, 22),
  ar_leather_armor_2: createEquipmentData("armor", index++, 668, 0, 23),
  ar_leather_armor_3: createEquipmentData("armor", index++, 713, 0, 25),
}

/**
 * Generated as:
 * - Health: 0
 * - Damage: 100-500
 * - Speed: 1-25
 */
const weapon = {
  we_ancient_sword: createEquipmentData("weapon", index++, 0, 119, 1),
  we_ankus: createEquipmentData("weapon", index++, 0, 125, 2),
  we_axe: createEquipmentData("weapon", index++, 0, 160, 3),

  we_bardiche_1: createEquipmentData("weapon", index++, 0, 245, 4),
  we_bardiche_2: createEquipmentData("weapon", index++, 0, 250, 5),
  we_bardiche_4: createEquipmentData("weapon", index++, 0, 296, 6),
  we_bardiche_5: createEquipmentData("weapon", index++, 0, 300, 7),

  we_battle_axe_1: createEquipmentData("weapon", index++, 0, 302, 8),
  we_battle_axe_2: createEquipmentData("weapon", index++, 0, 304, 9),
  we_battle_axe_3: createEquipmentData("weapon", index++, 0, 326, 10),
  we_battle_axe_4: createEquipmentData("weapon", index++, 0, 353, 11),
  we_battle_axe_5: createEquipmentData("weapon", index++, 0, 365, 12),
  we_battle_axe_6: createEquipmentData("weapon", index++, 0, 368, 13),
  we_battle_axe_7: createEquipmentData("weapon", index++, 0, 416, 14),

  we_blessed_blade: createEquipmentData("weapon", index++, 0, 449, 16),

  we_broad_axe_1: createEquipmentData("weapon", index++, 0, 455, 17),
  we_broad_axe_2: createEquipmentData("weapon", index++, 0, 466, 19),
  we_broad_axe_3: createEquipmentData("weapon", index++, 0, 476, 20),
  we_broad_axe_4: createEquipmentData("weapon", index++, 0, 477, 21),
  we_broad_axe_5: createEquipmentData("weapon", index++, 0, 500, 22),
}

const other = {
  ot_wheel_spin_token: createOtherData("other", index++),
  ot_arena_trophy: createOtherData("other", index++),
  ot_item_box: createOtherData("other", index++),
  ot_monster_scroll: createOtherData("other", index++),
  ot_xp: createOtherData("other", index++),
  ot_food: createOtherData("other", index++),
  ot_gold: createOtherData("other", index++),
  ot_gem: createOtherData("other", index++),
}

export type ItemId = keyof typeof items
export const items = {
  ...weapon,
  ...armor,
  ...amulet,
  ...rune,
  ...ring,

  ...other,
}

export const equipmentItems = {
  ...weapon,
  ...armor,
  ...amulet,
  ...rune,
  ...ring,
}

export const otherItems = {
  ...other,
}

export const itemData: { [key in ItemType]: { [key in ItemId]?: IItemData } } = {
  weapon,
  armor,
  amulet,
  rune,
  ring,

  other,
}