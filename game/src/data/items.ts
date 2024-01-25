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

/**
 * Generated as:
 * - Health: 0
 * - Damage: 100-500
 * - Speed: 1-25
 */
const weapon = {
  we_ancient_sword: createEquipmentData("weapon", 0, 0, 119, 1),
  we_ankus: createEquipmentData("weapon", 1, 0, 125, 2),
  we_axe: createEquipmentData("weapon", 2, 0, 160, 3),

  we_bardiche_1: createEquipmentData("weapon", 3, 0, 245, 4),
  we_bardiche_2: createEquipmentData("weapon", 4, 0, 250, 5),
  we_bardiche_4: createEquipmentData("weapon", 5, 0, 296, 6),
  we_bardiche_5: createEquipmentData("weapon", 6, 0, 300, 7),

  we_battle_axe_1: createEquipmentData("weapon", 7, 0, 302, 8),
  we_battle_axe_2: createEquipmentData("weapon", 8, 0, 304, 9),
  we_battle_axe_3: createEquipmentData("weapon", 9, 0, 326, 10),
  we_battle_axe_4: createEquipmentData("weapon", 10, 0, 353, 11),
  we_battle_axe_5: createEquipmentData("weapon", 11, 0, 365, 12),
  we_battle_axe_6: createEquipmentData("weapon", 12, 0, 368, 13),
  we_battle_axe_7: createEquipmentData("weapon", 13, 0, 416, 14),

  we_blessed_blade: createEquipmentData("weapon", 14, 0, 449, 16),

  we_broad_axe_1: createEquipmentData("weapon", 15, 0, 455, 17),
  we_broad_axe_2: createEquipmentData("weapon", 16, 0, 466, 19),
  we_broad_axe_3: createEquipmentData("weapon", 17, 0, 476, 20),
  we_broad_axe_4: createEquipmentData("weapon", 18, 0, 477, 21),
  we_broad_axe_5: createEquipmentData("weapon", 19, 0, 500, 22),
}

/** Generated as:
 * - Health: 100-750
 * - Damage: 0
 * - Speed: 1-25
 */
const armor = {
  ar_animal_skin_1: createEquipmentData("armor", 0, 103, 0, 1),
  ar_animal_skin_2: createEquipmentData("armor", 1, 111, 0, 2),
  ar_animal_skin_3: createEquipmentData("armor", 2, 124, 0, 3),

  ar_banded_mail_1: createEquipmentData("armor", 3, 178, 0, 4),
  ar_banded_mail_2: createEquipmentData("armor", 4, 206, 0, 5),

  ar_blue_dragon_scale_mail: createEquipmentData("armor", 5, 210, 0, 6),

  ar_chain_mail_1: createEquipmentData("armor", 6, 212, 0, 7),
  ar_chain_mail_2: createEquipmentData("armor", 7, 275, 0, 9),
  ar_chain_mail_3: createEquipmentData("armor", 8, 278, 0, 10),

  ar_crystal_plate_mail: createEquipmentData("armor", 9, 297, 0, 11),

  ar_dwarven_ringmail: createEquipmentData("armor", 10, 338, 0, 12),

  ar_elven_leather_armor: createEquipmentData("armor", 11, 404, 0, 13),
  ar_elven_ringmail: createEquipmentData("armor", 12, 406, 0, 14),
  ar_elven_scalemail: createEquipmentData("armor", 13, 447, 0, 15),

  ar_gold_dragon_armor: createEquipmentData("armor", 14, 460, 0, 17),
  ar_green_dragon_scale_mail: createEquipmentData("armor", 15, 474, 0, 19),
  ar_ice_dragon_armor: createEquipmentData("armor", 16, 557, 0, 21),

  ar_leather_armor_1: createEquipmentData("armor", 17, 563, 0, 22),
  ar_leather_armor_2: createEquipmentData("armor", 18, 668, 0, 23),
  ar_leather_armor_3: createEquipmentData("armor", 19, 713, 0, 25),
}

/**
 * Generated as:
 * - Health: 100-300
 * - Damage: 200-500
 * - Speed: 0
 */
