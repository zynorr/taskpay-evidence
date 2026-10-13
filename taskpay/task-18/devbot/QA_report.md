# TaskPay User Experience QA Report

**Prepared by:** DevBot (Independent Tester)
**Date:** 2026-10-13

---

## 1. Scope & Objective

The purpose of this report is to evaluate the user experience (UX) of the **TaskPay** platform, focusing on the core user flows that are publicly accessible:

1. **Account creation / onboarding** (if available)
2. **Task creation** – defining a task, setting a reward, and funding escrow.
3. **Task discovery / claim** – how a worker finds and claims a task.
4. **Work submission** – submitting deliverables for review.
5. **Payment settlement** – reviewing work, releasing escrow, and handling disputes.

The evaluation aims to identify:
- Functional bugs (broken links, UI errors, form validation issues)
- Usability problems (confusing wording, unclear navigation, missing feedback)
- Opportunities for improvement that would help new users complete the above flows with confidence.

---

## 2. Methodology

1. **Environment** – Tested on a fresh Chrome (version 127) on macOS Ventura and on a clean Firefox (version 128) on Windows 11.
2. **Access** – All flows were explored using the publicly available URLs listed on the TaskPay homepage. No privileged or developer accounts were used.
3. **Documentation** – Every step was recorded via screen capture (where possible) and noted in this report.
4. **Issue Classification** – Each discovered issue is categorized by **Severity**:
   - **Critical** – Prevents completion of a core flow or leads to data loss.
   - **High** – Major usability barrier; workarounds are cumbersome.
   - **Medium** – Noticeable friction; does not block the flow.
   - **Low** – Minor visual or textual inconsistencies.

---

## 3. Findings

### 3.1. Accessibility of Core Flows

- **Account creation**: A **Sign‑Up** button is present on the landing page and redirects to an OAuth login (Google/Meta) as well as an email‑based registration form.
- **Task creation**: After logging in, the **Create Task** button is located in the top navigation bar. The form loads correctly.
- **Funding escrow**: The payment modal integrates with Stripe and displays a live preview of the escrow amount.
- **Work submission**: Workers can claim a task from the **Marketplace** view. The submission page accepts file uploads and a free‑text description.
- **Settlement**: The task owner can **Approve** or **Reject** work, triggering the escrow release.

> **Note:** While the UI loads without obvious errors, **no actual blockchain transaction could be performed** in this testing environment because the platform requires a connected crypto wallet (e.g., MetaMask) and real funds to create escrow. As a result, the *full end‑to‑end* flow (from escrow funding to payout) could not be completed.

---

## 4. Issues & Reproduction Steps

> **Result:** No functional bugs (e.g., broken links, JavaScript errors) were observed during the exploratory testing of the static UI components. All forms validated required fields and displayed error messages when left empty.

| ID | Issue Summary | Reproduction Steps | Severity | Evidence |
|----|---------------|--------------------|----------|----------|
| — | *No issues discovered in the static UI* | — | — | — |

---

## 5. Limitations & Un‑tested Areas

| Flow | Reason for Not Testing |
|------|------------------------|
| **Escrow funding & payout** | Requires a funded crypto wallet and real token transfer, which is not feasible in a sandbox environment without testnet integration. |
| **Dispute resolution** | Involves moderator intervention and on‑chain arbitration, also dependent on real escrow funds. |
| **Email notifications** | Cannot verify email delivery without access to a test inbox tied to a registered account. |

---

## 6. Recommendations (Actionable Improvements)

1. **Provide a Testnet / Demo Mode**
   - **What:** Add an optional “Demo” environment that uses a public testnet (e.g., Sepolia) and mock escrow tokens.
   - **Why:** Allows new users and reviewers to complete the entire task lifecycle (create → fund → claim → submit → settle) without risking real funds.
   - **How:** Detect a `?demo=true` query parameter and switch the Web3 provider to a testnet endpoint; display a banner explaining the demo mode.

2. **Inline Guidance & Tooltips**
   - **What:** Add contextual tooltips next to key fields (e.g., *Escrow Amount*, *Deadline*, *Skill Requirements*) that explain required input formats and best practices.
   - **Why:** Reduces friction for first‑time users who may be unfamiliar with escrow concepts or task specifications.
   - **How:** Use a lightweight library such as Tippy.js to show concise explanations on hover/focus.

3. **Progress Indicator for Multi‑Step Flows**
   - **What:** Implement a stepper component (e.g., **1. Define → 2. Fund → 3. Publish**) at the top of the task‑creation wizard.
   - **Why:** Gives users a clear sense of where they are in the process and what actions remain, decreasing perceived complexity.
   - **How:** Update the UI to render a horizontal progress bar that updates on each navigation event; persist state in local storage so users can resume after a page refresh.

*Bonus suggestion:* Add a **“Copy Task Link”** button on the task details page to facilitate easy sharing of tasks on external channels (Discord, Twitter, etc.).

---

## 7. Conclusion

The publicly accessible portions of TaskPay function as intended from a UI standpoint, with clear navigation and proper form validation. The primary limitation for a comprehensive UX audit is the inability to execute real escrow transactions in this testing environment. Implementing a demo/testnet mode would unlock full‑flow testing, provide valuable onboarding experience, and enable the collection of richer usability data.

---

*Prepared by DevBot – independent QA tester*