(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{100:function(e,n,t){},101:function(e,n,t){},102:function(e,n,t){},103:function(e,n,t){},109:function(e,n,t){},110:function(e,n,t){},111:function(e,n,t){},112:function(e,n,t){},113:function(e,n,t){},114:function(e,n,t){},115:function(e,n,t){},116:function(e,n,t){},117:function(e,n,t){"use strict";t.r(n);var c=t(4),o=t.n(c),a=t(34),s=t.n(a),r=(t(83),t(32)),i=t(13),l=t(12),j=t(71),d=Object(c.createContext)({isLoggedIn:!1,userId:null,name:null,roomId:null,logIn:function(){},roomJoin:function(){}}),b=t(49),u=t(30),m=t(11),O=t(24),x=(t(98),t(3));function h(e){return Object(x.jsxs)("div",{className:"input-component",children:[Object(x.jsx)("label",{children:e.label}),Object(x.jsx)("br",{}),Object(x.jsx)("input",{onChange:function(n){e.onChange(e.label,n.target.value)},type:e.type,placeholder:e.placeholder})]})}t(100);var g=function(e){return Object(x.jsx)("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay"),children:Object(x.jsx)("div",{className:"loader",children:Object(x.jsxs)("div",{className:"dots",children:[Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"}),Object(x.jsx)("div",{className:"dot"})]})})})},p=t(75);t(101),t(102);var f=function(e){return s.a.createPortal(Object(x.jsx)("div",{className:"back-drop",onClick:e.onClick}),document.getElementById("back-drop"))};function v(e){var n=Object(x.jsxs)("div",{className:"modal ".concat(e.className),children:[Object(x.jsxs)("header",{className:"modal__header",children:[Object(x.jsx)("h2",{children:e.header}),Object(x.jsx)(p.a,{onClick:e.onCancel,style:{cursor:"pointer"}})]}),Object(x.jsx)("form",{onSubmit:e.onSumbit?e.onSubmit:function(e){return e.preventDefault()},children:Object(x.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children})})]});return s.a.createPortal(n,document.getElementById("modal"))}var I,N,C,S,k=function(e){return Object(x.jsxs)(o.a.Fragment,{children:[e.show&&Object(x.jsx)(f,{onClick:e.onCancel}),Object(x.jsx)(v,Object(u.a)({},e))]})};t(103);try{C=Object(l.gql)(I||(I=Object(O.a)(["\n    mutation($email: String!, $password: String!, $name: String!) {\n      createUser(email: $email, password: $password, name: $name) {\n        id\n        name\n      }\n    }\n  "]))),S=Object(l.gql)(N||(N=Object(O.a)(["\n    mutation($email: String!, $password: String!) {\n      loginUser(email: $email, password: $password) {\n        id\n        name\n        email\n      }\n    }\n  "])))}catch(ee){console.log(ee)}var w=function(){var e=Object(c.useState)(!1),n=Object(m.a)(e,2),t=n[0],a=n[1],s=Object(c.useContext)(d),r=Object(i.g)(),j=Object(c.useState)(!1),O=Object(m.a)(j,2),p=O[0],f=O[1],v=Object(c.useState)({Name:"",Email:"",Password:""}),I=Object(m.a)(v,2),N=I[0],w=I[1],y=Object(c.useCallback)((function(e,n){w((function(t){return Object(u.a)(Object(u.a)({},t),{},Object(b.a)({},e,n))}))}),[]),$=Object(l.useMutation)(C,{update:function(e,n){console.log(n)},onError:function(e){f(e)}}),R=Object(m.a)($,2),D=R[0],E=R[1],M=E.data,P=E.loading,X=Object(l.useMutation)(S,{update:function(e,n){console.log(n)},onError:function(e){f(e)}}),J=Object(m.a)(X,2),q=J[0],L=J[1],U=L.data,W=L.loading,_=Object(c.useCallback)((function(){try{t?q({variables:{email:N.Email,password:N.Password}}):D({variables:{email:N.Email,password:N.Password,name:N.Name}})}catch(ee){console.log(ee)}}),[t,D,N,q]);return(M||U)&&(M?s.logIn(M.createUser.id,M.createUser.name):s.logIn(U.loginUser.id,U.loginUser.name),r.push("/joinRoom")),Object(x.jsxs)(o.a.Fragment,{children:[(P||W)&&Object(x.jsx)(g,{asOverlay:!0}),p&&Object(x.jsx)(k,{show:p,onCancel:function(){f(!1)},children:Object(x.jsx)("h3",{children:p.message})}),Object(x.jsxs)("div",{className:"authentication-page",children:[Object(x.jsx)("p",{children:"Scoup"}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:Object(x.jsxs)("div",{className:"authenticate-box",children:[Object(x.jsxs)("div",{className:"toggle-auth",children:[!t&&Object(x.jsx)("button",{className:"button btnOrange btnPush",onClick:function(){a(!0)},children:"Sign In"}),t&&Object(x.jsx)("button",{className:"button btnOrange btnPush",onClick:function(){a(!1)},children:"Sign Up"})]}),Object(x.jsxs)("div",{className:"authentication-inputs",children:[!t&&Object(x.jsx)("span",{children:"Sign Up"}),t&&Object(x.jsx)("span",{children:"Sign In"}),!t&&Object(x.jsx)(h,{type:"text",placeholder:"Example Sharma",onChange:y,label:"Name"}),Object(x.jsx)(h,{type:"email",placeholder:"example@example.com",label:"Email",onChange:y}),Object(x.jsx)(h,{type:"Password",placeholder:"************",label:"Password",onChange:y})]}),Object(x.jsx)("div",{className:"submit-details",children:Object(x.jsx)("button",{className:"button btnOrange btnPush",onClick:_,disabled:!((N.Name||t)&&N.Email&&N.Password),children:"Go"})})]})})]})]})};t(109);function y(e){return Object(x.jsx)("div",{className:"member-profile",children:Object(x.jsx)("span",{children:e.name})})}t(110);var $,R=t(77),D=Object(l.gql)($||($=Object(O.a)(["\n  mutation($message: String!, $creatorId: ID!, $roomId: ID!) {\n    writeMessage(creatorId: $creatorId, roomId: $roomId, message: $message) {\n      content\n      room {\n        id\n      }\n    }\n  }\n"])));function E(e){var n=Object(c.useState)(""),t=Object(m.a)(n,2),a=t[0],s=t[1],r=Object(c.useState)(!1),j=Object(m.a)(r,2),b=j[0],u=j[1],O=Object(l.useMutation)(D,{update:function(e,n){},onError:function(e){u(e)}}),h=Object(m.a)(O,1)[0],g=Object(c.useContext)(d),p=Object(i.g)(),f=Object(c.useCallback)((function(n){n.preventDefault(),a&&h({variables:{message:a,creatorId:g.userId,roomId:e.roomId}}),s("")}),[e.roomId,a,h,g]);return Object(x.jsxs)(o.a.Fragment,{children:[" ",b&&Object(x.jsxs)(k,{show:b,onCancel:function(){return u(!1)},children:[b.message,Object(x.jsx)("br",{}),Object(x.jsx)("button",{className:"modal-button",onClick:function(){g.roomJoin(""),p.push("/joinRoom")},children:"Leave"})]}),Object(x.jsxs)("form",{onSubmit:f,className:"type-message",children:[Object(x.jsx)("input",{type:"text",placeholder:"how its going...",value:a,onChange:function(e){return s(e.target.value)}}),Object(x.jsx)(R.a,{className:"send-icon",onClick:f})]})]})}t(111);function M(e){var n,t=Object(c.useContext)(d);return e.message.creator.id===t.userId&&(n="align-right"),Object(x.jsxs)("div",{className:"message-container ".concat(n),children:[Object(x.jsx)("div",{className:"name-container",children:Object(x.jsx)("span",{style:{marginLeft:"10px"},children:e.message.creator.name})}),Object(x.jsx)("div",{className:"content-container",children:Object(x.jsx)("span",{children:e.message.content})})]})}t(112);function P(e){return Object(x.jsx)("div",{children:e.children})}var X=t(35);t(113);function J(e){var n=Object(c.useState)(!1),t=Object(m.a)(n,2),o=t[0],a=t[1];return Object(x.jsxs)("div",{className:"header-box ".concat(e.className),children:[Object(x.jsxs)("div",{className:"header-content",children:[Object(x.jsx)("p",{children:"Scoup"}),!o&&Object(x.jsx)(X.b,{className:"details-button",onClick:function(){a((function(e){return!e}))}}),o&&Object(x.jsx)(X.c,{className:"details-button",onClick:function(){a((function(e){return!e}))}})]}),o&&Object(x.jsx)("div",{style:{alignSelf:"center",animation:"fadeInDown 600ms ease-in-out"},children:Object(x.jsx)(P,Object(u.a)({},e))})]})}var q,L,U,W=t(78),_=(t(114),Object(l.gql)(q||(q=Object(O.a)(["\n  mutation($roomId: ID!, $userId: ID!) {\n    leaveRoom(userId: $userId, roomId: $roomId)\n  }\n"])))),F=Object(l.gql)(L||(L=Object(O.a)(["\n  mutation($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      roomCreator {\n        id\n        name\n      }\n      roomMembers {\n        name\n        id\n      }\n    }\n  }\n"]))),z=Object(l.gql)(U||(U=Object(O.a)(["\n  subscription($roomId: ID!) {\n    getRoomMessages(roomId: $roomId) {\n      content\n      creator {\n        name\n        id\n      }\n      id\n    }\n  }\n"]))),A=[];function B(){var e=Object(c.useState)(null),n=Object(m.a)(e,2),t=n[0],a=n[1],s=Object(i.g)(),r=Object(l.useMutation)(F,{update:function(e,n){},onError:function(e){console.log(e),console.log(e.message),a(e)}}),j=Object(m.a)(r,2),b=j[0],u=j[1],O=u.data,h=u.loading,p=Object(l.useMutation)(_,{update:function(e,n){},onError:function(e){a(e)}}),f=Object(m.a)(p,1)[0],v=Object(c.useContext)(d);Object(c.useEffect)((function(){b({variables:{roomId:v.roomId}})}),[b,v]);var I=Object(l.useSubscription)(z,{variables:{roomId:v.roomId}}).data;return I&&A.push(I.getRoomMessages),Object(x.jsxs)(o.a.Fragment,{children:[h&&Object(x.jsx)(g,{asOverlay:!0}),t&&Object(x.jsx)(k,{show:t,onCancel:function(){return a(!1)},children:t.message}),!t&&Object(x.jsxs)("div",{className:"chat-page",children:[Object(x.jsxs)("div",{className:"room-box",children:[Object(x.jsx)("h1",{children:"Scoup"}),Object(x.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(x.jsxs)("div",{className:"room-creator",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("span",{children:"Creator - "}),Object(x.jsx)("span",{style:{fontWeight:"800",fontSize:"x-large",textDecoration:"underline"},children:O&&O.findRoom.roomCreator.name})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{children:[Object(x.jsx)("span",{children:"Room Id - "}),Object(x.jsxs)("span",{style:{fontWeight:800,fontSize:"larger",overflowWrap:"break-word",textDecoration:"underline"},children:[" ",O&&O.findRoom.id]}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsx)(W.a,{className:"copy-icon ",onClick:function(){navigator.clipboard.writeText(O.findRoom.id)}})]}),Object(x.jsx)("div",{children:Object(x.jsx)("button",{className:"leave-room",onClick:function(){f({variables:{userId:v.userId,roomId:v.roomId}}),v.roomJoin(""),A=[],s.push("/joinRoom")},children:"Leave"})})]}),Object(x.jsx)("div",{className:"room-members",children:O&&O.findRoom.roomMembers.map((function(e){return Object(x.jsx)(y,{name:e.name,id:e.id},e.id)}))})]})]}),Object(x.jsxs)("div",{className:"message-box",children:[Object(x.jsx)(J,{className:"responsive-header",children:Object(x.jsxs)("div",{className:"room-creator",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("span",{children:"Creator - "}),Object(x.jsx)("span",{style:{fontWeight:"800",fontSize:"x-large",textDecoration:"underline"},children:O&&O.findRoom.roomCreator.name})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("div",{children:[Object(x.jsx)("span",{children:"Room Id - "}),Object(x.jsxs)("span",{style:{fontWeight:800,fontSize:"larger",overflowWrap:"break-word",textDecoration:"underline"},children:[" ",O&&O.findRoom.id]})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("br",{}),Object(x.jsx)("button",{className:"leave-room",onClick:function(){A=[],f({variables:{userId:v.userId,roomId:v.roomId}}),s.push("/joinRoom")},children:"Leave"})]})]})}),Object(x.jsx)("div",{className:"messages-space",children:Object(x.jsx)("div",{style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-start"},children:A.map((function(e){return Object(x.jsx)(M,{message:e},e.id)}))})}),O&&Object(x.jsx)(E,{roomId:O.findRoom.id})]})]})]})}t(115);var G,T,H=Object(l.gql)(G||(G=Object(O.a)(["\n  mutation($userId: ID!, $roomId: ID!) {\n    joinRoom(userId: $userId, roomId: $roomId) {\n      id\n    }\n  }\n"]))),K=Object(l.gql)(T||(T=Object(O.a)(["\n  mutation($userId: ID!) {\n    createRoom(creatorId: $userId) {\n      id\n    }\n  }\n"])));function Q(){var e=Object(c.useState)(""),n=Object(m.a)(e,2),t=n[0],a=n[1],s=Object(c.useContext)(d),r=Object(i.g)(),j=Object(c.useState)(!1),b=Object(m.a)(j,2),u=b[0],O=b[1],h=Object(l.useMutation)(H,{update:function(e,n){},onError:function(e){O(e)}}),p=Object(m.a)(h,2),f=p[0],v=p[1],I=v.data,N=v.loading,C=Object(l.useMutation)(K,{update:function(e,n){},onError:function(e){O(e)}}),S=Object(m.a)(C,2),w=S[0],y=S[1],$=y.data,R=y.loading,D=Object(c.useCallback)((function(){f({variables:{userId:s.userId,roomId:t}})}),[s,t,f]),E=Object(c.useCallback)((function(){w({variables:{userId:s.userId}})}),[s,w]);return I&&(s.roomJoin(I.joinRoom.id),r.push("/chatRoom")),$&&(s.roomJoin($.createRoom.id),r.push("/chatRoom")),Object(x.jsxs)(o.a.Fragment,{children:[(N||R)&&Object(x.jsx)(g,{asOverlay:!0}),u&&Object(x.jsx)(k,{show:u,onCancel:function(){return O(!1)},children:u.message}),Object(x.jsx)("div",{className:"join-room-page",children:Object(x.jsxs)("div",{className:"block-1",children:[Object(x.jsxs)("div",{className:"block-2",children:[Object(x.jsx)("span",{children:"Join Room"}),Object(x.jsx)("input",{type:"text",value:t,onChange:function(e){a(e.target.value)},placeholder:"XXXXXXXXXXXX"}),Object(x.jsx)(X.a,{className:"room-submit-icon",onClick:D})]}),Object(x.jsx)("span",{children:"OR"}),Object(x.jsx)("button",{onClick:E,children:"Create Room"})]})})]})}t(116);var V=new j.a({uri:"wss://chat-app02.herokuapp.com/graphql",options:{reconnect:!0}}),Y=new l.ApolloClient({link:V,uri:"https://chat-app02.herokuapp.com/graphql ",cache:new l.InMemoryCache});var Z=function(){var e=function(){var e=Object(c.useState)(null),n=Object(m.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(!1),s=Object(m.a)(a,2),r=s[0],i=s[1],l=Object(c.useState)(null),j=Object(m.a)(l,2),d=j[0],b=j[1],u=Object(c.useState)(null),O=Object(m.a)(u,2),x=O[0],h=O[1];return{userId:t,name:d,isLoggedIn:r,roomId:x,logIn:Object(c.useCallback)((function(e,n){o(e),i(!0),b(n)}),[]),roomJoin:Object(c.useCallback)((function(e){h(e)}),[])}}(),n=e.userId,t=e.name,o=e.isLoggedIn,a=e.roomId,s=e.logIn,j=e.roomJoin;return Object(x.jsx)(l.ApolloProvider,{client:Y,children:Object(x.jsx)(d.Provider,{value:{userId:n,isLoggedIn:o,name:t,roomId:a,roomJoin:j,logIn:s},children:Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(r.a,{children:Object(x.jsxs)(i.d,{children:[a&&Object(x.jsx)(i.b,{path:"/chatRoom",children:Object(x.jsx)(B,{})}),o&&Object(x.jsx)(i.b,{path:"/joinRoom",children:Object(x.jsx)(Q,{})}),Object(x.jsx)(i.b,{path:"/",children:Object(x.jsx)(w,{})}),Object(x.jsx)(i.a,{to:"/"})]})})})})})};s.a.render(Object(x.jsx)(Z,{}),document.getElementById("root"))},83:function(e,n,t){},98:function(e,n,t){}},[[117,1,2]]]);
//# sourceMappingURL=main.3d065224.chunk.js.map