(()=>{var t={427:(t,e,o)=>{const r=o(643);t.exports=()=>{let t=[...Array(10)].map((()=>Array(10).fill(0))),e=[],o=new Set,n={};const s=(e,o,r)=>{if(0!==t[e[0]][e[1]])return!1;let n=[e];if("vertical"===r)for(let r=1;r<o;r++){if(e[0]+r>9||0!==t[e[0]+r][e[1]])return!1;n.push([e[0]+r,e[1]])}else{if("horizontal"!==r)return!1;for(let r=1;r<o;r++){if(e[1]+r>9||0!==t[e[0]][e[1]+r])return!1;n.push([e[0],e[1]+r])}}return i(n,o,r),l(n,r),!0},i=(t,e,o)=>{let s="ship"+(Object.keys(n).length+1);n[s]={object:r(e),orientation:o,coords:t,top:t[0],bottom:t[t.length-1]}},c=(t,e)=>{let o=[];return t[0]+(e-1)<10&&o.push("vertical"),t[1]+(e-1)<10&&o.push("horizontal"),0===o.length?"none":o[Math.floor(Math.random()*o.length)]},l=(e,o)=>{e.forEach((e=>{t[e[0]][e[1]]=1,(e=>{const o=[-1,1,-1,1],r=[-1,1,1,-1];for(let n=0;n<4;n++)d(e[0]+o[n],0,10)&&d(e[1]+r[n],0,10)&&(t[e[0]+o[n]][e[1]+r[n]]=2)})(e)})),a(e[0],e[e.length-1],o)},a=(e,o,r)=>{"vertical"===r?(e[0]-1>=0&&(t[e[0]-1][e[1]]=2),o[0]+1<10&&(t[o[0]+1][o[1]]=2)):(e[1]-1>=0&&(t[e[0]][e[1]-1]=2),o[1]+1<10&&(t[o[0]][o[1]+1]=2))},u=e=>{let o;do{o=[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}while(o+(e-1)>9||0!==t[o[0]][o[1]]);return o},d=(t,e,o)=>t<o&&t>=e;return{placeShip:s,receiveAttack:t=>{o.add(t.join(""));for(const e in n){let o=JSON.stringify(t);if(n[e].coords.some((t=>JSON.stringify(t)===o)))return n[e].object.hit(t),!0}return e.push(t.join("")),!1},allShipsSunk:()=>{for(const t in n)if(!n[t].object.isSunk())return!1;return!0},placeShipsRandomly:()=>{[5,4,3,3,2].forEach((t=>{let e,o,r;do{e=u(t),o=c(e,t),r=s(e,t,o)}while(!r)}))},shotCoords:o,ships:n}}},507:(t,e,o)=>{const r=o(427);t.exports=t=>{let e=r();e.placeShipsRandomly();return{attack:(e,o)=>t?e.board.receiveAttack(o):((t,e)=>!t.board.shotCoords.has(e.join(""))&&t.board.receiveAttack(e))(e,o),board:e}}},643:t=>{t.exports=t=>{let e=[];return{length:t,isSunk:()=>t===e.length,hit:t=>{e.push(t)}}}}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=o(507),e=o.n(t);const r=()=>{const t=e()(!0);let o=[];const r=[];let n=[],s="none",i=t.board;const c=t=>t[0]>=0&&t[0]<10&&t[1]>=0&&t[1]<10,l=(t,e,o)=>{"vertical"===o?(t[0]-1>=0&&r.push([t[0]-1,t[1]].join("")),e[0]+1<10&&r.push([e[0]+1,e[1]].join(""))):(t[1]-1>=0&&r.push([t[0],t[1]-1].join("")),e[1]+1<10&&r.push([e[0],e[1]+1].join("")))};return{aiAttack:e=>{const i=o.length>0?o.pop():(t=>{let e;do{e=[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}while(t.board.shotCoords.has(e.join(""))||r.includes(e.join("")));return e})(e),l=t.attack(e,i);return l&&(n.push(i),"none"===s&&n.length>1&&(s=0===(()=>{for(let t=0;t<2;t++)if(n[n.length-1][t]===n[n.length-2][t])return o=o.filter((e=>e[t]===n[n.length-1][t])),t})()?"horizontal":"vertical"),((t,e)=>{let r=[-1,1],n=[0,0];if("none"===s&&(r=[-1,0,1,0],n=[0,1,0,-1]),"horizontal"===s){let t=r;r=n,n=t}for(let s=0;s<r.length;s++){let i=[t[0]+r[s],t[1]+n[s]];c(i)&&!e.board.shotCoords.has(i.join(""))&&o.unshift(i)}})(i,e)),l},board:i,enemyShipSunk:t=>{(t=>{t.coords.forEach((t=>{(t=>{const e=[-1,1,-1,1],o=[-1,1,1,-1];for(let n=0;n<4;n++){let s=[t[0]+e[n],t[1]+o[n]];c(s)&&r.push(s.join(""))}})(t)})),l(t.top,t.bottom,t.orientation)})(t),o=[],n=[],s="none"}}};(()=>{let t,o,n=e()(!1),s=r();const i=()=>{h(),m()},c=(t,e)=>{const o=t.board.ships;for(const t in o){let r=JSON.stringify(e);if(o[t].coords.some((t=>JSON.stringify(t)===r)))return o[t]}},l=t=>{t.removeEventListener("click",d),t.classList.add("disabled")},a=t=>{n=e()(!1),s=r(),document.querySelector(".results").textContent="Your grid",document.querySelector("#comp-container").style.display="block",document.querySelector(".btn-container").style.display="none",document.querySelector(".human-grid").innerHTML="",document.querySelector(".comp-grid").innerHTML="",i(),t.target.removeEventListener("click",a)},u=(t,e)=>{if(e.board.allShipsSunk()){const e=t?"Computer ":"You ";return document.querySelector(".results").textContent=e+"win"+(t?"s":"")+"! 🎉",document.querySelector("#comp-container").style.display="none",document.querySelector(".btn-container").style.display="flex",document.querySelector(".restart-btn").addEventListener("click",a),!0}return!1},d=e=>{const r=s.board.shotCoords.size,i=e.target.id.slice(e.target.id.length-2),a=[Number(i[0]),Number(i[1])];n.attack(s,a)?(e.target.classList.add("hit"),(t=>{const e=[Number(t[0]),Number(t[1])],o=[-1,1,-1,1],r=[-1,1,1,-1];for(let t=0;t<4;t++){let n=e[0]+o[t],s=e[1]+r[t];const i=document.querySelector("#comp"+n+s);i&&l(i)}})(i),((t,e)=>{const o=c(t,e);if(o.object.isSunk()){const{elemTop:t,elemBottom:e}=(t=>{const e=t.top.join(""),o=t.bottom.join("");let r,n;if("vertical"===t.orientation){let t=Number(e[0])-1,s=Number(o[0])+1;r=document.querySelector("#comp"+t+e[1]),n=document.querySelector("#comp"+s+o[1])}else{let t=Number(e[1])-1,s=Number(o[1])+1;r=document.querySelector("#comp"+e[0]+t),n=document.querySelector("#comp"+o[0]+s)}return{elemTop:r,elemBottom:n}})(o);t&&l(t),e&&l(e)}})(s,a),u(!1,s)):e.target.classList.add("miss"),s.board.shotCoords.size===r+1&&(e.target.classList.add("active"),(()=>{const e=s.aiAttack(n),o=[...n.board.shotCoords].slice(-1),r=document.querySelector("#hum"+o);e?(r.classList.add("hit"),u(!0,n)||(t=>{const e=c(n,t);e.object.isSunk()&&s.enemyShipSunk(e)})([Number(o[0][0]),Number(o[0][1])])):r.classList.add("miss"),t&&t.classList.remove("active"),r.classList.add("active"),t=r})()),o&&o.classList.remove("active"),o=e.target},h=()=>{const t=document.querySelector(".human-grid"),e=(t=>{const e=t.board.ships,o=[];for(const t in e)e[t].coords.forEach((t=>{o.push(t.join(""))}));return o})(n);for(let r=0;r<100;r++){const n=r.toString().padStart(2,0),s="hum"+n;let i=document.createElement("div");i.classList="square "+(o=n,e.includes(o)?"ship":""),i.setAttribute("id",s),t.appendChild(i)}var o},m=()=>{const t=document.querySelector(".comp-grid");for(let e=0;e<100;e++){const o="comp"+e.toString().padStart(2,0);let r=document.createElement("button");r.classList="square ",r.setAttribute("id",o),r.addEventListener("click",d),t.appendChild(r)}return[]};return{init:i}})().init()})()})();