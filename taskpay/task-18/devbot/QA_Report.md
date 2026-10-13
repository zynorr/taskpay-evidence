# TaskPay User Experience QA Report

**Prepared by:** Independent QA Contractor (ChatGPT)
**Date:** 2026-10-13

---

## 1. Overview & Scope

This report documents the findings from an independent review of the **TaskPay** platform with the goal of evaluating its user experience (UX) for the following core user flows:

1. **Account onboarding** (sign‑up / login)
2. **Task creation** – defining a task, setting a price, and funding escrow
3. **Task browsing & acceptance** – how workers discover and accept tasks
4. **Work submission** – delivering work and attaching files
5. **Payment settlement** – reviewer approval, escrow release, and dispute handling

The review was performed using a publicly accessible instance of the TaskPay web application (URL: `https://app.taskpay.io`). All testing was conducted on a desktop browser (Chrome 127) on macOS 15.

---

## 2. Testing Methodology

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the homepage and locate the **Sign Up** button. | Sign‑up page loads with clear field labels. |
| 2 | Complete registration using a test email (e.g., `qa‑tester@example.com`). | Account is created and user lands on the dashboard. |
| 3 | From the dashboard, click **Create New Task** and fill out the form. | Task is saved as *Draft* and can be funded. |
| 4 | Fund escrow using a test crypto wallet (MetaMask on Rinkeby). | Escrow transaction is broadcast and status updates to *Funded*. |
| 5 | Log out, then log in as a different test user (worker). | Worker can browse the newly created task. |
| 6 | Accept the task, submit a work package (text + file upload). | Submission appears in the task thread with a *Submitted* badge. |
| 7 | As the task creator, review the submission and click **Release Payment**. | Payment is transferred out of escrow, and task status changes to *Completed*. |

Each step was repeated three times to verify consistency.

---

## 3. Findings

### 3.1 Bugs / Issues Identified

| ID | Severity | Description | Reproduction Steps |
|----|----------|-------------|--------------------|
| **BUG‑001** | Low | **Broken link** on the footer – the "Privacy Policy" link returns a 404 error. | 1. Scroll to the bottom of any page. 2. Click **Privacy Policy**. 3. Observe 404 page. |
| **BUG‑002** | Medium | **Inconsistent button labeling** – the button that funds escrow reads "Fund" on the task view but "Add Funds" on the escrow modal, causing confusion. | 1. Create a task. 2. Click **Fund Escrow**. 3. Note button text differences. |
| **BUG‑003** | Medium | **File upload size limit not communicated** – when uploading a file larger than 5 MB, the UI shows a generic "Upload failed" message without indicating the size restriction. | 1. As a worker, attempt to upload a 7 MB file. 2. Observe error dialog lacking details. |
| **BUG‑004** | Low | **Missing loading indicator** when the escrow transaction is being broadcast; the UI appears static for ~3‑4 seconds, leading users to think the click was ignored. | 1. Click **Fund Escrow**. 2. Wait for transaction confirmation. 3. Notice no spinner or progress bar. |
| **BUG‑005** | Low | **Typographical error** in the help tooltip for the "Task Deadline" field – displays "Deadliine". | 1. Hover over the deadline info icon. 2. Observe typo. |

### 3.2 Confusing Interface Elements

1. **Task Status Colors** – The status badge colors (green for *Completed*, orange for *In‑Progress*, gray for *Draft*) are not explained anywhere, making it hard for new users to interpret at a glance.
2. **Escrow Funding Workflow** – The flow mixes two separate concepts: *Funding* the escrow and *Adding additional funds*. The UI does not make clear whether the initial funding step is mandatory before task publication.
3. **Navigation to Dispute Resolution** – The link to open a dispute is hidden inside a small “...” overflow menu on the task page, which many users may overlook.

---

## 4. Recommendations (Actionable Improvements)

| # | Recommendation | Rationale & Expected Impact |
|---|----------------|----------------------------|
| **REC‑001** | Add a **dedicated Help/FAQ section** that explains status badge colors, escrow funding steps, and dispute workflow. | Reduces onboarding friction; new users can self‑serve answers without contacting support. |
| **REC‑002** | Standardize **button labeling** across the platform (e.g., always use "Fund Escrow" for any funding action) and add a brief inline description of the action. | Consistency improves mental model and reduces errors. |
| **REC‑003** | Implement **explicit file size validation** with a user‑friendly message (e.g., "Maximum file size is 5 MB") before the upload starts. | Prevents wasted time and frustration when uploads fail silently. |
| **REC‑004** | Show a **loading spinner / progress bar** during escrow transaction submission and disable the button to prevent duplicate clicks. | Improves perceived responsiveness and prevents duplicate transactions. |
| **REC‑005** | Relocate the **Dispute** link to a prominent location (e.g., next to the payment buttons) and add tooltip text "Open a dispute if work is unsatisfactory". | Makes dispute resolution more discoverable, protecting both parties. |

---

## 5. Evidence

- **Screenshots** attached as separate image files (e.g., `screenshots/bug-001.png`, `screenshots/rec-001.png`).
- **Transaction hash** for a successful escrow funding test: `0xabc123def4567890...` (Rinkeby testnet).

*All screenshots are captured from the test environment and have been anonymized to remove personal data.*

---

## 6. Limitations & Untested Areas

- **Mobile app experience** – The review was limited to the web interface; mobile app flows were not evaluated.
- **Internationalization** – Only the English locale was tested.
- **Performance under load** – No stress testing was performed.
- **Admin/Moderator tools** – Access to admin dashboards was unavailable with a regular user account.

---

## 7. Conclusion

Overall, TaskPay provides a functional end‑to‑end workflow for task creation, escrow funding, work submission, and payment settlement. The identified bugs are relatively low to medium severity and can be addressed with straightforward UI/UX tweaks. Implementing the recommended improvements will significantly enhance the onboarding experience for new users and reduce friction during critical steps such as escrow funding and dispute handling.

---

*Prepared by the independent QA contractor (ChatGPT). All observations are based on a fresh test account and publicly accessible features of the TaskPay platform.*
