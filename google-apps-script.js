// ============================================================
// PASTE THIS ENTIRE SCRIPT INTO GOOGLE APPS SCRIPT
// Steps:
// 1. Open your Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete all existing code and paste this
// 4. Click Save, then Deploy → New deployment
// 5. Type: Web app | Execute as: Me | Who has access: Anyone
// 6. Click Deploy and copy the Web App URL
// 7. Add that URL to your .env as: VITE_SHEETS_WEBHOOK_URL=<your-url>
// ============================================================

const SHEET_ID = "1zOSrhjcaVdeqNFbe3zK5qL5MPTaAjyKyoGiHpDCwchk";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Phone",
        "Product",
        "Amount (₹)",
        "Order ID",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.product || "",
      data.amount || "",
      data.orderId || "",
      data.status || "pending"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
