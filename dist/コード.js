function registerEvents() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("スケジュール");
  var data = sheet.getDataRange().getValues();

  var calendar = CalendarApp.getCalendarById("gettodowithallhaste9@gmail.com");

  // 1行目をヘッダーとしてスキップし、2行目以降を処理
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    var subject = row[0];
    var startDate = new Date(row[1]);
    var endDate = new Date(row[2]);
    var startTime = row[3] ? new Date("1970-01-01T" + row[3] + "Z") : null;
    var endTime = row[4] ? new Date("1970-01-01T" + row[4] + "Z") : null;
    var allDayEvent = row[5] === "TRUE";
    var location = row[6];
    var description = row[7];
    var feeLocal = row[8];
    var feeZoom = row[9];

    // 開始日時と終了日時を組み合わせる
    var startDateTime = combineDateAndTime(startDate, startTime);
    var endDateTime = combineDateAndTime(endDate, endTime);

    // 終了時刻が開始時刻より前の場合、終了日を1日進める
    if (!allDayEvent && startDateTime >= endDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    if (allDayEvent) {
      //calendar.createAllDayEvent(subject, startDate, {
      //  description: description + "\n参加費（現地）: " + feeLocal + "\n参加費（zoom）: " + feeZoom,
      //  location: location
      //});
    } else {
      console.log(subject, {startDateTime, endDateTime})
      calendar.createEvent(subject, startDateTime, endDateTime, {
        description: description + "\n参加費（現地）: " + feeLocal + "\n参加費（zoom）: " + feeZoom,
        location: location
      });
    }
  }
}

// 日付と時刻を組み合わせるヘルパー関数
function combineDateAndTime(date, time) {
  if (!time) return date;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
}
