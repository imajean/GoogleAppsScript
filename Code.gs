//@kamijean

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Transform to JSON",
    functionName : "transform"
  }];
  spreadsheet.addMenu("Localization as JSON", entries);
};

function transform() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var dataRange = sheet.getDataRange();
  var rowValues = dataRange.getValues();
  var numRows = dataRange.getNumRows();
  var numCols = dataRange.getNumColumns();
  var labels = rowValues[0];
  var json = {};
  for (var i = 1; i < numRows; i++) {
    
    if (!rowValues[i][0]) {
      continue;
    }
    
    var name = rowValues[i][0];
    json[name] = {};
    
    for (var j = 1; j < numCols; j++) {
      
      var lang = labels[j].toLowerCase();
      json[name][lang] = rowValues[i][j];
      
    }
    
  }
  var prettyJSON = JSON.stringify(json, null, '\t');
  prettyJSON = prettyJSON.substring(2, prettyJSON.length-2);
  Logger.log(prettyJSON);
  showTransformed(prettyJSON);
};

function showTransformed(JSONObject) {
  var htmlApp = HtmlService
     .createHtmlOutput('<pre>' + JSONObject + '</pre>')
     .setTitle('Just select all + copy + paste :)')
     .setWidth(800)
     .setHeight(500);

 SpreadsheetApp.getActiveSpreadsheet().show(htmlApp);
};
