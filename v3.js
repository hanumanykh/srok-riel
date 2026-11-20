/* Srok Riel v3 — terminal edition: hero network, ownership map, full-page profiles, comparator */
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------- owners: normalise disclosed owners into entities ---------- */
const norm=s=>s.toLowerCase().replace(/\(.*?\)/g,'').replace(/\b(plc|co|ltd|limited|pte|pcl|sdn bhd|berhad|company|inc)\b\.?/g,'').replace(/[.,]/g,' ').replace(/\s+/g,' ').trim();
const KW=/\b(bank|holdings?|group|plc|ltd|limited|capital|trust|association|government|investment|co|corporation|berhad|pcl|card)\.?$/i,CORP=/\b(bank|holding|group|plc|ltd|limited|capital|trust|association|government|investment|corporation|berhad|pcl|card|fund|financial|company)\b/i;
const split=s=>s.replace(/\(.*?\)/g,'').replace(/,? directly and through .*/i,'').replace(/,? and (\w+ )?other (shareholders|individuals)/i,'').split(/\s·\s/).flatMap(part=>{if(!CORP.test(part))return part.split(/, | and /);const m=part.split(' and ');if(m.length===2&&KW.test(m[0].trim()))return m;return [part]}).map(x=>x.trim()).filter(x=>x.length>2&&!/^other/i.test(x));
const OWN=new Map();
banks.forEach((b,i)=>{if(!b.ownership)return;split(b.ownership.owner).forEach(o=>{const k=norm(o);if(!k)return;if(!OWN.has(k))OWN.set(k,{name:o,banks:new Set()});OWN.get(k).banks.add(i)})});
window.SR_OWNERS=OWN;
const sharedOwners=[...OWN.values()].filter(o=>o.banks.size>1);

/* ---------- hero: live network canvas ---------- */
const hero=document.querySelector('.intro'),old=el('city');
if(old)old.remove();
const cv=document.createElement('canvas');cv.id='net';cv.setAttribute('aria-hidden','true');hero.appendChild(cv);
const ctx=cv.getContext('2d');let W,H,DPR=Math.min(2,devicePixelRatio||1);
const amax=Math.max(...banks.map(b=>b.assets||0));
const nodes=banks.map((b,i)=>({i,r:2+7*Math.sqrt((b.assets||amax*.02)/amax),x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00025,vy:(Math.random()-.5)*.00025,loss:b.profit<0}));
const links=[];sharedOwners.forEach(o=>{const a=[...o.banks];for(let k=1;k<a.length;k++)links.push([a[0],a[k]])});
const size=()=>{const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0)};
let mx=-1,my=-1;cv.parentElement.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)/W;my=(e.clientY-r.top)/H});
const draw=()=>{ctx.clearRect(0,0,W,H);const gold=css('--gold')||'#D6B46A',jade=css('--jade'),red=css('--red');
 for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<.02||n.x>.98)n.vx*=-1;if(n.y<.04||n.y>.96)n.vy*=-1;if(mx>=0){const dx=n.x-mx,dy=n.y-my,d=Math.hypot(dx,dy);if(d<.12){n.x+=dx*.004;n.y+=dy*.004}}}
 ctx.lineWidth=.6;for(let a=0;a<nodes.length;a++)for(let b=a+1;b<nodes.length;b++){const p=nodes[a],q=nodes[b],d=Math.hypot((p.x-q.x)*W,(p.y-q.y)*H);if(d<110){ctx.strokeStyle=gold;ctx.globalAlpha=(1-d/110)*.22;ctx.beginPath();ctx.moveTo(p.x*W,p.y*H);ctx.lineTo(q.x*W,q.y*H);ctx.stroke()}}
 ctx.lineWidth=1.2;ctx.globalAlpha=.55;ctx.strokeStyle=gold;for(const[a,b]of links){const p=nodes[a],q=nodes[b];ctx.beginPath();ctx.moveTo(p.x*W,p.y*H);ctx.lineTo(q.x*W,q.y*H);ctx.stroke()}
 for(const n of nodes){ctx.globalAlpha=.9;ctx.fillStyle=n.loss?red:jade;ctx.beginPath();ctx.arc(n.x*W,n.y*H,n.r,0,7);ctx.fill();ctx.globalAlpha=.18;ctx.beginPath();ctx.arc(n.x*W,n.y*H,n.r*2.4,0,7);ctx.fill()}
 ctx.globalAlpha=1;if(!RM&&!document.hidden)requestAnimationFrame(draw)};
