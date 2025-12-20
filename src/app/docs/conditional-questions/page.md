---
title: Conditional questions
nextjs:
  metadata:
    title: Conditional questions
    description: Show and hide content based on conditional logic
---

Learn how to show and hide content and questions in your project based on conditional logic {% .lead /%}

{% next-image src="/images/docs/conditions-example.png" width=1696 height=1224 alt="Screenshot of the display conditions editor" /%}

Conditional logic is useful if you want to build personalized and efficient surveys. Here are some conceptual examples:
- Ask a follow-up question, but only to users who responded positively.
- Hide follow-up questions, but only if the user responded negatively.
- Funnel users in Group A to contribute to Map A, and users in Group B to contribute to Map B.
- Ask a follow-up question if the user left a question blank.

## How it works

Conditional logic can be applied to show and hide **whole pages, but not individual field inputs**. This is a deliberate design decision because we believe it promotes a pleasant user experience (avoiding questions that "pop in" and "pop out").

1. Create your page
2. Add content to the page
3. Click the **Conditions** button
4. Apply your conditional logic

