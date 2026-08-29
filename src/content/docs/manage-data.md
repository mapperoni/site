---
title: Manage data
description: Review survey responses and inspect or delete map features collected through your Mapperoni project.
---

Use the Data tab to review and manage the responses collected through your project. {% .lead %}

## Survey responses and map features

Mapperoni keeps survey responses and map features separate because they represent different kinds of data:

- A **survey response** contains the answers a respondent entered into regular form fields that are not attached to a map. It represents one respondent's submission, even if they left and later continued it.
- A **map feature** is one point, line, or polygon added to a map layer. It includes the feature's location or shape and the answers entered into that layer's fields.

One survey response can be associated with no map features, one map feature, or several map features across different layers. For example, one respondent could answer contact questions once and then mark three separate damaged streetlights on a map. Mapperoni shows one entry under **Survey Responses** and three entries under the relevant streetlight layer.

Survey Responses can be **Completed** or **Incomplete**. A completed response reached the project's Conclusion page. An incomplete response may still be in progress, or the respondent may have left before finishing.

## Browse collected data

Open your project and choose the **Data** tab.

- Select **Survey Responses** to review non-map form answers, submission status, start and completion times, and the number of associated map features.
- Select a map layer to review the individual features collected for that layer. Each feature appears as its own row with the answers to that layer's fields.

You can sort records from newest to oldest or oldest to newest, filter them by date, and use **Refresh** to load newly submitted data. Survey Responses are filtered by their started date, while layer features are filtered by the date each feature was created. Use the eye button beside a record to see its details.

{% next-image src="/images/docs/project-data-layer.png" width=2048 height=1536 alt="Project Data table showing the records collected for a map layer" /%}

## Inspect a map feature

Feature details include the submitted answers, creation time, feature ID, and geometry type. Point features also display latitude and longitude that you can copy or open in Google Maps, Apple Maps, or OpenStreetMap. Coordinate links are not shown for lines or polygons; use a [data export](/docs/export-data) when you need their complete geometry.

{% next-image src="/images/docs/project-data-feature-details.png" width=2048 height=1536 alt="Feature details showing submitted answers, metadata, coordinates, map links, and the delete action" /%}

## Delete data

Deletion is permanent and cannot be undone. If you may need the data later, [export the project](/docs/export-data) before deleting it.

### Delete a survey response

Deleting a survey response removes:

- Its non-map survey answers.
- Every map feature associated with that submission, across all layers.
- The answers attached to those map features.

The confirmation screen shows how many associated map features will also be removed. Historical attempt counts used by the project overview are retained, so the **Total submission attempts** and **Completed submission attempts** figures may not decrease after deletion.

### Delete a map feature

Deleting a map feature removes only that point, line, or polygon and the answers attached to it. It does not delete the associated survey response or any other map features from the same submission.

Select **Delete feature** from the feature details screen and check that you selected the intended feature before confirming.

Owners, managers, and editors can delete project data. Viewers can review data but cannot delete it.
