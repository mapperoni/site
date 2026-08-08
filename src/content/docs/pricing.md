---
title: Pricing
nextjs:
  metadata:
    title: Pricing
    description: Free to start, affordable to grow.
---

Start for free. Paid plans are billed monthly. {% .lead %}

{% pricing-tiers %}

{% pricing-tier name="Free" price="€0" features=["3 projects", "100 monthly participants", "1 team member"] /%}

{% pricing-tier name="Personal" price="€12" features=["Unlimited projects", "All features and settings", "500 monthly participants", "1 team member"] /%}

{% pricing-tier name="Pro" price="€120" features=["Unlimited projects", "All features and settings", "5,000 monthly participants", "Up to 25 team members"] highlight=true /%}

{% pricing-tier name="Custom" features=["Higher usage limits", "Custom website domains", "Self-hosting and enterprise deploys", "Custom branding", "Feature requests and integrations", "Advanced support"] href="mailto:support@mapperoni.com" cta="Contact us" /%}

{% /pricing-tiers %}
Participants are counted across all projects in a team each month. Team members do not count toward this limit.
