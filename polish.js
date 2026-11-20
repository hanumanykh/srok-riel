/* Readability pass: responsive HTML bar charts, clearer KPIs, calmer page furniture */
(()=>{
const money=v=>(v<0?'−':'')+fr(Math.abs(v),1);
// generic responsive bar list (diverging when values cross zero)
const hbars=(box,items,fmt,opts={})=>{const mx=Math.max(...items.map(i=>Math.max(0,i.v))),mn=Math.min(0,...items.map(i=>i.v)),span=mx-mn||1,zero=-mn/span*100;
 box.classList.add('hbars');box.innerHTML=items.map((it,k)=>{const w=Math.abs(it.v)/span*100,left=it.v>=0?zero:zero-w;return '<div class="hr"'+(it.b!==undefined?' data-bank="'+it.b+'"':'')+' style="--d:'+Math.min(k*25,600)+'ms"><span class="hl">'+esc(it.l)+'</span><span class="ht"><i class="'+(it.v<0?'neg':(opts.cls||'pos'))+'" style="left:'+left.toFixed(2)+'%;width:'+Math.max(w,.6).toFixed(2)+'%"></i>'+(mn<0?'<b style="left:'+zero.toFixed(2)+'%"></b>':'')+'</span><span class="hv '+(it.v<0?'neg':'')+'">'+fmt(it.v)+'</span></div>'}).join('')};
const lab=b=>short(b.display).replace(/\s+Bank$/,' Bank');
// assets
hbars(el('chAssets'),withFin.slice().sort((a,b)=>b.assets-a.assets).slice(0,12).map(b=>({l:lab(b),v:b.assets/1e6,b:id(b)})),v=>fr(v,1)+' tn',{cls:'ink'});
// profit with toggle
const pf=banks.filter(b=>b.profit!==undefined);
const drawP=m=>{const val=b=>m==='roa'?b.roa:b.profit/1e3,list=pf.filter(b=>!isNaN(val(b))).sort((x,y)=>val(y)-val(x));hbars(el('chProfit'),list.map(b=>({l:lab(b),v:val(b),b:id(b)})),m==='roa'?v=>(v>0?'+':'')+fr(v,2)+'%':v=>money(v)+' bn')};
drawP('abs');el('pfToggle').onclick=e=>{const t=e.target.closest('[data-m]');if(!t)return;el('pfToggle').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===t));drawP(t.dataset.m)};
// NPL change
const d=banks.filter(b=>!isNaN(b.npl)&&!isNaN(b.prev)).map(b=>({b,v:b.npl-b.prev})).sort((a,b)=>b.v-a.v);
hbars(el('chDelta'),[...d.slice(0,8),...d.slice(-8)].map(x=>({l:lab(x.b),v:x.v,b:id(x.b)})),v=>(v>0?'+':'')+fr(v,1)+' pt');
// clearer chart copy
const cap=(sel,t,s)=>{const f=el(sel).closest('figure').querySelector('figcaption');const b=f.querySelector('b'),sp=f.querySelector('span:not(.seg):not(:has(b))')||f.querySelectorAll('span')[0];if(b&&t)b.textContent=t;if(sp&&s&&!sp.querySelector('b'))sp.textContent=s};
cap('chAssets','The 12 largest banks','Total assets at 31 Dec 2025, in trillions of riel');
cap('chDelta','Where bad loans rose or fell','Change in the share of loans not being repaid (NPL ratio), 2024 to 2025, in percentage points. Red means more bad loans.');
// put the profit chart first in Insights
const g=document.querySelector('#insights .grid'),pfig=el('chProfit').closest('figure');g.prepend(pfig);
// KPIs: plain words, USD on its own line
const totA=withFin.reduce((s,b)=>s+b.assets,0),totP=banks.reduce((s,b)=>s+(b.profit||0),0);
el('stats').innerHTML=[[banks.length,'banks covered',''],[fr(totA/1e6,0)+' tn','riel in total assets','≈ $'+fr(totA/FX/1e3,0)+' bn'],[fr(totP/1e6,2)+' tn','riel of net profit in 2025','≈ $'+fr(totP/FX/1e3,2)+' bn'],[fr(nplW,1)+'%','of loans not being repaid','sector NPL ratio, Dec 2025'],[banks.filter(b=>b.country!=='Cambodia'&&b.country!=='Individuals'&&b.country!=='Not disclosed').length,'banks with a foreign parent',''],[records.length,'documented events','sanctions, actions, disputes']].map(([n,t,s])=>'<div class="kpi"><strong>'+n+'</strong><span>'+t+'</span>'+(s?'<em>'+s+'</em>':'')+'</div>').join('');
// update history: show latest 3
const uh=[...document.querySelectorAll('#editorial .cov')].pop();if(uh){const li=[...uh.children];if(li.length>3){li.slice(3).forEach(x=>x.hidden=true);uh.insertAdjacentHTML('afterend','<button class="linkbtn" id="uhMore">Show full history ('+li.length+')</button>');el('uhMore').onclick=()=>{li.forEach(x=>x.hidden=false);el('uhMore').remove()}}}
})();
