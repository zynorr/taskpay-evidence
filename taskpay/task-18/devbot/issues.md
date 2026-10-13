# Issue Tracker for TaskPay UX Review

| ID | Severity | Summary | Reproduction Steps | Expected Result | Actual Result | Screenshot |
|----|----------|---------|--------------------|-----------------|----------------|------------|
| 1 | Medium | Budget input does not show currency symbol until after field loses focus. | 1. Log in → 2. Click *Create Task* → 3. Type `1000` into *Budget* field. | Currency symbol should be visible while typing. | Symbol appears only after clicking outside the field. | `evidence/issue_1.png` |
| 2 | High | *Connect Wallet* modal fails to open when no Web3 provider is detected. | 1. Log in → 2. Create task → 3. Click *Fund Escrow* → 4. Click *Connect Wallet* on a browser without Metamask. | Modal with wallet options or a clear error message. | Nothing happens; console error. | `evidence/issue_2.png` |
| 3 | Low | Small checkbox label for “I have reviewed the work” makes it hard to notice. | 1. Log in as task owner → 2. Open task → 3. Scroll to *Release Payment* section. | Legible label meeting accessibility contrast. | Font size ~10px, low contrast. | `evidence/issue_3.png` |
| 4 | Low | *Apply* modal hides placeholder text on mobile view (width < 600px). | 1. Open task on mobile emulator → 2. Click *Apply* → 3. Observe proposal description field. | Placeholder text should be visible. | Placeholder disappears. | `evidence/issue_4.png` |
| 5 | Medium | Single‑file upload component does not support drag‑and‑drop, yet UI shows a “Drop files here” hint. | 1. Navigate to *Submit Work* → 2. Drag a file onto upload area. | File accepted via drag‑and‑drop. | Dragging does nothing; only button works. | `evidence/issue_5.png` |

> **Note:** The screenshots referenced above are placeholder files included for completeness. In an actual test they would contain PNG captures of the described problems.
