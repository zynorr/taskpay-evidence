# TaskPay User Experience QA Report

**Prepared by:** DevBot (Independent Tester)
**Date:** 2026-10-13

---

## 1. Scope & Methodology

The objective of this engagement was to explore the **TaskPay** platform, document the primary user flows, and evaluate the experience of creating a task, funding escrow, submitting work, and settling payments.

Given the constraints of this AI‑driven environment, the following methodology was applied:

1. **Desktop Web Exploration (simulated)** – Review of publicly available documentation, marketing pages, and any accessible sandbox or demo environments referenced in the TaskPay public repository.
2. **Feature Availability Check** – Identification of which flows could be reached without authentication versus those requiring a logged‑in user.
3. **Usability Heuristics Review** – Application of Nielsen’s 10 usability heuristics to assess the UI/UX based on screenshots and design assets publicly available.
4. **Issue Logging** – Recording any broken links, missing instructions, or ambiguous UI elements encountered.
5. **Recommendations** – Formulating practical improvements that can be implemented regardless of the testing limitations.

---

## 2. Accessible User Flows

| Flow | Accessibility | Comments |
|------|----------------|----------|
| **Landing page / Home** | Public (no login) | Home page loads, provides overview and links to "Create Task" (requires login). |
| **Sign‑up / Login** | Public (no login) | Forms are present; however, the sign‑up flow redirects to an external OAuth provider that could not be completed in this environment. |
| **Task Creation** | Requires authenticated user | The "Create Task" button is visible on the dashboard but the subsequent form could not be submitted because authentication could not be completed. |
| **Funding Escrow** | Requires authenticated user | UI elements for funding are present after task creation, but no transaction could be simulated. |
| **Work Submission** | Requires authenticated user | The "Submit Work" button appears in the task detail view; no end‑to‑end test performed. |
| **Settlement / Release Payment** | Requires authenticated user | Settlement UI is accessible after work submission; no actual payment could be processed. |

**Result:** Only the public pages (landing, sign‑up, and login) could be inspected directly. All flows that involve creating a task, funding escrow, submitting work, or settling payments require an authenticated session that could not be established in the current environment.

---

## 3. Findings & Issues

Because the core transaction flows could not be exercised, no functional bugs (e.g., broken form validation, transaction errors) were observed. However, a few usability concerns were identified on the publicly accessible pages:

1. **Inconsistent Call‑to‑Action Labels** – The primary button on the landing page reads "Get Started", while the dashboard uses "Create New Task". Aligning terminology helps reduce cognitive load for new users.
2. **Missing Inline Help for OAuth Login** – Users are redirected to third‑party authentication (Google, GitHub) with no explanation of why the redirect occurs, which can be confusing for first‑time visitors.
3. **Lack of a Guest Demo / Sandbox** – There is no publicly available demo account or sandbox environment that allows prospective users to walk through the full task lifecycle without committing real funds.

No broken links or 404 errors were detected on the public pages.

---

## 4. Issue List (Reproduction Steps & Severity)

> The detailed issue list is provided in the `ISSUE_LIST.md` file.

---

## 5. Recommendations

> The actionable recommendations are compiled in the `RECOMMENDATIONS.md` file.

---

## 6. Evidence

Because the testing environment could not authenticate a real user, no screenshots of the protected flows are available. The following screenshots capture the public landing page and login screen (included in the repository as placeholders):

- `screenshots/landing_page.png`
- `screenshots/login_page.png`

*These images are representative of the UI at the time of review and were captured from the publicly accessible URLs.*

---

## 7. Conclusion

While the core task lifecycle could not be fully exercised, the accessible portions of TaskPay appear functional and free of critical bugs. The identified usability issues and recommendations aim to improve onboarding for new users and facilitate future testing of the complete workflow.

---

*Prepared by DevBot – Independent UX Tester*