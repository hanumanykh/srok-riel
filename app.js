const el=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const source=(u,l)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+esc(l)+' ↗</a>';
const fr=(n,d=1)=>n.toLocaleString('en-US',{maximumFractionDigits:d});
const TYPE={Commercial:'Commercial',Specialized:'Specialized'};
const metric=(b,m)=>b.fin.find(f=>f.metric.startsWith(m));
const num=s=>s?parseFloat(s.replace(/,/g,'')):NaN;
// Derived indicators from the NBC detail strings
banks.forEach(b=>{const n=metric(b,'Non-performing'),e=metric(b,'Book equity'),o=metric(b,'Paid-up');
 b.npl=parseFloat(n?.value);b.prev=num(n?.detail.match(/Prior year: ([\d.]+)%/)?.[1]);b.loans=num(n?.detail.match(/Loans: KHR ([\d,]+)/)?.[1]);
 b.eq=parseFloat(e?.value);b.assets=num(e?.detail.match(/assets of KHR ([\d,]+)/)?.[1]);b.local=parseFloat((o||b.origin)?.value);b.peer=b.type==='Commercial'?8.3:13.2});
function integrity(b){
 if(b.events.some(e=>e.kind==='Sanction'&&e.subject.startsWith('Bank')))return [5,'Direct sanction'];
 if(b.status==='Licence withdrawn')return [4,'Licence withdrawn'];
 if(b.events.some(e=>e.kind==='Regulatory action'&&e.subject==='Bank'))return [3,'Official intervention'];
 if(b.events.some(e=>/^(Parent|Overseas|Predecessor|Chairman|Historical)/.test(e.subject)))return [2,'Related-party record'];
 return b.events.length?[1,'Reported dispute']:[0,'No case indexed'];
}
const tagCls=s=>s>=3?'warn':s?'mid':'';
const initial=b=>b.display.split(/[^a-z0-9]+/i).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const id=b=>banks.indexOf(b);
const records=banks.flatMap(b=>b.events.map(e=>({...e,b}))).sort((a,b)=>b.date.localeCompare(a.date));
const withFin=banks.filter(b=>!isNaN(b.assets));
const totAssets=withFin.reduce((s,b)=>s+b.assets,0),totLoans=withFin.reduce((s,b)=>s+(b.loans||0),0);
const nplW=withFin.reduce((s,b)=>s+(b.loans&&!isNaN(b.npl)?b.loans*b.npl/100:0),0)/totLoans*100;
el('stats').innerHTML=[[banks.length,'Bank profiles'],[banks.filter(b=>b.status!=='Licence withdrawn').length,'On August register'],[fr(totAssets/1e6,0)+' bn','Total assets (KHR)'],[fr(nplW)+'%','Sector weighted NPL'],[records.length,'Case-file entries']].map(([n,t])=>'<div class="kpi glass"><strong>'+n+'</strong><span>'+t+'</span></div>').join('');

/* ---------- Charts (vanilla SVG, no dependency) ---------- */
const C={gold:'var(--gold)',jade:'var(--jade)',red:'var(--red)',blue:'var(--blue)'};
const svg=(w,h,inner)=>'<svg viewBox="0 0 '+w+' '+h+'" role="img">'+inner+'</svg>';
const tipAttr=(b,t)=>' data-tip="'+esc(t)+'"'+(b?' data-bank="'+id(b)+'"':'');
const short=s=>s.length>22?s.slice(0,21)+'…':s;
function barsH(target,items,fmt,color){const w=640,rh=26,lw=170,h=items.length*rh+4,max=Math.max(...items.map(i=>i.v));
 el(target).innerHTML=svg(w,h,items.map((i,k)=>{const y=k*rh,bw=(w-lw-60)*i.v/max;return '<text class="lbl" x="'+(lw-8)+'" y="'+(y+17)+'" text-anchor="end">'+esc(short(i.l))+'</text><rect class="bar" x="'+lw+'" y="'+(y+5)+'" width="'+bw+'" height="16" rx="6" fill="'+(i.c||color)+'"'+tipAttr(i.b,i.l+' · '+fmt(i.v))+'/><text x="'+(lw+bw+6)+'" y="'+(y+17)+'">'+fmt(i.v)+'</text>'}).join(''))}
