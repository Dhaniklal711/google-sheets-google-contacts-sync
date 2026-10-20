# google-sheets-google-contacts-sync
A Google Apps Script project that synchronizes contact information between Google Sheets and Google Contacts. It automates contact management, reduces manual data entry, and helps maintain consistent records across both platforms.



Google Sheets ↔ Google Contacts Synchronization
1. Approach
I developed a two-way synchronization solution between Google Sheets and Google Contacts using Google Apps Script and Google APIs. The objective is to keep contact information consistent across both platforms.
The solution supports:
Google Sheets → Google Contacts: New or updated contacts in the spreadsheet are synchronized with Google Contacts.
Google Contacts → Google Sheets: Contact information from Google Contacts is imported into the spreadsheet.
Duplicate Handling: Existing contacts are matched using unique identifiers or email addresses where available to minimize duplicate entries.
Data Consistency: Contact fields such as name, email address, phone number, and organization are synchronized.
2. Setup Instructions
Create a Google Sheet with columns for  Contact ID, Name,  Contact Number, and Last Synced.
Open Extensions → Apps Script in Google Sheets.
Add the synchronization source code to the Apps Script editor.
Configure the required Google permissions and authorize access to the spreadsheet and contacts.
Save the script and run the synchronization functions.
Test both synchronization directions using sample contacts.
Verify that contact details are correctly transferred and duplicates are handled appropriately.
3. Source Code
GitHub Repository: [Insert your GitHub repository link here]
The repository contains the source code, configuration instructions, and documentation required to set up and run the synchronization solution.
4. Demo Video
Demo Video Link: [Insert your Loom or screen recording link here]
The demonstration covers the following scenarios:
Google Sheets → Google Contacts: Add a contact to Google Sheets, run the synchronization, and verify that the contact appears in Google Contacts.
Google Contacts → Google Sheets: Add or update a contact in Google Contacts, run the synchronization, and verify that the details appear correctly in Google Sheets.
5. Conclusion
This project demonstrates a two-way contact synchronization workflow that reduces manual data entry and helps maintain consistent contact information across Google Sheets and Google Contacts. The implementation can be extended with automatic triggers, error handling, and additional duplicate-detection rules.

