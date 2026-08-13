/**
 * GK_Gumus Google Sheets to Firebase Firestore Sync Script
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor and paste this code.
 * 4. In Apps Script, click the gear icon (Project Settings) on the left menu.
 * 5. Check "Show 'appsscript.json' manifest file in editor".
 * 6. Go back to the editor (<> icon), open "appsscript.json", and replace its contents with the manifest at the bottom of this file.
 * 7. Click "Save" (disk icon).
 * 8. Refresh your Google Sheet. You will see a new menu item "GK Gümüş" on the top bar!
 * 9. Click "GK Gümüş" -> "Web Sitesini Güncelle" to sync your sheet with Firestore.
 */

// Replace this with your actual Firebase Project ID
const FIREBASE_PROJECT_ID = "gkgumus"; 

/**
 * Creates a custom menu in the Google Sheets UI.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('GK Gümüş')
    .addItem('Web Sitesini Güncelle (Sync)', 'syncToFirestore')
    .addToUi();
}

/**
 * Main function to sync Sheet data to Firestore.
 */
function syncToFirestore() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  try {
    // 1. Fetch Ayarlar (Settings)
    const settingsData = getSettingsData(sheet.getSheetByName("Ayarlar"));
    
    // 2. Fetch Notlar (Notes/Texts)
    const notesData = getNotesData(sheet.getSheetByName("Notlar"));
    
    // 3. Fetch Urunler (Products)
    const productsData = getProductsData(sheet.getSheetByName("Urunler"));
    
    // 4. Send to Firestore via REST API
    writeDocumentToFirestore("settings", "data", settingsData);
    writeDocumentToFirestore("notes", "data", notesData);
    writeDocumentToFirestore("products", "data", { list: productsData });
    
    ui.alert('Başarılı!', 'Web sitenizin verileri başarıyla Firebase Firestore ile eşitlendi. Değişiklikler canlı sitede anında görüntülenecektir!', ui.ButtonSet.OK);
  } catch (error) {
    Logger.log(error);
    ui.alert('Hata Oluştu!', 'Eşitleme sırasında bir hata meydana geldi: ' + error.toString(), ui.ButtonSet.OK);
  }
}

/**
 * Reads "Ayarlar" sheet and returns a flat key-value object.
 */
function getSettingsData(sheet) {
  if (!sheet) throw new Error("'Ayarlar' sayfası bulunamadı!");
  
  const data = {};
  const rows = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const key = String(rows[i][0]).trim();
    const value = rows[i][1];
    if (key) {
      data[key] = value;
    }
  }
  return data;
}

/**
 * Reads "Notlar" sheet and returns a key-value object of notes.
 */
function getNotesData(sheet) {
  if (!sheet) throw new Error("'Notlar' sayfası bulunamadı!");
  
  const data = {};
  const rows = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const key = String(rows[i][0]).trim();
    const title = String(rows[i][1]).trim();
    const content = String(rows[i][2]).trim();
    if (key) {
      data[key] = {
        title: title,
        content: content
      };
    }
  }
  return data;
}

/**
 * Reads "Urunler" sheet and returns an array of product objects.
 */
function getProductsData(sheet) {
  if (!sheet) throw new Error("'Urunler' sayfası bulunamadı!");
  
  const products = [];
  const rows = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const id = String(rows[i][0]).trim();
    const category = String(rows[i][1]).trim();
    const name = String(rows[i][2]).trim();
    const description = String(rows[i][3]).trim();
    const imageUrl = String(rows[i][4]).trim();
    const price = String(rows[i][5]).trim();
    const order = Number(rows[i][6]) || 999;
    const location = String(rows[i][7]).trim();
    const isActive = String(rows[i][8]).trim().toLowerCase();
    
    // Check if product is active and has valid ID and Name
    if (id && name && (isActive === "evet" || isActive === "yes" || isActive === "true")) {
      products.push({
        id: id,
        category: category || "Genel",
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: price,
        order: order,
        location: location || "Anasayfa"
      });
    }
  }
  
  // Sort products by "order" ascending
  products.sort((a, b) => a.order - b.order);
  return products;
}

/**
 * Helper to convert JS value to Firestore REST Value format.
 */
function toFirestoreValue(val) {
  if (typeof val === 'string') {
    return { stringValue: val };
  } else if (typeof val === 'number') {
    return { doubleValue: val };
  } else if (typeof val === 'boolean') {
    return { booleanValue: val };
  } else if (val === null || val === undefined) {
    return { nullValue: null };
  } else if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  } else if (typeof val === 'object') {
    const mapFields = {};
    for (let k in val) {
      mapFields[k] = toFirestoreValue(val[k]);
    }
    return { mapValue: { fields: mapFields } };
  }
  return { stringValue: String(val) };
}

/**
 * Sends data to Firestore REST endpoint using the active user's OAuth token.
 */
function writeDocumentToFirestore(collection, documentId, data) {
  const fields = {};
  for (let k in data) {
    fields[k] = toFirestoreValue(data[k]);
  }
  
  const payload = JSON.stringify({ fields: fields });
  const token = ScriptApp.getOAuthToken();
  
  const url = "https://firestore.googleapis.com/v1/projects/" + FIREBASE_PROJECT_ID + "/databases/(default)/documents/" + collection + "/" + documentId;
  
  const options = {
    method: "patch", // PATCH will create or overwrite the document
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + token
    },
    payload: payload,
    muteHttpExceptions: false
  };
  
  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() !== 200) {
    throw new Error("Firestore yazma hatası: " + response.getContentText());
  }
}

/**
 * --- COPY AND PASTE THIS INTO appsscript.json ---
 * 
{
  "timeZone": "Europe/Istanbul",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/datastore"
  ]
}
 * 
 */