size();addEventListener('resize',size);draw();document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!RM)draw()});
hero.insertAdjacentHTML('beforeend','<div class="netkey" aria-hidden="true"><span><i style="background:var(--jade)"></i>Profitable bank</span><span><i style="background:var(--red)"></i>Loss-making</span><span><i class="ln"></i>Shared owner</span></div>');

/* ---------- ownership map (static force layout, SVG) ---------- */
const sec=document.createElement('section');sec.id='owners';
sec.innerHTML='<span class="eyebrow">Ownership network</span><h2>Who owns what</h2><p class="lead">Every bank linked to its disclosed owners. Gold lines mark owners that control more than one bank. Hover to trace a group, click a bank to open it.</p><div class="card glass mapcard"><div class="maptools"><input id="mapq" type="search" placeholder="Find an owner or bank…" aria-label="Find in ownership map"><span class="legend"><span><i style="background:var(--jade)"></i>Commercial bank</span><span><i style="background:var(--blue)"></i>Specialized bank</span><span><i style="background:var(--gold);border-radius:1px;transform:rotate(45deg)"></i>Owner</span></span></div><div id="omap" class="omap"></div><ul class="groups" id="groups"></ul></div>';
el('directory').before(sec);
const N=[],L=[];const bi=new Map();
banks.forEach((b,i)=>{if(!b.ownership)return;bi.set(i,N.length);N.push({t:'b',i,label:short(b.display),r:5+11*Math.sqrt((b.assets||amax*.02)/amax)})});
const oi=new Map();OWN.forEach((o,k)=>{oi.set(k,N.length);N.push({t:'o',k,label:o.name,r:o.banks.size>1?6:3.5,multi:o.banks.size>1});o.banks.forEach(i=>{if(bi.has(i))L.push([oi.get(k),bi.get(i),o.banks.size>1])})});
const MW=1100,MH=720;N.forEach((n,k)=>{const a=k*2.399963,r=14*Math.sqrt(k);n.x=MW/2+Math.cos(a)*r*1.35;n.y=MH/2+Math.sin(a)*r;n.vx=0;n.vy=0});
for(let it=0;it<420;it++){const al=1-it/420;
 for(let a=0;a<N.length;a++)for(let b=a+1;b<N.length;b++){const p=N[a],q=N[b];let dx=p.x-q.x,dy=p.y-q.y,d2=dx*dx+dy*dy+.01;if(d2>40000)continue;const f=Math.min(2,(p.r+q.r+14)**2*.9/d2)*.5*al;p.vx+=dx*f;p.vy+=dy*f;q.vx-=dx*f;q.vy-=dy*f}
 for(const[s,t,m]of L){const p=N[s],q=N[t],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1,f=(d-(m?60:34))*.06*al;p.vx+=dx/d*f;p.vy+=dy/d*f;q.vx-=dx/d*f;q.vy-=dy/d*f}
 for(const n of N){n.vx+=(MW/2-n.x)*.0012;n.vy+=(MH/2-n.y)*.0018;n.x+=n.vx;n.y+=n.vy;n.vx*=.55;n.vy*=.55;n.x=Math.max(30,Math.min(MW-30,n.x));n.y=Math.max(24,Math.min(MH-24,n.y))}}
const lab=n=>n.t==='o'?(n.multi):(N.filter((m,j)=>L.some(([s,t])=>(s===j&&t===N.indexOf(n))||(t===j&&s===N.indexOf(n)))).some(m=>m.multi)||n.r>8.5);
el('omap').innerHTML='<svg viewBox="0 0 '+MW+' '+MH+'" role="img" aria-label="Ownership network of Cambodian banks">'+
 L.map(([s,t,m],k)=>'<line data-l="'+s+'-'+t+'" x1="'+N[s].x.toFixed(1)+'" y1="'+N[s].y.toFixed(1)+'" x2="'+N[t].x.toFixed(1)+'" y2="'+N[t].y.toFixed(1)+'" class="'+(m?'lm':'ls')+'"/>').join('')+
 N.map((n,k)=>{const x=n.x.toFixed(1),y=n.y.toFixed(1);return '<g class="nd '+n.t+(n.multi?' multi':'')+'" data-n="'+k+'"'+(n.t==='b'?' data-bank="'+n.i+'"':'')+' data-tip="'+esc(n.t==='b'?banks[n.i].display+' · owner: '+(banks[n.i].ownership.owner):n.label+' · '+OWN.get(n.k).banks.size+' bank(s)')+'">'+(n.t==='b'?'<circle cx="'+x+'" cy="'+y+'" r="'+n.r.toFixed(1)+'" class="'+banks[n.i].type+'"/>':'<rect x="'+(n.x-n.r).toFixed(1)+'" y="'+(n.y-n.r).toFixed(1)+'" width="'+(n.r*2)+'" height="'+(n.r*2)+'" transform="rotate(45 '+x+' '+y+')"/>')+(lab(n)?'<text x="'+x+'" y="'+(n.y-n.r-5).toFixed(1)+'" text-anchor="middle">'+esc(n.label.length>26?n.label.slice(0,25)+'…':n.label)+'</text>':'')+'</g>'}).join('')+'</svg>';
