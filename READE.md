# Google Sheets ↔ Google Contacts Synchronization

## Project Overview

This project aims to synchronize contact information between Google Sheets and Google Contacts using Google Apps Script and the Google People API.

## Features

- **Two-Way Synchronization:** Transfer contact information between Google Sheets and Google Contacts.
- **Contact Management:** Manage names and phone numbers.
- **Update Existing Contacts:** Update existing contact details where supported by the script.
- **Duplicate Prevention:** Reduce duplicate contacts through contact matching.
- **Automation:** Simplify contact management and reduce manual data entry.

## Technologies Used

- Google Sheets
- Google Apps Script
- Google Contacts
- Google People API

## Project Structure

```text
google-sheets-google-contacts-sync/
├── Code.gs
└── README.md
```

## Setup Instructions

1. Create a Google Sheet with columns for contact names and phone numbers, matching the source code.
2. Open **Extensions → Apps Script**.
3. Add the code from `Code.gs` to the Apps Script editor.
4. Enable the required Google People API service and configure permissions as required by the script.
5. Save the project and authorize access to your Google account.
6. Run the synchronization functions.
7. Verify the results in both Google Sheets and Google Contacts.

## How to Test

1. Add a test contact to Google Sheets and run the Sheet-to-Contacts synchronization.
2. Check Google Contacts to confirm that the contact was added or updated.
3. Add a test contact in Google Contacts and run the Contacts-to-Sheet synchronization.
4. Check Google Sheets to confirm that the contact information was imported correctly.

## Demo Video

**Demo Link:** https://drive.google.com/file/d/1-k-BZCXMZdgbAOG3FOTzSVX8njHLcuIi/view?usp=sharing.

The demonstration should show both synchronization directions.

## Source Code

The source code is available in this GitHub repository in the `Code.gs` file.

## Author

**Dhaniklal Kumar**
