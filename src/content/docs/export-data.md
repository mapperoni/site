---
title: Export data
nextjs:
  metadata:
    title: Export data
    description: Download your project's responses and map data.
---

Download your project's responses and map data as CSV files whenever you need them. {% .lead %}

## Export a project

Open your project in the editor and choose the **Data** tab. Click **Export Data** to download a ZIP file.

You need access to the project through its team to export its data.

## What's included

The ZIP file contains:

- `form_responses.csv` with one row for each submission, its status and dates, and its form answers.
- One CSV file for each map layer, with every pin's coordinates, GeoJSON, and field values.
- `field_legend.csv`, which explains the field columns in the other files.

You can open CSV files in a spreadsheet application, or import them into your own analysis tools. Map-layer CSV files include both latitude and longitude for simple mapping, plus GeoJSON for tools that support it.
