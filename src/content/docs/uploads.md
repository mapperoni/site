---
title: Photos & files
description: Collect photos and files with survey answers and map features, review them, and manage your team's storage.
---

Add a Photo or File question when you need people to send something along with their answers. {% .lead %}

## Add a question

In the project editor, choose **Insert Form Field**, then **Photo** or **File**. To collect files with a map feature, add the question to the layer's form.

Photo questions accept JPEG, PNG, and WebP images. File questions accept any file type, including PDFs and spreadsheets. Each file can be up to **15 MB**.

Open **Field Settings** and set **Maximum number of uploads** to allow from 1 to 10 files per answer. New questions allow one file by default.

{% next-image src="/images/docs/photo-field-settings.png" width=1122 height=1080 alt="Photo field settings showing Required, Hidden, and a maximum of three uploads" /%}

Turn on **Required** if people must upload at least one file before continuing. You can also use [conditions](/docs/conditional-questions) to show or hide pages based on whether the answer is empty.

Lowering the maximum keeps files in existing answers. People can still edit other answers or remove files, but any new files must fit within the new limit.

## Upload files

Select one or more files and wait for them to upload. Selecting more adds to the answer. Photos show a preview, and each file has its own progress and status.

Use **Cancel** to stop an upload or **Remove** to remove a file. The other files stay in place. If a file fails, remove it before trying again. **Next** and **Save** stay disabled while a file is uploading or a failed file remains.

Survey answers save as people go. In a map feature form, choose **Save** to keep your files. When editing an existing feature, **Cancel** restores the previously saved answer. **Discard** removes a new feature and its uploads.

## View and export files

The **Data** tab shows how many files each answer contains. Open a record to see their names and sizes, download files, or browse photos. Click a photo to open it at full size. Files on map features are also available in feature details when you can view that feature.

[Data exports](/docs/export-data) contain a link to each file in the CSV. The ZIP does not include the files themselves. Download any files you want to keep separately, especially before deleting their answers.

## Who can open files?

- Team members who can read the project can open its saved files, including files in hidden fields.
- People answering the project can open their own uploads while completing their submission. After reaching Conclusion, they can return to those files by reopening their submission in **Editable submission** mode.
- Other people must enter the project and can open files only on map features and fields they can see. A public project does not make survey uploads public.

A copied link does not give someone access. The project's current [access settings](/docs/sharing-and-privacy) still apply. Hiding a field does not take away access to someone's own upload, and deleting an answer makes its files unavailable.

Renaming a project breaks older file links, including links in exports. Export again to get current links.

Photos keep their original metadata, which may include a location. Remove it before uploading if you don't want to share it. Files aren't scanned for malware, so only open files from people you trust.

## Storage

Pro and Custom teams include **1 TB** of upload storage by default, shared across all their projects. Free and Personal teams have no upload storage by default. Your team's overview shows its current allowance, usage, and remaining space. See [Pricing](/docs/pricing).

Any plan can have a custom allowance. Adding Photo or File questions requires a storage allowance greater than 15 MB.

When storage is full, new uploads stop. Existing files remain available to people who can access them. If an unavailable upload question is required, make it optional, hide it, or remove it so people can continue.

To free space, remove files from answers or [delete submissions in Project Data](/docs/manage-data). Deleting a submission removes its survey answers, associated map features, and uploads. Space becomes available after the files have been removed from storage in the background. [Contact us](mailto:support@mapperoni.com) if your team needs a higher limit.
