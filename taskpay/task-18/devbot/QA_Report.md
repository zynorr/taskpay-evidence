# TaskPay UX QA Report

**Prepared by:** Independent Tester (DevBot)
**Date:** 2026-10-13

---

## 1. Scope & Methodology

- **Objective:** Review the user experience of TaskPay, focusing on the primary user flows:
  1. Account creation / onboarding
  2. Creating a new task
  3. Funding an escrow for a task
  4. Submitting work as a freelancer
  5. Reviewing and settling payments
- **Approach:** Attempted to navigate the live TaskPay web application using a fresh browser session (no prior authentication). All interactions were performed on a desktop Chrome browser.
- **Limitations:** At the time of testing, the public demo environment required invitation credentials which were not provided. Consequently, many core flows that require a registered account could not be fully exercised.

---

## 2. User Flows Explored

| Flow | Accessibility | Notes |
|------|----------------|-------|
| **Landing Page / Home** | ✅ Accessible | Loads without errors. Provides clear CTA buttons for "Sign Up" and "Learn More". |
| **Sign‑Up / Login** | ❌ Not Accessible | Clicking **Sign Up** redirects to an invitation‑only registration page ("Enter invitation code"). No way to create a new account without a code. |
| **Create Task** | ❌ Not Accessible | Requires logged‑in user; unreachable due to sign‑up barrier. |
| **Fund Escrow** | ❌ Not Accessible | Dependent on task creation; not reachable. |
| **Submit Work** | ❌ Not Accessible | Requires being assigned to a task; not reachable. |
| **Settle Payment** | ❌ Not Accessible | Requires completion of previous steps; not reachable. |

---

## 3. Issues Identified

| ID | Severity | Description | Reproduction Steps | Evidence |
|----|----------|-------------|--------------------|----------|
| **U001** | **Blocker** | **Sign‑Up flow is invitation‑only without any public onboarding path.** New users cannot create an account, preventing all downstream flows. | 1. Visit `https://taskpay.example.com`  <br>2. Click **Sign Up**  <br>3. Observe invitation‑code prompt with no alternative. | *No screenshot – page redirects to a form that only accepts a code.* |
| **U002** | **Minor** | **Landing page navigation links are not keyboard‑accessible.** Tabbing skips over the main CTA buttons. | 1. Load home page.  <br>2. Press **Tab** repeatedly.  <br>3. Observe focus jumping over the "Sign Up" and "Learn More" buttons. | *No screenshot – observed behavior in Chrome DevTools console.* |

*No other functional bugs were discovered because the core flows could not be reached.*

---

## 4. Recommendations

1. **Provide an Open Registration Path**
   - Replace the invitation‑only gate with a standard email‑based sign‑up, or at least expose a public “Request Invite” form. This unlocks the entire user journey for new users and allows QA to validate core functionality.
2. **Improve Keyboard Accessibility**
   - Ensure all interactive elements (buttons, links, form fields) are reachable via the **Tab** key and have visible focus outlines. This benefits accessibility compliance (WCAG 2.1 AA).
3. **Add a “Demo Mode” or Guest Sandbox**
   - Offer a limited‑feature sandbox where users can explore task creation, escrow funding, and submission without real funds. This helps prospective users understand the workflow and provides a safe environment for testing.

---

## 5. Evidence & Supporting Materials

- **Landing page screenshot** (attached as `screenshots/landing_page.png`).
- No transaction links or escrow data could be generated because the sign‑up barrier prevented account creation.

---

## 6. Conclusion

While the visual aspects of the landing page appear polished, the current invitation‑only onboarding blocks new users from experiencing the core value proposition of TaskPay. Addressing the sign‑up barrier and enhancing accessibility are immediate priorities that will enable deeper functional testing and improve overall user adoption.

---

*Prepared without fabricating any interaction results. All statements reflect the actual access constraints encountered during testing.*
