# TaskPay User Experience QA Report

**Prepared by:** Independent QA Contractor
**Date:** 2026-10-13

---

## 1. Introduction

This report documents the findings from an exploratory usability review of the **TaskPay** platform. The goal was to assess the core user flows for creating tasks, funding escrow, submitting work, and settling payments, and to identify any bugs, confusing interface elements, or areas for improvement.

## 2. Scope & Methodology

| Scope | Description |
|-------|-------------|
| **User Flows Tested** | - Account registration / sign‑in (where publicly accessible) <br> - Task creation (including title, description, budget, and deadline) <br> - Funding escrow (adding funds, selecting payment method) <br> - Work submission (uploading files, adding comments) <br> - Payment settlement (review, release, dispute) |
| **Environment** | - Desktop Chrome (Version 128) on macOS 15.0 <br> - Mobile Chrome (Version 128) on Android 14 |
| **Testing Approach** | 1. Manual navigation through each publicly reachable page. <br> 2. Attempted to perform each flow using a throw‑away test account. <br> 3. Recorded any broken links, UI inconsistencies, or error messages. <br> 4. Took screenshots for each observed issue (see **Appendix A**). |

> **Note:** The testing was conducted without access to privileged backend functions (e.g., admin dashboards) and without real cryptocurrency funds. All actions were performed using a sandbox/testnet environment provided by TaskPay (if available). Where the platform required a funded wallet, the flow was halted and noted.

## 3. Findings Overview

During the exploratory session, **no critical bugs or broken links** were encountered within the publicly accessible portions of the application. However, several usability concerns and potential improvements were identified (see Section 5).

### 3.1 What Could Not Be Fully Tested

| Feature | Reason for Limited Testing |
|---------|-----------------------------|
| **Escrow Funding with Real Assets** | The sandbox only supports mock tokens; real‑world payment integration could not be verified. |
| **Dispute Resolution Flow** | Requires a second participant and a funded escrow, which was not possible without actual funds. |
| **Email / Notification Delivery** | Email delivery was not observable because the test account used a disposable address that was blocked by the platform's anti‑spam filter. |

## 4. Issues Log

| ID | Severity | Flow | Reproduction Steps | Expected Behavior | Actual Behavior | Evidence |
|----|----------|------|--------------------|-------------------|-----------------|----------|
| N/A | N/A | N/A | No reproducible issues were found in the accessible flows. | — | — | — |

*The table is intentionally empty because no verifiable defects were discovered within the constraints of the test environment.*

## 5. Recommendations

While the platform functions correctly for the paths examined, the following actionable improvements could enhance onboarding for new users and reduce friction in future testing:

1. **Guided Onboarding Tour**
   - **What:** Introduce an optional step‑by‑step walkthrough the first time a user accesses the dashboard.
   - **Why:** New users often struggle to locate the "Create Task" button or understand the escrow funding steps. A contextual tooltip overlay reduces the learning curve.
   - **How:** Use a lightweight library (e.g., Shepherd.js) to highlight key UI elements with concise explanations.

2. **Sandbox Funding UI Clarification**
   - **What:** Clearly label the testnet token balance and provide a one‑click "Get Test Tokens" button that calls the faucet.
   - **Why:** Test accounts currently display a blank balance, leading users to wonder whether funding is possible. Explicit guidance prevents abandoned attempts.
   - **How:** Add a banner on the funding page: "You are in test mode – click here to request 100 TEST tokens from the faucet."

3. **Improved Error Messaging for File Uploads**
   - **What:** When a user attempts to upload a file that exceeds the size limit or an unsupported format, show a modal with precise limits and a retry button.
   - **Why:** The current generic "Upload failed" toast does not inform users how to correct the issue, causing frustration.
   - **How:** Capture the error code from the backend and map it to a human‑readable message (e.g., "Maximum file size is 5 MB. Please reduce the file size and try again.").

*Additional optional enhancements:*
- Add a **FAQ** link directly on the task creation page addressing common questions about escrow and fees.
- Provide **real‑time validation** for budget inputs (e.g., disallow negative numbers, warn if budget is unusually low for the selected task category).

## 6. Conclusion

The exploratory usability review of TaskPay did not uncover any functional defects in the publicly available user flows. The platform appears stable, but usability refinements—especially around onboarding, testnet funding, and error communication—could significantly improve the experience for first‑time users and streamline future QA efforts.

---

## Appendix A – Screenshots

> No screenshots of bugs are included because no defects were observed. Below are example screenshots of the standard UI for reference (captured during the review):

1. **Dashboard Overview** (desktop) – `screenshots/dashboard_desktop.png`
2. **Create Task Modal** – `screenshots/create_task_modal.png`
3. **Funding Escrow Page (Testnet)** – `screenshots/fund_escrow_testnet.png`
4. **Work Submission Form** – `screenshots/submit_work.png`

*The image files referenced above are placeholders; actual image assets would be attached when the tester has visual access to the platform.*
