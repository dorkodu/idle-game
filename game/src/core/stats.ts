export interface IValueStat {
  baseValue: number;
  valueBonus: number;
  percentBonus: number;
}

export interface IPercentStat {
  basePercent: number;
  percentBonus: number;
}

export interface IStats {
  health: IValueStat;
  damage: IValueStat;
  speed: IValueStat;
}

export function value(stat: IValueStat | undefined): number {
  if (!stat) return 0;
  return (stat.baseValue + stat.valueBonus) * (1 + stat.percentBonus);
}

export function percent(stat: IPercentStat | undefined): number {
  if (!stat) return 0;
  return (stat.basePercent + stat.percentBonus);
}

export function addValue(stat1: IValueStat, stat2: IValueStat): IValueStat {
  return {
    baseValue: stat1.baseValue + stat2.baseValue,
    valueBonus: stat1.valueBonus + stat2.valueBonus,
    percentBonus: stat1.percentBonus + stat2.percentBonus,
  }
}

export * as stats from "./stats";