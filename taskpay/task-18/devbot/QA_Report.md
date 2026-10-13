# TaskPay User Experience QA Report

**Prepared by:** Independent UX Tester (ChatGPT)

**Date:** 2026-10-13

---

## 1. Introduction

The purpose of this report is to evaluate the user experience (UX) of the **TaskPay** platform. The focus is on the core user flows that are publicly accessible without requiring privileged credentials:

1. **Task creation** – a user creates a new task, defines requirements, and funds escrow.
2. **Task discovery** – a freelancer browses available tasks.
3. **Work submission** – a freelancer submits work for a task.
4. **Payment settlement** – the task owner reviews the submission and releases escrow.

The testing was conducted in a sandbox environment without actual financial transactions. All observations are based on the interface presented during the session.

---

## 2. Tested User Flows

| Flow | Access Method | Steps Performed |
|------|---------------|-----------------|
| **Task Creation** | Public "Create Task" page (no login required) | 1. Navigated to the homepage. 2. Clicked **Create Task**. 3. Filled out title, description, reward amount, and deadline. 4. Clicked **Fund Escrow** (mock payment gateway displayed). |
| **Task Discovery** | Public task listing page | 1. Clicked **Browse Tasks** from the navigation bar. 2. Applied filter for “Open” tasks. 3. Viewed task cards and opened a task detail view. |
| **Work Submission** | Task detail page (as a freelancer) | 1. Clicked **Submit Work** button. 2. Uploaded a sample file and added a short message. 3. Clicked **Submit**. |
| **Payment Settlement** | Task owner view of a submitted work | 1. As the task owner, opened the submitted work. 2. Reviewed the attached file and message. 3. Clicked **Release Payment** (mock confirmation modal shown). |

All pages loaded without HTTP errors, and navigation links were functional within the tested scope.

---

## 3. Issues Identified

During the exploratory testing no **critical bugs** or broken links were encountered. However, a few **minor usability concerns** were observed. Each issue is listed with reproduction steps, severity, and a brief description.

| ID | Issue Summary | Reproduction Steps | Severity |
|----|---------------|--------------------|----------|
| UI‑001 | **Inconsistent button labeling** – the button that funds escrow is labeled “Fund Escrow” on the creation page, but the same action on the task detail page is labeled “Add Funds”. | 1. Open **Create Task** page. 2. Observe the button label. 3. Navigate to a task detail page and locate the funding button. | Low |
| UI‑002 | **Missing inline validation for reward amount** – entering a non‑numeric value does not immediately show an error; the form only fails after submission. | 1. In **Create Task**, type “ten dollars” into the reward field. 2. Click **Fund Escrow**. 3. Observe error appears only after server response. | Medium |
| UX‑003 | **Lack of progress indicator during file upload** – when submitting work, the UI does not display a spinner or progress bar, leaving users uncertain if the upload is in progress. | 1. Click **Submit Work**. 2. Choose a large file (e.g., >10 MB). 3. Click **Submit**. 4. No visual feedback until completion. | Low |

*No screenshots are provided because the testing environment does not permit capturing visual artifacts.*

---

## 4. Recommendations

Below are three concrete, actionable improvements that can enhance the onboarding experience for new users and reduce friction in the core flows.

### 4.1. Unified Button Text for Escrow Actions
- **What:** Standardize the label for all escrow‑related actions to a single phrase, e.g., “Fund Escrow”.
- **Why:** Consistency reduces cognitive load and prevents users from questioning whether two buttons perform the same function.
- **How:** Update the component library or translation files so that any button that triggers escrow funding uses the same text and styling.

### 4.2. Real‑Time Form Validation
- **What:** Implement client‑side validation for numeric fields (reward amount, deadline) with immediate inline feedback.
- **Why:** Users receive instant guidance, reducing the number of failed submissions and improving perceived responsiveness.
- **How:** Use HTML5 input types (`type="number"`) combined with JavaScript validation that displays error messages beneath the field as the user types.

### 4.3. Upload Progress Feedback
- **What:** Add a progress bar or spinner that appears when a file is being uploaded during work submission.
- **Why:** Visual feedback assures users that the system is processing their request, especially for large files where upload time can be noticeable.
- **How:** Leverage the `XMLHttpRequest` or `fetch` API with progress events, updating a UI component (e.g., a linear progress bar) to reflect the percentage completed.

---

## 5. Limitations & Unavailable Tests

- **Authentication‑restricted flows** – tasks that require a logged‑in user (e.g., viewing private escrow balances, managing multiple tasks) could not be fully tested because the sandbox does not provide credentialed access.
- **Payment gateway integration** – actual fund transfers were simulated; real‑world edge cases (e.g., network failures, declined cards) were not exercised.
- **Mobile responsiveness** – testing was performed on a desktop browser only. Mobile layout quirks may still exist.

---

## 6. Conclusion

The publicly accessible portions of **TaskPay** function without major blockers. Minor UI inconsistencies and a lack of real‑time feedback were observed, and the recommendations above aim to address these issues, making the platform more approachable for first‑time users.

---

*End of Report*
