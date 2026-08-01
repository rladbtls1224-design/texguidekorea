// These guides are intentionally kept out of the public build until released
// one at a time through `npm run promote:guide -- <number>`.
export const controlledRecommendedGuideSlugs = [
  'digital-nomad-visa-tax-korea',
  'crypto-tax-korea-foreigners-2026-2027',
  'korea-income-tax-rates-brackets-foreigners',
  'remote-work-foreign-company-tax-korea',
  'foreign-financial-account-reporting-korea',
  'foreign-tax-credit-korea-foreigners',
  'korea-tax-treaty-double-taxation-foreigners',
  'deductible-business-expenses-foreign-freelancers-korea',
  'simple-standard-expense-rate-korea-foreigners',
  'simplified-general-vat-taxpayer-korea-foreigners',
  'korean-tax-id-tin-foreigners',
  'interest-dividend-tax-korea-foreigners',
  'inheritance-gift-tax-korea-foreigners',
  'capital-gains-tax-korean-property-foreigners'
] as const;

// The promotion script replaces this list when a numbered guide is released.
export const publishedRecommendedGuideSlugs: string[] = [
  'digital-nomad-visa-tax-korea',
  'crypto-tax-korea-foreigners-2026-2027',
  'korea-income-tax-rates-brackets-foreigners',
  'remote-work-foreign-company-tax-korea',
  'foreign-financial-account-reporting-korea',
  'foreign-tax-credit-korea-foreigners',
  'korea-tax-treaty-double-taxation-foreigners',
  'deductible-business-expenses-foreign-freelancers-korea',
  'simple-standard-expense-rate-korea-foreigners',
  'simplified-general-vat-taxpayer-korea-foreigners',
  'korean-tax-id-tin-foreigners',
  'interest-dividend-tax-korea-foreigners'
];

const controlledSlugs = new Set<string>(controlledRecommendedGuideSlugs);
const publishedSlugs = new Set<string>(publishedRecommendedGuideSlugs);

export function isGuidePublic(slug: string) {
  return !controlledSlugs.has(slug) || publishedSlugs.has(slug);
}
