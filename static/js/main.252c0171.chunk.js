(this["webpackJsonppathways-client"]=this["webpackJsonppathways-client"]||[]).push([[0],{205:function(e){e.exports=JSON.parse('{"call":{"title":"Upcoming Calls","seeAll":"See All","noCalls":"No upcoming calls","minutes":"minutes","ago":"ago","join":"join"},"connection":{"approved":"Approved","pending":"Pending","title":"Connections"}}')},206:function(e){e.exports=JSON.parse('{"doc":{"warning":"DOC Warning"},"peer":{"joinedCallTitle":"joined the call","joinedCallBody":"Your call will connect soon.","muted":"muted their mic","unmuted":"unmuted their mic","videoOn":"turned on their video","videoOff":"turned off their video"},"waitingRoom":{"initialization":"Initializing video call...","waitingForPrefix":"Waiting for","waitingForSuffix":"to join the call","loading":"Loading..."},"chat":{"title":"Chat","placeholder":"Type here..."}}')},207:function(e){e.exports=JSON.parse('{"title":"Welcome to pathways","buttonText":"Login","placeholder":{"inmateNumber":"Inmate Number","pinCode":"Pin Code"}}')},208:function(e){e.exports=JSON.parse('{"title":"Bienvenido a Ameelio","buttonText":"Iniciar Sesi\xf3n","placeholder":{"inmateNumber":"N\xfamero de Persona Encarcelada","pinCode":"C\xf3digo PIN"}}')},209:function(e){e.exports=JSON.parse('{"call":{"title":"Pr\xf3ximas llamadas","seeAll":"Ver Todo","noCalls":"No hay pr\xf3ximas llamadas","minutes":"minutos","ago":"atr\xe1s","join":"\xdanete"},"connection":{"approved":"Aprobada(o)s","pending":"Pendientes","title":"Conexiones"}}')},210:function(e){e.exports=JSON.parse('{"doc":{"warning":"DOC Warning"},"peer":{"joinedCallTitle":"joined the call","joinedCallBody":"Your call will connect soon.","muted":"muted their mic","unmuted":"unmuted their mic","videoOn":"turned on their video","videoOff":"turned off their video"},"waitingRoom":{"initialization":"Initializing video call...","waitingForPrefix":"Waiting for","waitingForSuffix":"to join the call","loading":"Loading..."},"chat":{"title":"Chat","placeholder":"Type here..."}}')},240:function(e,t,n){},241:function(e,t,n){},259:function(e,t,n){},320:function(e,t){},323:function(e,t,n){},334:function(e,t,n){},400:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(0),c=n.n(r),i=n(27),o=n.n(i),s=(n(240),n(39)),u=(n(241),n(52)),l=n(42),d=n(89),p=n(402),h=n(49),f=function(e){var t="";if(e.isAuthenticated||(t=e.authenticationPath),t){return Object(a.jsx)(h.b,Object(s.a)(Object(s.a)({},e),{},{component:function(){return Object(a.jsx)(h.a,{to:{pathname:t}})},render:void 0}))}return Object(a.jsx)(h.b,Object(s.a)({},e))},b=n(7),j=n.n(b),m=n(19),O=n(414),v=n(99),x=n(407),g=n(408),w=n(409),y=n(411),k=n(98),I=n(193),C=n(53),T=n(69),N=n(66),S=n(32),P=n(126),M=n.n(P),E=Object(N.b)("calls/fetchAll",Object(m.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut("calls");case 2:if(200===(t=e.sent).status){e.next=5;break}throw t;case 5:return n=t.data.calls.map((function(e){return M()(e)})),e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),A=Object(N.c)(),D=Object(N.d)({name:"calls",initialState:A.getInitialState(),reducers:{},extraReducers:function(e){e.addCase(E.fulfilled,(function(e,t){return A.setAll(e,t.payload)}))}}),H=(D.actions,n(410)),z=n(59),L=n(413),B=n(228),q=Object(N.b)("connections/fetchAll",Object(m.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut("connections");case 2:if(200===(t=e.sent).status){e.next=5;break}throw t;case 5:return n=t.data.connections.map((function(e){return M()(e)})),e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),R=Object(N.c)(),V=Object(N.d)({name:"connection",initialState:R.getInitialState(),reducers:{},extraReducers:function(e){e.addCase(q.fulfilled,(function(e,t){R.setAll(e,t.payload)}))}}),F=(V.actions,n(227)),G=n(229);var W=function(e){return e.split(" ").map((function(e){return e[0]})).join("")},Z=function(e){return e?"".concat(e.firstName," ").concat(e.lastName):""},U=function(e,t,n){F.a[n]({message:e,description:t})},Y=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3;switch(n){case"success":G.b.success({content:t,key:e,duration:a});break;case"error":G.b.error({content:t,key:e,duration:a});break;case"warning":G.b.warning({content:t,key:e,duration:a});break;case"loading":G.b.loading({content:t,key:e,duration:a});break;default:G.b.info({content:t,key:e,duration:a})}};function J(e){var t=["#093145","#3C6478","#107896","#43ABC9","#C2571A","#9A2617"];return t[Math.abs(function(e){for(var t=0,n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<6)-t);return t}(e)%t.length)]}function _(e){return null!==e&&void 0!==e}var X=A.getSelectors((function(e){return e.calls})),K=X.selectAll,Q=X.selectById,$=R.getSelectors((function(e){return e.connections})),ee=$.selectAll,te=$.selectById,ne=function(e,t){var n=Q(e,t);if(n)return function(e,t){var n=te(e,t.connectionId);if(n)return Object(s.a)(Object(s.a)({},t),{},{connection:n})}(e,n)},ae=function(e){return K(e).map((function(t){return ne(e,t.id)})).filter(_).filter((function(e){return"ended"!==e.status&&"terminated"!==e.status}))},re=n(403),ce=n(416),ie=n(406),oe=n(417),se=(n(259),n(415)),ue=n(232),le=n(205),de=n(206),pe=n(207),he=n(208),fe=n(209),be=n(210),je=n(111),me={en:{login:pe,dashboard:le,call:de},es:{login:he,dashboard:fe,call:be}};ue.a.use(je.e).init({lng:"en",ns:["login","dashboard","call"],resources:me});var Oe=p.a.Content,ve={fetchCalls:E,push:l.d};var xe=Object(u.c)((function(e){return{calls:ae(e),connections:ee(e),firstName:e.session.user.firstName}}),ve)((function(e){var t,n=e.calls,c=e.connections,i=e.fetchCalls,o=e.push,s=e.firstName,u=Object(se.a)("dashboard").t,l=[{key:"approved",tab:u("connection.approved")},{key:"pending",tab:u("connection.pending")}],d=Object(r.useState)((t=Ke)[Math.floor(Math.random()*t.length)]),h=Object(S.a)(d,1)[0],f=Object(r.useState)(new Date),b=Object(S.a)(f,2),w=b[0],y=b[1],I=Object(r.useState)("approved"),C=Object(S.a)(I,2),T=C[0],N=C[1];return Object(r.useEffect)((function(){var e=setInterval((function(){y(new Date)}),1e3);return function(){return clearInterval(e)}})),Object(r.useEffect)((function(){Object(m.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()}),[i]),Object(a.jsx)(p.a,{style:{minHeight:"100vh"},children:Object(a.jsxs)(Oe,{children:[Object(a.jsx)(H.a,{title:"Hi ".concat(s,"!")}),Object(a.jsxs)(O.b,{direction:"vertical",size:"large",style:Xe,className:"w-100",children:[Object(a.jsx)(v.a,{children:Object(a.jsx)(z.a,{span:24,children:Object(a.jsxs)("div",{children:[Object(a.jsxs)(O.b,{direction:"vertical",align:"center",style:{backgroundImage:"url(".concat(h.background,")"),width:"100%"},className:"dashboard-header-container",children:[Object(a.jsx)("div",{children:Object(a.jsx)(g.a.Title,{level:2,className:"dashboard-header-content",children:Object(ie.a)(w,"HH:mm")})}),Object(a.jsx)(g.a.Title,{level:5,className:"dashboard-header-content",children:h.quote}),Object(a.jsx)(g.a.Text,{className:"dashboard-header-content",children:h.author})]}),Object(a.jsx)("div",{style:{width:"100%",backgroundColor:"white"}})]})})}),Object(a.jsxs)(v.a,{gutter:16,children:[Object(a.jsx)(z.a,{span:16,children:Object(a.jsxs)(x.a,{title:u("call.title"),extra:Object(a.jsx)(g.a.Link,{onClick:function(){return o("/")},children:u("call.seeAll")}),children:[!n.length&&Object(a.jsx)(g.a.Text,{children:u("call.noCalls")}),Object(a.jsx)(O.b,{}),n.map((function(e){var t,n=Object(oe.a)(new Date(e.start),new Date);return Object(a.jsx)(L.a.Ribbon,{text:Object(re.a)(w)?"Today":"",children:Object(a.jsx)(x.a,{children:Object(a.jsxs)(v.a,{justify:"space-between",align:"bottom",children:[Object(a.jsxs)(O.b,{direction:"vertical",children:[Object(a.jsx)(g.a.Title,{level:5,children:(t=new Date(e.start),Object(re.a)(t)?"Today":Object(ce.a)(t)?"Tomorrow":Object(ie.a)(t,"EEEE, MMMM d"))}),Object(a.jsxs)(g.a.Text,{children:[Object(ie.a)(new Date(e.start),"HH:mm")," -"," ",Object(ie.a)(new Date(e.end),"HH:mm")," \u2022"," ",n>0?"starts in ":"started ",Object(a.jsxs)(g.a.Text,{type:n>=0?"warning":"danger",children:[Math.abs(n)," ",u("call.minutes")," ",n<0&&"".concat(u("call.ago"))]})]}),Object(a.jsxs)(O.b,{children:[Object(a.jsx)(B.a,{src:e.connection.user.profileImgPath}),Object(a.jsx)(g.a.Text,{type:"secondary",children:Z(e.connection.user)})]})]}),Object(a.jsx)(O.b,{children:Object(a.jsx)(k.a,{size:"large",type:"primary",onClick:function(){return o("call/".concat(e.id))},children:u("call.join")})})]})},e.id)})}))]})}),Object(a.jsx)(z.a,{span:8,children:Object(a.jsx)(x.a,{title:u("connection.title"),tabList:l,activeTabKey:T,onTabChange:function(e){return N(e)},children:Object(a.jsx)(v.a,{justify:"space-around",children:c.filter((function(e){return e.status===T})).map((function(e){return Object(a.jsx)(z.a,{className:"d-flex flex-column align-items-center",children:Object(a.jsxs)(O.b,{direction:"vertical",children:[Object(a.jsx)(B.a,{size:80,style:{backgroundColor:J(Z(e.user))},children:W(Z(e.user))}),Object(a.jsx)(g.a.Text,{children:Z(e.user)})]})},e.id)}))})})})]})]})]})})})),ge=n(165),we=n(219),ye=n(220),ke="audioType",Ie="videoType";window.rc=null,window.consumers=[],window.producers=[];var Ce={video:{width:{min:640,ideal:1920},height:{min:400,ideal:1080},encodings:[{rid:"r0",maxBitrate:1e5,scalabilityMode:"S1T3"},{rid:"r1",maxBitrate:3e5,scalabilityMode:"S1T3"},{rid:"r2",maxBitrate:9e5,scalabilityMode:"S1T3"}],codecOptions:{videoGoogleStartBitrate:1e3}}},Te=function(){function e(t,n,a){Object(we.a)(this,e),window.rc=this,this.mediasoupClient=t,this.socket=n,this.callId=a,this.producerTransport=null,this.consumerTransport=null,this.device=null,this.consumers={},this.producers={},this.micProducer=null,this.videoProducer=null,this.handlers={consume:[]}}return Object(ye.a)(e,[{key:"request",value:function(){var e=Object(m.a)(j.a.mark((function e(t,n){var a=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){a.socket.emit(t,n,(function(t){t.error?r(t.error):e(t)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleTransportConnect",value:function(){var e=Object(m.a)(j.a.mark((function e(t){var n=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){t.on("connect",function(){var a=Object(m.a)(j.a.mark((function a(r,c,i){var o;return j.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return o=r.dtlsParameters,a.next=3,n.request("establishDtls",{dtlsParameters:o,callId:n.callId,transportId:t.id});case 3:c(),e();case 5:case"end":return a.stop()}}),a)})));return function(e,t,n){return a.apply(this,arguments)}}())})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"init",value:function(){var e=Object(m.a)(j.a.mark((function e(){var t,n,a,r,c=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.request("join",{callId:this.callId});case 2:return t=e.sent,n=t.producerTransportInfo,a=t.consumerTransportInfo,r=t.routerRtpCapabilities,e.next=8,this.loadDevice(r);case 8:return this.device=e.sent,n&&(this.producerTransport=this.device.createSendTransport(n),this.handleTransportConnect(this.producerTransport)),this.consumerTransport=this.device.createRecvTransport(a),this.handleTransportConnect(this.consumerTransport),e.next=14,this.request("declareRtpCapabilities",{rtpCapabilities:this.device.rtpCapabilities});case 14:this.request("finishConnecting",{callId:this.callId}),this.producerTransport&&this.producerTransport.on("produce",function(){var e=Object(m.a)(j.a.mark((function e(t,n,a){var r,i,o,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.kind,i=t.rtpParameters,e.next=3,c.request("produce",{callId:c.callId,kind:r,rtpParameters:i});case 3:o=e.sent,s=o.producerId,n({id:s});case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()),this.socket.on("consume",function(){var e=Object(m.a)(j.a.mark((function e(t){var n,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.consume(t);case 2:n=e.sent,a=n.consumer,r=n.stream,c.socket.emit("resumeConsumer",{callId:c.callId,consumerId:a.id}),c.handlers.consume.forEach((function(e){return e(t.kind,r,t.user)}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 17:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMediaConstraints",value:function(e,t){return e===ke?{audio:{deviceId:t}}:e===Ie?{video:{width:Ce.video.width,height:Ce.video.height,deviceId:t}}:void 0}},{key:"produce",value:function(){var e=Object(m.a)(j.a.mark((function e(t){var n,a,r,c,i,o,s=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:null,a=this.getMediaConstraints(t,n),e.next=4,navigator.mediaDevices.getUserMedia(a);case 4:return r=e.sent,c=(t===ke?r.getAudioTracks():r.getVideoTracks())[0],i={track:c},t===Ie&&(i.encodings=Ce.video.encodings,i.codecOptions=Ce.video.codecOptions),e.next=10,this.producerTransport.produce(i);case 10:o=e.sent,console.log(o),window.producers.push(o),this.producers[o.id]=o,"audio"===o._kind?this.micProducer=o:"video"===o._kind&&(this.videoProducer=o);case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"loadDevice",value:function(){var e=Object(m.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new this.mediasoupClient.Device,e.next=3,n.load({routerRtpCapabilities:t});case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"consume",value:function(){var e=Object(m.a)(j.a.mark((function e(t){var n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.consumerTransport.consume(t);case 2:return n=e.sent,a=new MediaStream,this.consumers[n.id]=n,a.addTrack(n.track),e.abrupt("return",{consumer:n,stream:a});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"on",value:function(){var e=Object(m.a)(j.a.mark((function e(t,n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t in this.handlers||(this.handlers[t]=[]),this.handlers[t].push(n);case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"terminate",value:function(){var e=Object(m.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.request("terminate",{callId:this.callId});case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"pauseAudio",value:function(){this.socket.emit("producerUpdate",{callId:this.callId,contents:{producerId:this.micProducer.id,active:!0,type:"audio"}}),this.micProducer&&this.micProducer.pause()}},{key:"resumeAudio",value:function(){this.socket.emit("producerUpdate",{callId:this.callId,contents:{producerId:this.micProducer.id,active:!1,type:"audio"}}),this.micProducer&&this.micProducer.resume()}},{key:"resumeWebcam",value:function(){this.socket.emit("producerUpdate",{callId:this.callId,contents:{producerId:this.videoProducer.id,active:!0,type:"video"}}),this.videoProducer&&this.videoProducer.resume()}},{key:"pauseWebcam",value:function(){this.socket.emit("producerUpdate",{callId:this.callId,contents:{callId:this.videoProducer.id,active:!1,type:"video"}}),this.videoProducer&&this.videoProducer.pause()}}]),e}(),Ne=n(221),Se=n(222),Pe=n.n(Se),Me=n(404),Ee=n(405),Ae=(n(323),n(418)),De=n(419),He=n(420),ze=n(421),Le=n(422);var Be=p.a.Sider;function qe(e){var t=e.message;return Object(a.jsx)("div",{className:"video-loading-spinner",children:Object(a.jsx)(Me.a,{tip:t})})}var Re={audio:!1,video:{width:{min:640,ideal:1920},height:{min:400,ideal:1080}}};function Ve(e){var t=e.message,n=t.from.type;return Object(a.jsxs)(O.b,{direction:"vertical",align:"inmate"===n?"end":"start",style:{width:"100%"},children:[Object(a.jsxs)(O.b,{children:[Object(a.jsx)(g.a.Text,{strong:!0,children:function(){switch(n){case"inmate":return"You";case"monitor":return"DOC";case"user":return"Loved One"}}()}),Object(a.jsx)(g.a.Text,{type:"secondary",children:Object(ie.a)(new Date(t.timestamp),"HH:mm")})]}),Object(a.jsx)(g.a.Text,{children:t.content})]})}var Fe={push:l.d},Ge=Object(u.c)((function(e,t){return{call:ne(e,parseInt(t.match.params.id)),authInfo:e.session.authInfo,initials:W(Z(e.session.user))}}),Fe)(c.a.memo((function(e){var t=e.call,n=e.authInfo,c=e.push,i=e.initials,o=Object(se.a)("call").t,s=Object(r.useState)(!1),u=Object(S.a)(s,2),l=u[0],d=u[1],h=Object(r.useState)(),f=Object(S.a)(h,2),b=f[0],v=f[1],x=Object(r.useState)(),w=Object(S.a)(x,2),I=w[0],C=w[1],T=Object(r.useState)(!0),N=Object(S.a)(T,2),P=N[0],M=N[1],E=Object(r.useState)(!1),A=Object(S.a)(E,2),D=A[0],z=A[1],q=Object(r.useState)(!1),R=Object(S.a)(q,2),V=R[0],F=R[1],G=function(e){var t=Object(r.useState)(),n=Object(S.a)(t,2),a=n[0],c=n[1];return Object(r.useEffect)((function(){function t(){return(t=Object(m.a)(j.a.mark((function t(){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia(e);case 3:n=t.sent,c(n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}if(a)return function(){a.getTracks().forEach((function(e){e.stop()}))};!function(){t.apply(this,arguments)}()}),[a,e]),a}(Re),J=Object(r.useState)(""),_=Object(S.a)(J,2),X=_[0],K=_[1],Q=Object(r.useState)([]),$=Object(S.a)(Q,2),ee=$[0],te=$[1],ne=Object(r.useState)(!0),ae=Object(S.a)(ne,2),re=ae[0],ce=ae[1],ie=Object(r.useState)(!0),oe=Object(S.a)(ie,2),ue=oe[0],le=oe[1],de=Object(r.useState)(!1),pe=Object(S.a)(de,2),he=pe[0],fe=pe[1],be=Object(r.useState)(!0),je=Object(S.a)(be,2),me=je[0],Oe=je[1],ve=Object(r.useState)(!0),xe=Object(S.a)(ve,2),we=xe[0],ye=xe[1],ke=Object(r.useRef)(null);ke.current&&!ke.current.srcObject&&G&&(ke.current.srcObject=G),Object(r.useEffect)((function(){if(!I){var e=Pe.a.connect("".concat("wss://connect-api-staging.ameelio.org/")||!1);C(e)}return function(){null===I||void 0===I||I.close()}}),[C,I]);var Ie=Object(r.useCallback)(Object(m.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return n=new Te(Ne,I,t.id),e.next=5,n.init();case 5:v(n);case 6:case"end":return e.stop()}}),e)}))),[t,I]);Object(r.useEffect)((function(){!l&&I&&t&&Object(m.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(I),I.connected){e.next=7;break}return console.log("Not connected, so waiting until connected."),window.Debug=I,e.next=6,new Promise((function(e){return I.on("connect",e)}));case 6:console.log("OK");case 7:return e.next=9,new Promise((function(e){I.emit("authenticate",{type:n.type,id:n.id,token:n.token},e)}));case 9:return e.next=11,Ie();case 11:d(!0);case 12:case"end":return e.stop()}}),e)})))()}),[t,n,I,Ie,l]),Object(r.useEffect)((function(){b&&l&&Object(m.a)(j.a.mark((function e(){var t,n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices();case 2:return t=e.sent,n=Array.from(t).filter((function(e){return"videoinput"===e.kind}))[0],e.next=6,b.produce("videoType",n);case 6:return a=Array.from(t).filter((function(e){return"audioinput"===e.kind}))[0],e.next=9,b.produce("audioType",a);case 9:case"end":return e.stop()}}),e)})))()}),[l,b]),Object(r.useEffect)((function(){b&&l&&(console.log("listening to text message"),b.socket.on("textMessage",function(){var e=Object(m.a)(j.a.mark((function e(t){var n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.from,a=t.contents,t.meta,fe(!0),"monitor"===n.type&&U(o("doc.warning"),a,"warning"),te((function(e){return[].concat(Object(ge.a)(e),[{content:a,from:n,timestamp:(new Date).toLocaleDateString()}])}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b.socket.on("peerUpdate",function(){var e=Object(m.a)(j.a.mark((function e(t){var n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.from,a=t.contents,"user"===n.type&&"audio"===a.type?Oe(a.active):ye(a.active);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}),[l,b,o]),Object(r.useEffect)((function(){V||fe(!1)}),[he,V]),Object(r.useEffect)((function(){t&&D&&Y("peerVideo","".concat(t.connection.user.firstName," ").concat(o(we?"peer.videoOn":"peer.videoOff")),"info")}),[we,t,D,o]),Object(r.useEffect)((function(){t&&D&&Y("peerAudio","".concat(t.connection.user.firstName," ").concat(o(me?"peer.unmuted":"peer.muted")),"info")}),[me,t,D,o]);var Ce=Object(r.useCallback)((function(e){null!==e&&b&&l&&Object(m.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:b.on("consume",function(){var t=Object(m.a)(j.a.mark((function t(n,a,r){var c,i;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e&&"user"===r.type?("video"===n?((c=document.createElement("video")).style.width="100%",c.style.height="100%",c.srcObject=a,c.autoplay=!0,e.appendChild(c)):"audio"===n&&((i=document.createElement("audio")).srcObject=a,i.autoplay=!0,e.appendChild(i)),z(!0)):e&&r.type;case 1:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()}),[b,l]);if(Object(r.useEffect)((function(){D&&t&&U("".concat(t.connection.user.firstName," ").concat(o("peer.joinedCallTitle"),"."),o("peer.joinedCallBody"),"info")}),[D,t,o]),!t)return Object(a.jsx)("div",{});var Se,Me=function(){M(!0),clearTimeout(Se),Se=setTimeout((function(){return M(!1)}),5e3)},Fe=function(){var e=Object(m.a)(j.a.mark((function e(){var a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I&&t){e.next=2;break}return e.abrupt("return");case 2:return K(""),te([].concat(Object(ge.a)(ee),[{content:X,from:{type:"inmate",id:n.id},timestamp:(new Date).toLocaleDateString()}])),e.next=6,new Promise((function(e,n){I.emit("info",{callId:t.id},e)}));case 6:return a=e.sent,r=a.participants,e.next=10,new Promise((function(e){I.emit("textMessage",{callId:t.id,contents:X,recipients:r},e)}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.jsxs)(p.a,{children:[Object(a.jsxs)("div",{className:"video-wrapper ant-layout-content",ref:Ce,onMouseMove:function(){return Me()},onMouseOver:function(){return Me()},children:[!we&&Object(a.jsx)("div",{className:"vh-100 vw-100 d-flex",children:Object(a.jsx)(B.a,{size:128,style:{color:"#fff",backgroundColor:"#00a2ae",margin:"auto"},children:W(Z(t.connection.user)).toUpperCase()})}),!me&&Object(a.jsxs)("div",{className:"peer-name-container",children:[Object(a.jsx)(Ae.a,{className:"peer-muted-audio"}),Object(a.jsxs)(g.a.Text,{style:{color:"white",fontSize:16},children:[" ",Z(t.connection.user)]})]}),ue?Object(a.jsx)("video",{className:"video-me",autoPlay:!0,ref:ke}):Object(a.jsx)("div",{className:"video-me",style:{backgroundColor:"black"},children:Object(a.jsx)(B.a,{size:64,style:{color:"#f56a00",backgroundColor:"#fde3cf",margin:"auto"},children:i})}),!D&&Object(a.jsx)(qe,{message:l?D?o("waitingRoom.loading"):"".concat(o("waitingRoom.waitingForPrefix")," ").concat(t.connection.user.firstName," ").concat(o("waitingRoom.waitingForSuffix"),"..."):o("waitingRoom.initialization")}),P&&Object(a.jsxs)(O.b,{className:"video-overlay-actions",align:"center",size:"large",children:[Object(a.jsx)(k.a,{shape:"round",icon:re?Object(a.jsx)(De.a,{style:{fontSize:24}}):Object(a.jsx)(Ae.a,{style:{fontSize:24}}),size:"large",danger:!re,type:re?"default":"primary",onClick:function(){re?null===b||void 0===b||b.pauseAudio():null===b||void 0===b||b.resumeAudio(),Y("microphone","You ".concat(re?"muted":"unmuted"," your microphone"),"info"),ce((function(e){return!e}))}}),Object(a.jsx)(k.a,{shape:"round",icon:Object(a.jsx)(He.a,{color:"red"}),size:"large",onClick:function(){return c("/feedback/".concat(null===t||void 0===t?void 0:t.id))}}),Object(a.jsx)(k.a,{shape:"round",danger:!ue,icon:Object(a.jsx)(ze.a,{style:{fontSize:24}}),size:"large",type:ue?"default":"primary",onClick:function(){ue?null===b||void 0===b||b.pauseWebcam():null===b||void 0===b||b.resumeWebcam(),Y("webcam","You ".concat(ue?"turned off":"turned on"," your webcam"),"info"),le((function(e){return!e}))}}),Object(a.jsx)(k.a,{shape:"round",style:{backgroundColor:V?"#fff":"#f5f5f5"},icon:V?Object(a.jsx)(L.a,{dot:he,children:Object(a.jsx)(Le.a,{style:{fontSize:24}})}):Object(a.jsx)(Le.a,{style:{fontSize:24}}),size:"large",onClick:function(){V&&fe(!1),F((function(e){return!e}))}})]})]}),(!V||P)&&Object(a.jsxs)(Be,{theme:"light",style:{height:"100vh",maxHeight:"100vh"},width:300,collapsible:!0,collapsed:V,onCollapse:function(e){return F(e)},children:[!V&&Object(a.jsx)(H.a,{title:o("chat.title")}),!V&&Object(a.jsxs)("div",{className:"chat-container",style:Xe,children:[Object(a.jsx)(O.b,{direction:"vertical",style:{overflowY:"scroll"},children:ee.map((function(e){return Object(a.jsx)(Ve,{message:e})}))}),Object(a.jsxs)("div",{className:"chat-input",children:[Object(a.jsx)(Ee.a,{}),Object(a.jsx)(y.a.TextArea,{value:X,rows:2,onChange:function(e){return K(e.target.value)},onPressEnter:function(e){return Fe()},onSubmit:function(e){return Fe()},placeholder:o("chat.placeholder"),autoFocus:!0,bordered:!1})]})]})]})]})}))),We=n(412),Ze=n(423),Ue=["terrible","bad","normal","good","wonderful"];var Ye=-1,Je=[{path:"/call/:id",component:Ge,label:"Call"},{path:"/feedback/:id",component:function(){return Object(a.jsx)(p.a.Content,{style:{backgroundColor:"white",height:"100vh",width:"100vw",display:"flex"},children:Object(a.jsxs)(O.b,{direction:"vertical",align:"center",style:{margin:"auto"},size:"large",children:[Object(a.jsx)(g.a.Title,{level:2,children:"You left the meeting."}),Object(a.jsxs)(O.b,{children:[Object(a.jsx)(k.a,{size:"large",children:"Rejoin"}),Object(a.jsx)(k.a,{type:"primary",size:"large",children:"Return home"})]}),Object(a.jsx)(x.a,{title:"How was the audio and video?",children:Object(a.jsx)(We.a,{character:Object(a.jsx)(Ze.a,{style:{fontSize:36}}),tooltips:Ue})})]})})},label:"Feedback"},{path:"/",component:xe,label:"Dash"}],_e="apiToken",Xe={padding:24,paddingTop:0},Ke=[{author:"Mary Ann Evans",quote:"It is never too late to be what you might have been.",description:"",background:"https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Walt Disney",quote:"All our dreams can come true, if we have the courage to pursue them.",description:"",background:"https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Mark Twain",quote:"The secret of getting ahead is getting started",description:"",background:"https://images.unsplash.com/photo-1532971077387-7c6568101df5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Babe Ruth",quote:"It\u2019s hard to beat a person who never gives up.",description:"",background:"https://images.unsplash.com/photo-1564521456797-9f176245daa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"}],Qe="user/SET_SESSION",$e="user/LOGOUT",et=function(e){return{type:Qe,payload:e}},tt={authInfo:{token:"",id:Ye,type:"inmate"},user:{id:Ye,firstName:"",lastName:"",email:""},isLoggedIn:!1};function nt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Qe:return t.payload;case $e:return Object(s.a)(Object(s.a)({},e),{},{authInfo:{token:"",id:Ye,type:"inmate"},user:{id:Ye,firstName:"",lastName:"",email:""},isLoggedIn:!1});default:return e}}var at,rt=Object(T.a)(),ct=(at=rt,Object(C.c)({session:nt,calls:D.reducer,connections:V.reducer,router:Object(d.b)(at)})),it=Object(N.a)({reducer:ct,middleware:function(e){return e().concat(Object(I.a)(rt))}}),ot="".concat("https://connect-api-staging.ameelio.org/","api/");function st(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15e3;return Promise.race([fetch(e,Object(s.a)(Object(s.a)({},t),{},{mode:"cors"})),new Promise((function(e,t){return setTimeout((function(){return t(new Error("timeout"))}),n)}))])}function ut(e){return lt.apply(this,arguments)}function lt(){return(lt=Object(m.a)(j.a.mark((function e(t){var n,a,r,c,i,o,u=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:{},a=u.length>2&&void 0!==u[2]?u[2]:15e3,r=it.getState(),c=Object(s.a)(Object(s.a)({},n),{},{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(r.session.authInfo.token),"X-Ameelio-User-Type":"inmate","X-Ameelio-Inmate-Id":"".concat(r.session.authInfo.id)}}),e.next=6,st("".concat(ot,"/inmate/").concat(r.session.authInfo.id,"/").concat(t),c,a);case 6:return i=e.sent,e.next=9,i.json();case 9:return o=e.sent,e.abrupt("return",o);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var dt=n(224),pt=n.n(dt);function ht(e){return ft.apply(this,arguments)}function ft(){return(ft=Object(m.a)(j.a.mark((function e(t){var n,a,r,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.data.user,a=t.data.user,r=a.token,c=a.id,it.dispatch(et({user:n,authInfo:{token:r,id:c,type:"inmate"},isLoggedIn:!0})),localStorage.setItem(_e,r);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function bt(e){return jt.apply(this,arguments)}function jt(){return(jt=Object(m.a)(j.a.mark((function e(t){var n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,st(pt.a.resolve(ot,"inmate/auth"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({node_id:2,inmate_number:t.inmateNumber,pin:t.pin})});case 2:return n=e.sent,e.next=5,n.json();case 5:if(200===(a=e.sent).status){e.next=8;break}throw a;case 8:return e.next=10,ht(a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var mt=n(424),Ot=n(425);function vt(){return(vt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function xt(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var gt=r.createElement("defs",null,r.createElement("style",null,".cls-1,.cls-2{fill:#0073eb;stroke:#fff;stroke-miterlimit:10;stroke-width:3px;}.cls-2{opacity:0.7;}.cls-3{fill:#1a1a1a;}")),wt=r.createElement("path",{className:"cls-1",d:"M111.83,48.88h0l-8.38,20.22L98.27,81.58l0,0v.08L91.48,98h0L90,101.55h0l-2.9,7-.6-2.23-.64-2.43-4-15.27L71,47.66l-1.6-6.1L63.79,20.1Z"}),yt=r.createElement("polygon",{className:"cls-2",points:"87.09 108.56 85.99 107.12 84.4 105.05 77.65 96.2 71.96 88.74 50.31 60.32 41.21 48.39 71.04 47.66 81.83 88.63 85.85 103.9 86.49 106.33 87.09 108.56"}),kt=r.createElement("polygon",{className:"cls-1",points:"67.95 154.72 59.71 174.61 29.58 171.5 58.55 149.76 64.48 145.32 75.17 137.31 67.96 154.69 67.95 154.72"}),It=r.createElement("path",{className:"cls-1",d:"M134.41,137.69h0L81.75,151.16l-2.83.73-11,2.8,7.21-17.38h0l2.27-5.48h0l9.54-23,.1-.23h0l2.9-7h0L91.47,98h0l6.75-16.29h0l0-.09,5.17-12.47,8.38-20.22h0l4,15.53,4.51,17.78,4.95,19.43,3,11.89h0Z"}),Ct=r.createElement("polygon",{className:"cls-1",points:"161.52 72.3 156.34 84.79 151.4 96.73 147.81 105.36 146.74 107.93 146.74 107.94 134.41 137.69 128.27 113.52 128.26 113.52 125.24 101.63 120.29 82.2 120.3 82.19 121.87 81.82 141.5 77.1 160.2 72.62 161.52 72.3"}),Tt=r.createElement("polygon",{className:"cls-2",points:"187.8 89.91 179.44 91.47 170.42 93.17 170.41 93.16 151.4 96.73 156.34 84.79 161.52 72.3 162.14 72.71 187.8 89.91"}),Nt=r.createElement("path",{className:"cls-3",d:"M234.77,211.91h-17.2L209.18,190H163l-8.4,21.88H137.37l38.93-98.23h19.54Zm-66-36.73H203.4l-17.33-45.27Z"}),St=r.createElement("path",{className:"cls-3",d:"M259.67,211.91H245V161.28h-5.64V148.07h11.83l6.19,6.2c5.5-4.54,12.24-7.43,18.57-7.43a20.61,20.61,0,0,1,17.34,8.66,31.53,31.53,0,0,1,21-8.66c11.7,0,22.43,8,22.43,26.55v38.52H322V173.39c0-8.39-4.54-12.93-11.28-12.93-7.57,0-12.52,4.54-12.52,10.59v40.86H283.61V173.39c0-8.39-4.68-12.93-11.29-12.93-7.42,0-12.65,4.4-12.65,10.18Z"}),Pt=r.createElement("path",{className:"cls-3",d:"M393.53,190.72l12.1,6.61c-4.95,8.39-14.17,16.09-26.82,16.09-18.3,0-31.37-15.41-31.37-33.29s13.07-33.57,31.23-33.57,29.44,15.27,30,31.92l-5.5,5.36H362.3c.82,9.5,8.11,15.82,16.51,15.82C384.58,199.66,390.36,196,393.53,190.72ZM363,172.15h30.95c-1-7.15-7.43-12.52-15.27-12.52A15.72,15.72,0,0,0,363,172.15Z"}),Mt=r.createElement("path",{className:"cls-3",d:"M461.76,190.72l12.11,6.61c-4.95,8.39-14.17,16.09-26.83,16.09-18.3,0-31.37-15.41-31.37-33.29s13.07-33.57,31.23-33.57,29.44,15.27,30,31.92l-5.5,5.36H430.53c.83,9.5,8.12,15.82,16.51,15.82C452.82,199.66,458.6,196,461.76,190.72Zm-30.54-18.57h30.95c-1-7.15-7.42-12.52-15.27-12.52A15.72,15.72,0,0,0,431.22,172.15Z"}),Et=r.createElement("path",{className:"cls-3",d:"M489.41,113.68l4.82-5h10.18V197.6h5.64v14.31H495.6l-6.19-6.33Z"}),At=r.createElement("path",{className:"cls-3",d:"M540.73,211.91H526V161.28h-5.5V148.07h15l5.23,5.23ZM532,112a10.49,10.49,0,0,1,10.39,10.39A10.37,10.37,0,0,1,532,132.67a10.25,10.25,0,0,1-10.25-10.26A10.37,10.37,0,0,1,532,112Z"}),Dt=r.createElement("path",{className:"cls-3",d:"M620,180a33.36,33.36,0,1,1-33.29-33.29A33.35,33.35,0,0,1,620,180Zm-15,0c0-10.32-7.71-19.12-18.3-19.12s-18.44,8.8-18.44,19.12,7.85,19.26,18.44,19.26S605,190.31,605,180Z"});function Ht(e,t){var n=e.title,a=e.titleId,c=xt(e,["title","titleId"]);return r.createElement("svg",vt({id:"Golden_Grid","data-name":"Golden Grid",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 666.85 257.93",ref:t,"aria-labelledby":a},c),n?r.createElement("title",{id:a},n):null,gt,wt,yt,kt,It,Ct,Tt,Nt,St,Pt,Mt,Et,At,Dt)}var zt=r.forwardRef(Ht),Lt=(n.p,n(334),p.a.Content);var Bt=Object(u.c)((function(e){return{session:e.session}}))((function(e){var t=e.session,n=Object(se.a)("login").t;if(t.isLoggedIn)return Object(a.jsx)(h.a,{to:"/"});var r=function(){var e=Object(m.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,bt({inmateNumber:t.inmateNumber,pin:t.pin});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),Y("login_error","Invalid ID or Pin Code","error");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(Lt,{className:"d-flex flex-column",children:Object(a.jsxs)(O.b,{className:"m-auto",direction:"vertical",size:"large",children:[Object(a.jsx)(v.a,{justify:"center",children:Object(a.jsx)(zt,{className:"login-logo"})}),Object(a.jsxs)(x.a,{className:"login-form-container",children:[Object(a.jsx)(g.a.Title,{level:3,children:n("title")}),Object(a.jsxs)(w.a,{name:"basic",onFinish:r,onFinishFailed:function(e){Y("login_error","Invalid ID or Pin Code","error")},className:"login-form",children:[Object(a.jsx)(w.a.Item,{name:"inmateNumber",rules:[{required:!0,message:"Inmate ID is required."}],children:Object(a.jsx)(y.a,{prefix:Object(a.jsx)(mt.a,{className:"site-form-item-icon"}),placeholder:n("placeholder.inmateNumber")})}),Object(a.jsx)(w.a.Item,{name:"pin",rules:[{required:!0,message:"Password is required."}],children:Object(a.jsx)(y.a.Password,{prefix:Object(a.jsx)(Ot.a,{className:"site-form-item-icon"}),placeholder:n("placeholder.pinCode")})}),Object(a.jsx)(w.a.Item,{children:Object(a.jsx)(k.a,{type:"primary",htmlType:"submit",size:"large",block:!0,children:n("buttonText")})})]})]})]})})})),qt=n(164),Rt=n(426),Vt=p.a.Sider;function Ft(e){var t=e.navigate,n=e.isVisible,c=e.pathname,i=Object(r.useState)(!1),o=Object(S.a)(i,2),s=o[0],u=o[1];return n&&-1===c.indexOf("call")&&-1===c.indexOf("feedback")?Object(a.jsxs)(Vt,{theme:"light",collapsible:!0,collapsed:s,onCollapse:function(){return u((function(e){return!e}))},children:[Object(a.jsx)("div",{className:"logo"}),Object(a.jsx)(qt.a,{mode:"inline",defaultSelectedKeys:["home"],children:Object(a.jsx)(qt.a.Item,{icon:Object(a.jsx)(Rt.a,{}),onClick:function(){return t("home")},children:"Home"},"home")})]}):Object(a.jsx)("div",{})}var Gt={fetchConnections:q,push:l.d};var Wt=Object(u.c)((function(e){return{session:e.session,pathname:e.router.location.pathname}}),Gt)((function(e){var t=e.session,n=e.history,c=e.pathname,i=e.fetchConnections,o=e.push,u={isAuthenticated:""!==t.authInfo.token,authenticationPath:"/login"};return Object(r.useEffect)((function(){t.isLoggedIn&&i()}),[t.isLoggedIn,i]),Object(a.jsx)(d.a,{history:n,children:Object(a.jsxs)(p.a,{style:{minHeight:"100vh"},children:[Object(a.jsx)(Ft,{navigate:function(e){return o(e)},isVisible:t.isLoggedIn,pathname:c}),Object(a.jsx)(p.a,{children:Object(a.jsxs)(h.d,{children:[Object(a.jsx)(h.b,{exact:!0,path:"/login",component:Bt}),Je.map((function(e){return Object(r.createElement)(f,Object(s.a)(Object(s.a)({exact:!0},u),{},{path:e.path,component:e.component,key:e.label}))})),Object(a.jsx)(h.a,{to:"/login"})]})})]})})})),Zt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,427)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(u.a,{store:it,children:Object(a.jsx)(Wt,{history:rt})})}),document.getElementById("root")),Zt()}},[[400,1,2]]]);
//# sourceMappingURL=main.252c0171.chunk.js.map