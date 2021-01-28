(this["webpackJsonppathways-client"]=this["webpackJsonppathways-client"]||[]).push([[0],{219:function(e,t,n){},220:function(e,t,n){},230:function(e,t,n){},238:function(e,t,n){},295:function(e,t){},298:function(e,t,n){},374:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(0),c=n.n(r),s=n(26),i=n.n(s),o=(n(219),n(43)),u=(n(220),n(51)),l=n(40),d=n(84),p=n(376),h=n(48),f=function(e){var t="";if(e.isAuthenticated||(t=e.authenticationPath),t){return Object(a.jsx)(h.b,Object(o.a)(Object(o.a)({},e),{},{component:function(){return Object(a.jsx)(h.a,{to:{pathname:t}})},render:void 0}))}return Object(a.jsx)(h.b,Object(o.a)({},e))},j=n(7),b=n.n(j),m=n(18),O=n(35),v=n(380),x=n(381),g=n(382),w=n(384),y=n(93),k=(n(230),n(184)),I=n(52),T=n(67),C=n(64),S=n(121),D=n.n(S),N=Object(C.b)("calls/fetchAll",Object(m.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ze("/calls");case 2:if(200===(t=e.sent).status){e.next=5;break}throw t;case 5:return n=t.data.calls.map((function(e){return D()(e)})),e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),M=Object(C.c)(),H=Object(C.d)({name:"calls",initialState:M.getInitialState(),reducers:{},extraReducers:function(e){e.addCase(N.fulfilled,(function(e,t){return M.setAll(e,t.payload)}))}}),P=(H.actions,n(383)),E=n(385),A=n(94),q=n(57),B=n(209),L=Object(C.b)("connections/fetchAll",Object(m.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ze("/connections");case 2:if(200===(t=e.sent).status){e.next=5;break}throw t;case 5:return n=t.data.connections.map((function(e){return D()(e)})),e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))),F=Object(C.c)(),G=Object(C.d)({name:"connection",initialState:F.getInitialState(),reducers:{},extraReducers:function(e){e.addCase(L.fulfilled,(function(e,t){F.setAll(e,t.payload)}))}}),R=(G.actions,M.getSelectors((function(e){return e.calls}))),z=R.selectAll,V=R.selectById,W=F.getSelectors((function(e){return e.connections})),Y=W.selectAll,U=(W.selectById,n(379)),X=n(386);n(238);var J=n(133),_=n(387),K=n(388),Q=(p.a.Header,p.a.Footer,p.a.Sider),Z=p.a.Content,$=(v.a.Meta,{fetchCalls:N,push:l.e});var ee=Object(u.c)((function(e){return{calls:z(e),connections:Y(e),firstName:e.session.user.firstName}}),$)((function(e){var t,n=e.calls,c=e.connections,s=e.fetchCalls,i=e.push,o=e.firstName,u=Object(r.useState)([]),l=Object(O.a)(u,2),d=l[0],h=l[1],f=Object(r.useState)((t=Ce)[Math.floor(Math.random()*t.length)]),j=Object(O.a)(f,2),g=j[0],w=(j[1],Object(r.useState)(new Date)),k=Object(O.a)(w,2),I=k[0],T=k[1];Object(r.useEffect)((function(){var e=setInterval((function(){T(new Date)}),1e3);return function(){return clearInterval(e)}})),Object(r.useEffect)((function(){Object(m.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()}),[s]),Object(r.useEffect)((function(){var e=n.filter((function(e){return("scheduled"===e.status||"live"===e.status)&&new Date(e.end)>new Date})).map((function(e){return{call:e,connection:c.find((function(t){return t.id===e.id}))||{user:{firstName:"",lastName:"",profileImgPath:""}}}}));h(e)}),[n,c]);var C=function(e){switch(e.status){case"approved":return"success";case"pending":return"warning";case"rejected":return"danger";default:return"secondary"}};return Object(a.jsxs)(p.a,{style:{minHeight:"100vh"},children:[Object(a.jsxs)(Z,{children:[Object(a.jsx)(P.a,{title:"Hi ".concat(o,"!")}),Object(a.jsxs)(E.b,{direction:"vertical",size:"large",style:Te,children:[Object(a.jsx)(A.a,{children:Object(a.jsx)(q.a,{span:24,children:Object(a.jsxs)("div",{children:[Object(a.jsxs)(E.b,{direction:"vertical",align:"center",style:{backgroundImage:"url(".concat(g.background,")"),width:"100%"},className:"dashboard-header-container",children:[Object(a.jsx)(x.a.Title,{level:3,className:"dashboard-header-content",children:Object(U.a)(I,"HH:mm")}),Object(a.jsx)(x.a.Title,{level:5,className:"dashboard-header-content",children:g.quote}),Object(a.jsx)(x.a.Text,{className:"dashboard-header-content",children:g.author})]}),Object(a.jsxs)("div",{style:{width:"100%",backgroundColor:"white"},children:[!d.length&&Object(a.jsx)(v.a,{children:Object(a.jsx)("span",{children:"No upcoming calls today"})}),d.map((function(e){var t=Object(X.a)(new Date(e.call.start),new Date);return Object(a.jsx)(v.a,{children:Object(a.jsxs)(E.b,{size:"large",children:[Object(a.jsx)(B.a,{src:e.connection.user.profileImgPath}),Object(a.jsxs)("div",{children:[Object(a.jsxs)(x.a.Title,{level:3,children:["Call with ",e.connection.user.firstName]}),Object(a.jsxs)(x.a.Text,{children:[Object(U.a)(new Date(e.call.start),"HH:mm")," ","-"," ",Object(U.a)(new Date(e.call.end),"HH:mm")," ","| ",t>0?"starts in ":"started ",Object(a.jsxs)(x.a.Text,{type:t>=0?"warning":"danger",children:[Math.abs(t)," minutes"," ",t<0&&" ago"]})]})]}),Object(a.jsxs)(E.b,{children:[Object(a.jsx)(y.a,{onClick:function(){return i("call/".concat(e.call.id))},children:Object(a.jsx)(J.a,{})}),Object(a.jsx)(y.a,{type:"primary",onClick:function(){return i("call/".concat(e.call.id))},children:"Join"})]})]})},e.call.id)}))]})]})})}),Object(a.jsxs)(A.a,{gutter:16,children:[Object(a.jsx)(q.a,{span:12,children:Object(a.jsxs)(v.a,{children:[Object(a.jsx)(_.a,{}),Object(a.jsx)(x.a.Title,{level:4,children:"Schedule Call"})]})}),Object(a.jsx)(q.a,{span:12,children:Object(a.jsxs)(v.a,{children:[Object(a.jsx)(K.a,{}),Object(a.jsx)(x.a.Title,{level:4,children:"Add Contact"})]})})]})]})]}),Object(a.jsxs)(Q,{theme:"light",width:400,children:[Object(a.jsx)(P.a,{title:"Your Loved Ones"}),c.map((function(e){return Object(a.jsx)(v.a,{children:Object(a.jsx)(v.a.Meta,{title:(t=e.user,t?"".concat(t.firstName," ").concat(t.lastName):""),avatar:Object(a.jsx)(B.a,{src:e.user.profileImgPath}),description:Object(a.jsxs)(x.a.Text,{type:"secondary",children:["Status:"," ",Object(a.jsx)(x.a.Text,{type:C(e),children:e.status})]})})},e.id);var t}))]})]})})),te=n(156),ne=n(202),ae=n(203),re="audioType",ce="videoType";window.rc=null,window.consumers=[],window.producers=[];var se={video:{width:{min:640,ideal:1920},height:{min:400,ideal:1080},encodings:[{rid:"r0",maxBitrate:1e5,scalabilityMode:"S1T3"},{rid:"r1",maxBitrate:3e5,scalabilityMode:"S1T3"},{rid:"r2",maxBitrate:9e5,scalabilityMode:"S1T3"}],codecOptions:{videoGoogleStartBitrate:1e3}}},ie=function(){function e(t,n,a){Object(ne.a)(this,e),window.rc=this,this.mediasoupClient=t,this.socket=n,this.callId=a,this.producerTransport=null,this.consumerTransport=null,this.device=null,this.consumers={},this.producers={},this.handlers={consume:[]}}return Object(ae.a)(e,[{key:"request",value:function(){var e=Object(m.a)(b.a.mark((function e(t,n){var a=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){a.socket.emit(t,n,(function(t){t.error?r(t.error):e(t)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleTransportConnect",value:function(){var e=Object(m.a)(b.a.mark((function e(t){var n=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){t.on("connect",function(){var a=Object(m.a)(b.a.mark((function a(r,c,s){var i;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return i=r.dtlsParameters,a.next=3,n.request("establishDtls",{dtlsParameters:i,callId:n.callId,transportId:t.id});case 3:c(),e();case 5:case"end":return a.stop()}}),a)})));return function(e,t,n){return a.apply(this,arguments)}}())})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"init",value:function(){var e=Object(m.a)(b.a.mark((function e(){var t,n,a,r,c=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.request("join",{callId:this.callId});case 2:return t=e.sent,n=t.producerTransportInfo,a=t.consumerTransportInfo,r=t.routerRtpCapabilities,e.next=8,this.loadDevice(r);case 8:return this.device=e.sent,n&&(this.producerTransport=this.device.createSendTransport(n),this.handleTransportConnect(this.producerTransport)),this.consumerTransport=this.device.createRecvTransport(a),this.handleTransportConnect(this.consumerTransport),e.next=14,this.request("declareRtpCapabilities",{rtpCapabilities:this.device.rtpCapabilities});case 14:this.request("finishConnecting",{callId:this.callId}),this.producerTransport&&this.producerTransport.on("produce",function(){var e=Object(m.a)(b.a.mark((function e(t,n,a){var r,s,i,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.kind,s=t.rtpParameters,e.next=3,c.request("produce",{callId:c.callId,kind:r,rtpParameters:s});case 3:i=e.sent,o=i.producerId,n({id:o});case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()),this.socket.on("consume",function(){var e=Object(m.a)(b.a.mark((function e(t){var n,a,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.consume(t);case 2:n=e.sent,a=n.consumer,r=n.stream,c.socket.emit("resumeConsumer",{callId:c.callId,consumerId:a.id}),c.handlers.consume.forEach((function(e){return e(t.kind,r,t.user)}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 17:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMediaConstraints",value:function(e,t){return e===re?{audio:{deviceId:t}}:e===ce?{video:{width:se.video.width,height:se.video.height,deviceId:t}}:void 0}},{key:"produce",value:function(){var e=Object(m.a)(b.a.mark((function e(t){var n,a,r,c,s,i,o=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:null,a=this.getMediaConstraints(t,n),e.next=4,navigator.mediaDevices.getUserMedia(a);case 4:return r=e.sent,c=(t===re?r.getAudioTracks():r.getVideoTracks())[0],s={track:c},t===ce&&(s.encodings=se.video.encodings,s.codecOptions=se.video.codecOptions),e.next=10,this.producerTransport.produce(s);case 10:i=e.sent,window.producers.push(i),this.producers[i.id]=i;case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"loadDevice",value:function(){var e=Object(m.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new this.mediasoupClient.Device,e.next=3,n.load({routerRtpCapabilities:t});case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"consume",value:function(){var e=Object(m.a)(b.a.mark((function e(t){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.consumerTransport.consume(t);case 2:return n=e.sent,a=new MediaStream,this.consumers[n.id]=n,a.addTrack(n.track),e.abrupt("return",{consumer:n,stream:a});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"on",value:function(){var e=Object(m.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t in this.handlers||(this.handlers[t]=[]),this.handlers[t].push(n);case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"terminate",value:function(){var e=Object(m.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.request("terminate",{callId:this.callId});case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),oe=n(204),ue=n(205),le=n.n(ue),de=n(377),pe=n(378),he=(n(298),n(389)),fe=n(390),je=n(391);var be=p.a.Sider,me={goBack:l.c},Oe=Object(u.c)((function(e,t){return{call:V(e,t.match.params.id),authInfo:e.session.authInfo}}),me);function ve(e){var t=e.message;return Object(a.jsx)("div",{className:"video-loading-spinner",children:Object(a.jsx)(de.a,{tip:t})})}var xe={audio:!1,video:{width:{min:640,ideal:1920},height:{min:400,ideal:1080}}};function ge(e){var t=e.message,n=t.from.type;return Object(a.jsxs)(E.b,{direction:"vertical",align:"inmate"===n?"end":"start",style:{width:"100%"},children:[Object(a.jsxs)(E.b,{children:[Object(a.jsx)(x.a.Text,{strong:!0,children:function(){switch(n){case"inmate":return"You";case"monitor":return"DOC";case"user":return"Loved One"}}()}),Object(a.jsx)(x.a.Text,{type:"secondary",children:Object(U.a)(new Date(t.timestamp),"HH:mm")})]}),Object(a.jsx)(x.a.Text,{children:t.content})]})}var we=Oe(c.a.memo((function(e){var t=e.call,n=e.authInfo,c=e.goBack,s=Object(r.useState)(!1),i=Object(O.a)(s,2),o=i[0],u=i[1],l=Object(r.useState)(),d=Object(O.a)(l,2),h=d[0],f=d[1],j=Object(r.useState)(),v=Object(O.a)(j,2),x=v[0],g=v[1],k=Object(r.useState)(!0),I=Object(O.a)(k,2),T=I[0],C=I[1],S=Object(r.useState)(!1),D=Object(O.a)(S,2),N=D[0],M=D[1],H=Object(r.useState)(!1),A=Object(O.a)(H,2),q=A[0],B=A[1],L=function(e){var t=Object(r.useState)(),n=Object(O.a)(t,2),a=n[0],c=n[1];return Object(r.useEffect)((function(){function t(){return(t=Object(m.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia(e);case 3:n=t.sent,c(n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}if(a)return function(){a.getTracks().forEach((function(e){e.stop()}))};!function(){t.apply(this,arguments)}()}),[a,e]),a}(xe),F=Object(r.useState)(""),G=Object(O.a)(F,2),R=G[0],z=G[1],V=Object(r.useState)([]),W=Object(O.a)(V,2),Y=W[0],U=W[1],X=Object(r.useRef)(null);X.current&&!X.current.srcObject&&L&&(X.current.srcObject=L),Object(r.useEffect)((function(){if(!x){var e=le.a.connect("".concat("wss://connect-api-staging.ameelio.org/")||!1,{transports:["websocket"]});g(e)}return function(){null===x||void 0===x||x.close()}}),[g,x]);var J=Object(r.useCallback)(Object(m.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return n=new ie(oe,x,t.id),e.next=5,n.init();case 5:f(n);case 6:case"end":return e.stop()}}),e)}))),[t,x]);Object(r.useEffect)((function(){!o&&x&&t&&Object(m.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(x),x.connected){e.next=7;break}return console.log("Not connected, so waiting until connected."),window.Debug=x,e.next=6,new Promise((function(e){return x.on("connect",e)}));case 6:console.log("OK");case 7:return e.next=9,new Promise((function(e){x.emit("authenticate",{type:n.type,id:n.id,token:n.token},e)}));case 9:return e.next=11,J();case 11:u(!0);case 12:case"end":return e.stop()}}),e)})))()}),[t,n,x,J,o]),Object(r.useEffect)((function(){h&&o&&Object(m.a)(b.a.mark((function e(){var t,n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices();case 2:return t=e.sent,console.log(t),n=Array.from(t).filter((function(e){return"videoinput"===e.kind}))[0],console.log("producing video"),e.next=8,h.produce("videoType",n);case 8:return a=Array.from(t).filter((function(e){return"audioinput"===e.kind}))[0],console.log("producing audio"),e.next=12,h.produce("audioType",a);case 12:case"end":return e.stop()}}),e)})))()}),[o,h]),Object(r.useEffect)((function(){h&&o&&h.on("textMessage",function(){var e=Object(m.a)(b.a.mark((function e(t,n,a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("receiving message"),U([].concat(Object(te.a)(Y),[{content:n,from:t,timestamp:(new Date).toLocaleDateString()}]));case 2:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}())}),[o,h]);var _=Object(r.useCallback)((function(e){null!==e&&h&&o&&Object(m.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:h.on("consume",function(){var t=Object(m.a)(b.a.mark((function t(n,a,r){var c,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("CONSUME RECEIVED: ".concat(r.type," ").concat(n)),e&&"user"===r.type?(console.log("CONSUME: user stream"),"video"===n?((c=document.createElement("video")).style.width="100%",c.style.height="100%",c.srcObject=a,c.autoplay=!0,e.appendChild(c)):"audio"===n&&((s=document.createElement("audio")).srcObject=a,s.autoplay=!0,e.appendChild(s)),M(!0)):e&&r.type;case 2:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()}),[h,o]);Object(r.useEffect)((function(){if(h&&t){var e=setInterval((function(){h.socket.emit("heartbeat",{callId:t.id})}),Se);return function(){return clearInterval(e)}}}),[h,t]);var K,Q=function(){var e=Object(m.a)(b.a.mark((function e(){var a,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("sending message"),x&&t){e.next=3;break}return e.abrupt("return");case 3:return z(""),U([].concat(Object(te.a)(Y),[{content:R,from:{type:"inmate",id:n.id},timestamp:(new Date).toLocaleDateString()}])),e.next=7,new Promise((function(e,n){x.emit("info",{callId:t.id},e)}));case 7:return a=e.sent,r=a.participants,e.next=11,new Promise((function(e){x.emit("textMessage",{callId:t.id,contents:R,recipients:r},e)}));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.jsxs)(p.a,{children:[Object(a.jsxs)("div",{className:"video-wrapper ant-layout-content",ref:_,onMouseMove:function(){return C(!0),clearTimeout(K),void(K=setTimeout((function(){return C(!1)}),5e3))},children:[Object(a.jsx)("video",{className:"video-me",autoPlay:!0,ref:X}),!N&&Object(a.jsx)(ve,{message:o?N?"Loading...":"Waiting for ".concat("Gabe"," to join the call..."):"Initializing video call..."}),T&&Object(a.jsxs)(E.b,{className:"video-overlay-actions",align:"center",children:[Object(a.jsx)(y.a,{shape:"round",icon:Object(a.jsx)(he.a,{}),size:"large"}),Object(a.jsx)(y.a,{shape:"round",icon:Object(a.jsx)(fe.a,{}),size:"large",onClick:function(){return c()}}),Object(a.jsx)(y.a,{shape:"round",icon:Object(a.jsx)(je.a,{}),size:"large"})]})]}),(!q||T)&&Object(a.jsxs)(be,{theme:"light",style:{height:"100vh",maxHeight:"100vh"},width:300,collapsible:!0,collapsed:q,onCollapse:function(e){return B(e)},children:[!q&&Object(a.jsx)(P.a,{title:"Chat"}),!q&&Object(a.jsxs)("div",{className:"chat-container",style:Te,children:[Object(a.jsx)(E.b,{direction:"vertical",style:{overflowY:"scroll"},children:Y.map((function(e){return Object(a.jsx)(ge,{message:e})}))}),Object(a.jsxs)("div",{className:"chat-input",children:[Object(a.jsx)(pe.a,{}),Object(a.jsx)(w.a.TextArea,{value:R,rows:2,onChange:function(e){return z(e.target.value)},onPressEnter:function(e){return Q()},onSubmit:function(e){return Q()},placeholder:"Type here...",autoFocus:!0,bordered:!1})]})]})]})]})}))),ye=-1,ke=[{path:"/call/:id",component:we,label:"Call"},{path:"/",component:ee,label:"Dash"}],Ie="apiToken",Te={padding:24,paddingTop:0},Ce=[{author:"Mary Ann Evans",quote:"It is never too late to be what you might have been.",description:"",background:"https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Walt Disney",quote:"All our dreams can come true, if we have the courage to pursue them.",description:"",background:"https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Mark Twain",quote:"The secret of getting ahead is getting started",description:"",background:"https://images.unsplash.com/photo-1532971077387-7c6568101df5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},{author:"Babe Ruth",quote:"It\u2019s hard to beat a person who never gives up.",description:"",background:"https://images.unsplash.com/photo-1564521456797-9f176245daa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"}],Se=200,De="user/SET_SESSION",Ne="user/LOGOUT",Me=function(e){return{type:De,payload:e}},He={authInfo:{token:"",id:ye,type:"inmate"},user:{id:ye,firstName:"",lastName:"",email:""},isLoggedIn:!1};function Pe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:He,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case De:return t.payload;case Ne:return Object(o.a)(Object(o.a)({},e),{},{authInfo:{token:"",id:ye,type:"inmate"},user:{id:ye,firstName:"",lastName:"",email:""},isLoggedIn:!1});default:return e}}var Ee,Ae=Object(T.a)(),qe=(Ee=Ae,Object(I.c)({session:Pe,calls:H.reducer,connections:G.reducer,router:Object(d.b)(Ee)})),Be=Object(C.a)({reducer:qe,middleware:function(e){return e().concat(Object(k.a)(Ae))}}),Le=n(130),Fe=n.n(Le),Ge="".concat("https://connect-api-staging.ameelio.org/","api/");function Re(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15e3;return Promise.race([fetch(e,Object(o.a)(Object(o.a)({},t),{},{mode:"cors"})),new Promise((function(e,t){return setTimeout((function(){return t(new Error("timeout"))}),n)}))])}function ze(e){return Ve.apply(this,arguments)}function Ve(){return(Ve=Object(m.a)(b.a.mark((function e(t){var n,a,r,c,s,i,u=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:{},a=u.length>2&&void 0!==u[2]?u[2]:15e3,r=Be.getState(),c=Object(o.a)(Object(o.a)({},n),{},{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(r.session.authInfo.token),"X-Ameelio-User-Type":"inmate","X-Ameelio-Inmate-Id":"".concat(r.session.authInfo.id)}}),e.next=6,Re(Fe.a.resolve("".concat(Ge,"/inmate/").concat(r.session.authInfo.id),t),c,a);case 6:return s=e.sent,e.next=9,s.json();case 9:return i=e.sent,e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function We(e){return Ye.apply(this,arguments)}function Ye(){return(Ye=Object(m.a)(b.a.mark((function e(t){var n,a,r,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.data.user,a=t.data.user,r=a.token,c=a.id,console.log("setting session"),Be.dispatch(Me({user:n,authInfo:{token:r,id:c,type:"inmate"},isLoggedIn:!0})),localStorage.setItem(Ie,r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ue(e){return Xe.apply(this,arguments)}function Xe(){return(Xe=Object(m.a)(b.a.mark((function e(t){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Re(Fe.a.resolve(Ge,"inmate/auth"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({node_id:2,inmate_number:t.inmateNumber,pin:t.pin})});case 2:return n=e.sent,e.next=5,n.json();case 5:if(200===(a=e.sent).status){e.next=8;break}throw a;case 8:return e.next=10,We(a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}console.log("https://connect-api-staging.ameelio.org/");var Je=n(392),_e=n(393),Ke=p.a.Content;var Qe=Object(u.c)((function(e){return{session:e.session}}))((function(e){var t=e.session,n=Object(r.useState)(""),c=Object(O.a)(n,2),s=(c[0],c[1]);if(t.isLoggedIn)return console.log("here"),Object(a.jsx)(h.a,{to:"/"});var i=function(){var e=Object(m.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Ue({inmateNumber:t.inmateNumber,pin:t.pin});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),s("Invalid ID or Pin Code");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(Ke,{children:Object(a.jsxs)(v.a,{className:"login-form-container",children:[Object(a.jsx)(x.a.Title,{level:3,children:"Welcome to Pathways!"}),Object(a.jsxs)(g.a,{name:"basic",onFinish:i,onFinishFailed:function(e){s("Invalid ID or Pin Code")},className:"login-form",children:[Object(a.jsx)(g.a.Item,{name:"inmateNumber",rules:[{required:!0,message:"Inmate ID is required."}],children:Object(a.jsx)(w.a,{prefix:Object(a.jsx)(Je.a,{className:"site-form-item-icon"}),placeholder:"Inmate Number"})}),Object(a.jsx)(g.a.Item,{name:"pin",rules:[{required:!0,message:"Password is required."}],children:Object(a.jsx)(w.a.Password,{prefix:Object(a.jsx)(_e.a,{className:"site-form-item-icon"}),placeholder:"Pin Code"})}),Object(a.jsx)(g.a.Item,{children:Object(a.jsx)(y.a,{type:"primary",htmlType:"submit",size:"large",block:!0,children:"Log In"})})]})]})})})),Ze=n(155),$e=n(394),et=(p.a.Header,p.a.Content,p.a.Footer,p.a.Sider);function tt(e){var t=e.navigate,n=e.isVisible,c=e.pathname,s=Object(r.useState)(!1),i=Object(O.a)(s,2),o=i[0],u=i[1];return n&&-1===c.indexOf("call")?Object(a.jsxs)(et,{theme:"light",collapsible:!0,collapsed:o,onCollapse:function(){return u((function(e){return!e}))},children:[Object(a.jsx)("div",{className:"logo"}),Object(a.jsx)(Ze.a,{mode:"inline",defaultSelectedKeys:["home"],children:Object(a.jsx)(Ze.a.Item,{icon:Object(a.jsx)($e.a,{}),onClick:function(){return t("home")},children:"Home"},"home")})]}):Object(a.jsx)("div",{})}p.a.Footer,p.a.Header;var nt={fetchConnections:L,push:l.e};var at=Object(u.c)((function(e){return{session:e.session,pathname:e.router.location.pathname}}),nt)((function(e){var t=e.session,n=e.history,c=e.pathname,s=e.fetchConnections,i=e.push,u={isAuthenticated:""!==t.authInfo.token,authenticationPath:"/login"};return Object(r.useEffect)((function(){t.isLoggedIn&&s()}),[t.isLoggedIn]),Object(a.jsx)(d.a,{history:n,children:Object(a.jsxs)(p.a,{style:{minHeight:"100vh"},children:[Object(a.jsx)(tt,{navigate:function(e){return i(e)},isVisible:t.isLoggedIn,pathname:c}),Object(a.jsx)(p.a,{children:Object(a.jsxs)(h.d,{children:[Object(a.jsx)(h.b,{exact:!0,path:"/login",component:Qe}),ke.map((function(e){return Object(r.createElement)(f,Object(o.a)(Object(o.a)({exact:!0},u),{},{path:e.path,component:e.component,key:e.label}))})),Object(a.jsx)(h.a,{to:"/login"})]})})]})})})),rt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,395)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};i.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(u.a,{store:Be,children:Object(a.jsx)(at,{history:Ae})})}),document.getElementById("root")),rt()}},[[374,1,2]]]);
//# sourceMappingURL=main.9a12763d.chunk.js.map