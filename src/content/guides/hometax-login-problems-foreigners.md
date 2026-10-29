---
{
  "title": "Hometax Login Problems for Foreigners",
  "description": "Diagnose Hometax access problems by failure stage, collect a useful error record, and separate authentication trouble from missing tax records.",
  "pubDate": "2026-07-05",
  "updatedDate": "2026-10-26",
  "lastReviewed": "2026-10-26",
  "category": "Hometax Guides",
  "difficulty": "Beginner",
  "tags": [
    "Hometax",
    "login problems",
    "foreigner",
    "authentication",
    "ARC"
  ],
  "quickAnswer": "Identify where access fails before changing anything: account recovery, identity-provider approval, return to Hometax, or permission to open a service. Copy the exact error text and check one cause at a time. If login succeeds but income or a refund is absent, investigate the record and selected year rather than creating another account.",
  "audience": [
    "Foreigners creating Hometax access",
    "People blocked by identity verification",
    "Foreigners needing certificates or refund checks",
    "Users outside Korea trying to access Hometax"
  ],
  "keyPoints": [
    "Separate an authentication error from an empty tax record.",
    "Keep the exact Korean error text and the time of failure.",
    "Change one variable at a time so a successful retry is explainable.",
    "Ask the provider or Hometax team responsible for the failed stage."
  ],
  "documents": [
    "A note of the exact error text and page title",
    "Date and time of the failed attempt",
    "Device, browser or app, and authentication method used",
    "The identity type selected, with registration number kept private",
    "The service name, tax year and deadline involved"
  ],
  "mistakes": [
    "Treating a missing refund as a password problem",
    "Repeatedly guessing name spellings",
    "Creating another account before using recovery",
    "Approving an authentication request you did not initiate",
    "Sending full tax records or certificate passwords with an error report"
  ],
  "related": [
    {
      "title": "How to Sign Up for Hometax as a Foreigner",
      "href": "/guides/hometax-sign-up-foreigner/"
    },
    {
      "title": "Hometax Guide for Foreigners",
      "href": "/guides/hometax-guide-foreigners/"
    },
    {
      "title": "How to File Income Tax on Hometax as a Foreigner",
      "href": "/procedures/how-to-file-income-tax-on-hometax/"
    },
    {
      "title": "How to Check Your Korean Tax Refund Status",
      "href": "/procedures/how-to-check-tax-refund-status/"
    },
    {
      "title": "Korean Tax Glossary for Foreigners",
      "href": "/guides/korean-tax-glossary-foreigners/"
    }
  ],
  "faqs": [
    {
      "question": "My authentication app approved the request. Why am I still blocked?",
      "answer": "Note whether the error appears inside the provider app or after returning to Hometax. The second case may require Hometax support; approval in one service does not prove that the next service completed the login."
    },
    {
      "question": "Why can I log in but not complete payment?",
      "answer": "A service can require a different authentication level. Read the requirement on the payment page and check the official login help instead of repeatedly resetting the account password."
    },
    {
      "question": "Does an empty income screen mean my account is wrong?",
      "answer": "Not by itself. Check the taxpayer context, selected year, income type and payer records. Keep the successful-login evidence and investigate the tax record separately."
    },
    {
      "question": "What should I send to support?",
      "answer": "Start with the error text, page title, time, device and method used. Redact identity numbers, bank details and unrelated tax information. Supply additional sensitive evidence only through an official channel that requests it."
    }
  ],
  "sources": [
    {
      "title": "Hometax Sontax - Authentication methods, account recovery and service limits",
      "url": "https://mob.hometax.go.kr/jsonAction.do?actionId=UTBMPBAC01F001",
      "type": "official"
    },
    {
      "title": "National Tax Service - 126 tax and Hometax consultation",
      "url": "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7848&mi=2456",
      "type": "official"
    }
  ]
}
---

### Find the stage that failed

A useful diagnosis starts with what happened, not with a list of guessed fixes. Keep a short sequence: opened Hometax, selected a login method, approved or failed authentication, returned to the tax portal, opened the intended service.

| What you observe | First check | What counts as progress |
| --- | --- | --- |
| Forgotten ID or password | Use the official **아이디/비밀번호찾기** recovery option | You can identify the existing account without creating another one |
| Identity rejected before approval | Compare the requested identity type with the record held by that provider | The provider confirms which detail needs correction |
| Approval arrives on the phone but the portal does not continue | Record both the provider result and Hometax error | Support can identify the failed handoff |
| Login works but a service asks for more verification | Read that service's authentication requirement | You reach the required service with an accepted method |
| A return, payer or refund is missing after login | Check taxpayer context, year and original records | You can identify the specific absent record |

The [official Sontax login page](https://mob.hometax.go.kr/jsonAction.do?actionId=UTBMPBAC01F001) distinguishes browser and app authentication, and notes restrictions on ID login and biometric login. A fingerprint login can therefore succeed while a particular task still requires another route. Follow the instructions for the task you opened.

### Run one controlled retry

Before retrying, save any unfinished work and note the failure. Then change one thing that addresses it: complete the requested certificate registration, recover the correct account, or correct an identity detail confirmed by its provider. Retry the same task and record the result.

If a pop-up or return from an authentication app never completes, check the browser's visible blocking message and the official service's browser guidance. If you try another supported browser or the official app, note that change. Do not install a remote-control tool from an unsolicited message or disable security controls simply because a stranger suggests it.

For a name problem, ask the relevant institution how your name is stored. Passport order, the name on a residence card and the authentication provider's record should be compared rather than randomly rearranged. If the number itself changed, explain that history to official support; a password reset cannot establish which tax identity is associated with a record.

### Use a compact support record

You can prepare this text in advance:

> Task: issue a certificate of income for [year]. Device: [browser/app]. Method: [authentication type]. At [time], the request [failed before approval / was approved, then failed in Hometax]. Page title and exact error: [text]. The document deadline is [date].

Replace the brackets with your facts. Do not include a password, full registration number, bank balance, certificate file or one-time approval code in an ordinary email or public forum post.

The [NTS support information](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7848&mi=2456) identifies 126 as the tax and Hometax consultation service. If an appointment or filing deadline is close, explain the blocked task and ask about an official alternative instead of relying on repeated retries to finish in time.

### Fictional example: the login was already working

Alex signs in and sees no refund for the year selected. He considers opening a second account. His saved receipt shows a different tax year, so he repeats the search with that year and checks the original submission. This is a record-checking problem; replacing his account would not address the discrepancy.

### Confirm the outcome before closing the session

Access is restored when you can complete the intended checkpoint: open the requested certificate, view the relevant filing record, or reach the payment page with the correct identity. A successful login by itself does not confirm a submission, payment, or refund.

Save the resulting receipt or document if you complete an action, then sign out. If access works but a record is still wrong, continue with the [income certificate](/procedures/how-to-get-income-certificate/) or [refund-status procedure](/procedures/how-to-check-tax-refund-status/) and keep the access problem separate from the record investigation.
