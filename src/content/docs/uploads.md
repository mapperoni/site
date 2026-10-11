---
title: Photos & files
description: Collect photos and files with survey answers and map features, review them, and manage your team's storage.
---

Add a Photo or File question so your respondents can add attachments to their map data and survey responses. {% .lead %}

## Add a question

Photo and File uploads are available to teams on the Pro and Custom plans only.

In the project editor, choose **Insert Form Field**, then **Photo** or **File**. To collect attachments and associate them with a map feature, add the question to the map layer's form (found in the [Map Editor](/docs/maps)).

Photo questions accept JPEG, PNG, and WebP images. File questions accept most file types, including PDFs and spreadsheets. Each file can be up to **15 MB**.

{% callout type="warning" title="Take care when opening uploaded files" %}
We don't scan uploaded files for malware. Don't assume a file is safe because it was uploaded to Mapperoni. Only open files from sources you trust.
{% /callout %}

Open **Field Settings** and set **Maximum number of uploads** to allow from 1 to 10 files per answer. The default is 1 upload per answer.

{% next-image src="/images/docs/photo-field-settings.png" width=1122 height=1080 alt="Photo field settings showing Required, Hidden, and a maximum of three uploads" /%}

Turn on **Required** if people must upload at least one file before continuing. You can also use [conditions](/docs/conditional-questions) to show or hide pages based on whether the answer is empty.

Lowering the maximum keeps files in existing answers. People can still edit other answers or remove files, but any new files must fit within the new limit.

## How uploading works

In a survey form, the respondent's uploads are saved immediately, even if they abandon the project. In a map feature form, the user must click **Save** to keep their files. New File uploads can be downloaded after saving and reopening the feature details.

## View and export files

As a project manager, you can see how many files each answer contains in the **Data** tab. Open a record by clicking it; the expanded details will show you file names, file sizes, and photo previews.

[Data exports](/docs/export-data) contain a link to each file in the CSV. The ZIP does not include the files themselves (full data export is on our roadmap, coming soon!). Download any files you want to keep separately, especially before deleting their answers.

## Who can open files?

- **Files on map features are private**, even when the feature is on a public layer. Team members who can read the project can download them in the **Project Map Editor** or **Project Data dashboard**, including files in hidden fields. Respondents can download their own saved files when editing that feature's details. In read-only feature details, other map visitors see each visible File question and its upload count, including zero. They cannot see filenames, file sizes, or download links. Hidden questions stay hidden.
- **Photos on map features** follow the map's visibility settings. People who have entered the project can view photos on features and fields visible to them. An image uploaded through a **File** question follows the private File rules, even if it is a PNG or JPEG.
- **Survey uploads** are available to project team members and the respondent who submitted them; entering a public project does not expose someone else's survey files.

Respondent access requires a valid project cookie and the project's current access permissions. Map File downloads also require permission to edit the feature: hiding its field or layer, or disabling contributions, removes that access. After reaching Conclusion, respondents can return to their files by reopening their submission in [Editable contribution mode](/docs/sharing-and-privacy).

Files are stored privately and served through Mapperoni after checking access on every request. Raw storage URLs are not exposed. Sharing a download link does not grant access: the recipient must have their own authorized team session or project cookie.

Renaming a project breaks older file links, including links in exports. Export again to get current links.

Photos keep their original metadata, which may include a location. Remove it before uploading if you don't want to share it.

## Moderation and safety

To delete a file or photo, you can delete the parent submission using the [Project Data dashboard](/docs/manage-data).

{% callout type="warning" title="You are responsible for moderating uploaded files" %}
Uploaded files and photos must not violate our [Acceptable Use Policy](/acceptable-use). Project creators are responsible for moderation and prompt deletion of data that violates this policy. Any delay or refusal may result in automatic deletion of the submission or the parent project.
{% /callout %}

## Storage

Teams on the Pro and Custom plans receive **1 TB** of upload storage by default, shared across all their projects. Free and Personal teams have no upload storage by default. Your team's overview shows its current allowance, usage, and remaining space. See [Pricing](/docs/pricing).

When storage is full, new uploads are blocked immediately. Existing files remain available to people who can access them. Contact us and we can customize your plan to increase this limit.

To free space, remove files from answers or [delete submissions in Project Data](/docs/manage-data). Deleting a submission removes its survey answers, associated map features, and uploads. You can also delete individual features and their attachments using the Map Editor. Space becomes available after the files have been removed from storage, which may take a few minutes.