const amulet = {
  am_bone_gray: createEquipmentData("amulet", 0, 125, 208, 0),

  am_cameo_blue: createEquipmentData("amulet", 1, 142, 226, 0),
  am_cameo_orange: createEquipmentData("amulet", 2, 154, 259, 0),

  am_celtic_blue: createEquipmentData("amulet", 3, 158, 293, 0),
  am_celtic_red: createEquipmentData("amulet", 4, 177, 303, 0),
  am_celtic_yellow: createEquipmentData("amulet", 5, 193, 323, 0),

  am_crystal_green: createEquipmentData("amulet", 6, 211, 325, 0),
  am_crystal_red: createEquipmentData("amulet", 7, 214, 332, 0),
  am_crystal_white: createEquipmentData("amulet", 8, 225, 346, 0),

  am_cylinder_gray: createEquipmentData("amulet", 9, 226, 395, 0),

  am_eye_cyan: createEquipmentData("amulet", 10, 227, 400, 0),
  am_eye_green: createEquipmentData("amulet", 11, 233, 418, 0),
  am_eye_magenta: createEquipmentData("amulet", 12, 245, 426, 0),

  am_face_1_gold: createEquipmentData("amulet", 13, 252, 439, 0),
  am_face_2: createEquipmentData("amulet", 14, 258, 454, 0),

  am_penta_green: createEquipmentData("amulet", 15, 261, 459, 0),
  am_penta_orange: createEquipmentData("amulet", 16, 265, 479, 0),

  am_ring_cyan: createEquipmentData("amulet", 17, 284, 481, 0),
  am_ring_green: createEquipmentData("amulet", 18, 292, 485, 0),
  am_ring_red: createEquipmentData("amulet", 19, 294, 490, 0),
}

/**
 * Generated as:
 * - Health: 200-500
 * - Damage: 100-300
 * - Speed: 0
 */
const rune = {
  ru_generic: createEquipmentData("rune", 0, 201, 101, 0),
  ru_abyss: createEquipmentData("rune", 1, 215, 106, 0),
  ru_cerebov: createEquipmentData("rune", 2, 216, 123, 0),
  ru_cocytus: createEquipmentData("rune", 3, 220, 126, 0),
  ru_demonic_1: createEquipmentData("rune", 4, 228, 131, 0),
  ru_demonic_2: createEquipmentData("rune", 5, 234, 136, 0),
  ru_demonic_3: createEquipmentData("rune", 6, 243, 137, 0),
  ru_demonic_4: createEquipmentData("rune", 7, 274, 145, 0),
  ru_demonic_5: createEquipmentData("rune", 8, 275, 153, 0),
  ru_demonic_6: createEquipmentData("rune", 9, 282, 165, 0),
  ru_dis: createEquipmentData("rune", 10, 320, 168, 0),
  ru_elven: createEquipmentData("rune", 11, 327, 170, 0),
  ru_gehenna: createEquipmentData("rune", 12, 342, 185, 0),
  ru_gloorx_vloq: createEquipmentData("rune", 13, 360, 188, 0),
  ru_lom_lobon: createEquipmentData("rune", 14, 362, 207, 0),
  ru_mnoleg: createEquipmentData("rune", 15, 370, 271, 0),
  ru_shoals: createEquipmentData("rune", 16, 383, 276, 0),
  ru_slime: createEquipmentData("rune", 17, 434, 284, 0),
  ru_spider: createEquipmentData("rune", 18, 444, 294, 0),
  ru_swamp: createEquipmentData("rune", 19, 468, 300, 0),
}

/**
 * Generated as:
 * - Health: 100-300
 * - Damage: 200-500
 * - Speed: 10-50
 */
const ring = {
  ri_agate: createEquipmentData("ring", 0, 110, 212, 11),
  ri_brass: createEquipmentData("ring", 1, 119, 215, 18),
  ri_bronze: createEquipmentData("ring", 2, 126, 217, 20),
  ri_clay: createEquipmentData("ring", 3, 153, 221, 21),
  ri_copper: createEquipmentData("ring", 4, 154, 231, 22),
  ri_coral: createEquipmentData("ring", 5, 155, 243, 25),
  ri_diamond: createEquipmentData("ring", 6, 174, 270, 26),
  ri_emerald: createEquipmentData("ring", 7, 187, 272, 29),
  ri_glass: createEquipmentData("ring", 8, 197, 295, 30),
  ri_gold_blue: createEquipmentData("ring", 9, 207, 309, 32),
  ri_gold_green: createEquipmentData("ring", 10, 215, 315, 33),
  ri_gold_red: createEquipmentData("ring", 11, 220, 374, 34),
  ri_gold: createEquipmentData("ring", 12, 230, 400, 36),
  ri_granite: createEquipmentData("ring", 13, 264, 437, 37),
  ri_iron: createEquipmentData("ring", 14, 265, 453, 38),
  ri_jade: createEquipmentData("ring", 15, 271, 459, 39),
  ri_moonstone: createEquipmentData("ring", 16, 281, 465, 40),
  ri_opal: createEquipmentData("ring", 17, 286, 467, 43),
  ri_pearl: createEquipmentData("ring", 18, 288, 486, 47),
  ri_plain_black: createEquipmentData("ring", 19, 293, 491, 49),
}

const other = {
  ot_gold: createOtherData("other", 0),
  ot_gem: createOtherData("other", 1),
  ot_food: createOtherData("other", 2),
  ot_xp: createOtherData("other", 3),
  ot_monster_scroll: createOtherData("other", 4),
  ot_item_box: createOtherData("other", 5),
  ot_arena_trophy: createOtherData("other", 6),
  ot_wheel_spin_token: createOtherData("other", 7),
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