const svgEl=el('omap').firstChild;
const focus=k=>{svgEl.classList.toggle('dim',k!==null);svgEl.querySelectorAll('.hl').forEach(e=>e.classList.remove('hl'));if(k===null)return;const set=new Set([k]);L.forEach(([s,t])=>{if(s===k)set.add(t);if(t===k)set.add(s)});
 if(N[k].t==='b')[...set].forEach(j=>{if(N[j].t==='o')L.forEach(([s,t])=>{if(s===j)set.add(t)})});
 set.forEach(j=>svgEl.querySelector('[data-n="'+j+'"]').classList.add('hl'));L.forEach(([s,t])=>{if(set.has(s)&&set.has(t))svgEl.querySelector('[data-l="'+s+'-'+t+'"]').classList.add('hl')})};
svgEl.addEventListener('pointerover',e=>{const g=e.target.closest('.nd');focus(g?+g.dataset.n:null)});svgEl.addEventListener('pointerleave',()=>focus(null));
el('mapq').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();if(!q)return focus(null);const k=N.findIndex(n=>n.label.toLowerCase().includes(q)||(n.t==='b'&&banks[n.i].display.toLowerCase().includes(q)));focus(k<0?null:k)});
el('groups').innerHTML='<li class="gh">Owners with more than one bank</li>'+sharedOwners.sort((a,b)=>b.banks.size-a.banks.size).map(o=>'<li><b>'+esc(o.name)+'</b><span>'+[...o.banks].map(i=>'<button data-bank="'+i+'">'+esc(short(banks[i].display))+'</button>').join('')+'</span></li>').join('');
document.querySelector('.nav nav').insertAdjacentHTML('afterbegin','');
const navD=document.querySelector('.nav nav a[href="#directory"]');if(navD)navD.insertAdjacentHTML('beforebegin','<a href="#owners">Owners</a>');

/* ---------- full-page bank profile ---------- */
const base=openBank;
openBank=function(i){base(i);const b=banks[i],d=el('profile');d.classList.add('page');
 const peers=banks.filter(x=>x!==b&&x.type===b.type&&!isNaN(x.assets)).sort((x,y)=>Math.abs(x.assets-b.assets)-Math.abs(y.assets-b.assets)).slice(0,4);
 const ev=b.events.slice().sort((x,y)=>y.date.localeCompare(x.date));
 const body=el('body');
 body.insertAdjacentHTML('beforeend',(ev.length?'<h3>Timeline</h3><ol class="tl">'+ev.map(e=>'<li><time>'+esc(e.date)+'</time><b>'+esc(e.title)+'</b><span>'+esc(e.kind)+' · '+esc(e.subject)+'</span></li>').join('')+'</ol>':'')+
  '<h3>Comparable banks</h3><div class="peers">'+peers.map(p=>'<button class="peer" data-bank="'+id(p)+'"><span class="mon sm">'+esc(initial(p))+logo(p)+'</span><span><b>'+esc(short(p.display))+'</b><em>'+fr(p.assets/1e6,1)+' tn · '+(p.profit===undefined?'—':(p.profit<0?'−':'')+fr(Math.abs(p.profit)/1e3,1)+' bn net')+'</em></span></button>').join('')+'</div>'+
  '<div class="pactions"><button class="btn" data-cmp="'+i+'">'+(CMP.has(i)?'✓ In comparison':'+ Add to comparison')+'</button><button class="btn" id="shareBank">Copy link</button></div>');
 el('shareBank').onclick=()=>{try{navigator.clipboard.writeText(location.href);el('shareBank').textContent='Link copied'}catch(e){}};
};

