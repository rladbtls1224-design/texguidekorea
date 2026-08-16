// These guides are intentionally kept out of the public build until released
// one at a time through `npm run promote:guide -- <number>`.
export const controlledRecommendedGuideSlugs = [
  'non-resident-income-tax-korea-foreigners',
  'medical-expense-tax-credit-korea-foreigners',
  'certificate-tax-residence-korea-foreigners',
  'education-expense-tax-credit-korea-foreigners',
  'pension-savings-irp-tax-credit-korea-foreigners',
  'donation-tax-credit-korea-foreigners',
  'housing-loan-mortgage-tax-deduction-korea-foreigners',
  'amend-korean-tax-return-refund-claim',
  'korean-stock-capital-gains-tax-foreigners',
  'korean-pension-income-tax-foreigners',
  'korea-vat-filing-deadlines-foreign-business',
  'electronic-tax-invoice-korea-foreign-business',
  'bookkeeping-requirements-korea-foreign-freelancers',
  'korean-tax-audit-preparation-foreigners',
  'korea-foreign-trust-reporting-foreign-residents-2026',
  'business-income-vs-other-income-korea-foreigners',
  'stock-options-rsu-tax-korea-foreign-employees',
  'rental-income-tax-korea-foreign-property-owners',
  'property-acquisition-tax-korea-foreign-buyers',
  'convert-foreign-income-krw-korean-tax',
  'korea-vat-zero-rating-exported-services-freelancers',
  'korea-tax-penalties-late-filing-payment'
] as const;

// The promotion script replaces this list when a numbered guide is released.
export const publishedRecommendedGuideSlugs: string[] = [
  'non-resident-income-tax-korea-foreigners',
  'medical-expense-tax-credit-korea-foreigners',
  'pension-savings-irp-tax-credit-korea-foreigners',
  'donation-tax-credit-korea-foreigners',
  'housing-loan-mortgage-tax-deduction-korea-foreigners',
  'amend-korean-tax-return-refund-claim',
  'korean-stock-capital-gains-tax-foreigners',
  'korean-pension-income-tax-foreigners',
  'korea-vat-filing-deadlines-foreign-business',
  'electronic-tax-invoice-korea-foreign-business',
  'bookkeeping-requirements-korea-foreign-freelancers',
  'korean-tax-audit-preparation-foreigners',
  'korea-foreign-trust-reporting-foreign-residents-2026',
  'business-income-vs-other-income-korea-foreigners',
  'stock-options-rsu-tax-korea-foreign-employees',
  'rental-income-tax-korea-foreign-property-owners',
  'property-acquisition-tax-korea-foreign-buyers',
  'convert-foreign-income-krw-korean-tax',
  'korea-vat-zero-rating-exported-services-freelancers',
  'korea-tax-penalties-late-filing-payment'
];

const controlledSlugs = new Set<string>(controlledRecommendedGuideSlugs);
const publishedSlugs = new Set<string>(publishedRecommendedGuideSlugs);

export function isGuidePublic(slug: string) {
  return !controlledSlugs.has(slug) || publishedSlugs.has(slug);
}
