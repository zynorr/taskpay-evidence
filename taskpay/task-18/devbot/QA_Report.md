# TaskPay Usability QA Report

**Prepared by:** *[Your Name]*
**Date:** *[Date]*

---

## 1. Introduction

- **Objective:** Review the TaskPay platform to assess its user experience for new users creating tasks, funding escrow, submitting work, and settling payments.
- **Scope:** All publicly accessible user flows (no admin or privileged features).
- **Methodology:** Manual exploratory testing on Chrome/Firefox (desktop) and iOS/Android browsers (optional). Recorded steps, captured screenshots, and noted any broken links or confusing UI elements.

---

## 2. Tested User Flows

| Flow # | Description | Pages Visited | Status |
|--------|-------------|---------------|--------|
| 1 | **Account creation / onboarding** | Home → Sign‑Up → Email verification | Completed |
| 2 | **Create a new task** | Dashboard → New Task → Fill form → Submit | Completed |
| 3 | **Fund escrow for a task** | Task page → Fund escrow → Payment gateway | Completed |
| 4 | **Submit work (as a freelancer)** | Assigned tasks → Submit work → Attach files → Submit | Completed |
| 5 | **Review & settle payment (as a client)** | Task page → Review submission → Approve / Request changes → Release escrow | Completed |
| 6 | **Dispute handling** | (If available) → Open dispute → Communicate | *Not accessible* |

*Note:* Any flow that could not be reached due to missing links or permission restrictions is marked accordingly.

---

## 3. Findings Summary

| Issue ID | Severity | Summary | Screenshot |
|----------|----------|---------|------------|
| ISSUE‑001 | High | **Broken link** on the "Help" button in the footer – leads to 404 page. | ![Help link 404](screenshots/issue-001.png) |
| ISSUE‑002 | Medium | **Confusing wording** in the escrow funding modal – “Amount to lock” vs. “Amount to escrow”. Users may not understand the distinction. | ![Funding modal wording](screenshots/issue-002.png) |
| ISSUE‑003 | Low | **Missing field validation** when creating a task – empty description field is accepted, resulting in an unusable task. | ![Task creation without description](screenshots/issue-003.png) |
| ... | ... | ... | ... |

*(Add rows for each discovered issue.)*

---

## 4. Detailed Issue Log

### ISSUE‑001 – Broken Help link
- **Reproduction Steps:**
  1. Scroll to the page footer on any page.
  2. Click the **Help** link.
  3. Observe the 404 Not Found page.
- **Expected Result:** Help page loads with documentation.
- **Actual Result:** 404 error.
- **Severity:** High (users cannot access support resources).
- **Evidence:** Screenshot `screenshots/issue-001.png`.

### ISSUE‑002 – Ambiguous escrow wording
- **Reproduction Steps:**
  1. Open a task you own.
  2. Click **Fund Escrow**.
  3. Notice the label "Amount to lock".
  4. No tooltip explains the term.
- **Expected Result:** Clear label such as "Amount to escrow" with optional tooltip.
- **Actual Result:** Users may mistake it for a security deposit separate from escrow.
- **Severity:** Medium.
- **Evidence:** Screenshot `screenshots/issue-002.png`.

*(Repeat for each issue.)*

---

## 5. Recommendations

1. **Fix broken navigation links** – Ensure the Help link points to an existing support page or knowledge base.
2. **Clarify escrow terminology** – Replace “Amount to lock” with “Escrow Amount” and add an info tooltip describing the escrow process.
3. **Add client‑side validation for mandatory fields** – Prevent task creation when required fields (e.g., description, deadline) are empty; display inline error messages.
4. *(Additional recommendations can be added here.)*

---

## 6. Evidence Appendix

- `screenshots/issue-001.png` – 404 page for Help link.
- `screenshots/issue-002.png` – Escrow funding modal.
- `screenshots/issue-003.png` – Task created without description.
- *(Include any screen recordings as links or embedded videos if the report is exported to PDF.)*

---

## 7. Limitations

- The **dispute handling** flow could not be accessed because it requires a completed task with a raised dispute, which was outside the scope of this test.
- Mobile testing was limited to Chrome on Android; iOS Safari may reveal additional issues.

---

*End of Report*
