---
title: Sharing and privacy
nextjs:
  metadata:
    title: Sharing and privacy
    description: Manage who has access to your project, and who can contribute.
---

Manage who has access to your project, and who can contribute to it. {% .lead %}

Projects offer 3 levels of control.
1. **Visibility**: Decide if the *project start page* should be public or not.
2. **Access**: Decide who can continue *beyond the start page* to view subsequent pages.
3. **Contribution**: Decide if the project is currently accepting new responses.

All of these settings are found in the *Publish and share* menu which is found under **Edit Project > Publish**.

## Project visibility

The **project visibility** setting controls if the Start Page is visible to the public or not. The two supported options are:  
- Private (team only)
- Public (anyone with the URL)

The start page is always the first page you see when you navigate to your project URL. As an example, view our [public Demo Project](https://app.mapperoni.com/t/official/p/demo).

**Private (team only)**  
This is the default for all new projects. It prevents users from seeing the Start page unless you have already added them to your team.
- Users who are not logged in will be redirected to the log in screen.
- Users who are logged in, but not a member of your team, will see a message that says "Unauthorized".

**Public (anyone with the URL)**  
This is the recommended setting for most projects. This allows the start page to be indexed by search engines which makes them more easily discoverable. This also allows AI agents and new users to read about your project. Avoid sharing sensitive information (emails, personal information, etc.) on the Start page if it is public.

## Access control
The **access control** setting restricts who can proceed past the start page to view subsequent pages.
It only applies to Public projects. You can imagine this setting is like the "doorman" or "bouncer".

The 3 options for access control are:  
- Anyone (open access)
- Verified email required
- Team members only

**Anyone (open access)**  
Allow everyone who clicks the Start button to continue on to the next page, without any authentication.

**Verified email required**  
Force users to log in to their account, which requires that they have an active and verified email.

**Team members only**  
Force users to log in and requires that they are a member of your team to proceed. If they are not a member they will see a "403 Access forbidden" error.

## Enable contributions

You can prevent users from submitting new responses by disabling contributions. This applies to all the form fields and maps on all pages.

This setting is useful to prevent users from contributing too early (before the project is ready) or too late (after the project has concluded). If you disable contributions, your project is *read-only*-- users can still see existing map data and page content.

## Secret links (coming soon)

Stay tuned for a new feature that allows you to create and destroy unique links for total control over how users access the project.