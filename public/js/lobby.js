!function(t){var n={};function e(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(a,o,function(n){return t[n]}.bind(null,o));return a},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/",e(e.s=83)}({83:function(t,n,e){t.exports=e(84)},84:function(t,n){function e(t,n){axios.patch("/api/game/".concat(t.id,"/accept"),{accept:n}).then((function(t){console.log(t.data)}))}function a(t){var n=void 0!==window.location.port&&null!==window.location.port&&""!==window.location.port?":".concat(window.location.port):"";window.location.href="".concat(window.location.protocol,"//").concat(window.location.hostname).concat(n,"/").concat(t)}function o(){axios.get("/api/users/").then((function(t){var n,e;n=t.data.data,(e=document.getElementById("table-body")).innerHTML="",n.forEach((function(t,n){var o=document.createElement("tr");o.innerHTML="<td>".concat(n+1,"</td>")+"<td>".concat(t.name,"</td>")+"<td>".concat(t.win,"</td>")+"<td>".concat(t.lose,"</td>")+"<td>".concat(t.draw,"</td>")+"<td><button class='button is-danger is-small' id=\"invitation-".concat(t.id,'" data-invitation-id="').concat(t.id,'">Tantang</button></td>'),e.append(o),document.getElementById("invitation-".concat(t.id)).addEventListener("click",(function(){axios.post("/api/game",{invitee_id:t.id}).then((function(t){var n;n=t.data.data,Echo.private("invitation_status.".concat(n.id)).listen("InvitationAccepted",(function(t){t.match.accepted?swal.fire({title:"Tantangan diterima"}).then((function(){a("game/".concat(n.id))})):swal.fire({title:"Tantangan ditolak"})}))}))}))}))}))}o(),axios.get("/api/user").then((function(t){Echo.private("invitations.".concat(t.data.data.id)).listen("InvitationCreated",(function(t){swal.fire({title:"Tantangan baru",text:"Penantang : ".concat(t.match.inviter.name),icon:"warning",showCancelButton:!0,confirmButtonText:"Terima tantangan",cancelButtonText:"Tolak",reverseButtons:!0}).then((function(n){n.value?(e(t.match,1),a("game/".concat(t.match.id))):(n.dismiss,swal.DismissReason.cancel,e(t.match,0))}))}))})),document.getElementById("refresh").addEventListener("click",(function(){o()}))}});