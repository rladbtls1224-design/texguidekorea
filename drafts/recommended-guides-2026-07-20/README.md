# Recommended guide deployment map - 2026-07-20

These 14 guides are unpublished drafts. Their order is based on freshness, search intent, fit with the site's existing topic clusters, internal-link potential, and usefulness as a source for AI-generated answers.

To promote one guide into the live content collection:

```bash
npm run promote:guide -- 1
```

To verify a number without publishing it:

```bash
npm run promote:guide -- 1 --dry-run
```

The promotion script refuses to overwrite an existing guide and rewrites `pubDate`, `updatedDate`, and `lastReviewed` to the promotion date in the `Asia/Seoul` timezone. Before an actual deployment, re-check time-sensitive facts against the linked official sources, run `npm run build`, and then commit and push the change to `main`.

| No. | Article title | Meta title | Target slug | Thumbnail recommendation |
| --- | --- | --- | --- | --- |
| 1 | Digital Nomad Visa Tax in Korea: 2026 Guide | Digital Nomad Visa Tax in Korea (2026) | `/guides/digital-nomad-visa-tax-korea/` | 16:9 editorial illustration of a remote worker in Korea, laptop, passport, Korean skyline, and a small tax checklist; navy, teal, and warm red; no tiny text. |
| 2 | Korea Crypto Tax for Foreigners: 2026 and 2027 Guide | Korea Crypto Tax for Foreigners (2026-2027) | `/guides/crypto-tax-korea-foreigners-2026-2027/` | Bitcoin-style coin and exchange ledger crossing a 2026-to-2027 calendar, with a Korean tax document motif; avoid exchange logos. |
| 3 | Korea Income Tax Rates and Brackets for Foreigners | Korea Income Tax Rates for Foreigners (2026) | `/guides/korea-income-tax-rates-brackets-foreigners/` | Clean progressive tax-bracket staircase in Korean won with a calculator and foreign resident card silhouette. |
| 4 | Remote Work in Korea for a Foreign Company: Tax Guide | Remote Work in Korea for a Foreign Company | `/guides/remote-work-foreign-company-tax-korea/` | Split-screen remote worker, overseas employer building, Korea location pin, payroll and tax arrows. |
| 5 | Foreign Financial Account Reporting in Korea | Korea Foreign Financial Account Reporting Guide | `/guides/foreign-financial-account-reporting-korea/` | World map with overseas bank, brokerage, and crypto account icons flowing into a June filing checklist. |
| 6 | Foreign Tax Credit in Korea for Foreign Residents | Foreign Tax Credit in Korea for Foreigners | `/guides/foreign-tax-credit-korea-foreigners/` | Two tax receipts from different countries connected by a shield/checkmark to show double-tax relief. |
| 7 | Korea Tax Treaties and Double Taxation for Foreigners | Korea Tax Treaty and Double Taxation Guide | `/guides/korea-tax-treaty-double-taxation-foreigners/` | Korea and another country linked by treaty pages, with income arrows and one crossed-out duplicate tax symbol. |
| 8 | Deductible Business Expenses for Foreign Freelancers in Korea | Freelancer Business Expenses in Korea | `/guides/deductible-business-expenses-foreign-freelancers-korea/` | Freelancer desk with categorized receipts, laptop, camera, phone, and a Korean expense ledger. |
| 9 | Simple vs Standard Expense Rate in Korea for Freelancers | Korea Simple vs Standard Expense Rate Guide | `/guides/simple-standard-expense-rate-korea-foreigners/` | Side-by-side comparison cards labelled Simple and Standard, with calculator, receipts, and decision arrows. |
| 10 | Simplified vs General VAT Taxpayer in Korea | Korea Simplified vs General VAT Taxpayer | `/guides/simplified-general-vat-taxpayer-korea-foreigners/` | Two VAT registration paths branching from a Korean business certificate, with invoice and calculator icons. |
| 11 | Korean Tax ID (TIN) for Foreigners | Korean Tax ID (TIN) for Foreigners | `/guides/korean-tax-id-tin-foreigners/` | Passport, foreigner registration card silhouette, business registration certificate, and a highlighted ID-number field. |
| 12 | Interest and Dividend Tax in Korea for Foreigners | Korea Interest and Dividend Tax for Foreigners | `/guides/interest-dividend-tax-korea-foreigners/` | Korean bank account and stock dividend statement feeding into a tax summary, with restrained finance styling. |
| 13 | Inheritance and Gift Tax in Korea for Foreigners | Korea Inheritance and Gift Tax for Foreigners | `/guides/inheritance-gift-tax-korea-foreigners/` | Family transfer scene with home, cash, and share certificate moving through a Korean filing calendar. |
| 14 | Capital Gains Tax on Korean Property for Foreigners | Korean Property Capital Gains Tax for Foreigners | `/guides/capital-gains-tax-korean-property-foreigners/` | Korean apartment sale contract, before/after price chart, calculator, and two-month deadline calendar. |
