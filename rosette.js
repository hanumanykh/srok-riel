/* Hero: a data-driven guilloche rosette, after the engraved rosettes on riel banknotes.
   Outer ring: one ripple per bank, amplitude = total assets. Inner rings: classic guilloche. */
(()=>{const hero=document.querySelector('.intro');if(!hero)return;
const R=matchMedia('(prefers-reduced-motion: reduce)').matches;
const B=banks.map((b,i)=>({i,a:b.assets||0,p:b.profit})).sort((x,y)=>y.a-x.a);
const amax=B[0].a,N=B.length,S=520,C=S/2,TAU=Math.PI*2;
// order banks around the circle alternating big/small for an even rhythm
const ring=[];B.forEach((b,k)=>{ring[(k*29)%N]=b});
const ang=k=>-Math.PI/2+k/N*TAU;
const path=f=>{let d='';for(let s=0;s<=1440;s++){const t=s/1440*TAU,[x,y]=f(t);d+=(s?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)}return d+'Z'};
const polar=(r,t)=>[C+r*Math.cos(t),C+r*Math.sin(t)];
let g='';
// inner guilloche: phase-shifted hypotrochoid-like rings
for(let j=0;j<14;j++){const ph=j/14*TAU/9;g+='<path class="gu" d="'+path(t=>polar(118+16*Math.sin(9*t+ph)+6*Math.sin(27*t-ph*2),t))+'"/>'}
for(let j=0;j<8;j++){const ph=j/8*TAU/15;g+='<path class="gu g2" d="'+path(t=>polar(70+9*Math.sin(15*t+ph),t))+'"/>'}
// outer data ring: gaussian ripple per bank
const outer=t=>{let r=170;for(let k=0;k<N;k++){let dt=Math.atan2(Math.sin(t-ang(k)),Math.cos(t-ang(k)));r+=58*Math.sqrt(ring[k].a/amax)*Math.exp(-(dt*dt)/(2*0.028*0.028))}return polar(r,t)};
for(let j=0;j<4;j++)g+='<path class="go'+(j?' gs':'')+'" d="'+path(t=>{const[x,y]=outer(t);const s=1-j*0.035;return[C+(x-C)*s,C+(y-C)*s]})+'"/>';
// hit targets at each ripple crest
let hits='';ring.forEach((b,k)=>{const r=170+58*Math.sqrt(b.a/amax),[x,y]=polar(r+8,ang(k)),bk=banks[b.i];hits+='<circle class="hit '+(b.p<0?'ls':'pr')+'" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(3+3*Math.sqrt(b.a/amax)).toFixed(1)+'" data-bank="'+b.i+'" data-tip="'+esc(bk.display+' · '+fr(b.a/1e6,1)+' tn KHR'+(b.p!==undefined?', net '+(b.p<0?'−':'')+fr(Math.abs(b.p)/1e3,1)+' bn':''))+'"/>'});
const fig=document.createElement('figure');fig.className='rosette';
fig.innerHTML='<svg viewBox="0 0 '+S+' '+S+'" role="img" aria-label="Rosette of the 67 banks, each ripple sized by total assets">'+g+hits+'<text x="'+C+'" y="'+(C-6)+'" text-anchor="middle" class="rc1">67</text><text x="'+C+'" y="'+(C+18)+'" text-anchor="middle" class="rc2">banks</text></svg><figcaption>Each ripple on the outer ring is one bank, sized by its assets. Green dots made a profit in 2025, red dots a loss. Tap one to open it.</figcaption>';
hero.appendChild(fig);
if(!R){fig.querySelectorAll('path').forEach((p,i)=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.style.animation='draw 2.4s '+(i*0.035).toFixed(2)+'s cubic-bezier(.4,0,.2,1) forwards'})}
})();
