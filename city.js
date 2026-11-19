// A line engraving of a riverside skyline, with stepped roofs and a market dome.
const c=document.querySelector('#city').getContext('2d');let seed=52;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
function line(x,y,X,Y,a=.55){c.strokeStyle='rgba(212,217,168,'+a+')';c.lineWidth=.8;c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.stroke()}
function outline(points,fill='#103f38'){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle='#acc3a1';c.stroke()}
for(let i=0;i<32;i++){let r=36+i*2.1;c.strokeStyle='rgba(198,191,134,.09)';c.beginPath();c.arc(399,110,r,0,Math.PI*2);c.stroke()}
function block(x,y,w,h){outline([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);for(let i=3;i<w-2;i+=5)line(x+i,y+3,x+i,y+h,.34);for(let i=4;i<h;i+=5)line(x,y+i,x+w,y+i,.45)}
for(let x=35;x<612;){let w=9+rnd()*20,h=12+rnd()*62;block(x,215-h,w,h);x+=w+3}
outline([[345,215],[345,61],[352,40],[370,17],[370,199],[364,215]]);for(let i=0;i<23;i++)line(347,65+i*6,368,40+i*6);for(let i=0;i<4;i++)line(350+i*5,56-i*7,350+i*5,210);
block(386,75,35,138);block(389,68,29,7);block(394,61,18,7);
function spire(x,y,w){outline([[x-w,y],[x-w*.76,y-6],[x-w*.45,y-8],[x-w*.24,y-18],[x-2,y-29],[x,y-47],[x+2,y-29],[x+w*.24,y-18],[x+w*.45,y-8],[x+w*.76,y-6],[x+w,y]]);for(let i=2;i<20;i+=3)line(x-w*(1-i/22)*.65,y-i,x+w*(1-i/22)*.65,y-i)}
function pavilion(x,y,w){block(x-w/2+6,y,w-12,23);for(let j=0;j<3;j++){let k=w/2-j*6;outline([[x-k,y-j*5],[x-k-3,y-j*5-6],[x-k+7,y-j*5-4],[x,y-22-j*5],[x+k-7,y-j*5-4],[x+k+3,y-j*5-6],[x+k,y-j*5]])}spire(x,y-28,10)}
pavilion(178,199,110);pavilion(251,184,114);pavilion(295,205,80);
for(let x of [62,85,113,477,516,544,575]){let y=170+rnd()*20;line(x,y,x-4,215,.9);for(let j=-4;j<=4;j++){c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+j*3,y-18+Math.abs(j)*2,x+j*5,y+4);c.strokeStyle='#a9bd97';c.stroke()}}
for(let i=0;i<340;i++){let x=rnd()*620,y=218+rnd()*60;line(x,y,x+3+rnd()*30,y,.08+rnd()*.3)}line(15,217,620,217,.8)
