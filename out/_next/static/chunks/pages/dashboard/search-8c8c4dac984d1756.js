(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[673],{35156:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/search",function(){return n(96532)}])},96532:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(26042),a=n(69396),i=n(85893),s=n(67294),c=n(25617),l=n(46097),o=n(47568),u=n(14924),d=n(97582),h=n(13448),f=n(27049),g=n(58742),m=n(894),p=(n(36093),function(e){var t=e.data,n=void 0===t?[]:t,a=e.pagination,p=(e.dataPag,e.searchForm),_=e.handleSearch,x=((0,c.I0)(),(0,s.useState)(!1)),v=x[0],j=x[1],y=(0,s.useState)({}),S=y[0],Z=y[1],w=(0,s.useState)([]),b=w[0],P=w[1],k=(0,s.useState)(!1),C=k[0],E=k[1],I=(0,s.useState)(!1),T=I[0],z=I[1],N=(0,s.useState)(!1),X=N[0],F=N[1],J=function(){var e=(0,o.Z)((function(e,t,n,r,a){var i;return(0,d.__generator)(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),F(!0),null,[4,(0,g.yz)({article_id:S.article_id,category_ids:S.categories,datee:S.datee.split(" ")[0],media_id:S.media_id,tone:t,advalue_fc:S.rate_fc,circulation:S.circulation,advalue_bw:S.rate_bw})];case 1:return e.sent(),j(!1),Z({}),E(!1),_(p),F(!1),h.Z.success({message:"Data has been Updated",duration:3}),[3,3];case 2:return i=e.sent(),console.log(i),h.Z.error({message:"Please check your update request!!",duration:3}),[3,3];case 3:return[2]}}))}));return function(t,n,r,a,i){return e.apply(this,arguments)}}();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{style:{padding:"12px 0"},children:[0==n?(0,i.jsx)("div",{style:{display:"flex",minHeight:500,width:"100%",maxHeight:600,overflowY:"auto",alignItems:"center",justifyContent:"center"},children:(0,i.jsx)(l.HY,{description:"Please Search Article"})}):n.map((function(e){var t;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.TH,{ellipsis:!0,title:(0,i.jsxs)("div",{style:(t={display:"flex",width:"100%"},(0,u.Z)(t,"width","90vw"),(0,u.Z)(t,"maxWidth","90vw"),(0,u.Z)(t,"position","relative"),(0,u.Z)(t,"flexDirection","column"),(0,u.Z)(t,"&:hover",{background:"red"}),t),children:[(0,i.jsx)("h5",{style:{margin:0,cursor:"pointer"},onClick:function(){return e.article_id,t=e,void(0,g.Mr)({article_id:t.article_id}).then((function(e){return e.json()})).then((function(e){P(e.data),j(!0),Z(t)})).catch((function(e){return console.log(e)}));var t},children:e.title}),(0,i.jsxs)("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"space-between",minWidth:"100%",margin:"6px 0"},children:[(0,i.jsx)("a",{style:{textTransform:"initial"},href:e.file_pdf,target:"_BLANK",rel:"noreferrer",children:e.media_name}),(0,i.jsx)("div",{children:e.datee})]})]}),content:e.content},e.article_id),(0,i.jsx)(f.Z,{})]})})),(0,i.jsx)(i.Fragment,{children:0==n?null:(0,i.jsx)(l.tl,(0,r.Z)({size:"small"},a))})]}),v?(0,i.jsx)(m.Z,{setclipEditingPop:j,setEditingDrawerTemp:Z,clipEditingPop:v,editingDrawerTemp:S,handleSubmitEditingModal:J,summaryEdit:T,setsummaryEdit:z,setsaveArticlePop:E,saveArticlePop:C,buttonLoading:X,setbuttonLoading:F,keyword:b,search:!0}):null]})}),_=n(11136),x=(n(49552),n(74034)),v=function(e){return new Promise((function(t,n){var r=JSON.parse(localStorage.getItem("userToken"));return(0,x.SD)("search/",r.token,e).then((function(e){return t(e)}))}))},j=function(){var e,t=(0,c.I0)(),n=(0,c.v9)((function(e){return e.searching})),u=(0,c.v9)((function(e){return e.filter})),h=n.searchMedia,f=(n.searchSubcat,u.filter),g=(0,s.useState)(0),m=g[0],j=g[1],y=(0,s.useState)(10),S=y[0],Z=y[1],w=(0,s.useState)({page:0,maxSize:10}),b=w[0],P=w[1];(0,s.useEffect)((function(){var e;h.loaded||t(function(){var t=(0,o.Z)((function(t,n){var r,a,i;return(0,d.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t({type:_.pT}),r=JSON.parse(localStorage.getItem("userToken")),[4,(0,x.Be)("media-categories/",r.token,e)];case 1:return[4,(a=n.sent()).json()];case 2:return a=n.sent(),t({type:_.rg,result:a}),[3,4];case 3:return i=n.sent(),t({type:_.Wq,result:i}),[3,4];case 4:return[2]}}))}));return function(e,n){return t.apply(this,arguments)}}())}),[]);var k=function(e){v((0,a.Z)((0,r.Z)({},b),{page:0,maxSize:10,term:b.term,search_field:b.search_field,media_category:b.media_category,start_date:f.result.start_date,end_date:f.result.end_date})).then((function(e){return e.json()})).then((function(e){P((0,r.Z)((0,a.Z)((0,r.Z)({},b),{page:0,maxSize:10}),e)),j(0),Z(10)})).catch((function(e){return console.log(e)}))};return(0,i.jsxs)(l.Zb,{shadow:"false",children:[(0,i.jsx)(l.l0,{children:(0,i.jsxs)(l.X2,{align:"middle",justify:"center",children:[(0,i.jsx)(l.JX,{xs:24,sm:24,md:8,xl:8,children:(0,i.jsxs)(l.X2,{children:[(0,i.jsx)(l.JX,{span:12,children:(0,i.jsx)(l.l0.Item,{children:(0,i.jsx)(l.Ph,{placeholder:"Select Media",optionFilterProp:"children",id:"media_category",onChange:function(e){P((0,a.Z)((0,r.Z)({},b),{media_category:e,category_id:"all"}))},options:(null===(e=h.result.results)||void 0===e?void 0:e.map((function(e){return{value:e.key,label:e.value}})))||[]})})}),(0,i.jsx)(l.JX,{span:12,children:(0,i.jsx)(l.l0.Item,{children:(0,i.jsx)(l.Ph,{placeholder:"Select by Content",id:"search_field",defaultValue:b.search_field,onChange:function(e){P((0,a.Z)((0,r.Z)({},b),{search_field:e}))},options:[{value:"title",label:"Title"},{value:"content",label:"Content"}]})})})]})}),(0,i.jsx)(l.JX,{xs:24,sm:24,md:16,xl:16,children:(0,i.jsx)(l.l0.Item,{children:(0,i.jsx)(l.II,{type:"search",id:"term",onChange:function(e){P((0,a.Z)((0,r.Z)({},b),{term:e.target.value}))},value:b.term,allowClear:!0,enterButton:(0,i.jsx)(l.JO,{type:"SearchOutlined"}),onSearch:function(){return k()}})})})]})}),(0,i.jsx)(p,{searchForm:b,handleSearch:k,dataPag:{searchPage:m,searchPageSize:S},data:b.results,pagination:{showSizeChanger:!0,total:b.totalItems,showTotal:function(e){return"Article Found ".concat(e)},current:m+1,pageSize:S,onChange:function(e,t){P((0,a.Z)((0,r.Z)({},b),{page:e-1,maxSize:t}),j(e-1),Z(t)),v((0,a.Z)((0,r.Z)({},(0,a.Z)((0,r.Z)({},b),{page:e-1,maxSize:t})),{term:b.term,search_field:b.search_field,media_category:b.media_category,start_date:f.result.start_date,end_date:f.result.end_date})).then((function(e){return e.json()})).then((function(e){P((0,r.Z)({},b,e))})).catch((function(e){return console.log(e)}))}}})]})}}},function(e){e.O(0,[840,89,774,888,179],(function(){return t=35156,e(e.s=t);var t}));var t=e.O();_N_E=t}]);