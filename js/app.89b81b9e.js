(function(e){function t(t){for(var r,a,s=t[0],p=t[1],c=t[2],u=0,d=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&d.push(n[a][0]),n[a]=0;for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(e[r]=p[r]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var e,t=0;t<o.length;t++){for(var i=o[t],r=!0,s=1;s<i.length;s++){var p=i[s];0!==n[p]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=i[0]))}return e}var r={},n={app:0},o=[];function a(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=r,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(i,r,function(t){return e[t]}.bind(null,r));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/v-flappy-bird/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],p=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=p;o.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d");var r=i("2b0e"),n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("FlappyBird")],1)},o=[],a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"flappy-bird-wrapper"}},[i("div",{ref:"background",class:e.backgroundClass,attrs:{id:"background"}},[i("bird",{ref:"bird",attrs:{"bird-style":e.bird}}),e._l(e.pipes,(function(e,t){return i("pipe",{key:t,attrs:{"pipe-style":e}})}))],2),i("ground",{attrs:{"best-score-digits":e.bestScoreDigits}}),i("game-panel",{attrs:{"show-game-over-title":e.showGameOverTitle,score:e.score,"has-break-record":e.hasBreakRecord}})],1)},s=[],p=(i("7db0"),i("4160"),i("a630"),i("a9e3"),i("3ca3"),i("159b"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pipe-wrapper",style:{right:e.pipeStyle.right+"px"}},[i("div",{staticClass:"pipe pipe-top",style:{top:e.pipeStyle.pipeTopTop+"px"}}),i("div",{staticClass:"pipe pipe-bottom",style:{top:e.pipeStyle.pipeBottomTop+"px"}})])}),c=[],l={name:"Pipe",props:{pipeStyle:{type:Object,required:!0}}},u=l,d=i("2877"),h=Object(d["a"])(u,p,c,!1,null,null,null),m=h.exports,f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bird",style:{bottom:e.birdStyle.bottom+"px",left:e.birdStyle.left+"px",transform:"rotate("+e.birdStyle.rotate+"deg)"}},[i("div",{staticClass:"bird-flying"})])},v=[],b={name:"Bird",props:{birdStyle:{type:Object,required:!0}}},g=b,y=Object(d["a"])(g,f,v,!1,null,null,null),w=y.exports,S=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"game-over-panel"}},[i("div",{attrs:{id:"current-score-box"}},[e._l(e.scoreDigits,(function(e,t){return i("div",{key:t,class:"digit-"+e})})),e.hasBreakRecord?i("div",{staticClass:"label-new"}):e._e()],2),i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.showGameOverTitle,expression:"showGameOverTitle"}],attrs:{id:"game-over-title"}})])],1)},M=[],B={name:"GamePanel",props:{showGameOverTitle:{type:Boolean,required:!0},score:{type:Number,required:!0},hasBreakRecord:{type:Boolean,default:!1}},computed:{scoreDigits:function(){return Array.from(String(this.score),Number)}}},O=B,I=(i("c756"),Object(d["a"])(O,S,M,!1,null,null,null)),k=I.exports,D=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"ground"}},[i("div",{attrs:{id:"best-score-box"}},e._l(e.bestScoreDigits,(function(e,t){return i("div",{key:t,class:"digit-sm-"+e})})),0)])},G=[],R={name:"Ground",props:{bestScoreDigits:{type:Array,required:!0}}},x=R,_=Object(d["a"])(x,D,G,!1,null,null,null),T=_.exports,P={width:288,height:400},j={width:52,height:320},F={width:34,height:24},C={pipeInterval:150,pipeGapMin:4*F.height,pipeGapMax:7*F.height},A={name:"FlappyBird",components:{Pipe:m,Bird:w,GamePanel:k,Ground:T},data:function(){return{backgroundClass:this.getNewBackgroundClass(),bird:{bottom:200,left:80,rotate:0},pipes:[],pipeMover:null,birdMover:null,birdMoveRID:null,pipeMoveRID:null,isGaming:!1,score:0,showGameOverTitle:!1,bestScore:0,hasBreakRecord:!1}},computed:{bestScoreDigits:function(){return Array.from(String(this.bestScore),Number)}},methods:{getNewBackgroundClass:function(){return Math.random()<=.5?"daylight":"night"},randomIntFromInterval:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},generatePipe:function(){var e=30,t=this.randomIntFromInterval(C.pipeGapMin,C.pipeGapMax),i=this.randomIntFromInterval(0,-(-j.height+4*e));this.pipes.push({right:-j.width,pipeTopTop:38-j.height+i,pipeBottomTop:e+i+t,status:"inComing"})},movePipe:function(){var e=this,t=this.$refs.background.offsetWidth;function i(t){var i=t.timing,r=t.draw,n=performance.now();e.pipeMoveRID=requestAnimationFrame((function t(o){var a=(o-n)/1e3,s=i(a);r(s),e.pipeMoveRID=requestAnimationFrame(t),e.gameStatusHandler()}))}function r(e){return 1}function n(i){e.pipes.forEach((function(r){r.right>=t&&e.pipes.shift(),e.pipes[e.pipes.length-1].right>C.pipeInterval&&e.generatePipe(),r.right+=i}))}i({timing:r,draw:n})},moveBird:function(){document.addEventListener("keydown",this.spaceEventListener("keycode"),!1),document.addEventListener("touchend",this.spaceEventListener(),!1)},spaceEventListener:function(e){var t=this;function i(e){var i=e.timing,r=e.draw,n=performance.now();t.birdMoveRID=requestAnimationFrame((function e(o){var a=(o-n)/1e3,s=i(a);t.bird.rotate=s>=0?-30:s>-7?0:30,r(s),t.bird.bottom>=0?t.birdMoveRID=requestAnimationFrame(e):t.handleGameOver()}))}function r(e){var t=-40*Math.pow(e-.12,2)+3;return t>0?t:-8*Math.pow(e-.12,2)+1.5}function n(e){t.bird.bottom+=e}function o(){t.isGaming?(t.birdMoveRID&&cancelAnimationFrame(t.birdMoveRID),i({timing:r,draw:n})):(t.resetGameData(),t.isGaming=!0,t.generatePipe(),t.movePipe(),i({timing:r,draw:n}))}return"keycode"===e?function(e){var i=e.keyCode;32!==i&&13!==i||o(),83===i&&(t.pipeMoveRID&&cancelAnimationFrame(t.pipeMoveRID),t.birdMoveRID&&cancelAnimationFrame(t.birdMoveRID))}:function(){o()}},gameStatusHandler:function(){var e=this.pipes.find((function(e){return"passed"!==e.status}));switch(this.birdPipeStatus(e),e.status){case"passing":var t=j.height+e.pipeTopTop,i=e.pipeBottomTop;(this.bird.bottom+F.height+t>=P.height||this.bird.bottom+i<=P.height)&&this.handleGameOver();break}},birdPipeStatus:function(e){var t=e.status,i=P.width-e.right,r=i-j.width,n=this.bird.left+F.width,o="passing";r-n>=0?o="inComing":i-this.bird.left<=0&&(o="passed","passing"===t&&(this.score+=1)),e.status=o},handleGameOver:function(){this.isGaming=!1,this.pipeMoveRID&&cancelAnimationFrame(this.pipeMoveRID),this.birdMoveRID&&cancelAnimationFrame(this.birdMoveRID),this.handleBestScore(),this.showGameOverTitle=!0},resetGameData:function(){this.bird={bottom:200,left:80},this.pipes=[],this.pipeMover=null,this.birdMover=null,this.birdMoveRID=null,this.pipeMoveRID=null,this.isGaming=!1,this.score=0,this.showGameOverTitle=!1,this.hasBreakRecord=!1,this.backgroundClass=this.getNewBackgroundClass()},getBestScore:function(){this.bestScore=localStorage.getItem("myVFlappyBirdBestScore")||0},handleBestScore:function(){this.score>this.bestScore&&(this.bestScore=this.score,this.hasBreakRecord=!0,localStorage.setItem("myVFlappyBirdBestScore",this.bestScore))}},mounted:function(){this.getBestScore(),this.moveBird()}},E=A,q=(i("d467"),Object(d["a"])(E,a,s,!1,null,"5e7e8a80",null)),$=q.exports,N={name:"App",components:{FlappyBird:$}},L=N,H=Object(d["a"])(L,n,o,!1,null,null,null),J=H.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(J)}}).$mount("#app")},9374:function(e,t,i){},b462:function(e,t,i){},c756:function(e,t,i){"use strict";i("b462")},d467:function(e,t,i){"use strict";i("9374")}});
//# sourceMappingURL=app.89b81b9e.js.map