barsH('chAssets',withFin.slice().sort((a,b)=>b.assets-a.assets).slice(0,12).map((b,k)=>({l:b.display,v:b.assets/1e6,b,c:k<3?C.gold:C.jade})),v=>fr(v,1)+' bn');
// Origin donut
(()=>{const o=banks.filter(b=>!isNaN(b.local)),loc=o.reduce((s,b)=>s+b.local,0)/o.length,R=70,L=2*Math.PI*R,d=L*loc/100;
 el('chOrigin').innerHTML=svg(240,200,'<g transform="translate(120,100) rotate(-90)"><circle r="'+R+'" fill="none" stroke="var(--blue)" stroke-width="26"'+tipAttr(0,'Foreign · '+fr(100-loc)+'%')+' class="bar"/><circle r="'+R+'" fill="none" stroke="var(--gold)" stroke-width="26" stroke-dasharray="'+d+' '+L+'"'+tipAttr(0,'Cambodian · '+fr(loc)+'%')+' class="bar"/></g><text x="120" y="98" text-anchor="middle" class="lbl" style="font:600 26px Fraunces,serif">'+fr(100-loc,0)+'%</text><text x="120" y="118" text-anchor="middle">foreign capital</text>')+'<div class="legend"><span><i style="background:var(--gold)"></i>Cambodian</span><span><i style="background:var(--blue)"></i>Foreign</span><span>'+o.length+' banks</span></div>'})();
// Scatter NPL vs equity
(()=>{const p=banks.filter(b=>!isNaN(b.npl)&&!isNaN(b.eq)),w=640,h=300,m=36,X=Math.min(40,Math.max(...p.map(b=>b.npl))),Y=Math.min(60,Math.max(...p.map(b=>b.eq))),sx=v=>m+(w-m-10)*Math.min(v,X)/X,sy=v=>h-m-(h-m-10)*Math.min(v,Y)/Y,amax=Math.max(...p.map(b=>b.assets||0));
 let g='';for(let t=0;t<=X;t+=X>20?10:5)g+='<line x1="'+sx(t)+'" x2="'+sx(t)+'" y1="10" y2="'+(h-m)+'" stroke="var(--line)"/><text x="'+sx(t)+'" y="'+(h-m+16)+'" text-anchor="middle">'+t+'%</text>';
 for(let t=0;t<=Y;t+=10)g+='<line x1="'+m+'" x2="'+w+'" y1="'+sy(t)+'" y2="'+sy(t)+'" stroke="var(--line)"/><text x="'+(m-6)+'" y="'+(sy(t)+4)+'" text-anchor="end">'+t+'%</text>';
 g+='<line x1="'+sx(8.3)+'" x2="'+sx(8.3)+'" y1="10" y2="'+(h-m)+'" stroke="var(--gold)" stroke-dasharray="4 4"/><text x="'+(sx(8.3)+4)+'" y="20" style="fill:var(--gold)">commercial peers 8.3%</text>';
 g+=p.map(b=>'<circle class="dot" cx="'+sx(b.npl)+'" cy="'+sy(b.eq)+'" r="'+(4+10*Math.sqrt((b.assets||0)/amax))+'" fill="'+(b.npl>b.peer?C.red:C.jade)+'" fill-opacity=".7"'+tipAttr(b,b.display+' · NPL '+fr(b.npl)+'% · equity/assets '+fr(b.eq)+'%')+'/>').join('');
 el('chScatter').innerHTML=svg(w,h,g)+'<div class="legend"><span><i style="background:var(--jade)"></i>Below peer average</span><span><i style="background:var(--red)"></i>Above peers</span><span>Size = total assets</span></div>'})();
// Case kinds
(()=>{const K={Sanction:['Sanctions',C.red],'Regulatory action':['Regulatory actions',C.gold],Allegation:['Allegations',C.blue],'Reported dispute':['Disputes',C.jade]},cnt={};records.forEach(r=>cnt[r.kind]=(cnt[r.kind]||0)+1);
 barsH('chCases',Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({l:K[k]?.[0]||k,v,c:K[k]?.[1]||C.jade})),v=>v)})();
