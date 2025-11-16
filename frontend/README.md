# Frontend

## Components
    [x] Add “Meeting History” page (list past summaries)
    [ ] Improve UI (cards, collapsible sections, modals)
    [ ] Fix/Improve UI to show results clearly / Upgrade React UI to beautifully display JSON data
    [x] Implement Task CRUD endpoints (edit/delete/update status)
    [ ] Add Sprint Page + Store Sprint Plans (use Sprint table)
    [ ] Add Meeting Details Page (clickable meeting view)
    [ ] Add Developer Manager Section (skills & capacity)

## Optional
    [ ] Consolidate the UX so the flow is smoother
    [ ] Add editable task UI (modal + update + delete buttons)
    [ ] Add superior UI styling (cards, layout, theme)

    [ ] Improve Meeting History UI (cards, sections, layout)
    [ ] Add Audio transcription

## Example:

```meeting_notes
Yesterday we reviewed the progress for Sprint 14. 
Alice completed the authentication microservice but it still needs code review. 
Bob reported issues integrating the payment gateway; the API vendor changed the endpoint format, so he needs 2 more days.

We discussed the upcoming release deadline for version 2.1 (target: Feb 28).
QA mentioned 17 open bugs, 5 of them marked as critical.

Decisions:
- We agreed to freeze new features starting Friday.
- The payment integration must be the top priority.
- Move the front-end dashboard redesign to next sprint.
- Assign code review for Alice’s authentication service to Daniel.

Action Items:
- Bob will update the API client library.
- QA will re-test the booking workflow after Bob’s fix.
- Daniel will review Alice’s code by tomorrow.
- Alice will prepare deployment documentation.
- PM will update the release notes.

We also need to estimate the new “Saved Payment Methods” feature for next month. Rough estimate: around 8 story points, backend + frontend work.

Meeting ended with reminders to follow the new Git branching strategy and write more detailed PR descriptions.
```

```questions
- Based on the tasks from the meeting, which ones should be in the next sprint if our capacity is 12 story points?
- Sort all extracted tasks by risk level.
- Rewrite the meeting summary as a professional email to stakeholders.
- Generate a checklist for the release process based on the meeting.
- Explain what actions QA needs to take.
- What should be the main sprint goal?
- Create a risk report for the current sprint.
- Summarize the decisions in one sentence.
```