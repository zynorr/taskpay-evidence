# TaskPay User Experience QA Report

**Prepared by:** Independent QA Contractor
**Date:** 2026-10-13

---

## 1. Introduction

The purpose of this report is to evaluate the user experience (UX) of the **TaskPay** platform, focusing on the core user flows that a new user would typically follow:

1. **Account onboarding** (sign‑up / login)
2. **Task creation** – defining a new task, setting a reward, and publishing it.
3. **Funding escrow** – depositing funds that will be held in escrow until the task is completed.
4. **Work submission** – the task performer uploads deliverables.
5. **Payment settlement** – the task creator reviews the work and releases payment.

The audit was performed on the live web application (accessed via Chrome 124 on macOS 14) without any privileged accounts.

---

## 2. Methodology

- Navigated the public site and used a fresh email address to register a new account.
- Followed the above five user flows end‑to‑end where possible.
- Recorded observations, error messages, and UI inconsistencies.
- Captured screenshots for any visual bugs or broken links.
- Classified each issue by **Severity** (Critical, High, Medium, Low) and provided reproducible steps.

---

## 3. User Flows Tested

| Flow | Description | Status |
|------|-------------|--------|
| **Account Onboarding** | Sign‑up, email verification, initial login. | ✅ Completed |
| **Task Creation** | Fill in task title, description, reward amount, select category, and publish. | ✅ Completed (encountered a broken help link) |
| **Funding Escrow** | Deposit funds via Stripe; confirm escrow balance appears. | ✅ Completed (confusing instruction wording) |
| **Work Submission** | Performer uploads a file and adds a brief note. | ✅ Completed (missing validation feedback) |
| **Payment Settlement** | Creator reviews submission, approves, and releases payment. | ✅ Completed |

---

## 4. Findings – List of Issues

### Issue 1 – Broken Help Link on Task Creation Page
- **Location:** `Task Creation → “What is a task?”` help tooltip link.
- **Severity:** Medium
- **Reproduction Steps:**
  1. Log in as a new user.
  2. Click **Create Task**.
  3. Click the *"What is a task?"* hyperlink under the title field.
  4. The link leads to a 404 page (`/help/task-definition`).
- **Impact:** Users cannot access contextual help, leading to confusion for first‑time creators.
- **Screenshot:** `screenshots/issue1.png`

### Issue 2 – Confusing Escrow Funding Instructions
- **Location:** Escrow funding modal (after clicking **Fund Escrow**).
- **Severity:** Low
- **Reproduction Steps:**
  1. Create a task and click **Fund Escrow**.
  2. Observe the instruction text: *"Enter the amount you wish to lock in escrow. The system will automatically convert it to USD."*
  3. No conversion information is displayed, and the currency selector is hidden, causing uncertainty about which currency is being used.
- **Impact:** May cause users to over‑ or under‑fund escrow, especially international users.
- **Screenshot:** `screenshots/issue2.png`

### Issue 3 – Missing Validation Error on Work Submission
- **Location:** Work submission form (performer side).
- **Severity:** High
- **Reproduction Steps:**
  1. As a performer, open an assigned task.
  2. Click **Submit Work**.
  3. Attempt to submit without attaching any file or entering a description.
  4. The form accepts the submission and shows a generic *"Submission received"* toast, but the backend rejects it, resulting in an error page later.
- **Impact:** Users think their work was submitted, leading to frustration and additional support tickets.
- **Screenshot:** `screenshots/issue3.png`

---

## 5. Recommendations (Actionable)

1. **Fix Broken Help Links** – Update the `href` of the *"What is a task?"* link to point to the correct help article (`/help/task-overview`). Add a fallback 404 handler that suggests related articles.
2. **Clarify Escrow Funding UI** –
   - Display the selected currency next to the amount field.
   - Show a real‑time conversion preview if a non‑USD currency is chosen.
   - Add an info icon with a tooltip explaining the conversion process.
3. **Add Front‑End Validation on Work Submission** –
   - Disable the *Submit* button until a file is attached and a description is entered.
   - Show inline error messages (e.g., *"Please attach a file before submitting"*).
   - Perform an optimistic UI check to prevent the misleading success toast.

Additional low‑effort improvements:
- Implement breadcrumb navigation on deep pages to improve discoverability.
- Provide a progress indicator during escrow funding to reassure users that the transaction is processing.

---

## 6. Limitations

- The **admin dashboard** and **API token generation** flows could not be accessed with a standard user account; these were marked as *not testable*.
- Mobile‑only UI variations were not evaluated; testing was performed on desktop browsers only.

---

## 7. Conclusion

TaskPay’s core functionality works, but the identified usability gaps (broken help link, ambiguous escrow instructions, and missing validation) could hinder adoption, especially for first‑time users. Implementing the recommended changes will improve clarity, reduce support overhead, and create a smoother onboarding experience.
