/**
 * Color of each tier:
 * - S Tier (Legendary): Red
 * - A Tier (Epic): Gold
 * - B Tier (Rare): Purple
 * - C Tier (Uncommon): Blue
 * - D Tier (Common): Green
 * - E Tier (Poor): White
 * - F Tier (Junk): Gray
 */
export type Tier = "S" | "A" | "B" | "C" | "D" | "E" | "F";

export function tierToIndex(tier: Tier) {
  switch (tier) {
    case "S": return 6;
    case "A": return 5;
    case "B": return 4;
    case "C": return 3;
    case "D": return 2;
    case "E": return 1;
    case "F": return 0;
  }
}

export function indexToTier(index: number): Tier | undefined {
  switch (index) {
    case 6: return "S";
    case 5: return "A";
    case 4: return "B";
    case 3: return "C";
    case 2: return "D";
    case 1: return "E";
    case 0: return "F";
    default: return undefined;
  }
}

export function tierToCampaignCount(tier: Tier | undefined) {
  switch (tier) {
    case "S": return 8;
    case "A": return 7;
    case "B": return 6;
    case "C": return 5;
    case "D": return 4;
    case "E": return 3;
    case "F": return 2;
    default: return 0;
  }
}

export * as tier from "./tier";