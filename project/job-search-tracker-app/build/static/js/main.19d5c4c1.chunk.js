(this["webpackJsonpjob-search-tracker-app"]=this["webpackJsonpjob-search-tracker-app"]||[]).push([[0],[,,function(e,t,n){e.exports=n.p+"static/media/logo.09b9f758.jpg"},,,,function(e,t,n){e.exports=n.p+"static/media/spinner.05360875.svg"},,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(5),r=n.n(c),l=(n(13),n(1)),s=function(e){return{message:"network error",err:e}},i=function(e){return Promise.reject(e)},u={username_required:"pleaser enter an non_empty username",no_valid_session:"User not found, please refresh and login!",login_denied:"Bad login! Please enter valid username",action_not_permitted:"username is not correct","no such_taskId":"Job id is not correct, please check it",failed_to_update:"The Job does not exist",missing_text:"Job company and/or Job position is empty, please enter it!",network_error:"There is a problem connecting to the network, please try again!"},m=n(6),d=n.n(m),b=n(2),p=n.n(b);var E=function(e){var t=e.onLogin,n=Object(a.useState)(""),c=Object(l.a)(n,2),r=c[0],m=c[1],b=Object(a.useState)(!1),E=Object(l.a)(b,2),h=E[0],f=E[1],j=Object(a.useState)(""),v=Object(l.a)(j,2),g=v[0],O=v[1];return o.a.createElement("div",{className:"login-container"},o.a.createElement("div",{className:"logo"},o.a.createElement("img",{className:"app-logo",src:p.a,alt:"logo"})),o.a.createElement("h4",{className:"greeting"},"hello :)"),o.a.createElement("p",{className:"error"},g),o.a.createElement("div",{className:"login-body"},o.a.createElement("input",{className:"username",onChange:function(e){m(e.target.value)},value:r}),h?o.a.createElement("img",{alt:"spinner",src:d.a}):o.a.createElement("button",{className:"to-login",onClick:function(){var e;r&&""!==r.trim()?(O(""),f(!0),(e=r,fetch("/session",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e})}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)}))).then((function(e){t(e.username)})).catch((function(e){O(u[e.errorCode]),f(!1)}))):O(u.username_required)}},"Login")))};var h=function(e){var t=e.username,n=e.onLogout,a=e.onBack;return o.a.createElement("nav",{className:"header"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("img",{className:"nav-logo",src:p.a,alt:"logo"})),o.a.createElement("li",{className:"app-name"},o.a.createElement("span",{onClick:function(){a(t)}},"JobTrackerXi")),o.a.createElement("span",null,o.a.createElement("li",null,t),o.a.createElement("li",{className:"to-logout",onClick:function(){fetch("/session",{method:"DELETE",headers:new Headers({"content-type":"application/json"})}).catch(s).then((function(e){if(!e.ok)return e.json().then(i)})).then((function(){return n()}))}},"Logout"))))},f=["","applied","interview","offer","rejected"];var j=function(e){var t=e.username,n=e.job,c=e.onAdd,r=e.onUpdate,s=e.onBack,i=Object(a.useState)(n.company),u=Object(l.a)(i,2),m=u[0],d=u[1],b=Object(a.useState)(n.position),p=Object(l.a)(b,2),E=p[0],h=p[1],j=Object(a.useState)(n.status),v=Object(l.a)(j,2),g=v[0],O=v[1],S=Object(a.useState)(n.appliedDate),y=Object(l.a)(S,2),N=y[0],k=y[1],w=Object(a.useState)(n.interview1Date),J=Object(l.a)(w,2),C=J[0],R=J[1],D=Object(a.useState)(n.interview2Date),I=Object(l.a)(D,2),L=I[0],_=I[1],T=Object(a.useState)(n.offerDate),x=Object(l.a)(T,2),B=x[0],A=x[1],H=Object(a.useState)(n.url),P=Object(l.a)(H,2),U=P[0],q=P[1],G=Object(a.useState)(n.location),W=Object(l.a)(G,2),F=W[0],M=W[1],X=Object(a.useState)(n.description),Z=Object(l.a)(X,2),V=Z[0],$=Z[1];return o.a.createElement("div",{className:"job-form"},o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={company:m,position:E,status:g,appliedDate:N,interview1Date:C,interview2Date:L,offerDate:B,url:U,location:F,description:V};0===Object.keys(n).length&&n.constructor===Object?c(t,a):r(t,n.jobId,a)}},o.a.createElement("h2",{className:"title"},"Job Info"),o.a.createElement("div",{className:"job-basic-info"},o.a.createElement("div",null,o.a.createElement("p",null,"Company*: "),o.a.createElement("input",{className:"job-company",type:"text",onChange:function(e){d(e.target.value)},value:m,required:!0})),o.a.createElement("div",null,o.a.createElement("p",null," Job title*: "),o.a.createElement("input",{className:"job-position",type:"text",onChange:function(e){h(e.target.value)},value:E,required:!0})),o.a.createElement("div",null,o.a.createElement("p",null,"Status:",o.a.createElement("select",{className:"options",onChange:function(e){O(e.target.value)},value:g},f.map((function(e,t){return o.a.createElement("option",{key:t,value:e},e)})))))),o.a.createElement("div",{className:"log-dates"},o.a.createElement("div",null,o.a.createElement("p",null,"Applied date: "),o.a.createElement("input",{type:"date",className:"applicated-date",onChange:function(e){k(e.target.value)},value:N})),o.a.createElement("div",null,o.a.createElement("p",null,"Interview1 date: "),o.a.createElement("input",{type:"date",className:"interview1-date",onChange:function(e){R(e.target.value)},value:C})),o.a.createElement("div",null,o.a.createElement("p",null,"Interview2 date: "),o.a.createElement("input",{type:"date",className:"interview2-date",onChange:function(e){_(e.target.value)},value:L})),o.a.createElement("div",null,o.a.createElement("p",null,"Offer date: "),o.a.createElement("input",{type:"date",className:"offer-date",onChange:function(e){A(e.target.value)},value:B})),o.a.createElement("div",null,o.a.createElement("p",null,"Post URL: "),o.a.createElement("input",{className:"url",type:"text",placehold:"+ add URL",onChange:function(e){q(e.target.value)},value:U})),o.a.createElement("div",null,o.a.createElement("p",null,"Location: "),o.a.createElement("input",{className:"location",type:"text",placehold:"+ add location",onChange:function(e){M(e.target.value)},value:F}))),o.a.createElement("div",null,o.a.createElement("p",null,"Description: "),o.a.createElement("textarea",{className:"description",rows:"4",cols:"100",onChange:function(e){$(e.target.value)},value:V})),o.a.createElement("div",null,o.a.createElement("input",{className:"submit",type:"submit",value:"Submit"}))),o.a.createElement("div",{className:"back-home"},o.a.createElement("button",{className:"to-back-home",onClick:function(){s(t)}},"Cancel")))},v=n(7);var g=function(e){var t=e.username,n=e.job,a=e.onRemoveJob,c=e.onShowJob;return o.a.createElement("li",{className:"job"},o.a.createElement("span",{"data-job-id":n.jobId,className:"company",onClick:function(e){var n=e.target.dataset.jobId;c(t,n)}},n.company),o.a.createElement("span",{"data-job-id":n.jobId,className:"position"},n.position),o.a.createElement("button",{"data-job-id":n.jobId,className:"to-remove-job",onClick:function(e){var n=e.target.dataset.jobId;a(t,n)}},"delete"))};var O=function(e){var t=e.username,n=e.jobs,c=e.onRemoveJob,r=e.onShowJob,l=Object(a.useMemo)((function(){return n.map((function(e){return o.a.createElement(g,{key:e.jobId,job:e,username:t,onRemoveJob:c,onShowJob:r})}))}),[n,c,t,r]);return o.a.createElement("ul",{className:"job-list"},l)};var S=function(e){var t=e.onSort,n=function(e){t(e.target.value)};return o.a.createElement("div",{className:"sort-panel"},o.a.createElement("label",null,"Order:"),o.a.createElement("input",{type:"radio",value:"ORDER_ASC",name:"sort-option",onClick:n}),o.a.createElement("label",null,"A-Z"),o.a.createElement("input",{type:"radio",value:"ORDER_DESC",name:"sort-option",onClick:n}),o.a.createElement("label",null,"Z-A"))};var y=function(e){var t=e.username,n=e.jobs,c=e.onRemoveJob,r=e.onShowJob,s=Object(a.useState)([]),i=Object(l.a)(s,2),u=i[0],m=i[1],d=Object(a.useState)([]),b=Object(l.a)(d,2),p=b[0],E=b[1],h=Object(a.useState)([]),f=Object(l.a)(h,2),j=f[0],g=f[1],y=Object(a.useState)([]),N=Object(l.a)(y,2),k=N[0],w=N[1],J=Object(a.useState)([]),C=Object(l.a)(J,2),R=C[0],D=C[1],I=Object(a.useState)(""),L=Object(l.a)(I,2),_=L[0],T=L[1];return Object(a.useEffect)((function(){n&&function(e,t){switch(t){case"ORDER_ASC":e.sort((function(e,t){return e.company>t.company?1:-1}));break;case"ORDER_DESC":e.sort((function(e,t){return t.company>e.company?1:-1}))}var n,a=[],o=[],c=[],r=[],l=[],s=Object(v.a)(e);try{for(s.s();!(n=s.n()).done;){var i=n.value;switch(i.status){case"applied":a.push(i);break;case"interview":o.push(i);break;case"offer":c.push(i);break;case"rejected":r.push(i);break;default:l.push(i)}}}catch(u){s.e(u)}finally{s.f()}m(a),E(o),g(c),w(r),D(l)}(n,_)}),[n,_]),o.a.createElement("div",null,o.a.createElement(S,{onSort:function(e){T(e)}}),o.a.createElement("div",{className:"jobs-panel"},o.a.createElement("div",null,o.a.createElement("h4",null,"APPLIED"),o.a.createElement("h5",null,u.length," JOBS"),o.a.createElement(O,{username:t,jobs:u,onRemoveJob:c,onShowJob:r})),o.a.createElement("div",null,o.a.createElement("h4",null,"INTERVIEW"),o.a.createElement("h5",null,p.length," JOBS"),o.a.createElement(O,{username:t,jobs:p,onRemoveJob:c,onShowJob:r})),o.a.createElement("div",null,o.a.createElement("h4",null,"OFFER"),o.a.createElement("h5",null,j.length," JOBS"),o.a.createElement(O,{username:t,jobs:j,onRemoveJob:c,onShowJob:r})),o.a.createElement("div",null,o.a.createElement("h4",null,"REJECTED"),o.a.createElement("h5",null,k.length," JOBS"),o.a.createElement(O,{username:t,jobs:k,onRemoveJob:c,onShowJob:r})),o.a.createElement("div",null,o.a.createElement("h4",null,"OTHERS"),o.a.createElement("h5",null,R.length," JOBS"),o.a.createElement(O,{username:t,jobs:R,onRemoveJob:c,onShowJob:r}))))};var N=function(){return o.a.createElement("footer",null,o.a.createElement("ul",{className:"footer-personal-info"},o.a.createElement("li",null,"\xa9 2020 JobTrackerXi "),o.a.createElement("li",null," E-mail:xi.xi@husky.neu.edu ")))};var k=function(e){var t=e.username,n=e.onLogout,c=Object(a.useState)(!0),r=Object(l.a)(c,2),m=r[0],d=r[1],b=Object(a.useState)(""),p=Object(l.a)(b,2),E=p[0],f=p[1],v=Object(a.useState)([]),g=Object(l.a)(v,2),O=g[0],S=g[1],k=Object(a.useState)({}),w=Object(l.a)(k,2),J=w[0],C=w[1],R=function(e){(function(e){return fetch("/jobs/".concat(e),{method:"GET",headers:new Headers({"content-type":"application/json"}),credentials:"include"}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)}))})(e).then((function(e){S(e),d(!0)})).catch((function(e){f(u[e.errorCode])}))};Object(a.useEffect)((function(){t&&R(t)}),[t]);var D,I=function(e){R(e)};return D=m?o.a.createElement("div",null,o.a.createElement(y,{username:t,jobs:O,onRemoveJob:function(e,t){(function(e,t){return fetch("/jobs/".concat(e,"/").concat(t),{method:"DELETE",headers:new Headers({"content-type":"application/json"}),credentials:"include"}).catch(s).then((function(e){if(!e.ok)return e.json().then(i)}))})(e,t).then((function(){R(e)})).catch((function(e){f(u[e.errorCode])}))},onShowJob:function(e,t){(function(e,t){return fetch("/jobs/".concat(e,"/").concat(t),{method:"GET",headers:new Headers({"content-type":"application/json"}),credentials:"include"}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)}))})(e,t).then((function(e){C(e),d(!1)})).catch((function(e){f(u[e.errorCode])}))}}),o.a.createElement("div",{className:"outgoing"},o.a.createElement("button",{className:"to-add-job",onClick:function(){return d(!1)}},"+ Add Job"))):o.a.createElement(j,{username:t,job:J,onAdd:function(e,t){(function(e,t){return fetch("/jobs/".concat(e),{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({job:t}),credentials:"include"}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)}))})(e,t).then((function(){R(e)})).catch((function(e){f(u[e.errorCode])}))},onUpdate:function(e,t,n){(function(e,t,n){return fetch("/jobs/".concat(e,"/").concat(t),{method:"PUT",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({job:n}),credentials:"include"}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)}))})(e,t,n).then((function(){R(e),C({})})).catch((function(e){f(u[e.errorCode])}))},onBack:I}),o.a.createElement("div",{className:"jobs-app"},o.a.createElement(h,{username:t,onLogout:n,onBack:I}),o.a.createElement("div",{className:"error"},E),D,o.a.createElement(N,null))};n(14);var w=function(){var e=Object(a.useState)({isLoggedIn:!1,username:""}),t=Object(l.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){fetch("/session",{method:"GET",headers:new Headers({"content-type":"application/json"})}).catch(s).then((function(e){return e.ok?e.json():e.json().then(i)})).then((function(e){c({isLoggedIn:!0,username:e.username})}))}),[]),o.a.createElement("div",{className:"app"},n.isLoggedIn?o.a.createElement(k,{username:n.username,onLogout:function(){c({isLoggedIn:!1,username:""})}}):o.a.createElement(E,{onLogin:function(e){c({isLoggedIn:!0,username:e})}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.19d5c4c1.chunk.js.map