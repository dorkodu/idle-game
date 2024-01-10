import { SkillId } from "../data/skills";

export interface ISkill {
  id: SkillId;
}

export interface ISkillData {
  onUse: () => void;
}