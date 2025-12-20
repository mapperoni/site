---
title: Pricing
nextjs:
  metadata:
    title: Pricing
    description: Free to start, affordable to grow.
---

Start for free. All plans are billed monthly. Ask for a special discount if you are a student, or collecting data for a good cause! {% .lead %}

{% pricing-tiers %}

{% pricing-tier name="Free" price="$0" features=["3 projects", "1,000 monthly form field submissions", "200 monthly map views", "1 team member", "❌ No map search, analytics, or data export."] highlight=true /%}

{% pricing-tier name="Personal" price="$12" features=["Unlimited projects", "3,000 monthly form field submissions", "1,000 monthly map views", "1 team member", "✅ Data export (CSV, GeoJSON)", "❌ No map search or analytics."] /%}

{% pricing-tier name="Pro" price="$250" features=["Unlimited projects & form submissions", "20,000 monthly map views", "Unlimited team members", "✅ 1,000 map search sessions", "✅ Analytics summaries", "✅ Team subdomain (myteam.mapperoni.com)", "✅ Custom domain per project (my-project.com)"] /%}

{% pricing-tier name="Custom & Enterprise" price="$899+" features=["Full deployment on the infrastructure of your choice", "Maximize data privacy and control", "Fully re-branded and white-labeled", "Customized to meet your unique needs"] /%}

{% /pricing-tiers %}
Views, responses, and sessions are counted as the sum across all projects in your team. Overages are billed at the rates described below.

## Usage-based billing

If you exceed the generous allocation included with your plan, you will be billed for overages at the end of the month. This is to cover the costs of certain services that we rely on.

| Item | Price per 1,000 | Definition |
| --- | --- | --- |
| Extra map views | $5 | A new map view occurs every time a page loads containing a map, including every time a user refreshes the page. |
| Extra map search sessions | $12 | A map search session starts when the map search box is used, and lasts until the user is inactive for 2 minutes. Max 50 queries per session. |

Overages are billed in blocks of 1,000 units. Here are some examples:

- **Example 1:** A team with a Personal plan receives exactly 1,000 map views during the month across all projects → They are within the free allocation and are not billed extra.
- **Example 2:** A team with a Personal plan receives 1,001 map views → They are billed $5 extra.
## Account restrictions

Each user may only create or be a member of one Free Team or one Personal Team. If you create multiple Free or Personal teams, the projects cannot be published until the team is upgraded.

You may create unlimited Pro teams, or be invited as a member to unlimited teams.

If you have the "owner" role on a Pro team and the Pro subscription expires, your project will not be deleted, but data export will be disabled.