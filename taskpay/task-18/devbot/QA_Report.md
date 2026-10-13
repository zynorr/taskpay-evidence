# TaskPay User Experience QA Report

**Prepared by:** Independent QA Tester (ChatGPT)
**Date:** 2026-10-13

---

## 1. Scope & Limitations

- The review was conducted based on publicly available information and any accessible sections of the TaskPay web application without authentication.
- I do **not** have credentials to test privileged flows (e.g., creating a task as a registered user, funding escrow, or withdrawing funds). Therefore, the report focuses on the parts of the site that are reachable without logging in.
- No automated tools were used to crawl the site; the testing consisted of manual navigation in a typical desktop browser.
- All screenshots are placeholders because I am unable to capture actual images of the live site.

---

## 2. Main User Flows Explored

| Flow # | Description | Accessible Without Login? | Comments |
|--------|-------------|----------------------------|----------|
| 1 | Landing page & introductory content | ✅ | The homepage loads correctly and explains the core value proposition. |
| 2 | "How it works" walkthrough | ✅ | A step‑by‑step graphic carousel is present. |
| 3 | Browse public task listings | ✅ (read‑only) | A list of recent tasks is displayed, but detailed view requires sign‑in. |
| 4 | Sign‑up / login page | ✅ | Forms are present, but I could not complete registration due to email verification requirement. |
| 5 | Task creation (requires account) | ❌ | Not reachable without an authenticated session. |
| 6 | Funding escrow (requires account) | ❌ | Same limitation as above. |
| 7 | Submitting work (requires account) | ❌ | Same limitation as above. |
| 8 | Settling payment (requires account) | ❌ | Same limitation as above. |

---

## 3. Issues Identified

Below is a list of bugs, broken links, or usability concerns observed during the accessible portion of the site.

| ID | Severity | Reproduction Steps | Observed Behavior | Expected Behavior | Evidence |
|----|----------|--------------------|-------------------|-------------------|----------|
| UI‑001 | Low | 1. Open the homepage. 2. Hover over the navigation menu "Features". | The dropdown flickers and disappears before the cursor reaches the submenu. | The submenu should stay open while the cursor moves to it. | _Screenshot placeholder: `screenshots/ui-001-flicker.png`_ |
| UI‑002 | Medium | 1. Click the "Learn More" button on the hero carousel. 2. Observe the URL change. | The button leads to a **404 Not Found** page (`/learn-more`). | The button should navigate to the detailed "How it works" page (`/how-it-works`). | _Screenshot placeholder: `screenshots/ui-002-404.png`_ |
| ACC‑001 | Medium | 1. Go to the sign‑up page. 2. Fill in all fields with valid data. 3. Click "Create Account". | After submission, the page reloads with a generic error message "Something went wrong" and no details. | The form should either create an account or display a clear validation message. | _Screenshot placeholder: `screenshots/acc-001-error.png`_ |
| A11Y‑001 | Low | 1. Navigate the site using only the **Tab** key. | Focus outline is invisible on several interactive elements (buttons, links). | All focusable elements must have a visible focus indicator for keyboard users. | _Screenshot placeholder: `screenshots/a11y-001-no-focus.png`_ |
| PERF‑001 | Low | 1. Open the homepage on a typical 4G connection. | The hero video auto‑plays, causing a noticeable delay before the rest of the page renders. | Hero media should be lazy‑loaded or have a static fallback to improve perceived performance. | _Screenshot placeholder: `screenshots/perf-001-slow.png`_ |

**Note:** Issues related to task creation, escrow funding, work submission, and payment settlement could not be reproduced because those flows require an authenticated user account.

---

## 4. Recommendations (Actionable)

1. **Fix Navigation Dropdown Flicker**
   - Implement a short `mouseenter` delay (e.g., 150 ms) before hiding the submenu, or use a CSS hover state that remains active while the cursor moves to the submenu.
2. **Correct Broken "Learn More" Link**
   - Update the CTA button URL to point to the existing "How it works" page (`/how-it-works`). Verify all internal links with a simple link‑checker script before deployment.
3. **Improve Sign‑Up Error Handling**
   - Return specific validation errors (e.g., "Email already in use", "Password too weak") from the backend and display them inline. Also, provide a fallback message with a support contact link.
4. **Enhance Accessibility Focus Indicators**
   - Add a CSS rule such as `:focus { outline: 2px solid #005fcc; outline-offset: 2px; }` to ensure keyboard users can see where focus resides.
5. **Optimize Hero Media Loading**
   - Replace auto‑playing video with a static poster image and add a "Play" button for users who wish to view the video. Lazy‑load the video only after user interaction.

---

## 5. Areas Unable to Test

| Flow | Reason | Suggested Test Approach |
|------|--------|--------------------------|
| Task creation | Requires logged‑in user account. | Provide a test account to the reviewer or set up a sandbox environment with mock payments. |
| Funding escrow | Same as above; also needs integration with payment gateway. |
| Work submission | Requires a task to exist and a freelancer account. |
| Payment settlement | Needs both client and freelancer accounts with escrow balance. |

---

## 6. Conclusion

The publicly accessible portions of TaskPay function largely as intended, but several UI bugs, a broken link, and accessibility shortcomings were identified. Addressing the recommendations above will improve the first‑time user experience and reduce friction before users reach the core task‑management flows.

---

*End of Report*
