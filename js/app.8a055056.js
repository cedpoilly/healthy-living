(function(e){function t(t){for(var r,o,s=t[0],u=t[1],c=t[2],d=0,f=[];d<s.length;d++)o=s[d],i[o]&&f.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/healthy-living/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("1356"),i=n.n(r);i.a},1356:function(e,t,n){},"17f2":function(e,t,n){"use strict";var r=n("26dd"),i=n.n(r);i.a},"26dd":function(e,t,n){},"4ecd":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=n("9c30"),a=(n("51de"),n("e094"),n("795d"),n("a435"),n("1599"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)}),o=[],s=(n("034f"),n("2877")),u={},c=Object(s["a"])(u,a,o,!1,null,null,null),l=c.exports,d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Main")],1)},h=[],p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.currentMonthLabel)+" "+e._s(e.currentYearLabel))]),n("FullCalendar",{ref:"fullCalendar",attrs:{defaultView:"dayGridMonth",header:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},plugins:e.calendarPlugins,weekends:e.calendarWeekends,events:e.events},on:{eventRender:e.eventRender,eventClick:e.onEventSelected}}),n("Dialog",e._b({attrs:{show:e.showDialog},on:{closed:e.onCloseDialog,"md-closed":e.onCloseDialog}},"Dialog",e.dialogData,!1))],1)},v=[],m=n("bd86"),g=(n("ac6a"),n("75fc")),b=(n("7514"),n("cebc")),y=(n("96cf"),n("3b8d")),w=n("dc09"),O=n("3cdd"),x=n.n(O),j=n("a20c"),k=n.n(j),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("md-dialog",{attrs:{"md-active":e.showMe},on:{"update:mdActive":function(t){e.showMe=t},"update:md-active":function(t){e.showMe=t}}},[n("md-dialog-title",[e._v(e._s(e.title))]),n("md-content",[e._v(e._s(e.content))]),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:e.close}},[e._v("OK")])],1)],1)],1)},I=[],D={name:"Dialog",props:{title:{type:String,required:!0},content:{type:String,required:!0},show:{type:Boolean,required:!0}},data:function(){return{showMe:!1}},methods:{close:function(){this.showMe=!1,this.$emit("closed")}},watch:{show:{immediate:!0,handler:function(e){this.showMe=e}},showMe:{immediate:!0,handler:function(e){e||this.$emit("closed")}}}},M=D,C=(n("ba52"),Object(s["a"])(M,_,I,!1,null,"af33d0d2",null)),L=C.exports;function E(e){return"".concat(e/1e3,"s")}var R=function(e,t,n){var r=e.find(function(e){return t===e[n]}),i=e.indexOf(r);return{item:r,index:i}},P=function(e,t,n){var r=n.find(function(n){return e[t]===n[t]});return!!r},A=function(e,t){var n=e.indexOf(t);if(n<0)return Object(g["a"])(e);var r=Object(g["a"])(e).slice(0,n),i=Object(g["a"])(e).slice(n+1,e.length);return[].concat(Object(g["a"])(r),Object(g["a"])(i))};function S(e,t,n){return e.reduce(function(e,r){if(!r[n])return e;var i=r[n].find(function(e){return t.title===e.title}),a=r[n].indexOf(i)>-1;return a&&(e=r),e},{})}var $=function(e,t,n){var r=!1,i=e.reduce(function(e,i){return r||i.visual!==t||(i.visual=n,r=!0),e=[].concat(Object(g["a"])(e),[i]),e},[]);return i},T=function(e,t){return new Promise(function(t){return setTimeout(t,e)}).then(function(e){return t()})},F={name:"Main",components:{FullCalendar:w["a"],Dialog:L},data:function(){return{showDialog:!1,dialogData:{title:"",content:""},animationConfig:{duration:0,delay:0},currentMonthLabel:"",currentYearLabel:"",calendarApi:null,calendarPlugins:[x.a,k.a],calendarWeekends:!0,displayedItems:[],itemsToRemove:[],events:[]}},created:function(){this.fetchAnimationConfig().then(this.applyAnimationTiming)},mounted:function(){this.fetchEvents().then(this.configCalendar)},methods:{fetchEvents:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="".concat("https://cedpoilly.github.io/healthy-living","/data/events.json"),e.next=3,fetch(t).then(function(e){return e.json()});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),configCalendar:function(e){this.events=e,this.calendarApi=this.$refs.fullCalendar.getApi();var t=this.events[0].start;this.setCalendarDateFromEvents(this.calendarApi,t),this.setCurrentLabels(t);var n="start";this.calendarApi.setOption("eventOrder",n)},fetchAnimationConfig:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="".concat("https://cedpoilly.github.io/healthy-living","/config/animation.json"),n=function(e){return e.json()},e.next=4,fetch(t).then(n);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),applyAnimationTiming:function(e){var t=e.duration,n=e.delay,r=e.timingFunction;this.animationConfig={duration:t,delay:n};var i=document.documentElement;i.style.setProperty("--anim-duration",E(t)),i.style.setProperty("--anim-delay",E(n)),i.style.setProperty("--anim-timing-function",r)},setCalendarDateFromEvents:function(e,t){e.gotoDate(t)},setCurrentLabels:function(e){var t=new Date(e),n=["en-us",{month:"long"}];this.currentMonthLabel=t.toLocaleString.apply(t,n),this.currentYearLabel=t.getFullYear()},onEventSelected:function(e){e.el;var t=e.event,n=(e.jsEvent,e.view,t._def.extendedProps.description);n&&this.handleItemWithDescription(t);var r=t._def.extendedProps.linkedItems;if(r){var i=t._def.extendedProps.isExpanded;i?this.hideLinkedItems(r,t):this.handleLinkedItems(r,t);var a={event:t,list:this.events,expanded:!i};this.toggleExpandedOnMain(a)}},handleItemWithDescription:function(e){var t=Object(b["a"])({},e._def.extendedProps,e._def),n=t.title,r=t.description;this.dialogData={title:n,content:r},this.showDialog=!0},toggleExpandedOnMain:function(e){var t=e.event,n=e.list,r=e.expanded,i=n.find(function(e){return e.title===t.title}),a=n.indexOf(i),o=Object(g["a"])(n);o[a]=Object(b["a"])({},i,{isExpanded:r}),this.events=o},handleLinkedItems:function(e,t){var n=this,r=e.map(function(e){return Object(b["a"])({},e,{visual:"display-future"})}),i={title:t.title,linkedItems:r};r.forEach(function(e,t){return n.handleLinkedItem(e,t,i)})},handleLinkedItem:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(t,n,r){var i,a,o,s,u,c=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=this.animationConfig,a=i.duration,o=i.delay,s=100+(a+o)*n,u=r.linkedItems,e.next=5,T(s,function(){var e=$(u,"display-future","display-current");c.displayedItems=Object(m["a"])({},r.title,Object(g["a"])(e)),c.displayLinkedItemIfNotYetDone(t)});case 5:case"end":return e.stop()}},e,this)}));function t(t,n,r){return e.apply(this,arguments)}return t}(),displayLinkedItemIfNotYetDone:function(e){var t=P(e,"title",this.events);t||(this.events=[].concat(Object(g["a"])(this.events),[e]))},hideLinkedItems:function(e,t){var n=this,r=e.map(function(e){return Object(b["a"])({},e,{visual:"remove-future"})}),i={title:t.title,linkedItems:r};e.forEach(function(e,t){return n.hideLinkedItem(e,t,i)})},hideLinkedItem:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(t,n,r){var i,a,o,s,u,c=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=this.animationConfig,a=i.duration,o=i.delay,s=100+(a+o)*n,u=r.linkedItems,e.next=5,T(s,function(){var e=$(u.reverse(),"remove-future","remove-current");c.displayedItems=Object(m["a"])({},r.title,Object(g["a"])(e)),c.events=Object(g["a"])(c.events)});case 5:case"end":return e.stop()}},e,this)}));function t(t,n,r){return e.apply(this,arguments)}return t}(),eventRender:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(t){var n,r,i,a,o,s,u,c,l,d,f,h,p,v;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.event._def.extendedProps.isMain,!n){e.next=3;break}return e.abrupt("return");case 3:if(t.el.classList.add("is-sub"),r=S(this.events,t.event,"linkedItems"),i=r.title,this.displayedItems[i]){e.next=7;break}return e.abrupt("return");case 7:if(a=JSON.parse(JSON.stringify(this.displayedItems[i])),o=a.find(function(e){return e.title===t.event.title}),o){e.next=11;break}return e.abrupt("return");case 11:if("display-current"===o.visual&&(t.el.classList.add("appear"),s=this.animationConfig,u=s.duration,c=s.delay,l=100+(u+c),T(l,function(){return t.el.classList.remove("appear")}),d=$(this.displayedItems[i],"display-current","display-done"),this.displayedItems=Object(m["a"])({},parent.title,Object(g["a"])(d))),"remove-current"!==o.visual){e.next=19;break}return t.el.classList.add("remove"),f=t.event._def.title,h=R(this.events,f,"title"),p=h.item,v=this.animationConfig.duration-100,e.next=19,this.handleItemRemoval({item:p,stateAffectDelay:v});case 19:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),handleItemRemoval:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(t){var n,r,i=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.item,r=t.stateAffectDelay,e.next=3,T(r,function(){i.events=A(i.events,n)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),onCloseDialog:function(){this.showDialog=!1}}},W=F,Y=(n("17f2"),Object(s["a"])(W,p,v,!1,null,null,null)),G=Y.exports,J={name:"home",components:{Main:G}},N=J,q=Object(s["a"])(N,f,h,!1,null,null,null),B=q.exports;r["default"].use(d["a"]);var K=new d["a"]({routes:[{path:"/",name:"home",component:B}]}),V=n("2f62");r["default"].use(V["a"]);var z=new V["a"].Store({state:{},mutations:{},actions:{}});r["default"].use(i["MdContent"]),r["default"].use(i["MdButton"]),r["default"].use(i["MdDialog"]),r["default"].use(i["MdDialogAlert"]),r["default"].config.productionTip=!1,new r["default"]({router:K,store:z,render:function(e){return e(l)}}).$mount("#app")},ba52:function(e,t,n){"use strict";var r=n("4ecd"),i=n.n(r);i.a}});
//# sourceMappingURL=app.8a055056.js.map