"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[89],{894:function(e,t,n){var i=n(26042),a=n(69396),o=n(85893),r=n(46097),s=n(93986),l=n(90063),c=n(67294),u=(n(13983),n(58742)),d=n(13448),p=n(25617),f=n(28367);t.Z=function(e){var t,n,h,x=e.setclipEditingPop,m=e.setEditingDrawerTemp,g=e.clipEditingPop,j=e.handleSubmitEditingModal,_=e.summaryEdit,v=e.setsummaryEdit,b=e.saveArticlePop,y=e.setsaveArticlePop,w=e.buttonLoading,S=e.setbuttonLoading,k=e.editingDrawerTemp,C=e.keyword,J=e.search,T=e.sponsor,X=e.sponsorCol,Z=(0,p.I0)(),z=(0,p.v9)((function(e){return e.newsClipping.newsClippingList})),H=(0,c.useState)(k.title),I=H[0],O=H[1],E=(0,c.useState)(k.tone||0),P=E[0],R=E[1],V=(0,c.useState)(k.summary),N=V[0],D=V[1],L=(0,c.useState)(k.issue),B=L[0],A=L[1],F=(0,c.useState)([]),M=F[0],Y=F[1],q=(0,c.useState)([]),Q=(q[0],q[1],(0,c.useState)([])),G=Q[0],K=Q[1],U=JSON.parse(localStorage.getItem("userToken"));return(0,o.jsx)(r.dy,{title:k.title,placement:"top",height:550,onClose:function(){x(!1),m({}),O(""),R(null),y(!1)},visible:g,footer:(0,o.jsx)(r.zx,{loading:w,type:"primary",style:{float:"right"},onClick:function(){j(I,P,N,B,k.categories,k.sponsor)},children:"Submit"}),children:(0,o.jsxs)(r.X2,{children:[!J&&(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.II,{type:"textarea",autoSize:{minRows:1,maxRows:2},defaultValue:I,onChange:function(e){O(e.target.value)}})}),(0,o.jsxs)(r.JX,{xs:24,md:12,lg:12,xl:12,children:[(0,o.jsx)(r.TH,{bold:!0,title:"date",content:k.datee}),(0,o.jsx)(r.TH,{bold:!0,title:"media",content:k.media_name}),(null===(t=k.file_pdf)||void 0===t?void 0:t.split("/").length)>1&&(0,o.jsx)(r.TH,{bold:!0,title:"option",content:(0,o.jsx)("a",{style:{width:"100%",margin:0},onClick:function(){return window.open(k.file_pdf)},children:"Preview"})})]}),!J&&(0,o.jsxs)(r.JX,{xs:24,md:12,lg:12,xl:12,children:[(0,o.jsx)(r.TH,{bold:!0,title:"news value",content:(0,l.v)(k.advalue_bw)}),(0,o.jsx)(r.TH,{bold:!0,title:"ad value",content:(0,l.v)(k.advalue_fc)})]}),J&&(0,o.jsxs)(r.JX,{xs:24,md:12,lg:12,xl:12,children:[(0,o.jsx)(r.TH,{bold:!0,title:"news value",content:(0,l.m6)(k.rate_bw)}),(0,o.jsx)(r.TH,{bold:!0,title:"ad value",content:(0,l.m6)(k.rate_fc)}),(0,o.jsx)(r.TH,{bold:!0,title:"download",content:(0,o.jsxs)(r.X2,{children:[(0,o.jsx)(r.JX,{span:12,children:(0,o.jsx)(r.zx,{size:"small",type:"primary",danger:!0,block:!0,onClick:function(){return e=1,void(0,u.Tf)({doc_type:e,logo_name:U.comp_icon,articles:[{article_id:k.article_id,title:k.title,datee:k.datee,content:k.content,page:k.page,file_pdf:k.file_pdf,journalist:k.journalist,rate_bw:k.rate_bw,rate_fc:k.rate_fc,tone:0,media_name:k.media_name,media_type:k.media_type}]}).then((function(e){return e.json()})).then((function(e){200==e.code&&window.open(e.data.link)})).catch((function(e){return e}));var e},children:"PDF"})}),(0,o.jsx)(r.JX,{span:12,children:(0,o.jsx)(r.zx,{size:"small",type:"primary",block:!0,onClick:function(){(0,u.eq)({logo_name:U.comp_icon,articles:[{article_id:k.article_id,title:k.title,datee:k.datee,content:k.content,page:k.page,file_pdf:k.file_pdf,journalist:k.journalist,rate_bw:k.rate_bw,rate_fc:k.rate_fc,tone:0,media_name:k.media_name,media_type:k.media_type}]}).then((function(e){return e.json()})).then((function(e){200==e.code&&window.open(e.data)})).catch((function(e){return e}))},children:"DOC"})})]})})]}),!J&&(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.TH,{bold:!0,ellipsis:!0,title:"sentiment",content:(0,o.jsx)(r.Y8,{type:"group",value:P,onChange:function(e){R(e.target.value)},options:[{value:1,label:"Positive"},{value:0,label:"Neutral"},{value:-1,label:"negative"}]})})}),T,k.issue?(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.TH,{title:"edit issue",content:(0,o.jsx)(r.II,{style:{width:"100%"},onChange:function(e){A(e.target.value)},defaultValue:B})})}):null,(0,o.jsx)(r.JX,{span:24,children:(0,o.jsxs)(r.X2,{children:[!J&&(0,o.jsx)(r.JX,{xs:24,md:12,lg:12,xl:12,children:(0,o.jsx)(r.zx,{block:"true",size:"default",type:"dashed",icons:_?"RollBackOutlined":"EditOutlined",onClick:function(){return v(!_)},children:_?"Back":"Edit Content"})}),(0,o.jsx)(r.JX,{xs:24,md:12,lg:12,xl:12,children:(0,o.jsxs)(r.zx,{block:"true",size:"default",type:"dashed",icons:b?"RollBackOutlined":"SaveOutlined",onClick:function(){b||((0,u.aB)().then((function(e){return e.json()})).then((function(e){Y(e.results)})),(0,u.Lj)().then((function(e){return e.json()})).then((function(e){K(e.data)})).catch((function(e){return e}))),y(!b)},children:[b?"Detail":"Save"," Article"]})})]})}),_?(0,o.jsxs)(c.Fragment,{children:[(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.II,{id:"editor",type:"textarea",style:{borderStyle:"dashed"},autoSize:{minRows:8,maxRows:8},defaultValue:N,onChange:function(e){return D(e.target.value)}})}),(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.zx,{loading:w,type:"primary",icons:"SaveOutlined",onClick:function(){S(!0),setTimeout((function(){v(!_),S(!1)}),500)},children:"Content"})})]}):b?(0,o.jsxs)(r.JX,{span:24,children:[J&&(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.TH,{bold:!0,title:"sentiment",content:(0,o.jsx)(r.Y8,{type:"group",value:P,onChange:function(e){R(e.target.value)},options:[{value:1,label:"Positive"},{value:0,label:"Neutral"},{value:-1,label:"negative"}]})})}),(0,o.jsx)(s.Z,{title:"subcategories",options:M.map((function(e){return e.category_id})),defaultValue:k.categories,onChange:function(e){m((0,a.Z)((0,i.Z)({},k),{categories:e}))}}),X&&(0,o.jsx)(s.Z.Sponsor,{title:"Sponsorship",options:G.map((function(e){return e.name})),defaultValue:k.sponsor.map((function(e){return e.name})),onChange:function(e){m((0,a.Z)((0,i.Z)({},k),{sponsor:G.filter((function(t){return e.find((function(e){return e==t.name}))}))}))}})]}):(0,o.jsxs)(c.Fragment,{children:[!J&&(0,o.jsx)(r.JX,{span:24,children:(0,o.jsx)(r.II,{id:"editor",type:"textarea",style:{borderStyle:"dashed"},autoSize:{minRows:8,maxRows:8},defaultValue:N,readOnly:!0})}),(0,o.jsxs)(r.JX,{span:24,children:["p4"==(null===(n=k.file_pdf)||void 0===n?void 0:n.split(".m")[1])&&(0,o.jsx)("video",{src:k.file_pdf,controls:!0,children:"Your browser does not support HTML5 video."}),(0,o.jsx)("div",{dangerouslySetInnerHTML:{__html:(0,f.p)(C,k.content)}})]})]}),(0,o.jsx)(r.JX,{span:24,children:null===(h=k.categories)||void 0===h?void 0:h.map((function(e){return(0,o.jsx)(r.u,{title:e,children:(0,o.jsx)(r.Vp,{style:{margin:3},color:"processing",closable:!0,onClose:function(){(0,u.n3)({article_id:k.article_id,category_id:e}).then((function(e){return e.json()})).then((function(e){d.Z.success({message:"Success delete subcat"}),Z((0,u.e9)((0,a.Z)((0,i.Z)({},z),{data:z.result.data.map((function(t){return t.article_id==k.article_id?(0,a.Z)((0,i.Z)({},t),{categories:e.data}):t}))})))})).catch((function(e){d.Z.error({message:"Error delete sub category!"})})),m((0,a.Z)((0,i.Z)({},k),{categories:k.categories.map((function(t){return t==e?null:t})).filter((function(e){return e}))}))},children:e})},e)}))})]})})}},36093:function(e,t,n){n.d(t,{V:function(){return l},c:function(){return s}});var i=n(47568),a=n(97582),o=n(63426),r=n(83401),s=(n(49552),function(e){return function(){var t=(0,i.Z)((function(t,n){var i,s,l;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t({type:o.mTQ}),i=JSON.parse(localStorage.getItem("userToken")),[4,(0,r.SD)("dashboard/top-issue",i.token,e)];case 1:return[4,(s=n.sent()).json()];case 2:return s=n.sent(),t({type:o.dOw,result:s}),[3,4];case 3:return l=n.sent(),t({type:o.bOk,result:l}),[3,4];case 4:return[2]}}))}));return function(e,n){return t.apply(this,arguments)}}()}),l=function(e){return new Promise((function(t,n){var i=JSON.parse(localStorage.getItem("userToken"));return(0,r._o)("issue/update/",i.token,e).then((function(e){return t(e)}))}))}}}]);