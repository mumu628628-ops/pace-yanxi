(function(root){
const rad=n=>n*Math.PI/180;
function distance(a,b){const dlat=rad(b.lat-a.lat),dlon=rad(b.lng-a.lng);const h=Math.sin(dlat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dlon/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
function calories(met,kg,seconds){return met*3.5*kg/200*seconds/60;}
function accept(previous,p){if(!Number.isFinite(p.lat)||!Number.isFinite(p.lng)||!Number.isFinite(p.t)||!Number.isFinite(p.accuracy)||Math.abs(p.lat)>90||Math.abs(p.lng)>180||p.accuracy<0||p.accuracy>20||!Number.isFinite(p.speed)&&previous&&!Number.isFinite(previous.speed))return false;const dx=distance(previous||p,p);const dt=Math.max((p.t-(previous||p).t)/1000,1);if(previous&&dt>0){const speed=dx/dt;if(Number.isFinite(previous.speed)&&Math.abs(speed-previous.speed)>8)return false;}
return true;}
const api={distance,calories,accept};if(typeof module!=='undefined')module.exports=api;else root.MoveCore=api;
})(typeof window!=='undefined'?window:globalThis);
