function test(){}function doPost(t){}function doPostMessages(){}function doPostAnnounceBalances(){}(()=>{var t={599:(t,e,n)=>{function a(t){if((t=t||{}).negativeType=t.negativeType||("R"===t.negative?"right":"left"),"string"!=typeof t.negativeLeftSymbol)switch(t.negativeType){case"left":t.negativeLeftSymbol="-";break;case"brackets":t.negativeLeftSymbol="(";break;default:t.negativeLeftSymbol=""}if("string"!=typeof t.negativeRightSymbol)switch(t.negativeType){case"right":t.negativeRightSymbol="-";break;case"brackets":t.negativeRightSymbol=")";break;default:t.negativeRightSymbol=""}function e(e,n){if(n=n||{},!e&&0!==e)return"";var a=[],r="-"===(e=""+e).charAt(0);return e=e.replace(/^\-/g,""),t.negativeLeftOut||n.noUnits||a.push(t.prefix),r&&a.push(t.negativeLeftSymbol),t.negativeLeftOut&&!n.noUnits&&a.push(t.prefix),e=e.split("."),null!=t.round&&function(t,e){if(t[1]&&e>=0&&t[1].length>e){var n=t[1].slice(0,e);if(+t[1].substr(e,1)>=5){for(var a="";"0"===n.charAt(0);)a+="0",n=n.substr(1);(n=a+(n=+n+1+"")).length>e&&(t[0]=+t[0]+ +n.charAt(0)+"",n=n.substring(1))}t[1]=n}}(e,t.round),null!=t.truncate&&(e[1]=function(t,e){t&&(t+="");return t&&t.length>e?t.substr(0,e):t}(e[1],t.truncate)),t.padLeft>0&&(e[0]=function(t,e){t+="";var n=[];for(;n.length+t.length<e;)n.push("0");return n.join("")+t}(e[0],t.padLeft)),t.padRight>0&&(e[1]=function(t,e){t?t+="":t="";var n=[];for(;n.length+t.length<e;)n.push("0");return t+n.join("")}(e[1],t.padRight)),!n.noSeparator&&e[1]&&(e[1]=function(t,e){if(t+="",!e)return t;var n=/(\d{3})(\d+)/;for(;n.test(t);)t=t.replace(n,"$1"+e+"$2");return t}(e[1],t.decimalsSeparator)),!n.noSeparator&&e[0]&&(e[0]=function(t,e){if(t+="",!e)return t;var n=/(\d+)(\d{3})/;for(;n.test(t);)t=t.replace(n,"$1"+e+"$2");return t}(e[0],t.integerSeparator)),a.push(e[0]),e[1]&&(a.push(t.decimal),a.push(e[1])),t.negativeRightOut&&!n.noUnits&&a.push(t.suffix),r&&a.push(t.negativeRightSymbol),t.negativeRightOut||n.noUnits||a.push(t.suffix),a.join("")}function n(e,n){n=n||[],t.allowedSeparators&&t.allowedSeparators.forEach((function(t){n.push(t)})),n.push(t.integerSeparator),n.push(t.decimalsSeparator);var a=e=(e=e.replace(t.prefix,"")).replace(t.suffix,"");do{e=a;for(var r=0;r<n.length;r++)a=a.replace(n[r],"")}while(a!=e);return e}return"boolean"!=typeof t.negativeLeftOut&&(t.negativeLeftOut=!1!==t.negativeOut),"boolean"!=typeof t.negativeRightOut&&(t.negativeRightOut=!1!==t.negativeOut),t.prefix=t.prefix||"",t.suffix=t.suffix||"","string"!=typeof t.integerSeparator&&(t.integerSeparator="string"==typeof t.separator?t.separator:","),t.decimalsSeparator="string"==typeof t.decimalsSeparator?t.decimalsSeparator:"",t.decimal=t.decimal||".",t.padLeft=t.padLeft||-1,t.padRight=t.padRight||-1,e.negative=t.negative,e.negativeOut=t.negativeOut,e.negativeType=t.negativeType,e.negativeLeftOut=t.negativeLeftOut,e.negativeLeftSymbol=t.negativeLeftSymbol,e.negativeRightOut=t.negativeRightOut,e.negativeRightSymbol=t.negativeRightSymbol,e.prefix=t.prefix,e.suffix=t.suffix,e.separate=t.separate,e.integerSeparator=t.integerSeparator,e.decimalsSeparator=t.decimalsSeparator,e.decimal=t.decimal,e.padLeft=t.padLeft,e.padRight=t.padRight,e.truncate=t.truncate,e.round=t.round,e.unformat=n,e}t.exports=a,t.exports.default=a}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t="U314639443c254640f3d44313e524080a",e={successAddPay:{type:"text",text:"支出に追加しました。"},failedAddPay:{type:"text",text:"支出の追加に失敗しました。\n数字で入力ください。"}},a="https://docs.google.com/spreadsheets/d/1jX5alq9OvY_wykZID51iWf11ewd3impyJ8vyJRA41AY/edit",r=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX","CY","CZ"],o=function(){function t(t,e){this.book=SpreadsheetApp.openByUrl(t),this.sheetName=e,this.sheet=this.book.getSheetByName(e)}return t.prototype._isBlankRow=function(t){var e=!0;return t.forEach((function(t){""!==t&&(e=!1)})),e},t.prototype._blankRowDel=function(t){var e=this;return t?t.filter((function(t){return!e._isBlankRow(t)})):null},t.prototype._blankColDel=function(t){return t?t.filter((function(t){return""!==t})):null},t.prototype.doGetLastRow=function(t,e){if(!(t<1&&e<1)){var n=r[e-1];return this.doReadSSVerString("".concat(n).concat(t,":").concat(n,"1000")).length<2?t+1:this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()+1}},t.prototype.doGetLastCol=function(t,e){if(!(t<1&&e<1)){var n=r[e-1],a=r[r.length-1],o=this.doReadSSVerString("".concat(n).concat(t,":").concat(a).concat(t));return this._blankColDel(o[0]).length<2?e+1:this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn()+1}},t.prototype.doWriteSS=function(t,e,n){e&&n&&(t||(t=""),this.sheet.getRange(e,n).setValue(t))},t.prototype.doReadSSVerString=function(t,e){void 0===e&&(e=!1);var n=null;return t?(n=this.sheet.getRange(t).getValues(),e?n:this._blankRowDel(n)):n},t.prototype.doReadSS=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=t.hasBlank,i=void 0!==o&&o,s=null,u=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r}),c=this.sheet;return e&&n?a||r?(s=c.getRange(e,n,u.rows,u.colums).getValues(),i?s:this._blankRowDel(s)):(s=c.getRange(e,n,u.rows,u.colums).getValues())[0][0]:s},t.prototype.getAdditionRange=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o={rows:1,colums:1};return a&&(o.rows=a-e+1),r&&(o.colums=r-n+1),o},t.prototype.copySheet=function(t){if(t){var e=this.book;this.sheet.copyTo(e).setName(t)}},t.prototype.setPullDown=function(t){var e=t.row,n=t.col,a=t.valueArray,r=t.initValue,o=this.sheet.getRange(e,n),i=SpreadsheetApp.newDataValidation().requireValueInList(a).build();(o.setDataValidation(i),r)&&(a.find((function(t){return t===r}))&&o.setValue(r))},t.prototype.delRow=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r});this.sheet.getRange(e,n,o.rows,o.colums).deleteCells(SpreadsheetApp.Dimension.ROWS)},t.prototype.changeCellBackGroundColor=function(t){var e=t.color,n=t.row,a=t.col,r=t.endRow,o=t.endCol,i=this.getAdditionRange({row:n,col:a,endRow:r,endCol:o});this.sheet.getRange(n,a,i.rows,i.colums).setBackground(e)},t.prototype.changeCellBackGroundColorVerString=function(t,e){if(!e)return null;this.sheet.getRange(e).setBackground(t)},t.prototype.addData=function(t){this.sheet.appendRow(t)},t.prototype.removeDuplicates=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r}),i=this.sheet;e&&n&&i.getRange(e,n,o.rows,o.colums).removeDuplicates()},t.prototype.removeDuplicatesVerString=function(t){t&&this.sheet.getRange(t).removeDuplicates()},t}(),i=function(t,e,n){if(n||2===arguments.length)for(var a,r=0,o=e.length;r<o;r++)!a&&r in e||(a||(a=Array.prototype.slice.call(e,0,r)),a[r]=e[r]);return t.concat(a||Array.prototype.slice.call(e))},s=function(){function t(t){this.appName=t,this.sgs=new o(a,"log")}return t.prototype.push=function(t){if(0!==t.length){var e=t.map((function(t){return JSON.stringify(t)}));this.sgs.addData(i([this.appName,String(new Date)],e,!0))}},t}(),u=function(){function t(){this.log=new s("FetchFunction")}return t.prototype.doGet=function(t){var e=t.url,n=t.options;if(e&&""!==e){this.log.push([e]);var a=UrlFetchApp.fetch(e,n);if(a.getContentText()){var r=JSON.parse(a.getContentText());return this.log.push([JSON.stringify(r)]),r}return a.getContentText()?void 0:null}},t.prototype.doPost=function(t){var e=t.url,n=t.options;if(e&&""!==e){this.log.push([e,JSON.stringify(n)]);var a=UrlFetchApp.fetch(e,n);if(a.getContentText()){var r=JSON.parse(a.getContentText());return this.log.push(["",JSON.stringify(r)]),r}return a.getContentText()?void 0:null}},t}(),c=function(){function t(){this.log=new s("CreateDataMessage")}return t.prototype.detail=function(t){return{type:"text",text:"\n".concat(t.month,"\n\n生活費: ").concat(t.lifePay,"\n支出: ").concat(t.pay,"\n収入: ").concat(t.income,"\n残高: ").concat(t.balance,"\n総資産: ").concat(t.assets,"\n\n月末引き落とし\n------------------------\n町田UFJ: ").concat(t.debit.machida,"\n横浜UFJ: ").concat(t.debit.yokohama,"\nゆうちょ: ").concat(t.debit.yucho,"\nSBI: ").concat(t.debit.sbi,"\n------------------------\n\nクレジット\n------------------------\n楽天: ").concat(t.detail.card.raluten,"\nライフカード: ").concat(t.detail.card.life,"\nアプラス: ").concat(t.detail.card.aplus,"\nau: ").concat(t.detail.card.au,"\n------------------------\n\nMTG代 ").concat(t.detail.mtg,"\nローン: ").concat(t.detail.loan,"\n家賃: ").concat(t.detail.home,"\n税金: ").concat(t.detail.tax,"\n発生: ").concat(t.detail.other,"\n      ")}},t.prototype.pay=function(t){return{type:"text",text:"".concat(t.month,"\n\n残高: ").concat(t.balance,"\n\n生活費: ").concat(t.lifePay,"\n支出: ").concat(t.pay,"\n発生: ").concat(t.detail.other)}},t.prototype.card=function(t){return{type:"text",text:"".concat(t.month,"\n\n楽天: ").concat(t.detail.card.raluten,"\nライフ: ").concat(t.detail.card.life,"\nアプラス: ").concat(t.detail.card.aplus,"\nau: ").concat(t.detail.card.au,"\n")}},t.prototype.debit=function(t){return{type:"text",text:"".concat(t.month,"\n\n町田UFJ: ").concat(t.debit.machida,"\n横浜UFJ ").concat(t.debit.yokohama,"\nゆうちょ: ").concat(t.debit.yucho,"\nSBI: ").concat(t.debit.sbi)}},t}();const d={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function l(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const h={date:l({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:l({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:l({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function f(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function p(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?function(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n;return}(s,(t=>t.test(i))):function(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n;return}(s,(t=>t.test(i)));let c;c=t.valueCallback?t.valueCallback(u):u,c=n.valueCallback?n.valueCallback(c):c;return{value:c,rest:e.slice(i.length)}}}var m;const y={code:"en-US",formatDistance:(t,e,n)=>{let a;const r=d[t];return a="string"==typeof r?r:1===e?r.one:r.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:h,formatRelative:(t,e,n,a)=>g[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:f({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:f({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:f({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:f({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:f({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(m={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(m.matchPattern);if(!n)return null;const a=n[0],r=t.match(m.parsePattern);if(!r)return null;let o=m.valueCallback?m.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:p({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:p({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:p({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:p({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:p({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let w={};function b(){return w}Math.pow(10,8);const v=6048e5,S=864e5;function M(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function x(t){const e=M(t);return e.setHours(0,0,0,0),e}function C(t){const e=M(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function D(t,e){const n=x(t),a=x(e),r=+n-C(n),o=+a-C(a);return Math.round((r-o)/S)}function k(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function P(t){const e=M(t),n=k(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}function A(t){const e=M(t);return D(e,P(e))+1}function T(t,e){const n=b(),a=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=M(t),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function R(t){return T(t,{weekStartsOn:1})}function O(t){const e=M(t),n=e.getFullYear(),a=k(t,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=R(a),o=k(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=R(o);return e.getTime()>=r.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function N(t){const e=O(t),n=k(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),R(n)}function B(t){const e=M(t),n=+R(e)-+N(e);return Math.round(n/v)+1}function W(t,e){const n=M(t),a=n.getFullYear(),r=b(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=k(t,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=T(i,e),u=k(t,0);u.setFullYear(a,0,o),u.setHours(0,0,0,0);const c=T(u,e);return n.getTime()>=s.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function F(t,e){const n=b(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=W(t,e),o=k(t,0);o.setFullYear(r,0,a),o.setHours(0,0,0,0);return T(o,e)}function L(t,e){const n=M(t),a=+T(n,e)-+F(n,e);return Math.round(a/v)+1}function E(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const Y={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return E("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):E(n+1,2)},d:(t,e)=>E(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>E(t.getHours()%12||12,e.length),H:(t,e)=>E(t.getHours(),e.length),m:(t,e)=>E(t.getMinutes(),e.length),s:(t,e)=>E(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return E(Math.trunc(a*Math.pow(10,n-3)),e.length)}},H="midnight",j="noon",q="morning",J="afternoon",G="evening",U="night",Q={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return Y.y(t,e)},Y:function(t,e,n,a){const r=W(t,a),o=r>0?r:1-r;if("YY"===e){return E(o%100,2)}return"Yo"===e?n.ordinalNumber(o,{unit:"year"}):E(o,e.length)},R:function(t,e){return E(O(t),e.length)},u:function(t,e){return E(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return E(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return E(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return Y.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return E(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=L(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):E(r,e.length)},I:function(t,e,n){const a=B(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):E(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):Y.d(t,e)},D:function(t,e,n){const a=A(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):E(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return E(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return E(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return E(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?j:0===a?H:a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?G:a>=12?J:a>=4?q:U,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return Y.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):Y.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):E(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):E(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):Y.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):Y.s(t,e)},S:function(t,e){return Y.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return V(a);case"XXXX":case"XX":return z(a);default:return z(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return V(a);case"xxxx":case"xx":return z(a);default:return z(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+X(a,":");default:return"GMT"+z(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+X(a,":");default:return"GMT"+z(a,":")}},t:function(t,e,n){return E(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return E(t.getTime(),e.length)}};function X(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+E(o,2)}function V(t,e){if(t%60==0){return(t>0?"-":"+")+E(Math.abs(t)/60,2)}return z(t,e)}function z(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+E(Math.trunc(a/60),2)+e+E(a%60,2)}const _=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},I=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},$={p:I,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return _(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",_(a,e)).replace("{{time}}",I(r,e))}},K=/^D+$/,Z=/^Y+$/,tt=["D","DD","YY","YYYY"];function et(t){return t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function nt(t){if(!et(t)&&"number"!=typeof t)return!1;const e=M(t);return!isNaN(Number(e))}const at=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,rt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ot=/^'([^]*?)'?$/,it=/''/g,st=/[a-zA-Z]/;function ut(t,e,n){const a=b(),r=n?.locale??a.locale??y,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,s=M(t);if(!nt(s))throw new RangeError("Invalid time value");let u=e.match(rt).map((t=>{const e=t[0];if("p"===e||"P"===e){return(0,$[e])(t,r.formatLong)}return t})).join("").match(at).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:ct(t)};if(Q[e])return{isToken:!0,value:t};if(e.match(st))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));r.localize.preprocessor&&(u=r.localize.preprocessor(s,u));const c={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return u.map((a=>{if(!a.isToken)return a.value;const o=a.value;(!n?.useAdditionalWeekYearTokens&&function(t){return Z.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return K.test(t)}(o))&&function(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(tt.includes(t))throw new RangeError(a)}(o,e,String(t));return(0,Q[o[0]])(s,o,r.localize,c)})).join("")}function ct(t){const e=t.match(ot);return e?e[1].replace(it,"'"):t}var dt=n(599),lt=n.n(dt),ht=function(t){return"".concat(r[t],":").concat(r[t+1])},gt={4:ht(1),5:ht(3),6:ht(5),7:ht(7),8:ht(9),9:ht(11),10:ht(13),11:ht(15),12:ht(17),1:ht(19),2:ht(21),3:ht(23)},ft=function(){function t(){this.log=new s("GASController"),this.paySgs=new o(a,"発生支払い"),this.dataSgs=new o(a,"残高計算"),this.statusSgs=new o(a,"status")}return t.prototype.addPayData=function(t,e,n){var a=new Date,r=ut(new Date,"yyyy/M/d HH:mm:ss"),o=String("カード"===n?a.getMonth()+2:a.getMonth()+1);this.paySgs.addData([r,null!=e?e:"",String(t),"",o])},t.prototype.getThisMonthData=function(t){var e=new Date,n=t||e.getMonth()+1,a=this.dataSgs.doReadSSVerString(gt[n]);this.log.push([gt[n],a]);var r=lt()({prefix:"¥",integerSeparator:",",decimal:".",decimalsSeparator:"",padRight:0}),o={month:"".concat(n,"月"),lifePay:r(a[1][0]),pay:r(a[2][0]),income:r(a[3][0]),balance:r(a[7][0]),assets:r(a[8][0]),debit:{machida:r(a[10][0]),yokohama:r(a[11][0]),yucho:r(a[12][0]),sbi:r(a[13][0])},detail:{card:{raluten:r(a[14][0]),life:r(a[15][0]),aplus:r(a[16][0]),au:r(a[17][0])},mtg:r(a[18][0]),loan:r(a[19][0]),home:r(a[20][0]),tax:r(a[21][0]),other:r(a[28][0])}};return this.log.push([o]),o},t.prototype.getStatus=function(){return this.statusSgs.doReadSS({row:1,col:1})},t.prototype.setStatus=function(t){this.statusSgs.doWriteSS(t,1,1)},t.prototype.getSettingMonth=function(){var t=this.statusSgs.doReadSS({row:2,col:1}).match(/^(\d{1,2})月$/);if(t||null!==t)return Number(t[1])},t.prototype.setSettingMonth=function(t){this.statusSgs.doWriteSS(t,2,1)},t}(),pt=new(function(){function t(){this.urlData={reply:"https://api.line.me/v2/bot/message/reply",push:"https://api.line.me/v2/bot/message/push",profile:"https://api.line.me/v2/bot/profile/"},this.log=new s("LineApp"),this.fetchFunction=new u,this.gasController=new ft,this.createMessage=new c,this.HEADERS={"Content-Type":"application/json; charset=UTF-8",Authorization:"Bearer qL979rNKdcF0Uryh2i+2fImy1wOxReHn0euxp6SX7MxzQC5/pfESidQw+KyIoZQYnefxZ+FEWNCqwOOsvrl/kTLbiycZ10YLG3W7OaJ7gVeT6ouXwbKgBjXyjJAoFjj3CoNeuy7DHRNNvKCQCmh29gdB04t89/1O/w1cDnyilFU="}}return t.prototype.__checkMessagesUndefined=function(t){for(var e=0;e<t.length;e++)if(void 0===t[e])return!0;return!1},t.prototype.__getUserData=function(t){if(t){var e={method:"GET",headers:this.HEADERS},n=this.urlData.profile+"/"+t,a=this.fetchFunction.doGet({url:n,options:e});if(a.userId)return{userId:a.userId,name:a.displayName}}},t.prototype.__switchMessage=function(t){var n,a,r,o=this.gasController.getStatus(),i=null!==(n=this.gasController.getSettingMonth())&&void 0!==n?n:void 0;if("setMonth"===o){return/^(1|2|3|4|5|6|7|8|9|10|11|12)月$/.test(t)?(this.gasController.setStatus(""),this.gasController.setSettingMonth(t),[{type:"text",text:"".concat(t," に変更しました。")}]):[{type:"text",text:"無効な値です。"}]}switch(t){case"メニュー":return[{type:"text",text:"以下のメッセージをしてください。\n月指定\n残高\nカード\n詳細\n引き落とし"}];case"月確認":return i?[{type:"text",text:"".concat(i,"月が設定されています。")}]:[{type:"text",text:"現在、月は設定されていません。\n\n今月のデータが参照できます。"}];case"月指定":return this.gasController.setStatus("setMonth"),[{type:"text",text:"月を指定してください。\n\nex) 1月、12月"}];case"残高":return[this.createMessage.pay(this.gasController.getThisMonthData(i))];case"カード":return[this.createMessage.card(this.gasController.getThisMonthData(i))];case"詳細":return[this.createMessage.detail(this.gasController.getThisMonthData(i))];case"引き落とし":return[this.createMessage.debit(this.gasController.getThisMonthData(i))];default:var s=t.split("\n"),u=Number(s[0]);return isNaN(u)?[e.failedAddPay]:(this.gasController.addPayData(u,null!==(a=s[1])&&void 0!==a?a:"",null!==(r=s[2])&&void 0!==r?r:""),[e.successAddPay])}},t.prototype.checkMessageAndPost=function(t){var e=JSON.parse(t.postData.contents).events[0];if(this.log.push([e]),"text"===e.message.type&&e.source.userId){var n=this.__switchMessage(e.message.text);this.reply(t,n)}},t.prototype.reply=function(t,e){if(!this.__checkMessagesUndefined(e)){var n={replyToken:JSON.parse(t.postData.contents).events[0].replyToken,messages:e},a={method:"POST",headers:this.HEADERS,payload:JSON.stringify(n)};this.fetchFunction.doPost({url:this.urlData.reply,options:a})}},t.prototype.post=function(t,e){if(!this.__checkMessagesUndefined(e)){var n={to:t,messages:e},a={method:"POST",headers:this.HEADERS,payload:JSON.stringify(n)};this.fetchFunction.doPost({url:this.urlData.push,options:a})}},t.prototype.announceBalance=function(t){var e={to:t,messages:[this.createMessage.pay(this.gasController.getThisMonthData())]},n={method:"POST",headers:this.HEADERS,payload:JSON.stringify(e)};this.fetchFunction.doPost({url:this.urlData.push,options:n})},t}());n.g.test=function(){},n.g.doPost=function(t){pt.checkMessageAndPost(t)},n.g.doPostMessages=function(){pt.post(t,[{type:"text",text:"LINE APP GASから返信 POST"}])},n.g.doPostAnnounceBalances=function(){pt.announceBalance(t)}})()})();