(function(e){function t(t){for(var a,o,l=t[0],s=t[1],c=t[2],u=0,f=[];u<l.length;u++)o=l[u],i[o]&&f.push(i[o][0]),i[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,l=1;l<n.length;l++){var s=n[l];0!==i[s]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},i={app:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/healthy-living/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=s;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("1356"),i=n.n(a);i.a},1356:function(e,t,n){},"17f2":function(e,t,n){"use strict";var a=n("26dd"),i=n.n(a);i.a},"26dd":function(e,t,n){},"4ecd":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=n("9c30"),r=(n("51de"),n("e094"),n("795d"),n("a435"),n("1599"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)}),o=[],l=(n("034f"),n("2877")),s={},c=Object(l["a"])(s,r,o,!1,null,null,null),d=c.exports,u=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Main")],1)},h=[],p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.currentMonthLabel)+" "+e._s(e.currentYearLabel))]),n("FullCalendar",{ref:"fullCalendar",attrs:{defaultView:"dayGridMonth",header:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},plugins:e.calendarPlugins,weekends:e.calendarWeekends,events:e.events},on:{eventRender:e.eventRender,eventClick:e.onEventSelected}}),n("Dialog",e._b({attrs:{show:e.showDialog},on:{closed:e.onCloseDialog,"md-closed":e.onCloseDialog}},"Dialog",e.dialogData,!1))],1)},m=[],v=(n("7514"),n("75fc")),y=(n("ac6a"),n("cebc")),g=(n("96cf"),n("3b8d")),b=n("dc09"),D=n("3cdd"),w=n.n(D),_=n("a20c"),M=n.n(_),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("md-dialog",{attrs:{"md-active":e.showMe},on:{"update:mdActive":function(t){e.showMe=t},"update:md-active":function(t){e.showMe=t}}},[n("md-dialog-title",[e._v(e._s(e.title))]),n("md-content",[e._v(e._s(e.content))]),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:e.close}},[e._v("OK")])],1)],1)],1)},O=[],j={name:"Dialog",props:{title:{type:String,required:!0},content:{type:String,required:!0},show:{type:Boolean,required:!0}},data:function(){return{showMe:!1}},methods:{close:function(){this.showMe=!1,this.$emit("closed")}},watch:{show:{immediate:!0,handler:function(e){this.showMe=e}},showMe:{immediate:!0,handler:function(e){e||this.$emit("closed")}}}},x=j,A=(n("ba52"),Object(l["a"])(x,k,O,!1,null,"af33d0d2",null)),I=A.exports;function C(e){return"".concat(e/1e3,"s")}var L={name:"Main",components:{FullCalendar:b["a"],Dialog:I},data:function(){return{showDialog:!1,dialogData:{title:"",content:""},currentMonthLabel:"",currentYearLabel:"",calendarApi:null,calendarPlugins:[w.a,M.a],calendarWeekends:!0,alreadyDisplayedItems:[],events:[]}},created:function(){this.fetchAnimationConfig().then(this.applyAnimationTiming)},mounted:function(){var e=this,t="".concat("https://cedpoilly.github.io/healthy-living","/data/events.json");console.log(t),fetch(t).then(function(e){return e.text()}).then(JSON.parse).then(function(t){return e.events=t}).then(function(){e.calendarApi=e.$refs.fullCalendar.getApi();var t=e.events[0].start;e.setCalendarDateFromEvents(e.calendarApi,t),e.setCurrentLabels(t),e.calendarApi.setOption("eventOrder","-isMain, start")})},methods:{fetchAnimationConfig:function(){var e=Object(g["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="".concat("https://cedpoilly.github.io/healthy-living","/config/animation.json"),n=function(e){return e.json()},e.next=4,fetch(t).then(n);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),applyAnimationTiming:function(e){var t=e.duration,n=e.delay,a=e.timingFunction,i=document.documentElement;i.style.setProperty("--anim-duration",C(t)),i.style.setProperty("--anim-delay",C(n)),i.style.setProperty("--anim-timing-function",a)},setCalendarDateFromEvents:function(e,t){e.gotoDate(t)},setCurrentLabels:function(e){var t=new Date(e);this.currentMonthLabel=t.toLocaleString("en-us",{month:"long"}),this.currentYearLabel=t.getFullYear()},onEventSelected:function(e){e.el;var t=e.event,n=(e.jsEvent,e.view,t._def.extendedProps.description);n&&this.handleItemWithDescription(t);var a=t._def.extendedProps.linkedItems;a&&this.handleLinkedItems(a)},handleItemWithDescription:function(e){var t=Object(y["a"])({},e._def.extendedProps,e._def),n=t.title,a=t.description;this.dialogData={title:n,content:a},this.showDialog=!0},handleLinkedItems:function(e){e.forEach(this.handleLinkedItem)},handleLinkedItem:function(e,t){var n=this;setTimeout(function(){n.displayLinkedItemIfNotYetDone(e);var a=1e3;n.markItemAsDisplayedAfterDelay(e,t,a)},1e3*t)},displayLinkedItemIfNotYetDone:function(e){var t=this.checkAlreadyDisplayed(e,"title",this.alreadyDisplayedItems);t||this.events.push(e)},markItemAsDisplayedAfterDelay:function(e,t,n){var a=this;setTimeout(function(){a.alreadyDisplayedItems=[].concat(Object(v["a"])(a.alreadyDisplayedItems),[e])},n*t)},eventRender:function(e){var t=e.event._def.extendedProps.isMain,n=this.checkAlreadyDisplayed(e.event._def,"title",this.alreadyDisplayedItems);t||e.el.classList.add("is-sub"),t||n||e.el.classList.add("appear")},checkAlreadyDisplayed:function(e,t,n){var a=n.find(function(n){return e[t]===n[t]});return!!a},onCloseDialog:function(){this.showDialog=!1}}},P=L,S=(n("17f2"),Object(l["a"])(P,p,m,!1,null,null,null)),E=S.exports,$={name:"home",components:{Main:E}},T=$,F=Object(l["a"])(T,f,h,!1,null,null,null),W=F.exports;a["default"].use(u["a"]);var Y=new u["a"]({routes:[{path:"/",name:"home",component:W}]}),R=n("2f62");a["default"].use(R["a"]);var G=new R["a"].Store({state:{},mutations:{},actions:{}});a["default"].use(i["MdContent"]),a["default"].use(i["MdButton"]),a["default"].use(i["MdDialog"]),a["default"].use(i["MdDialogAlert"]),a["default"].config.productionTip=!1,new a["default"]({router:Y,store:G,render:function(e){return e(d)}}).$mount("#app")},ba52:function(e,t,n){"use strict";var a=n("4ecd"),i=n.n(a);i.a}});
//# sourceMappingURL=app.ed941337.js.map