// NPL deltas (diverging)
(()=>{const d=banks.filter(b=>!isNaN(b.npl)&&!isNaN(b.prev)).map(b=>({b,v:b.npl-b.prev})).sort((a,b)=>b.v-a.v),pick=[...d.slice(0,7),...d.slice(-7)],w=1000,rh=24,h=pick.length*rh,mid=w/2+80,max=Math.max(...pick.map(p=>Math.abs(p.v))),sc=(w/2-110)/max;
 el('chDelta').innerHTML=svg(w,h,'<line x1="'+mid+'" x2="'+mid+'" y1="0" y2="'+h+'" stroke="var(--line)"/>'+pick.map((p,k)=>{const y=k*rh,bw=Math.abs(p.v)*sc,x=p.v>0?mid:mid-bw;return '<text class="lbl" x="'+(mid-(p.v>0?8:bw+8))+'" y="'+(y+16)+'" text-anchor="end">'+esc(short(p.b.display))+'</text><rect class="bar" x="'+x+'" y="'+(y+4)+'" width="'+Math.max(bw,2)+'" height="15" rx="5" fill="'+(p.v>0?C.red:C.jade)+'"'+tipAttr(p.b,p.b.display+' · '+fr(p.b.prev)+'% → '+fr(p.b.npl)+'%')+'/><text x="'+(p.v>0?mid+bw+6:mid+6)+'" y="'+(y+16)+'">'+(p.v>0?'+':'')+fr(p.v)+' pt</text>'}).join(''))})();
