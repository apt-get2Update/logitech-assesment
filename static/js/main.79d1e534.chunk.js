(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,o){e.exports=o(30)},23:function(e,t,o){},30:function(e,t,o){"use strict";o.r(t);var a=o(0),r=o.n(a),n=o(14),s=o.n(n),c=(o(23),o(4)),i=o(5),l=o(8),u=o(6),d=o(9),m=o(3);var p=function(e){var t=e.row,o=e.index,a=e.books,n=e.zoom,s=e.type,c=(100*t.total/a[a.length-1].total).toFixed(0)*n,i={display:o>23?"none":"initial",position:"absolute",width:"calc(".concat(c,"% - 20px)"),height:"17px"},l="bits"===s?Object(m.a)({},i,{background:"rgba(82,108,46, 0.3)",right:"0px"}):Object(m.a)({},i,{background:"rgba(139,42,2, 0.3)",left:"0px"});return r.a.createElement("div",{className:"bits"===s?"flex-table":"flex-table reverse",key:t.price},r.a.createElement("span",{style:l}),r.a.createElement("div",{className:"flex-row"},t.count),r.a.createElement("div",{className:"flex-row"},Math.abs(parseFloat(t.amount)).toFixed(4)),r.a.createElement("div",{className:"flex-row"},parseFloat(t.total).toFixed(4)),r.a.createElement("div",{className:"flex-row"},t.price))};var h=function(e){return r.a.createElement("div",{className:"table-container"},r.a.createElement("div",{className:"flex-table header",role:"rowgroup"},r.a.createElement("div",{className:"flex-row"},"COUNT"),r.a.createElement("div",{className:"flex-row"},"AMOUNT"),r.a.createElement("div",{className:"flex-row"},"TOTAL"),r.a.createElement("div",{className:"flex-row"},"PRICE")),e.orderBookBids?e.orderBookBids.map(function(t,o){return r.a.createElement(p,{key:t.price,row:t,index:o,books:e.orderBookBids,zoom:e.zoom,type:"bits"})}):r.a.createElement("h2",null,"Loading..."))};var k=function(e){return r.a.createElement("div",{className:"table-container"},r.a.createElement("div",{className:"flex-table header",role:"rowgroup"},r.a.createElement("div",{className:"flex-row"},"PRICE"),r.a.createElement("div",{className:"flex-row"},"TOTAL"),r.a.createElement("div",{className:"flex-row"},"AMOUNT"),r.a.createElement("div",{className:"flex-row"},"COUNT")),e.orderBookAsks?e.orderBookAsks.map(function(t,o){return r.a.createElement(p,{key:t.price,row:t,index:o,books:e.orderBookAsks,zoom:e.zoom,type:"asks"})}):r.a.createElement("h2",null,"Loading..."))},f=o(7);var b=function(e){return{type:"UPDATE_BIDS_ORDER_BOOK",newBidsData:e}};var v=function(e){return{type:"UPDATE_ASKS_ORDER_BOOK",newAsksData:e}};var B=function(e){return{type:"CLEAR_ASKS",newAsksData:[]}};var O=function(e){return{type:"CLEAR_BIDS",newBidsData:[]}},E=o(2),w=new WebSocket("wss://api-pub.bitfinex.com/ws/2"),g=function(e){function t(e){var o;return Object(c.a)(this,t),(o=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={connectionReady:!0,isConnected:!1,pres:"P0",volume24h:0,lastPrice:0,priceChange:0,zoom:1},o}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.subscribeToBtc()}},{key:"componentWillUnmount",value:function(){this.closeConnection()}},{key:"morePrecision",value:function(){switch(this.closeConnection(),this.props.clearBidsOrderBook(),this.props.clearAsksOrderBook(),this.state.pres){case"P0":this.setState({pres:"P1"});break;case"P1":this.setState({pres:"P2"});break;case"P2":this.setState({pres:"P3"});break;default:return}this.subscribeToBtc()}},{key:"lessPrecision",value:function(){switch(this.closeConnection(),this.props.clearBidsOrderBook(),this.props.clearAsksOrderBook(),this.state.pres){case"P3":this.setState({pres:"P2"});break;case"P2":this.setState({pres:"P1"});break;case"P1":this.setState({pres:"P0"});break;default:return}this.subscribeToBtc()}},{key:"subscribeToBtc",value:function(){var e=this;this.setState({isConnected:!0}),w.onopen=function(){console.log("connected"),e.setState({connectionReady:!0}),w.send(JSON.stringify({event:"conf",flags:131072})),w.send(JSON.stringify({event:"subscribe",channel:"book",pair:"tBTCUSD",prec:e.state.pres,len:25}))},w.onmessage=function(t){!function(t){if(!t.event&&Array.isArray(t[1])&&3===t[1].length){var o={price:parseFloat(t[1][0]),count:t[1][1],amount:parseFloat(t[1][2]),total:parseFloat(0)};o.amount>0?e.props.updateBidsOrderBook(o):e.props.updateAsksOrderBook(o)}}(JSON.parse(t.data))},w.onclose=function(){console.log("disconnected")}}},{key:"closeConnection",value:function(){w.close(),this.setState({isConnected:!1})}},{key:"zoomOut",value:function(){this.setState({zoom:this.state.zoom-.2})}},{key:"zoomIn",value:function(){this.setState({zoom:this.state.zoom+.2})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("button",{disabled:this.state.zoom<.21,onClick:this.zoomOut.bind(this)},"Zoom Out"),r.a.createElement("button",{disabled:1===this.state.zoom,onClick:this.zoomIn.bind(this)},"Zoom In")),r.a.createElement("div",{className:"books-wrapper"},r.a.createElement("div",{className:"bids-container"},r.a.createElement(h,{orderBookBids:this.props.orderBookBids,zoom:this.state.zoom})),r.a.createElement("div",{className:"asks-container"},r.a.createElement(k,{orderBookAsks:this.props.orderBookAsks,zoom:this.state.zoom}))))}}]),t}(a.Component);var y=Object(f.b)(function(e){return{orderBookBids:e.orderBookBids,orderBookAsks:e.orderBookAsks,tradesList:e.tradesList}},function(e){return Object(E.a)({updateAsksOrderBook:v,updateBidsOrderBook:b,clearBidsOrderBook:O,clearAsksOrderBook:B},e)})(g),A=o(17),S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0,a=!1;if(e.length>0&&e.forEach(function(o,r){e[r].price&&t.price&&e[r].price===t.price&&(a=!0,e[r].count=t.count,e[r].amount=t.amount)}),!0===a)return a=!1,e.slice();var r=Object(A.a)(e).concat([t]);return r.sort(function(e,t){return o?e.price-t.price:t.price-e.price}),r.length>50&&r.pop(),r.length>0&&r.forEach(function(e,t){e&&0!==e.count||r.splice(t,1),o&&(!e||e.amount>0)&&r.splice(t,1)}),r.map(function(e,t){return r[t-1]&&r[t-1].total?Object(m.a)({},e,{total:(parseFloat(r[t-1].total)+Math.abs(parseFloat(e.amount))).toFixed(4)}):Object(m.a)({},e,{total:parseFloat(e.amount).toFixed(4)})})},x=Object(E.b)({orderBookBids:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_BIDS_ORDER_BOOK":var o=t.newBidsData;return S(e,o,!1);case"CLEAR_BIDS":return t.newBidsData;default:return e.slice()}},orderBookAsks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_ASKS_ORDER_BOOK":var o=t.newAsksData;return S(e,o,!0);case"CLEAR_ASKS":return t.newAsksData;default:return e.slice()}}}),N=function(){try{var e=localStorage.getItem("state");return e?JSON.parse(e):void 0}catch(t){return void console.error(t)}}(),D=Object(E.c)(x,N);D.subscribe(function(){!function(e){try{localStorage.setItem("state",JSON.stringify(e))}catch(t){console.error(t)}}(D.getState())});var P=D,C=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{store:P},r.a.createElement("div",{className:"App"},r.a.createElement(y,null)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.79d1e534.chunk.js.map