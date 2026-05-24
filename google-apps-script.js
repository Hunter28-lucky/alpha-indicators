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

    // Add a beautifully formatted header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Full Name",
        "Email Address",
        "Phone Number",
        "Product Name",
        "Amount (₹)",
        "Order ID",
        "Payment Status"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#10b981"); // Beautiful emerald green
      headerRange.setFontColor("white");
      sheet.setFrozenRows(1); // Freeze the header
      
      // Auto-resize columns to fit content nicely
      sheet.autoResizeColumns(1, 8);
    }

    // Support URL-encoded form data (bulletproof for no-cors)
    var data = e.parameter || {};
    
    // Fallback in case of JSON payload
    if (e.postData && e.postData.type === "application/json" && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

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

// Health check endpoint for testing in browser
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Webhook is live!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
