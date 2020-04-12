(this["webpackJsonpreact-chat"]=this["webpackJsonpreact-chat"]||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(3),c=n.n(o),s=(n(9),n(1)),i={"invalid-user":"User not found, please login!","login-unauthorized":"Bad login! You are not permitted to view this content","username-required":"Username is required","network-error":"There is a problem connecting to the network, please try again!","missing-text":"The message content cannot be empty"};var u=function(e){var t=e.users.map((function(e){return a.a.createElement("li",{className:"user",key:e.uid},e.username)}));return a.a.createElement("ul",{className:"users-list"},a.a.createElement("h3",{className:"title"},"Users"),t)};var l=function(e){var t=e.message;return a.a.createElement("li",{className:"message-info"},a.a.createElement("div",{className:"meta-info"},a.a.createElement("span",{className:"sender"},t.sender),a.a.createElement("span",{className:"timestamp"},t.timeStamp)),a.a.createElement("div",{className:"text-info"},a.a.createElement("span",{className:"message-text"},t.text)))};var m=function(e){var t=e.messages.map((function(e,t){return a.a.createElement(l,{key:t,message:e})}));return a.a.createElement("ul",{className:"messages-list"},a.a.createElement("h3",{className:"title"},"Chat Messages"),t)};var f=function(e){var t=e.onAdd,n=Object(r.useState)(""),o=Object(s.a)(n,2),c=o[0],i=o[1];return a.a.createElement("div",null,a.a.createElement("label",null,"Message: "),a.a.createElement("input",{className:"to-add-message",onChange:function(e){i(e.target.value)},value:c}),a.a.createElement("button",{className:"to-send",onClick:function(){c&&(t(c),i(""))}},"Send"))};var d=function(e){var t=e.uid,n=e.trackUserState,o=e.onLogout,c=e.trackError,i=Object(r.useState)([]),l=Object(s.a)(i,2),d=l[0],h=l[1],g=Object(r.useState)([]),E=Object(s.a)(g,2),j=E[0],v=E[1],p=function(){fetch("/users",{method:"GET",credentials:"include"}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){h(e)})).catch((function(e){c(e),n()}))},k=function(){fetch("/messages",{method:"GET",credentials:"include"}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){v(e)})).catch((function(e){c(e),n()}))};return Object(r.useEffect)((function(){if(t){p(),k();var e=setInterval((function(){p(),k()}),3e3);return function(){clearInterval(e)}}}),[t]),a.a.createElement("div",{className:"chat-panel"},a.a.createElement("h1",{className:"title"},"Chat Room"),a.a.createElement("div",{className:"logout"},a.a.createElement("button",{className:"to-logout",onClick:function(){o()}},"Sign out")),a.a.createElement("div",{className:"display-panel"},a.a.createElement(u,{users:d}),a.a.createElement(m,{messages:j})),a.a.createElement("div",{className:"outgoing"},a.a.createElement(f,{onAdd:function(e){(function(e){var t=e.text;return fetch("/messages",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({text:t}),credentials:"include"}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})({text:e}).then((function(e){v(e)})).catch((function(e){c(e)}))}})))};var h=function(e){e.error;var t=e.onLogin,n=Object(r.useState)(""),o=Object(s.a)(n,2),c=o[0],i=o[1];return a.a.createElement("div",{className:"login-panel"},a.a.createElement("input",{className:"username",onChange:function(e){i(e.target.value)},value:c}),a.a.createElement("button",{className:"to-login",onClick:function(){c&&(t(c),i(""))}},"Sign in"))};n(10);var g=function(){var e,t=Object(r.useState)({isLoggedIn:!1}),n=Object(s.a)(t,2),o=n[0],c=n[1],u=Object(r.useState)(""),l=Object(s.a)(u,2),m=l[0],f=l[1],g=Object(r.useState)(""),E=Object(s.a)(g,2),j=E[0],v=E[1];return Object(r.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){c({isLoggedIn:!0}),f(e)}))}),[]),e=o.isLoggedIn?a.a.createElement(d,{uid:m,trackUserState:function(){c({isLoggedIn:!1})},onLogout:function(){fetch("/session",{method:"DELETE",credentials:"include"}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){if(!e.ok)return e.json().then((function(e){return Promise.reject(e)}))})).then((function(){c({isLoggedIn:!1}),f(""),v("")}))},trackError:function(e){v(e.errorCode)}}):a.a.createElement(h,{error:j,onLogin:function(e){(function(e){return fetch("/session",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e})}).catch((function(){return Promise.reject({errorCode:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(e).then((function(e){c({isLoggedIn:!0}),f(e),v("")})).catch((function(e){v(e.errorCode)}))}}),a.a.createElement("div",{className:"chat-app"},a.a.createElement("div",{className:"status"},i[j]),e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.2eee99c8.chunk.js.map