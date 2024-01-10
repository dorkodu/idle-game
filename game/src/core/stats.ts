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

export * as stats from "./stats";