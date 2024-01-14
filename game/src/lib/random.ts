function mulberry32(data: { seed: number }) {
  var t = data.seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

export function number(data: { seed: number }, min: number, max: number) {
  return Math.floor(mulberry32(data) * (max - min) + min);
}

export function percent<T>(data: { seed: number }, cases: { percent: number, result: T }[]): T | undefined {
  const multiplier = 1_000_000_000;

  let total = 0;
  cases.forEach((value) => { total += value.percent * multiplier })

  let percentage = number(data, 0, total) + 1;

  let probability = 0;
  for (let i = 0; i < cases.length; ++i) {
    const value = cases[i];
    if (!value) continue;

    probability += value.percent * multiplier;
    if (percentage <= probability) return value.result;
  }

  return undefined;
}

export * as random from "./random";