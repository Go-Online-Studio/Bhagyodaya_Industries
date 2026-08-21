import { Campaign, CampaignSeason } from "@/types";
import { DEFAULT_CAMPAIGNS } from "./default-data";

/**
 * Maps any given month (1 = Jan, 12 = Dec) to its agricultural campaign tenure:
 * - jul-sept (Months 7, 8, 9) : Kharif Peak & Monsoon Crop Nutrition
 * - oct-dec (Months 10, 11, 12): Post-Monsoon & Rabi Early Sowing
 * - jan-mar (Months 1, 2, 3)   : Winter Rabi Growth & Frost Defense
 * - apr-june (Months 4, 5, 6)  : Summer Zaid & Pre-Kharif Soil Rejuvenation
 */
export function getSeasonFromMonth(month: number): CampaignSeason {
  if (month >= 7 && month <= 9) {
    return "JULY_SEPTEMBER";
  }
  if (month >= 10 && month <= 12) {
    return "OCTOBER_DECEMBER";
  }
  if (month >= 1 && month <= 3) {
    return "JANUARY_MARCH";
  }
  // April (4), May (5), June (6)
  return "APRIL_JUNE";
}

/**
 * Returns active seasonal campaign based on a given Date or the current date.
 * Supports manual override for previewing upcoming agricultural cycles.
 */
export function getActiveCampaign(
  date: Date = new Date(),
  overrideSeason?: string | null
): Campaign {
  let season: CampaignSeason;

  if (overrideSeason) {
    const normalized = overrideSeason.toUpperCase().replace("-", "_");
    if (normalized === "JUL_SEPT" || normalized === "JULY_SEPTEMBER" || normalized === "JUNE_AUGUST") {
      season = "JULY_SEPTEMBER";
    } else if (normalized === "OCT_DEC" || normalized === "OCTOBER_DECEMBER" || normalized === "SEPTEMBER_NOVEMBER") {
      season = "OCTOBER_DECEMBER";
    } else if (normalized === "JAN_MAR" || normalized === "JANUARY_MARCH" || normalized === "DECEMBER_FEBRUARY") {
      season = "JANUARY_MARCH";
    } else if (normalized === "APR_JUNE" || normalized === "APRIL_JUNE" || normalized === "MARCH_MAY") {
      season = "APRIL_JUNE";
    } else {
      const month = date.getMonth() + 1;
      season = getSeasonFromMonth(month);
    }
  } else {
    // getMonth() is 0-indexed (0=Jan..11=Dec), convert to 1-indexed (1=Jan..12=Dec)
    const month = date.getMonth() + 1;
    season = getSeasonFromMonth(month);
  }

  const found = DEFAULT_CAMPAIGNS.find((c) => c.season === season || c.campaignId === overrideSeason);
  return (
    found ||
    DEFAULT_CAMPAIGNS[0]
  );
}

