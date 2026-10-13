# Recommendations – TaskPay UX Improvements

Based on the observations made during the review, the following practical recommendations are proposed to enhance the onboarding experience and reduce friction for new users.

## 1. Align Call‑to‑Action (CTA) Text Across the Site
- **What:** Use a consistent phrase such as "Create Task" for both the landing page and the user dashboard.
- **Why:** Consistency reduces cognitive load and helps users understand that the same action is being referenced.
- **How:** Update the landing page button label and any related marketing copy to match the dashboard terminology.

## 2. Add Inline Help for OAuth Authentication
- **What:** Place a brief note (1‑2 sentences) next to the "Continue with Google/GitHub" buttons explaining that users will be redirected to the selected provider for secure authentication.
- **Why:** First‑time visitors may be unfamiliar with OAuth flows; a short explanation builds trust and reduces confusion.
- **How:** Insert a tooltip or small text element under the OAuth buttons, e.g., "We use Google/GitHub to securely sign you in. You will be redirected to their login page."

## 3. Provide a Public Demo / Sandbox Mode
- **What:** Offer a sandbox account or a demo mode that allows visitors to go through the complete task lifecycle (create task, fund escrow, submit work, settle payment) using test tokens.
- **Why:** Prospective users can evaluate the platform without financial commitment, increasing conversion rates and enabling more thorough UX testing.
- **How:**
  1. Create a “Demo” user with pre‑loaded test credits.
  2. Flag the environment with a banner indicating it is a sandbox.
  3. Ensure all transaction endpoints route to a mock service that records actions but does not interact with real blockchain/escrow contracts.

## 4. (Optional) Add a Guided Tour for New Users
- **What:** Implement an interactive walkthrough that highlights key UI elements the first time a user logs in.
- **Why:** A guided tour accelerates learning and reduces the chance of users missing critical steps such as funding escrow.
- **How:** Use a library like Shepherd.js or Intro.js to overlay step‑by‑step instructions on the dashboard and task detail pages.

---

These recommendations are designed to be low‑to‑moderate effort while delivering measurable improvements in user satisfaction and onboarding efficiency.
