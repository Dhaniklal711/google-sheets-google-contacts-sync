const SHEET_ID = '1dgZ95MPm2izzz4KkHnVjPKDcEHlTNLktLJFdmyeY7ZQ';
const TAB_NAME = 'Contacts';

function syncContacts() {
  const sheet = SpreadsheetApp.openById(SHEET_ID)
    .getSheetByName(TAB_NAME);

  if (!sheet) throw new Error('Create a tab named Contacts.');
  const values = sheet.getDataRange().getDisplayValues();
  const contacts = getAllContacts();
  const byId = new Map(contacts.map(c => [c.resourceName, c]));
  const byPhone = new Map();

  contacts.forEach(c => {
    (c.phoneNumbers || []).forEach(p => {
      const key = normalizePhone(p.value);
      if (key && !byPhone.has(key)) byPhone.set(key, c);
    });
  });

  
  // Import new contacts and update existing contacts from Google Contacts.
  const rowById = new Map();

  values.slice(1).forEach((row, i) => {
    if (row[0]) rowById.set(row[0], i + 2);
  });

  contacts.forEach(c => {
    const name = getName(c);
    const phone = getPhone(c);
    const id = c.resourceName;

    if (!name && !phone) return;

    if (rowById.has(id)) {
      // Update the existing row when a contact changes.
      const rowNumber = rowById.get(id);
      const oldRow = sheet.getRange(rowNumber, 1, 1, 4).getValues()[0];

      sheet.getRange(rowNumber, 1, 1, 4).setValues([[
        id,
        name || oldRow[1],
        phone || oldRow[2],
        new Date()
      ]]);
    } else {
      // Add a new contact to the sheet.
      sheet.appendRow([id, name, phone, new Date()]);
      rowById.set(id, sheet.getLastRow());
    }
  });


  // Create contacts for new rows and update existing ones.
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const rows = sheet.getRange(2, 1, lastRow - 1, 4)
    .getDisplayValues();

  rows.forEach((r, i) => {
    let [id, name, phone] = r;
    name = name.trim();
    phone = phone.trim();

    if (!name || !phone) return;

    let contact = id ? byId.get(id) : null;

    // Match an existing contact by phone to reduce duplicates.
    if (!contact) {
      contact = byPhone.get(normalizePhone(phone));
    }

    if (contact) {
      const currentName = getName(contact);
      const currentPhone = getPhone(contact);

      if (currentName !== name || normalizePhone(currentPhone) !== normalizePhone(phone)) {
        const person = People.People.get(contact.resourceName, {
          personFields: 'names,phoneNumbers,metadata'
        });

        person.names = [{
          givenName: name,
          displayName: name
        }];
        person.phoneNumbers = [{ value: phone }];

People.People.updateContact(
  person,
  person.resourceName,
  { updatePersonFields: 'names,phoneNumbers' }
);
      }

      id = contact.resourceName;
    } else {
      const created = People.People.createContact({
        names: [{ givenName: name, displayName: name }],
        phoneNumbers: [{ value: phone }]
      });

      id = created.resourceName;
      byId.set(id, created);
      byPhone.set(normalizePhone(phone), created);
    }

    sheet.getRange(i + 2, 1).setValue(id);
    sheet.getRange(i + 2, 4).setValue(new Date());
  });
}

function getAllContacts() {
  const all = [];
  let pageToken;

  do {
    const options = {
      pageSize: 1000,
      personFields: 'names,phoneNumbers,metadata'
    };
    if (pageToken) options.pageToken = pageToken;

    const result = People.People.Connections.list(
      'people/me', options
    );

    (result.connections || []).forEach(c => all.push(c));
    pageToken = result.nextPageToken;
  } while (pageToken);

  return all;
}

function getName(c) {
  return c.names && c.names.length
    ? (c.names[0].displayName || c.names[0].givenName || '')
    : '';
}

function getPhone(c) {
  return c.phoneNumbers && c.phoneNumbers.length
    ? c.phoneNumbers[0].value || ''
    : '';
}

function normalizePhone(phone) {
  return String(phone || '').replace(/[^\d+]/g, '');
}

function installSync() {
  // Avoid creating duplicate timers.
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncContacts')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('syncContacts')
    .timeBased()
    .everyMinutes(5)
    .create();
}