/* ---------- comparator ---------- */
document.body.insertAdjacentHTML('beforeend','<div id="tray" hidden><span id="trayList"></span><button class="btn primary" id="trayGo">Compare</button><button class="icon" id="trayClear" aria-label="Clear comparison">×</button></div><dialog id="cmpd" class="glass"><button class="icon" id="cmpClose" aria-label="Close" style="float:right">×</button><span class="eyebrow">Side by side</span><h2>Compare banks</h2><div id="cmpBody"></div></dialog>');
const tray=()=>{el('tray').hidden=!CMP.size;el('trayList').innerHTML=[...CMP].map(i=>'<span class="tchip">'+esc(short(banks[i].display))+'</span>').join('')+'<em>'+CMP.size+'/3</em>';document.querySelectorAll('[data-cmp]').forEach(btn=>{const on=CMP.has(+btn.dataset.cmp);if(btn.classList.contains('cmpb')){btn.classList.toggle('on',on);btn.textContent=on?'✓':'+'}else btn.textContent=on?'✓ In comparison':'+ Add to comparison'})};
document.addEventListener('click',e=>{const c=e.target.closest('[data-cmp]');if(!c)return;e.stopPropagation();e.preventDefault();const i=+c.dataset.cmp;if(CMP.has(i))CMP.delete(i);else{if(CMP.size>=3)CMP.delete([...CMP][0]);CMP.add(i)}tray()},true);
el('trayClear').onclick=()=>{CMP.clear();tray()};el('cmpClose').onclick=()=>el('cmpd').close();
el('trayGo').onclick=()=>{const L=[...CMP].map(i=>banks[i]);const row=(t,f)=>'<tr><th>'+t+'</th>'+L.map(b=>'<td>'+f(b)+'</td>').join('')+'</tr>';const n=(v,d,s)=>v===undefined||isNaN(v)?'—':fr(v,d)+(s||'');
 el('cmpBody').innerHTML='<div class="tablewrap"><table class="cmpt"><thead><tr><th></th>'+L.map(b=>'<th><span class="mon sm">'+esc(initial(b))+logo(b)+'</span>'+esc(short(b.display))+'</th>').join('')+'</tr></thead><tbody>'+
  row('Type',b=>TYPE[b.type])+row('Disclosed owner',b=>esc(b.ownership?.owner||'—'))+row('Foreign capital',b=>isNaN(b.local)?'—':fr(100-b.local,0)+'%')+row('Assets',b=>n(b.assets/1e6,1,' tn KHR'))+row('Loans',b=>n(b.loans/1e6,1,' tn KHR'))+row('Net profit 2025',b=>b.profit===undefined?'—':'<span class="'+(b.profit<0?'neg':'pos')+'">'+(b.profit<0?'−':'')+fr(Math.abs(b.profit)/1e3,1)+' bn KHR</span>')+row('Return on assets',b=>n(b.roa,2,'%'))+row('NPL 2024 → 2025',b=>n(b.prev,1,'%')+' → '+n(b.npl,1,'%'))+row('Equity / assets',b=>n(b.eq,1,'%'))+row('Most significant record',b=>{const[s,l]=integrity(b);return '<span class="tag '+tagCls(s)+'">'+l+'</span>'})+row('Indexed events',b=>b.events.length)+
  '</tbody></table></div><p class="note">NBC Annual Supervision Report 2025. Individual indicators, not a safety rating.</p>';el('cmpd').showModal()};

/* ---------- animated count on filter change ---------- */
const cnt=el('count');let last=0;new MutationObserver(()=>{const m=cnt.textContent.match(/^(\d+)/);if(!m||RM)return;const to=+m[1],from=last;last=to;if(from===to)return;const rest=cnt.textContent.slice(m[1].length);let t0;const st=t=>{t0??=t;const k=Math.min(1,(t-t0)/400);cnt.firstChild&&(cnt.firstChild.nodeValue=Math.round(from+(to-from)*k)+rest);if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}).observe(cnt,{childList:true});
})();
(()=>{const m=location.hash.match(/^#bank-(\d+)/);if(m&&banks[m[1]])openBank(+m[1])})();
