"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[883],{93883:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(26042),i=n(69396),a=n(85893),l=function(e){var t=e.children;return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:"GeoLayout"}),t]})},o=n(25617),s=n(67294),c=n(5152),u=n.n(c),d=n(46097),p=n(13983),f=n(69412),h=n(28367),g=function(e){var t,n=e.articleDetail,r=e.openDetail,i=e.setopenDetail,l=e.setarticleDetail,o=e.keyword;return(0,a.jsx)(d.dy,{title:n.title,placement:"right",visible:r,onClose:function(){i(!1),l({})},children:(0,a.jsxs)(d.X2,{children:[(0,a.jsxs)(d.JX,{xs:24,sm:24,md:12,lg:12,xl:12,children:[(0,a.jsx)(d.TH,{title:"news date:",content:n.datee}),(0,a.jsx)(d.TH,{title:"Jurnalist:",content:n.journalist}),(0,a.jsx)(d.TH,{title:"media type:",content:n.media_type}),(0,a.jsx)(d.TH,{title:"location:",content:n.location})]}),(0,a.jsxs)(d.JX,{xs:24,sm:24,md:12,lg:12,xl:12,children:[(0,a.jsx)(d.TH,{title:"news value:",content:"".concat(n.rate_bw)}),(0,a.jsx)(d.TH,{title:"ad value:",content:"".concat(n.rate_fc)}),(0,a.jsx)(d.TH,{title:"sentiment:",content:(0,a.jsx)(d.Vp,{style:{margin:0},color:"Positive"==n.tone?"success":"Negative"==n.tone?"error":"processing",children:n.tone})})]}),(0,a.jsx)(d.JX,{span:24,children:(0,a.jsx)(d.X2,{children:(0,a.jsxs)(d.JX,{span:24,children:["mp4"==(null===(t=n.file_pdf)||void 0===t?void 0:t.split(".")[1])&&(0,a.jsx)("video",{src:"https://input.digivla.id/media_tv/"+n.file_pdf.split("-")[0]+"/"+n.file_pdf.split("-")[1]+"/"+n.file_pdf.split("-")[2]+"/"+n.file_pdf,controls:!0,children:"Your browser does not support HTML5 video."}),(0,a.jsx)("div",{dangerouslySetInnerHTML:{__html:(0,h.p)(o,n.content)}})]})})}),(0,a.jsx)(d.JX,{span:24,children:(0,a.jsx)(d.Vp,{color:"processing",children:n.category_id})})]})})},x=n(73939),j=function(e){var t=e.articleData,n=e.openList,l=e.geoList,s=e.handleCancel,c=e.handleDetail,u=e.setarticleData,d=e.defaultFilter,p=(0,o.I0)(),h=(0,o.v9)((function(e){return e.filter})).filter;return(0,a.jsx)(x.Z,{selfOnClick:!0,modal:{title:"Article of ".concat(t.key),visible:n&&!l.loading,closeable:!0,onCancel:s},data:l.result.data?l.result.data.map((function(e){return{id:e.article_id,title:(0,a.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return c(e.article_id,e)},children:e.title}),detail:e}})):[],pagination:{showSizeChanger:!0,total:l.result.recordsTotal||0,showTotal:function(e){return"Total ".concat(l.result.recordsTotal||0," article")},defaultPageSize:t.max_size,defaultCurrent:t.page+1,onChange:function(e,n){p((0,f.YH)((0,r.Z)((0,i.Z)((0,r.Z)({},d),{page:e-1,max_size:n,geo_loc:t.key}),h.result))),u((0,i.Z)((0,r.Z)({},t),{page:e-1,max_size:n}))}}})},m=n(58742),_=u()((function(){return Promise.all([n.e(898),n.e(414),n.e(688)]).then(n.bind(n,2688))}),{loadableGenerated:{webpack:function(){return[2688]}},ssr:!1}),y=function(){var e=(0,o.I0)(),t=(0,o.v9)((function(e){return e.filter})),n=(0,o.v9)((function(e){return e.geo})),l=t.filter,c=n.geo,u=n.geoList,h=(0,s.useState)(!1),x=h[0],y=h[1],v=(0,s.useState)({}),b=v[0],S=v[1],Z=(0,s.useState)(!1),T=Z[0],C=Z[1],w=(0,s.useState)({}),D=w[0],H=w[1],J=(0,s.useState)([]),X=J[0],L=J[1],z=(0,s.useState)(!1),I=z[0],Y=z[1],P=(0,s.useState)(!1),M=P[0],N=P[1],V=(0,s.useState)(""),E=V[0],G=V[1],O=(0,s.useState)({type_location:"article"}),A=O[0],F=O[1];(0,s.useEffect)((function(){JSON.parse(localStorage.getItem("userToken"));Y(!0),e((0,f.Vp)((0,r.Z)({},A,l.result))),N(!0)}),[l,A]);p.US;var U=function(t,n){y(!0),e((0,f.YH)((0,r.Z)((0,i.Z)((0,r.Z)({},A),{page:0,max_size:10,geo_loc:t}),l.result))),S((0,i.Z)((0,r.Z)({key:t},n),{page:0,max_size:10}))};return(0,a.jsx)(d.Zb,{title:"Geodata by ".concat(A.type_location),onLoading:!M,extra:I?(0,a.jsx)(d.Ph,{placeholder:"type location",defaultValue:A.type_location,optionFilterProp:"children",onChange:function(e){F((0,i.Z)((0,r.Z)({},A),{type_location:e}))},options:[{value:"article",label:"Article"},{value:"media",label:"Media"}]}):null,children:I?(0,a.jsxs)(d.X2,{align:"middle",justify:"center",style:{minHeight:500},children:[(0,a.jsx)(d.JX,{xs:24,sm:24,md:24,lg:24,xl:16,children:(0,a.jsx)(d.X2,{align:"bottom",justify:"center",style:{minHeight:500},children:(0,a.jsx)(d.JX,{span:24,children:(0,a.jsx)(_,{options:c.result.data?c.result.data:[],clickEvent:function(e,t){U(e)}})})})}),(0,a.jsx)(d.JX,{xs:24,sm:24,md:24,lg:24,xl:8,children:(0,a.jsx)(d.Zb,{title:"Top City",onLoading:c.loading,extra:c.result.top_location?"Total Article: ".concat(c.result.top_location.total_top_location_article):null,children:c.result.top_location?c.result.top_location.location.map((function(e,t){return(0,a.jsx)(d.TH,{style:k(t),title:(0,a.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return U(e.key,e)},children:e.key}),content:e.value},t)})):null})}),(0,a.jsx)(j,{articleData:b,openList:x,geoList:u,handleCancel:function(e){y(!1),S({})},handleDetail:function(e,t){(0,m.Mr)({article_id:t.article_id}).then((function(e){return e.json()})).then((function(e){H(t),L(e.data),C(!0)})).catch((function(e){return console.log(e)}))},setarticleData:S,defaultFilter:A}),(0,a.jsx)(g,{openDetail:T,setopenDetail:C,articleDetail:D,setarticleDetail:H,keyword:X})]}):(0,a.jsxs)(d.X2,{align:"middle",children:[(0,a.jsx)(d.JX,{children:"Please select date for backtrack:"}),(0,a.jsxs)(d.JX,{children:[(0,a.jsx)(d.Mt,{onChange:function(e){return G(e.format("YYYY-MM-DD"))}}),(0,a.jsx)(d.zx,{onClick:function(){(0,f.l7)({backtrack_date:E}).then((function(e){return e.json()})).then((function(t){"client_id is successfully registered"==t.message?(d.t6.success({message:"Success backtrack"}),e((0,f.Vp)((0,r.Z)({},A,l.result))),Y(!0)):d.t6.error({message:"Error happen when add backtrack date!"})})).catch((function(e){return d.t6.error({message:"Error happen when add backtrack date!"})}))},children:"Submit"})]})]})})},k=function(e){return{display:"flex",alignItems:"center",justifyContent:"space-between",background:e%2?"rgba(54, 65, 76, 0.1)":null,padding:6,marginBottom:6}};y.layout=l;var v=y},69412:function(e,t,n){n.d(t,{Vp:function(){return c},YH:function(){return u},l7:function(){return d}});var r=n(47568),i=n(26042),a=n(69396),l=n(97582),o=n(63426),s=n(83401),c=(n(49552),function(e){return function(){var t=(0,r.Z)((function(t,n){var r,c,u;return(0,l.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t({type:o.Yk8}),r=JSON.parse(localStorage.getItem("userToken")),[4,(0,s.ab)("all-count/",r.token,(0,a.Z)((0,i.Z)({},e),{tone:e.tonee}))];case 1:return[4,(c=n.sent()).json()];case 2:return c=n.sent(),t({type:o.LVC,result:c}),[3,4];case 3:return u=n.sent(),t({type:o.Pc7,result:u}),[3,4];case 4:return[2]}}))}));return function(e,n){return t.apply(this,arguments)}}()}),u=function(e){return function(){var t=(0,r.Z)((function(t,n){var r,c,u;return(0,l.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t({type:o.GqR}),r=JSON.parse(localStorage.getItem("userToken")),[4,(0,s.ab)("article-by-geo/",r.token,(0,a.Z)((0,i.Z)({},e),{tone:e.tonee}))];case 1:return[4,(c=n.sent()).json()];case 2:return c=n.sent(),t({type:o.IuU,result:c}),[3,4];case 3:return u=n.sent(),t({type:o.rzG,result:u}),[3,4];case 4:return[2]}}))}));return function(e,n){return t.apply(this,arguments)}}()},d=function(e){return new Promise((function(t,n){var r=JSON.parse(localStorage.getItem("userToken"));return(0,s.SD)("geo/add/",r.token,e).then((function(e){return t(e)}))}))}}}]);