function test(){}function doPost(t){}function doPostMessages(){}function doPostAnnounceBalances(){}(()=>{var t={599:(t,e,n)=>{function a(t){if((t=t||{}).negativeType=t.negativeType||("R"===t.negative?"right":"left"),"string"!=typeof t.negativeLeftSymbol)switch(t.negativeType){case"left":t.negativeLeftSymbol="-";break;case"brackets":t.negativeLeftSymbol="(";break;default:t.negativeLeftSymbol=""}if("string"!=typeof t.negativeRightSymbol)switch(t.negativeType){case"right":t.negativeRightSymbol="-";break;case"brackets":t.negativeRightSymbol=")";break;default:t.negativeRightSymbol=""}function e(e,n){if(n=n||{},!e&&0!==e)return"";var a=[],r="-"===(e=""+e).charAt(0);return e=e.replace(/^\-/g,""),t.negativeLeftOut||n.noUnits||a.push(t.prefix),r&&a.push(t.negativeLeftSymbol),t.negativeLeftOut&&!n.noUnits&&a.push(t.prefix),e=e.split("."),null!=t.round&&function(t,e){if(t[1]&&e>=0&&t[1].length>e){var n=t[1].slice(0,e);if(+t[1].substr(e,1)>=5){for(var a="";"0"===n.charAt(0);)a+="0",n=n.substr(1);(n=a+(n=+n+1+"")).length>e&&(t[0]=+t[0]+ +n.charAt(0)+"",n=n.substring(1))}t[1]=n}}(e,t.round),null!=t.truncate&&(e[1]=function(t,e){t&&(t+="");return t&&t.length>e?t.substr(0,e):t}(e[1],t.truncate)),t.padLeft>0&&(e[0]=function(t,e){t+="";var n=[];for(;n.length+t.length<e;)n.push("0");return n.join("")+t}(e[0],t.padLeft)),t.padRight>0&&(e[1]=function(t,e){t?t+="":t="";var n=[];for(;n.length+t.length<e;)n.push("0");return t+n.join("")}(e[1],t.padRight)),!n.noSeparator&&e[1]&&(e[1]=function(t,e){if(t+="",!e)return t;var n=/(\d{3})(\d+)/;for(;n.test(t);)t=t.replace(n,"$1"+e+"$2");return t}(e[1],t.decimalsSeparator)),!n.noSeparator&&e[0]&&(e[0]=function(t,e){if(t+="",!e)return t;var n=/(\d+)(\d{3})/;for(;n.test(t);)t=t.replace(n,"$1"+e+"$2");return t}(e[0],t.integerSeparator)),a.push(e[0]),e[1]&&(a.push(t.decimal),a.push(e[1])),t.negativeRightOut&&!n.noUnits&&a.push(t.suffix),r&&a.push(t.negativeRightSymbol),t.negativeRightOut||n.noUnits||a.push(t.suffix),a.join("")}function n(e,n){n=n||[],t.allowedSeparators&&t.allowedSeparators.forEach((function(t){n.push(t)})),n.push(t.integerSeparator),n.push(t.decimalsSeparator);var a=e=(e=e.replace(t.prefix,"")).replace(t.suffix,"");do{e=a;for(var r=0;r<n.length;r++)a=a.replace(n[r],"")}while(a!=e);return e}return"boolean"!=typeof t.negativeLeftOut&&(t.negativeLeftOut=!1!==t.negativeOut),"boolean"!=typeof t.negativeRightOut&&(t.negativeRightOut=!1!==t.negativeOut),t.prefix=t.prefix||"",t.suffix=t.suffix||"","string"!=typeof t.integerSeparator&&(t.integerSeparator="string"==typeof t.separator?t.separator:","),t.decimalsSeparator="string"==typeof t.decimalsSeparator?t.decimalsSeparator:"",t.decimal=t.decimal||".",t.padLeft=t.padLeft||-1,t.padRight=t.padRight||-1,e.negative=t.negative,e.negativeOut=t.negativeOut,e.negativeType=t.negativeType,e.negativeLeftOut=t.negativeLeftOut,e.negativeLeftSymbol=t.negativeLeftSymbol,e.negativeRightOut=t.negativeRightOut,e.negativeRightSymbol=t.negativeRightSymbol,e.prefix=t.prefix,e.suffix=t.suffix,e.separate=t.separate,e.integerSeparator=t.integerSeparator,e.decimalsSeparator=t.decimalsSeparator,e.decimal=t.decimal,e.padLeft=t.padLeft,e.padRight=t.padRight,e.truncate=t.truncate,e.round=t.round,e.unformat=n,e}t.exports=a,t.exports.default=a}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t="U314639443c254640f3d44313e524080a";const e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const r={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},o={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function i(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function s(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?function(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n;return}(s,(t=>t.test(i))):function(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n;return}(s,(t=>t.test(i)));let c;c=t.valueCallback?t.valueCallback(u):u,c=n.valueCallback?n.valueCallback(c):c;return{value:c,rest:e.slice(i.length)}}}var u;const c={code:"en-US",formatDistance:(t,n,a)=>{let r;const o=e[t];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:r,formatRelative:(t,e,n,a)=>o[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:i({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:i({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:i({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:i({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:i({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(u.matchPattern);if(!n)return null;const a=n[0],r=t.match(u.parsePattern);if(!r)return null;let o=u.valueCallback?u.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:s({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:s({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:s({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:s({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let l={};function d(){return l}Math.pow(10,8);const h=6048e5,g=864e5;function f(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function p(t){const e=f(t);return e.setHours(0,0,0,0),e}function m(t){const e=f(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function y(t,e){const n=p(t),a=p(e),r=+n-m(n),o=+a-m(a);return Math.round((r-o)/g)}function w(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function b(t){const e=f(t),n=w(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}function v(t){const e=f(t);return y(e,b(e))+1}function S(t,e){const n=d(),a=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=f(t),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function M(t){return S(t,{weekStartsOn:1})}function x(t){const e=f(t),n=e.getFullYear(),a=w(t,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=M(a),o=w(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=M(o);return e.getTime()>=r.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function C(t){const e=x(t),n=w(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),M(n)}function D(t){const e=f(t),n=+M(e)-+C(e);return Math.round(n/h)+1}function k(t,e){const n=f(t),a=n.getFullYear(),r=d(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=w(t,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=S(i,e),u=w(t,0);u.setFullYear(a,0,o),u.setHours(0,0,0,0);const c=S(u,e);return n.getTime()>=s.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function P(t,e){const n=d(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=k(t,e),o=w(t,0);o.setFullYear(r,0,a),o.setHours(0,0,0,0);return S(o,e)}function T(t,e){const n=f(t),a=+S(n,e)-+P(n,e);return Math.round(a/h)+1}function A(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const R={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return A("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):A(n+1,2)},d:(t,e)=>A(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>A(t.getHours()%12||12,e.length),H:(t,e)=>A(t.getHours(),e.length),m:(t,e)=>A(t.getMinutes(),e.length),s:(t,e)=>A(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return A(Math.trunc(a*Math.pow(10,n-3)),e.length)}},O="midnight",N="noon",B="morning",W="afternoon",F="evening",L="night",E={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return R.y(t,e)},Y:function(t,e,n,a){const r=k(t,a),o=r>0?r:1-r;if("YY"===e){return A(o%100,2)}return"Yo"===e?n.ordinalNumber(o,{unit:"year"}):A(o,e.length)},R:function(t,e){return A(x(t),e.length)},u:function(t,e){return A(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return A(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return A(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return R.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return A(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=T(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):A(r,e.length)},I:function(t,e,n){const a=D(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):A(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):R.d(t,e)},D:function(t,e,n){const a=v(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):A(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return A(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return A(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return A(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?N:0===a?O:a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?F:a>=12?W:a>=4?B:L,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return R.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):R.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):A(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):A(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):R.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):R.s(t,e)},S:function(t,e){return R.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return H(a);case"XXXX":case"XX":return j(a);default:return j(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return H(a);case"xxxx":case"xx":return j(a);default:return j(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Y(a,":");default:return"GMT"+j(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Y(a,":");default:return"GMT"+j(a,":")}},t:function(t,e,n){return A(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return A(t.getTime(),e.length)}};function Y(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+A(o,2)}function H(t,e){if(t%60==0){return(t>0?"-":"+")+A(Math.abs(t)/60,2)}return j(t,e)}function j(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+A(Math.trunc(a/60),2)+e+A(a%60,2)}const q=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},J=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},G={p:J,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return q(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",q(a,e)).replace("{{time}}",J(r,e))}},U=/^D+$/,Q=/^Y+$/,X=["D","DD","YY","YYYY"];function _(t){return t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function V(t){if(!_(t)&&"number"!=typeof t)return!1;const e=f(t);return!isNaN(Number(e))}const z=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,I=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function tt(t,e,n){const a=d(),r=n?.locale??a.locale??c,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,s=f(t);if(!V(s))throw new RangeError("Invalid time value");let u=e.match(I).map((t=>{const e=t[0];if("p"===e||"P"===e){return(0,G[e])(t,r.formatLong)}return t})).join("").match(z).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:et(t)};if(E[e])return{isToken:!0,value:t};if(e.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));r.localize.preprocessor&&(u=r.localize.preprocessor(s,u));const l={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return u.map((a=>{if(!a.isToken)return a.value;const o=a.value;(!n?.useAdditionalWeekYearTokens&&function(t){return Q.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return U.test(t)}(o))&&function(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(X.includes(t))throw new RangeError(a)}(o,e,String(t));return(0,E[o[0]])(s,o,r.localize,l)})).join("")}function et(t){const e=t.match($);return e?e[1].replace(K,"'"):t}var nt=n(599),at=n.n(nt),rt="https://docs.google.com/spreadsheets/d/1jX5alq9OvY_wykZID51iWf11ewd3impyJ8vyJRA41AY/edit",ot=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX","CY","CZ"],it=function(t){return"".concat(ot[t],":").concat(ot[t+1])},st={4:it(1),5:it(3),6:it(5),7:it(7),8:it(9),9:it(11),10:it(13),11:it(15),12:it(17),1:it(19),2:it(21),3:it(23)},ut=function(){function t(t,e){this.book=SpreadsheetApp.openByUrl(t),this.sheetName=e,this.sheet=this.book.getSheetByName(e)}return t.prototype._isBlankRow=function(t){var e=!0;return t.forEach((function(t){""!==t&&(e=!1)})),e},t.prototype._blankRowDel=function(t){var e=this;return t?t.filter((function(t){return!e._isBlankRow(t)})):null},t.prototype._blankColDel=function(t){return t?t.filter((function(t){return""!==t})):null},t.prototype.doGetLastRow=function(t,e){if(!(t<1&&e<1)){var n=ot[e-1];return this.doReadSSVerString("".concat(n).concat(t,":").concat(n,"1000")).length<2?t+1:this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()+1}},t.prototype.doGetLastCol=function(t,e){if(!(t<1&&e<1)){var n=ot[e-1],a=ot[ot.length-1],r=this.doReadSSVerString("".concat(n).concat(t,":").concat(a).concat(t));return this._blankColDel(r[0]).length<2?e+1:this.sheet.getRange(t,e).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn()+1}},t.prototype.doWriteSS=function(t,e,n){e&&n&&(t||(t=""),this.sheet.getRange(e,n).setValue(t))},t.prototype.doReadSSVerString=function(t,e){void 0===e&&(e=!1);var n=null;return t?(n=this.sheet.getRange(t).getValues(),e?n:this._blankRowDel(n)):n},t.prototype.doReadSS=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=t.hasBlank,i=void 0!==o&&o,s=null,u=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r}),c=this.sheet;return e&&n?a||r?(s=c.getRange(e,n,u.rows,u.colums).getValues(),i?s:this._blankRowDel(s)):(s=c.getRange(e,n,u.rows,u.colums).getValues())[0][0]:s},t.prototype.getAdditionRange=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o={rows:1,colums:1};return a&&(o.rows=a-e+1),r&&(o.colums=r-n+1),o},t.prototype.copySheet=function(t){if(t){var e=this.book;this.sheet.copyTo(e).setName(t)}},t.prototype.setPullDown=function(t){var e=t.row,n=t.col,a=t.valueArray,r=t.initValue,o=this.sheet.getRange(e,n),i=SpreadsheetApp.newDataValidation().requireValueInList(a).build();(o.setDataValidation(i),r)&&(a.find((function(t){return t===r}))&&o.setValue(r))},t.prototype.delRow=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r});this.sheet.getRange(e,n,o.rows,o.colums).deleteCells(SpreadsheetApp.Dimension.ROWS)},t.prototype.changeCellBackGroundColor=function(t){var e=t.color,n=t.row,a=t.col,r=t.endRow,o=t.endCol,i=this.getAdditionRange({row:n,col:a,endRow:r,endCol:o});this.sheet.getRange(n,a,i.rows,i.colums).setBackground(e)},t.prototype.changeCellBackGroundColorVerString=function(t,e){if(!e)return null;this.sheet.getRange(e).setBackground(t)},t.prototype.addData=function(t){this.sheet.appendRow(t)},t.prototype.removeDuplicates=function(t){var e=t.row,n=t.col,a=t.endRow,r=t.endCol,o=this.getAdditionRange({row:e,col:n,endRow:a,endCol:r}),i=this.sheet;e&&n&&i.getRange(e,n,o.rows,o.colums).removeDuplicates()},t.prototype.removeDuplicatesVerString=function(t){t&&this.sheet.getRange(t).removeDuplicates()},t}(),ct=function(t,e,n){if(n||2===arguments.length)for(var a,r=0,o=e.length;r<o;r++)!a&&r in e||(a||(a=Array.prototype.slice.call(e,0,r)),a[r]=e[r]);return t.concat(a||Array.prototype.slice.call(e))},lt=function(){function t(t){this.appName=t,this.sgs=new ut(rt,"log")}return t.prototype.push=function(t){if(0!==t.length){var e=t.map((function(t){return JSON.stringify(t)}));this.sgs.addData(ct([this.appName,String(new Date)],e,!0))}},t}(),dt=function(){function t(){this.log=new lt("GASController"),this.paySgs=new ut(rt,"発生支払い"),this.dataSgs=new ut(rt,"残高計算"),this.statusSgs=new ut(rt,"status")}return t.prototype.addPayData=function(t,e,n){var a=new Date,r=tt(new Date,"yyyy/M/d HH:mm:ss"),o=String("カード"===n?a.getMonth()+2:a.getMonth()+1);this.paySgs.addData([r,null!=e?e:"",String(t),"",o])},t.prototype.getThisMonthData=function(t){var e=new Date,n=t||e.getMonth()+1,a=this.dataSgs.doReadSSVerString(st[n],!0);this.log.push([st[n],a]);var r=at()({prefix:"¥",integerSeparator:",",decimal:".",decimalsSeparator:"",padRight:0,truncate:0}),o={month:"".concat(n,"月"),lifePay:r(a[1][0]),pay:r(a[2][0]),income:r(a[3][0]),savings:r(a[5][0]),balance:r(a[7][0]),assets:r(a[8][0]),debit:{machida:r(a[14][0]),yokohama:r(a[15][0]),yucho:r(a[16][0]),sbi:r(a[17][0])},detail:{card:{raluten:r(a[18][0]),life:r(a[19][0]),aplus:r(a[20][0]),au:r(a[21][0])},mtg:r(a[22][0]),loan:r(a[23][0]),home:r(a[24][0]),tax:r(a[25][0]),other:r(a[32][0]),appointment:r(a[37][0])}};return this.log.push([o]),o},t.prototype.getStatus=function(){return this.statusSgs.doReadSS({row:1,col:1})},t.prototype.setStatus=function(t){this.statusSgs.doWriteSS(t,1,1)},t.prototype.getSettingMonth=function(){var t=this.statusSgs.doReadSS({row:2,col:1}).match(/^(\d{1,2})月$/);if(t||null!==t)return Number(t[1])},t.prototype.setSettingMonth=function(t){this.statusSgs.doWriteSS(t,2,1)},t}(),ht={successAddPay:{type:"text",text:"支出に追加しました。"},failedAddPay:{type:"text",text:"支出の追加に失敗しました。\n数字で入力ください。"}},gt=function(){function t(){this.log=new lt("FetchFunction")}return t.prototype.doGet=function(t){var e=t.url,n=t.options;if(e&&""!==e){this.log.push([e]);var a=UrlFetchApp.fetch(e,n);if(a.getContentText()){var r=JSON.parse(a.getContentText());return this.log.push([JSON.stringify(r)]),r}return a.getContentText()?void 0:null}},t.prototype.doPost=function(t){var e=t.url,n=t.options;if(e&&""!==e){this.log.push([e,JSON.stringify(n)]);var a=UrlFetchApp.fetch(e,n);if(a.getContentText()){var r=JSON.parse(a.getContentText());return this.log.push(["",JSON.stringify(r)]),r}return a.getContentText()?void 0:null}},t}(),ft=function(){function t(){this.log=new lt("CreateDataMessage")}return t.prototype.detail=function(t){return{type:"text",text:"\n".concat(t.month,"\n\n生活費: ").concat(t.lifePay,"\n支出: ").concat(t.pay,"\n収入: ").concat(t.income,"\n貯蓄: ").concat(t.savings,"\n残高: ").concat(t.balance,"\n総資産: ").concat(t.assets,"\n\n月末引き落とし\n------------------------\n町田UFJ: ").concat(t.debit.machida,"\n横浜UFJ: ").concat(t.debit.yokohama,"\nゆうちょ: ").concat(t.debit.yucho,"\nSBI: ").concat(t.debit.sbi,"\n------------------------\n\nクレジット\n------------------------\n楽天: ").concat(t.detail.card.raluten,"\nライフカード: ").concat(t.detail.card.life,"\nアプラス: ").concat(t.detail.card.aplus,"\nau: ").concat(t.detail.card.au,"\n------------------------\n\nMTG代 ").concat(t.detail.mtg,"\nローン: ").concat(t.detail.loan,"\n家賃: ").concat(t.detail.home,"\n税金: ").concat(t.detail.tax,"\nご飯会: ").concat(t.detail.appointment,"\n発生: ").concat(t.detail.other,"\n      ")}},t.prototype.pay=function(t){return{type:"text",text:"".concat(t.month,"\n\n残高: ").concat(t.balance,"\n\n生活費: ").concat(t.lifePay,"\n支出: ").concat(t.pay,"\n発生: ").concat(t.detail.other)}},t.prototype.card=function(t){return{type:"text",text:"".concat(t.month,"\n\n楽天: ").concat(t.detail.card.raluten,"\nライフ: ").concat(t.detail.card.life,"\nアプラス: ").concat(t.detail.card.aplus,"\nau: ").concat(t.detail.card.au,"\n")}},t.prototype.debit=function(t){return{type:"text",text:"".concat(t.month,"\n\n町田UFJ: ").concat(t.debit.machida,"\n横浜UFJ ").concat(t.debit.yokohama,"\nゆうちょ: ").concat(t.debit.yucho,"\nSBI: ").concat(t.debit.sbi)}},t}(),pt=new(function(){function t(){this.urlData={reply:"https://api.line.me/v2/bot/message/reply",push:"https://api.line.me/v2/bot/message/push",profile:"https://api.line.me/v2/bot/profile/"},this.log=new lt("LineApp"),this.fetchFunction=new gt,this.gasController=new dt,this.createMessage=new ft,this.HEADERS={"Content-Type":"application/json; charset=UTF-8",Authorization:"Bearer qL979rNKdcF0Uryh2i+2fImy1wOxReHn0euxp6SX7MxzQC5/pfESidQw+KyIoZQYnefxZ+FEWNCqwOOsvrl/kTLbiycZ10YLG3W7OaJ7gVeT6ouXwbKgBjXyjJAoFjj3CoNeuy7DHRNNvKCQCmh29gdB04t89/1O/w1cDnyilFU="}}return t.prototype.__checkMessagesUndefined=function(t){for(var e=0;e<t.length;e++)if(void 0===t[e])return!0;return!1},t.prototype.__getUserData=function(t){if(t){var e={method:"GET",headers:this.HEADERS},n=this.urlData.profile+"/"+t,a=this.fetchFunction.doGet({url:n,options:e});if(a.userId)return{userId:a.userId,name:a.displayName}}},t.prototype._getMonthData=function(){var t,e=null!==(t=this.gasController.getSettingMonth())&&void 0!==t?t:void 0;if(e){var n=e+1===13?1:e+1;return{settingMonth:e,nextMonth:n,nextNextMonth:n+1===13?1:n+1===14?2:n+1}}},t.prototype.__switchMessage=function(t){var e,n,a=this.gasController.getStatus(),r=this._getMonthData(),o=r.settingMonth,i=r.nextMonth,s=r.nextNextMonth;if("setMonth"===a){return/^(1|2|3|4|5|6|7|8|9|10|11|12)月$/.test(t)?(this.gasController.setStatus(""),this.gasController.setSettingMonth(t),[{type:"text",text:"".concat(t," に変更しました。")}]):[{type:"text",text:"無効な値です。"}]}switch(t){case"メニュー":return[{type:"text",text:"以下のメッセージをしてください。\n月指定\n残高\nカード\n詳細\n引き落とし"}];case"月確認":return o?[{type:"text",text:"".concat(o,"月が設定されています。")}]:[{type:"text",text:"現在、月は設定されていません。\n\n今月のデータが参照できます。"}];case"月指定":return this.gasController.setStatus("setMonth"),[{type:"text",text:"月を指定してください。\n\nex) 1月、12月"}];case"残高":return[this.createMessage.pay(this.gasController.getThisMonthData(o)),this.createMessage.pay(this.gasController.getThisMonthData(i)),this.createMessage.pay(this.gasController.getThisMonthData(s))];case"カード":return[this.createMessage.card(this.gasController.getThisMonthData(o))];case"詳細":return[this.createMessage.detail(this.gasController.getThisMonthData(o))];case"引き落とし":return[this.createMessage.debit(this.gasController.getThisMonthData(o))];default:var u=t.split("\n"),c=Number(u[0]);return isNaN(c)?[ht.failedAddPay]:(this.gasController.addPayData(c,null!==(e=u[1])&&void 0!==e?e:"",null!==(n=u[2])&&void 0!==n?n:""),[ht.successAddPay])}},t.prototype.checkMessageAndPost=function(t){var e=JSON.parse(t.postData.contents).events[0];if(this.log.push([e]),"text"===e.message.type&&e.source.userId){var n=this.__switchMessage(e.message.text);this.reply(t,n)}},t.prototype.reply=function(t,e){if(!this.__checkMessagesUndefined(e)){var n={replyToken:JSON.parse(t.postData.contents).events[0].replyToken,messages:e},a={method:"POST",headers:this.HEADERS,payload:JSON.stringify(n)};this.fetchFunction.doPost({url:this.urlData.reply,options:a})}},t.prototype.post=function(t,e){if(!this.__checkMessagesUndefined(e)){var n={to:t,messages:e},a={method:"POST",headers:this.HEADERS,payload:JSON.stringify(n)};this.fetchFunction.doPost({url:this.urlData.push,options:a})}},t.prototype.announceBalance=function(t){var e=this._getMonthData(),n=e.settingMonth,a=e.nextMonth,r=e.nextNextMonth,o={to:t,messages:n?[this.createMessage.pay(this.gasController.getThisMonthData(n)),this.createMessage.pay(this.gasController.getThisMonthData(a)),this.createMessage.pay(this.gasController.getThisMonthData(r))]:[this.createMessage.pay(this.gasController.getThisMonthData())]},i={method:"POST",headers:this.HEADERS,payload:JSON.stringify(o)};this.fetchFunction.doPost({url:this.urlData.push,options:i})},t}()),mt=new dt;n.g.test=function(){mt.getThisMonthData(6)},n.g.doPost=function(t){pt.checkMessageAndPost(t)},n.g.doPostMessages=function(){pt.post(t,[{type:"text",text:"LINE APP GASから返信 POST"}])},n.g.doPostAnnounceBalances=function(){pt.announceBalance(t)}})()})();