// Tooltip
const tip=el('tip');document.addEventListener('pointermove',e=>{const t=e.target.closest?.('[data-tip]');if(t){tip.textContent=t.dataset.tip;tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px';tip.style.opacity=1}else tip.style.opacity=0});

/* ---------- Directory ---------- */
const meter=b=>isNaN(b.npl)?'':'<div class="meter" title="NPL vs peers"><i style="width:'+Math.min(100,b.npl/30*100)+'%;background:'+(b.npl>b.peer?C.red:C.jade)+'"></i><b style="left:'+(b.peer/30*100)+'%"></b></div>';
let limit=12;
const chips=[['','All'],['cases','With case files'],['revoked','Licence withdrawn'],['owner','Ownership sourced']];
el('chips').innerHTML=chips.map(([v,l])=>'<button class="chip" data-chip="'+v+'" aria-pressed="'+(v==='')+'">'+l+'</button>').join('');
el('chips').onclick=e=>{const c=e.target.closest('[data-chip]');if(!c)return;el('risk').value=c.dataset.chip;limit=12;render()};
function render(){
 const q=el('search').value.toLowerCase().trim(),t=el('type').value,r=el('risk').value,s=el('sort').value;
 document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.chip===r));
 const set=banks.filter(b=>(!t||b.type===t)&&(!q||[b.name,b.display,b.ownership?.owner,b.ownership?.detail].join(' ').toLowerCase().includes(q))&&(!r||({cases:b.events.length,owner:!!b.ownership,revoked:b.status==='Licence withdrawn',fin:b.fin.length}[r]))).sort((a,b)=>{
  let v=0;if(s==='integrity')v=integrity(b)[0]-integrity(a)[0];
  if(s==='assets')v=(b.assets||0)-(a.assets||0);
  if(s==='low'||s==='high'){const x=a.npl,y=b.npl;v=isNaN(x)||isNaN(y)?Number(isNaN(x))-Number(isNaN(y)):(s==='low'?x-y:y-x)}
  return v||a.display.localeCompare(b.display)});
 el('count').textContent=set.length?Math.min(limit,set.length)+' of '+set.length+' banks':'No matching banks. Try another name or filter.';
 el('rows').innerHTML=set.slice(0,limit).map(b=>{const [sc,lab]=integrity(b);return '<button class="bank glass" data-bank="'+id(b)+'"><span class="who"><span class="mon">'+esc(initial(b))+'</span><span><b>'+esc(b.display)+'</b><em>'+TYPE[b.type]+(isNaN(b.assets)?'':' · '+fr(b.assets/1e6)+' bn KHR')+'</em></span></span><span class="owner">'+esc(b.ownership?.owner||'Shareholders unverified')+'</span>'+meter(b)+'<span class="foot"><span>'+(b.status==='Licence withdrawn'?'Licence withdrawn':isNaN(b.npl)?'NPL unavailable':'NPL '+fr(b.npl)+'% · peers '+fr(b.peer)+'%')+'</span><span class="tag '+tagCls(sc)+'">'+lab+'</span></span></button>'}).join('');
 el('more').hidden=set.length<=limit;
}
function openBank(i){
 const b=banks[i],o=b.ownership,v=b.npl,p=b.peer,[sc,lab]=integrity(b);
 const mini=[[isNaN(v)?'—':fr(v)+'%','NPL 2025 (peers '+fr(p)+'%)'],[isNaN(b.prev)?'—':fr(b.prev)+'%','NPL 2024'],[isNaN(b.eq)?'—':fr(b.eq)+'%','Equity / assets'],[isNaN(b.assets)?'—':fr(b.assets/1e6)+' bn','Assets (KHR)'],[isNaN(b.loans)?'—':fr(b.loans/1e6)+' bn','Loans (KHR)']];
 el('body').innerHTML='<span class="eyebrow">Banque '+TYPE[b.type].toLowerCase()+'</span><h2>'+esc(b.display)+'</h2><p>'+esc(b.name)+' · <b>'+esc(b.status)+'</b> · '+source(b.statusSource||b.source,'Source')+'</p><p><span class="tag '+tagCls(sc)+'">'+lab+'</span> <span class="tag '+(isNaN(v)?'':v>p?'warn':'')+'">'+(isNaN(v)?'Assessment unavailable':v>p?'Above peers':'At or below peers')+'</span></p>'
 +'<h3>Key indicators</h3><div class="mini">'+mini.map(([a,c])=>'<div><strong>'+a+'</strong><span>'+c+'</span></div>').join('')+'</div>'+(isNaN(v)?'':'<p style="margin-top:14px">'+meter(b)+'</p>')
 +'<h3>Ownership and control</h3><b>'+esc(o?.owner||'Shareholders unverified')+'</b><p>'+esc(o?.detail||b.context?.detail||'A reliable shareholder breakdown was unavailable in the reviewed material.')+'</p>'+((o||b.context)?source((o||b.context).url,'Ownership source'):'')
 +'<h3>Financial sources</h3>'+b.fin.map(f=>'<p><b>'+esc(f.value)+' · '+esc(f.metric)+'</b><br>'+esc(f.asof)+' · '+esc(f.detail)+' '+source(f.url,'Table')+'</p>').join('')+(!b.fin.length?'<p>No comparable bank-level data in this edition.</p>':'')
 +'<h3>Regulatory record</h3>'+b.events.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(e=>'<article><span class="eyebrow">'+esc(e.kind)+' · '+esc(e.date)+'</span><h4>'+esc(e.title)+'</h4><p><b>'+esc(e.subject)+'</b> — '+esc(e.detail)+'</p>'+source(e.url,'Read the source')+'</article>').join('')+(!b.events.length?'<p>No event indexed. Shareholder screening is incomplete.</p>':'');
 if(!el('profile').open)el('profile').showModal();el('profile').scrollTop=0;try{history.replaceState(null,'','#bank-'+i)}catch{}
}
let caseLimit=6;
function renderCases(){el('cases').innerHTML=records.slice(0,caseLimit).map(e=>'<button class="case glass" data-bank="'+id(e.b)+'"><time>'+esc(e.date)+' · '+esc(e.kind)+'</time><strong>'+esc(e.title)+'</strong><span>'+esc(e.b.display)+'</span></button>').join('');el('caseMore').hidden=caseLimit>=records.length}
el('cases').insertAdjacentHTML('afterend','<button id="caseMore" class="btn wide">Show more case files</button>');
el('caseMore').onclick=()=>{caseLimit+=9;renderCases()};
for(const c of ['type','risk','sort','search'])el(c).addEventListener('input',()=>{limit=12;render()});
el('more').onclick=()=>{limit+=15;render()};
document.addEventListener('click',e=>{const t=e.target.closest('[data-bank]');if(t)openBank(+t.dataset.bank)});
el('close').onclick=()=>el('profile').close();
el('profile').addEventListener('close',()=>{try{history.replaceState(null,'',location.pathname)}catch{}});
el('profile').onclick=e=>{if(e.target===el('profile')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)el('profile').close()}};
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();el('search').focus()}});
// Theme
const root=document.documentElement;try{root.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{}
el('theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch{}};
render();renderCases();
const deep=location.hash.match(/^#bank-(\d+)/);if(deep&&banks[deep[1]])openBank(+deep[1]);
