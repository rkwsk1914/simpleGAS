function doPost(t){}function doPostMessages(){}(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}();var e,o="https://docs.google.com/spreadsheets/d/1FbBBgh6SXu11JaeQUHDcQWS6jD1FA0nS5QLwDFKRpn8/edit",n=function(){function t(t,e){this.book=SpreadsheetApp.openByUrl(t),this.sheetName=e,this.sheet=this.book.getSheetByName(e)}return t.prototype.doGetLastRow=function(t,e){if(t||e)return this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()},t.prototype.doGetLastCol=function(t,e){if(t&&e)return this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn()},t.prototype.doWriteSS=function(t,e,o){e&&o&&(t||(t=""),this.sheet.getRange(e,o).setValue(t))},t.prototype.doReadSSVerString=function(t){var e=null;return t?e=this.sheet.getRange(t).getValues():e},t.prototype.doReadSS=function(t){var e=t.row,o=t.col,n=t.endRow,r=t.endCol,s=null,i=this.getAdditionRange({row:e,col:o,endRow:n,endCol:r}),a=this.sheet;return e&&o?n||r?s=a.getRange(e,o,i.rows,i.colums).getValues():(s=a.getRange(e,o,i.rows,i.colums).getValues())[0][0]:s},t.prototype.getAdditionRange=function(t){var e=t.row,o=t.col,n=t.endRow,r=t.endCol,s={rows:1,colums:1};return n&&(s.rows=n-e+1),r&&(s.colums=r-o+1),s},t.prototype.copySheet=function(t){if(t){var e=this.book;this.sheet.copyTo(e).setName(t)}},t.prototype.setPullDown=function(t){var e=t.row,o=t.col,n=t.valueArray,r=t.initValue,s=this.sheet.getRange(e,o),i=SpreadsheetApp.newDataValidation().requireValueInList(n).build();(s.setDataValidation(i),r)&&(n.find((function(t){return t===r}))&&s.setValue(r))},t.prototype.delRow=function(t){var e=t.row,o=t.col,n=t.endRow,r=t.endCol,s=this.getAdditionRange({row:e,col:o,endRow:n,endCol:r});this.sheet.getRange(e,o,s.rows,s.colums).deleteCells(SpreadsheetApp.Dimension.ROWS)},t.prototype.changeCellBackGroundColor=function(t){var e=t.color,o=t.row,n=t.col,r=t.endRow,s=t.endCol,i=this.getAdditionRange({row:o,col:n,endRow:r,endCol:s});this.sheet.getRange(o,n,i.rows,i.colums).setBackground(e)},t.prototype.changeCellBackGroundColorVerString=function(t,e){if(!e)return null;this.sheet.getRange(e).setBackground(t)},t.prototype.addData=function(t){this.sheet.appendRow(t)},t}(),r=function(){function t(t){this.baseUrl=t,this.sgsLog=new n(o,"fetch log")}return t.prototype.doGet=function(t){var e=null!=t?t:this.baseUrl;if(e&&""!==e){this.sgsLog.addData([String(new Date),e]);var o=UrlFetchApp.fetch(e);if(o.getContentText()){var n=JSON.parse(o.getContentText());return this.sgsLog.addData(["",JSON.stringify(n)]),n}return o.getContentText()?void 0:null}},t.prototype.doPost=function(t){var e=t.url,o=t.options,n=null!=e?e:this.baseUrl;if(n&&""!==n){this.sgsLog.addData([String(new Date),n,JSON.stringify(o)]);var r=UrlFetchApp.fetch(n,o);if(r.getContentText()){var s=JSON.parse(r.getContentText());return this.sgsLog.addData(["",JSON.stringify(s)]),s}return r.getContentText()?void 0:null}},t}(),s=(e=function(t,o){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},e(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}),i=new(function(t){function e(){var e=t.call(this)||this,s="https://api.line.me/v2/bot/message";e.urlData={reply:"".concat(s,"/reply"),push:"".concat(s,"/push")};e.sgsGetMessage=new n(o,"getMessage"),e.fetchFunction=new r("");return e.HEADERS={"Content-Type":"application/json; charset=UTF-8",Authorization:"Bearer 789ZfA4Ermtx+Ed8GDoZFdl+/ErjDKrfQ4lrk2Jl2pTa2b/HV92pfcu0YpnGUH09Jnd8lTZMRfqXcaKAYZcI8pSMvZDG/1EWNtE3pxt4sS0YXSnAKguGERg0AH2UZ7xrQ/g623wxMAlSMZb31LqnAgdB04t89/1O/w1cDnyilFU="},e}return s(e,t),e.prototype.reply=function(t,e){var o=JSON.parse(t.postData.contents),n=o.events[0],r={replyToken:n.replyToken,messages:e},s={method:"POST",headers:this.HEADERS,payload:JSON.stringify(r)};this.sgsGetMessage.addData([new Date,n.replyToken,JSON.stringify(o)]),this.sgsGetMessage.addData([this.urlData.reply,JSON.stringify(s)]),this.fetchFunction.doPost({url:this.urlData.reply,options:s})},e.prototype.post=function(t,e){var o={to:t,messages:e},n={method:"POST",headers:this.HEADERS,payload:JSON.stringify(o)};this.fetchFunction.doPost({url:this.urlData.push,options:n})},e}((function(){})));t.g.doPost=function(t){i.reply(t,[{type:"text",text:"LINE APP GASから返信"}])},t.g.doPostMessages=function(){i.post("Ua20dc44c3f92c4475da1e28de064512a",[{type:"text",text:"LINE APP GASから返信 POST"}])}})();