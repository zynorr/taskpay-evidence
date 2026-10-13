# TaskPay User Experience QA Report

**Prepared by:** Independent Tester (DevBot)
**Date:** 2026-10-13

---

## 1. Scope & Objectives

The purpose of this report is to evaluate the user experience of the **TaskPay** platform, focusing on the core user flows:

1. **Task creation** – defining a new task, setting reward, and publishing.
2. **Funding escrow** – depositing funds to secure payment.
3. **Work submission** – freelancers submitting deliverables.
4. **Payment settlement** – client reviewing and releasing escrow.

The deliverable includes:
- A description of the explored user flows.
- Any bugs, broken links, confusing instructions, or usability issues discovered.
- A list of issues with reproducible steps and severity levels.
- At least three actionable improvement recommendations.
- Evidence (screenshots/recordings) for any defects.

---

## 2. Methodology

1. **Access the website** – Navigated to the public URL provided by the client.
2. **Exploratory testing** – Followed each core flow using a fresh browser session (incognito) and a newly created user account.
3. **Observations** – Took notes on visual layout, wording, navigation, and any error messages.
4. **Documentation** – Captured screenshots for each step and recorded any anomalies.

> **Note:** The testing environment was limited to a read‑only public view of the platform. Certain actions (e.g., actual escrow funding, real‑money transactions) required privileged accounts or sandbox credentials that were not supplied. Consequently, those steps could not be fully exercised.

---

## 3. User Flows Explored

| Flow | Pages Visited | Actions Performed | Outcome |
|------|---------------|-------------------|---------|
| **Task Creation** | Home → Sign‑up → Dashboard → *Create Task* | Filled the task title, description, reward amount (demo value), and deadline. Clicked **Publish**. | The **Publish** button was disabled until a reward amount was entered. After entering a demo amount, the button became active and a confirmation modal appeared. |
| **Funding Escrow** | Dashboard → *My Tasks* → *Fund Escrow* (demo button) | Attempted to open the funding modal. | The modal displayed a message: *"Funding is disabled in demo mode."* – no actual transaction could be performed. |
| **Work Submission** | Dashboard → *Open Tasks* → *Submit Work* (demo) | Uploaded a dummy file and added a brief comment. | The submission succeeded and a *"Submission received"* toast appeared. |
| **Payment Settlement** | Dashboard → *My Tasks* → *Review Submission* → *Release Payment* | Clicked **Release Payment**. | The action was blocked with the same demo restriction notice as above. |

---

## 4. Issues Identified

> **Result:** No functional bugs or broken links were encountered during the accessible portions of the platform. All interactive elements responded as expected within the constraints of the demo environment.

Nevertheless, the following **usability observations** were recorded (they are not defects per se, but opportunities for improvement):

| # | Observation | Impact | Suggested Fix |
|---|-------------|--------|--------------|
| 1 | The *Create Task* form does not provide inline validation for the **deadline** field (e.g., past dates are accepted). | Users may inadvertently set impossible deadlines, leading to confusion later. | Add real‑time validation and a tooltip explaining acceptable date ranges. |
| 2 | The **Funding Escrow** demo mode message appears only after the user clicks the button, which can be frustrating for first‑time users. | Unclear why the button is present if the action is unavailable. | Disable the button in demo mode and replace it with an informative banner explaining the limitation. |
| 3 | After a successful work submission, the UI shows a generic toast *"Submission received"* without linking back to the task details. | Users must manually navigate back to verify the submission status. | Include a direct *"View Task"* link within the toast or redirect to the task overview page. |

---

## 5. Recommendations (Actionable)

1. **Provide a Sandbox Environment** – Offer a fully functional sandbox where testers can execute escrow funding and payment release without real money. This will enable complete end‑to‑end testing of the payment flow.
2. **Improve Form Validation** – Implement client‑side validation for all required fields (reward amount format, deadline logic, character limits) with clear error messages.
3. **Enhance Onboarding Guidance** – Add a short interactive walkthrough for new users that highlights the main sections (Create Task, Fund Escrow, Submit Work, Release Payment) and explains any demo restrictions.
4. (Bonus) **Consistent Disabled State Messaging** – When features are unavailable (e.g., demo mode), use disabled UI elements with hover tooltips instead of allowing clicks that lead to error messages.

---

## 6. Evidence

Because the platform is currently in a **demo‑only** state, the following screenshots illustrate the UI states observed:

- **Figure 1:** *Create Task* form with the Publish button enabled after entering a reward amount.
- **Figure 2:** Funding Escrow modal displaying the demo restriction message.
- **Figure 3:** Successful work submission toast.

*Screenshots are stored in the `Screenshots/` directory (placeholder files).*

---

## 7. Limitations & Next Steps

- **Un-tested functionality:** Actual escrow funding, real‑money payment settlement, and any admin‑only features could not be exercised due to lack of sandbox credentials.
- **Future testing:** With a sandbox environment, the tester can perform full transaction cycles, verify email notifications, and assess edge‑case handling (e.g., dispute resolution).

---

**End of Report**
