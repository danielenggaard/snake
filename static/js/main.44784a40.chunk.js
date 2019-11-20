(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{46:function(e,t,n){e.exports=n(61)},56:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),i=n(19),s=n.n(i),c=n(25),u=n(26),l=n(10),h=n.n(l),m=n(18),d=n(40),f=n(32),p=n(41),v=n(24),w="https://localhost:5001/",b="".concat(w,"game"),g=1,k=2,y=3,O=4,E=(a={},Object(v.a)(a,g,"square_unvisited"),Object(v.a)(a,k,"square_food"),Object(v.a)(a,y,"square_path"),Object(v.a)(a,O,"square_head"),a);function C(e,t){return S.apply(this,arguments)}function S(){return(S=Object(m.a)(h.a.mark((function e(t,n){var a,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new XMLHttpRequest,r=w+t,a.open("GET",r),e.next=5,a.send();case 5:a.onreadystatechange=function(e){4===a.readyState&&n(JSON.parse(a.responseText))};case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=n(39),j=(n(56),n(80)),I=n(75),D=n(78),G=n(79),B=n(76);function q(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(j.a,{color:"inherit",position:"static"},o.a.createElement(I.a,{variant:"dense"},o.a.createElement(D.a,{mx:2},o.a.createElement(G.a,{onClick:e.startGame,variant:"contained",color:"primary",disabled:e.gameIsOn},"Start")),o.a.createElement(B.a,{variant:"h6"},"Score: ",e.score))))}function N(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(D.a,{width:"100%",display:"flex",justifyContent:"center",alignContent:"center",position:"absolute",overflow:"hidden",top:"0",left:"0",marginTop:"60px"},e.children))}var P=n(38),T=n.n(P),L=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).updateScore=function(e){return n.setState({score:parseInt(e.score)})},n.setBoard=function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C("init",(function(e){return n.setState({rows:e.rows,columns:e.columns,mapDidInit:!0},(function(){return n.initBoard()}))}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.changeDirection=function(e){e.stopPropagation(),n.validKeyCode(e.keyCode)&&n.state.connection.invoke("ChangeDirection",e.key)},n.validKeyCode=function(e){return 37===e||38===e||39===e||40===e},n.state={map:[],rows:0,columns:0,score:0},n.bindMethods(),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"bindMethods",value:function(){this.beginCountdown=this.beginCountdown.bind(this),this.startGame=this.startGame.bind(this),this.onGameOver=this.onGameOver.bind(this)}},{key:"componentDidMount",value:function(){this.setBoard(),this.initNegotiation(),document.addEventListener("keypress",this.changeDirection),document.addEventListener("keydown",this.changeDirection)}},{key:"createArea",value:function(e,t){return{row:e,column:t,state:g}}},{key:"clearBoard",value:function(){for(var e=this.state,t=e.rows,n=e.columns,a=[],r=0;r<t;r++){a[r]=[];for(var o=0;o<n;o++)a[r][o]=this.createArea(r,o)}this.setState({map:a})}},{key:"initBoard",value:function(){this.clearBoard(),this.setState({mapDidInit:!0})}},{key:"renderColumn",value:function(e){var t=this.state.map,n=[];return t[e].forEach((function(t){n.push(o.a.createElement("td",{className:"square "+E[t.state],key:"".concat(e,"_").concat(t.column)}))})),n}},{key:"renderRows",value:function(){var e=this,t=this.state.map,n=[];return t.forEach((function(t,a){n[a]=o.a.createElement("tr",{key:a},e.renderColumn(a))})),n}},{key:"setConnectionListeners",value:function(e){var t=this;e.on("beginCountDown",(function(e){return t.beginCountdown(e)})),e.on("updateSnake",(function(e){return t.updateSnakePosition(e)})),e.on("updateScore",(function(e){return t.updateScore(e)})),e.on("gameOver",(function(){return t.onGameOver()})),e.on("gameWon",(function(){return t.gameWon()})),e.start().catch((function(e){return console.log("Establishing connection to server failed.")}))}},{key:"initNegotiation",value:function(){var e=Object(m.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=(new x.a).withUrl(b).build(),this.setConnectionListeners(t),this.setState({connection:t,connectionDidInit:!0});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"beginCountdown",value:function(e){var t=this;return new Promise((function(n){t.setState({countdownIsOn:!0,currentCountDown:e/1e3},Object(m.a)(h.a.mark((function a(){var r;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:r=e/1e3;case 1:if(!(r>0)){a.next=8;break}return t.setState({currentCountDown:r}),a.next=5,new Promise((function(e){return setTimeout(e,1e3)}));case 5:r--,a.next=1;break;case 8:t.setState({countdownIsOn:!1}),n();case 10:case"end":return a.stop()}}),a)}))))}))}},{key:"updateSnakePosition",value:function(e){var t=this.state,n=t.map,a=t.lastSquare,r=e.snake;e.food.forEach((function(e){n[e.row][e.column].state=k})),a&&(n[a.row][a.column].state=g);var o=r.splice(0,1)[0];n[o.row][o.column].state=O,r.forEach((function(e){n[e.row][e.column].state=y})),this.setState({map:n,lastSquare:r[r.length-1]})}},{key:"gameWon",value:function(){var e=this.state.score;alert("Congrats you won the snake with a score of "+e+" points."),this.setState({gameIsOn:!1})}},{key:"onGameOver",value:function(){this.setState({gameIsOn:!1})}},{key:"renderCountdown",value:function(){var e=this.state,t=e.countdownIsOn,n=e.currentCountDown;if(t)return o.a.createElement(D.a,{style:{boxSizing:"border-box"},zIndex:"10",position:"absolute",display:"flex",justifyContent:"center",alignItems:"center",right:"0",left:"0",minHeight:"98%",color:T.a[600]},o.a.createElement(B.a,{variant:"h1"},n))}},{key:"startGame",value:function(){var e=Object(m.a)(h.a.mark((function e(){var t,n=this;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=this.state.connection)||!t.receivedHandshakeResponse){e.next=9;break}return this.setState({gameIsOn:!0,score:0}),this.clearBoard(),e.next=6,this.beginCountdown(3e3);case 6:t.invoke("StartGame").catch((function(e){n.setState({gameIsOn:!1}),console.warn("Couldnt start the game. Try to refresh your browser.")})),e.next=13;break;case 9:return console.warn("Cannot connect to the server. The server might be down."),this.setBoard(),e.next=13,this.initNegotiation();case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.score,n=e.gameIsOn;return o.a.createElement(o.a.Fragment,null,this.renderCountdown(),o.a.createElement(q,{startGame:this.startGame,score:t,gameIsOn:n}),o.a.createElement(N,null,o.a.createElement("table",{id:"bob",style:{width:"86vh",height:"86vh",margin:"8px"}},o.a.createElement("tbody",null,this.renderRows()))))}}]),t}(r.Component),W=function(){function e(){Object(c.a)(this,e)}return Object(u.a)(e,[{key:"build",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(L,{rowsPath:"init/rowsNumber",columnsPath:"init/columnsNumber"}))}}]),e}();var _=function(){return o.a.createElement("div",{className:"App"},(new W).build())};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[46,1,2]]]);
//# sourceMappingURL=main.44784a40.chunk.js.map