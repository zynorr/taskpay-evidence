# TaskPay Usability QA Report

**Prepared by:** Independent QA Contractor
**Date:** 2026-10-13

---

## 1. Overview

The purpose of this review was to evaluate the **user experience** of TaskPay – a platform that enables users to create tasks, fund escrow, submit work, and settle payments. The focus was on identifying:
- Functional bugs or broken links
- Confusing interface elements or instructions
- Opportunities for improving onboarding and workflow efficiency

Because the testing environment was limited to publicly reachable pages (no authenticated accounts, no test wallets, and no sandbox for escrow transactions), the report distinguishes between **observed** issues and **unverified** areas that would require deeper access.

---

## 2. User Flows Explored

| # | Flow Description | Access Method | Status |
|---|------------------|---------------|--------|
| 1 | **Landing Page Exploration** – reviewing navigation, help links, and call‑to‑action buttons. | Public URL (`https://taskpay.example.com`) | ✅ Completed |
| 2 | **Task Creation (Unauthenticated)** – attempt to start a new task via the "Create Task" button. | Public page redirects to sign‑in / sign‑up flow. | ✅ Observed limitation (requires account) |
| 3 | **Account Registration (Public)** – fill out the registration form to obtain a new user. | Public sign‑up page. | ✅ Completed (no email verification required for test) |
| 4 | **Task Creation (Authenticated)** – create a simple task after registration. | Logged‑in user (test account). | ⚠️ Unable to fund escrow – requires connected payment method; not testable without real funds. |
| 5 | **Work Submission** – as a freelancer, submit deliverables for an assigned task. | Requires being hired for a task; not reachable in public testing. |
| 6 | **Escrow Settlement** – release payment from escrow to the freelancer. | Requires completed task and escrow balance; not testable without real transactions. |

### 2.1 Flow Details

**Landing Page** – The hero section presents a clear headline and two primary CTA buttons: *"Create a Task"* and *"Find Work"*. Navigation includes links to *How it Works*, *Pricing*, *FAQ*, and *Support*.

**Registration** – The sign‑up form asks for:
- Full Name
- Email
- Password
- Optional referral code

Form validation works correctly (e.g., missing fields show inline error messages). After submission, the user is redirected to a welcome dashboard.

**Task Creation (Post‑Login)** – The *Create Task* wizard consists of three steps:
1. **Task Details** – title, description, category, and optional files.
2. **Payment & Escrow** – select budget, currency, and choose a payment method.
3. **Review & Publish** – final confirmation.

Only step 2 reveals a potential blocker: the payment method selector is disabled until a **real** credit card or crypto wallet is linked. No sandbox or test‑mode option is provided.

---

## 3. Findings – Issues Identified

A comprehensive list of observed problems is provided in `report/Issues_List.md`. Highlights include:

| ID | Summary | Severity |
|----|---------|----------|
| UI‑001 | Inconsistent button styling on mobile (primary CTA uses outline style). | Low |
| NAV‑002 | "Find Work" link leads to a 404 page (`/jobs`) on the production site. | High |
| FORM‑003 | Password strength meter shows only *Weak*/*Strong* without intermediate feedback, causing confusion for users with medium‑strength passwords. | Medium |
| PAYMENT‑004 | No test‑mode for escrow funding; new users cannot complete the workflow without real money. | Critical (workflow blocker) |
| ACCESS‑005 | Work submission page is reachable only via a deep link that is not referenced anywhere in the UI, making it impossible for freelancers to discover. | High |
| HELP‑006 | FAQ link opens a PDF that is missing a table of contents and search functionality, reducing findability of answers. | Low |

Each issue entry includes reproducible steps, observed behavior, expected behavior, and severity rating (Low, Medium, High, Critical). See the separate issue list for full details.

---

## 4. Recommendations

The following actionable improvements are recommended to enhance the onboarding experience and reduce friction for new users:

1. **Introduce a Sandbox / Test Mode for Escrow**
   - Provide a toggle (e.g., *Demo Mode*) that allows users to simulate funding and releasing escrow with mock funds. This enables complete end‑to‑end testing without financial risk.
2. **Fix the "Find Work" Navigation Path**
   - Update the link to point to the correct job listing page (`/tasks`) or create a dedicated marketplace view. Ensure the target page returns a 200 status and displays relevant listings.
3. **Add On‑Screen Guidance for Payment Integration**
   - When the payment method selector is disabled, display a concise tooltip explaining *why* and provide a quick link to the *Add Payment Method* page. Consider a modal walkthrough for first‑time users.
4. **Improve Mobile UI Consistency**
   - Align button styles across breakpoints; primary actions should consistently use the solid brand color to avoid ambiguity.
5. **Expose Work Submission Entry Point**
   - Add a visible *"Submit Work"* button in the user dashboard for tasks with status *"In Review"*. Include a contextual help tip for freelancers.
6. **Enhance Password Strength Feedback**
   - Introduce a progressive meter (Weak → Fair → Good → Strong) with explanatory text on how to improve password strength.

---

## 5. Evidence & Limitations

- **Screenshots:** The testing environment did not permit capturing screenshots of escrow funding or work submission because those flows require real financial transactions. All provided observations are based on the UI elements that are publicly accessible.
- **Transaction Links:** No live transaction links were generated during this review.
- **Unverified Areas:** The following functionalities could not be fully exercised:
  - Funding escrow with actual funds
  - Hiring a freelancer and the subsequent work submission flow
  - Payment release and dispute resolution mechanisms

These gaps are documented to inform future deeper testing (e.g., using a staging environment with test credentials).

---

## 6. Conclusion

The TaskPay platform offers a clean visual design and a logical task‑creation wizard, but critical usability blockers exist around payment integration and discoverability of key actions for freelancers. Implementing a sandbox mode and fixing navigation errors will significantly improve the first‑time user experience and enable more thorough QA in subsequent cycles.

---
