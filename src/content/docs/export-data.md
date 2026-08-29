---
title: Export data
description: Export responses and map data from your Mapperoni project for use in spreadsheets and GIS software.
---

Download your project's responses and map data as CSV files whenever you need them. {% .lead %}

## Export a project

Open your project and choose the **Data** tab. The overview summarizes submissions and shows the number of features collected in each map layer.

{% next-image src="/images/docs/project-data-overview.png" width=2048 height=1536 alt="Project Data overview showing submission totals, map layers, and the Export All Data button" /%}

Click **Export All Data** to download a ZIP file.

You need access to the project through its team to export its data.

Each download is a snapshot of the project at that moment. Export the project again when you need newer responses or map features.

## What's included

The ZIP file contains:

- `form_responses.csv` with one row for each survey submission. It includes the submission status, start and completion times, attempt counts, and answers to non-map form fields.
- One `map_layer_[layer ID].csv` file for each map layer. Each row represents one point, line, or polygon and includes its feature ID, geometry, and answers to the layer's fields.
- `field_legend.csv`, which identifies the page or map layer associated with every question column in the other files. This is especially useful when fields have similar names.

Empty answers are exported as blank cells. Dates and times use an international ISO 8601 format. Multiple selections are written into one cell separated by ` | `.

## Connect survey and map data

The `submission_id` column appears in both `form_responses.csv` and every map-layer CSV. Use it to connect a respondent's non-map survey answers to all map features created as part of the same submission.

Each map-layer CSV also includes:

- `feature_id`, a unique identifier for the individual map feature.
- `latitude` and `longitude` for point features. These cells are blank for lines and polygons.
- `geometry_geojson`, containing the complete point, line, or polygon geometry as GeoJSON.
- `layer_id` and `feature_class_id`, which identify the layer configuration.

## Ways to use an export

- Open `form_responses.csv` in Excel, LibreOffice Calc, or Google Sheets to filter responses, calculate totals, create charts, or clean data for reporting.
- Import a point-layer CSV into QGIS or another GIS application using `longitude` as the X coordinate and `latitude` as the Y coordinate.
- Use `geometry_geojson` when working with line or polygon layers, or when a GIS or data-processing tool needs the complete geometry.
- Join a map-layer CSV to `form_responses.csv` using `submission_id` when you need respondent-level answers alongside mapped features.
- Use `field_legend.csv` to interpret columns when preparing a repeatable analysis or sharing the export with someone who did not build the survey.

Exports can contain personal or sensitive information collected by your project. Store and share the ZIP and extracted CSV files according to your organization's privacy and retention requirements.
