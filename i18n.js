/* Khmer interface (UI chrome only; data, names and source excerpts stay in English). Translation pending native review. */
(()=>{
const KM={
"Insights":"ការវិភាគ","Owners":"ម្ចាស់","Directory":"បញ្ជីធនាគារ","Case files":"សំណុំរឿង","Methodology":"វិធីសាស្ត្រ","Editorial":"វិចារណកថា","Home":"ទំព័រដើម","Banks":"ធនាគារ","Cases":"សំណុំរឿង","About":"អំពី",
"BANK INTELLIGENCE":"ព័ត៌មានធនាគារ","Cambodia · Bank intelligence":"កម្ពុជា · ព័ត៌មានធនាគារ",
"Who owns":"តើអ្នកណាជាម្ចាស់","Cambodia’s banks?":"ធនាគារនៅកម្ពុជា?",
"Shareholders, financial indicators and regulatory records behind Cambodia’s banking sector, sourced and easy to read.":"ម្ចាស់ភាគហ៊ុន សូចនាករហិរញ្ញវត្ថុ និងកំណត់ត្រាបទប្បញ្ញត្តិ នៃវិស័យធនាគារកម្ពុជា មានប្រភពច្បាស់លាស់ និងងាយស្រួលអាន។",
"Explore the directory":"ស្វែងរកក្នុងបញ្ជីធនាគារ","See the insights":"មើលការវិភាគ",
"Profitable bank":"ធនាគារមានប្រាក់ចំណេញ","Loss-making":"ខាត","Shared owner":"ម្ចាស់រួម","Profitable":"មានប្រាក់ចំណេញ",
"Bank profiles":"ប្រវត្តិធនាគារ","On August register":"ក្នុងបញ្ជីខែសីហា","Sector weighted NPL":"អត្រាឥណទានមិនដំណើរការរបស់វិស័យ","Case-file entries":"ចំនួនសំណុំរឿង",
"Sector insights":"ការវិភាគវិស័យ","Top 12 by total assets":"ធនាគារ ១២ ធំបំផុតតាមទ្រព្យសកម្ម","KHR trillions · USD at NBC official rate":"ពាន់ពាន់លានរៀល · ដុល្លារតាមអត្រាផ្លូវការ ធនាគារជាតិ",
"Capital origin":"ប្រភពដើមទុន","Average share, banks with data":"ចំណែកមធ្យម ធនាគារដែលមានទិន្នន័យ","foreign capital":"ដើមទុនបរទេស","Cambodian":"កម្ពុជា","Foreign":"បរទេស",
"Risk vs strength":"ហានិភ័យ ធៀបនឹង ភាពរឹងមាំ","Typical range":"ចន្លោះធម្មតា","All banks":"ធនាគារទាំងអស់","Below peer average":"ក្រោមមធ្យមភាគ","Above peers":"លើសមធ្យមភាគ","Size = total assets":"ទំហំ = ទ្រព្យសកម្មសរុប",
"Case files by type":"សំណុំរឿងតាមប្រភេទ","Indexed events":"ព្រឹត្តិការណ៍ដែលបានកត់ត្រា","Regulatory actions":"វិធានការបទប្បញ្ញត្តិ","Allegations":"ការចោទប្រកាន់","Sanctions":"ទណ្ឌកម្ម","Reported dispute":"វិវាទដែលបានរាយការណ៍",
"Net profit / loss by bank · FY2025":"ប្រាក់ចំណេញ/ខាតសុទ្ធ តាមធនាគារ · ឆ្នាំ២០២៥","Return on assets":"ប្រាក់ចំណេញលើទ្រព្យសកម្ម","KHR bn":"ពាន់លានរៀល",
"Non-performing loan ratio change 2024 → 2025":"បម្រែបម្រួលអត្រាឥណទានមិនដំណើរការ ២០២៤ → ២០២៥","Biggest rises and falls (percentage points)":"ការកើនឡើង និងថយចុះធំបំផុត (ពិន្ទុភាគរយ)",
"Ownership network":"បណ្តាញកម្មសិទ្ធិ","Who owns what":"អ្នកណាជាម្ចាស់អ្វី","Groups with more than one bank":"ក្រុមដែលមានធនាគារច្រើនជាងមួយ","Dot size = assets":"ទំហំចំណុច = ទ្រព្យសកម្ម","owns several banks":"ជាម្ចាស់ធនាគារច្រើន",
"Banks grouped by the country of their controlling parent group, largest first. A gold badge marks groups that own more than one bank: hover it to light up the sister banks. Click any bank to open it.":"ធនាគារត្រូវបានដាក់ជាក្រុមតាមប្រទេសរបស់ក្រុមមេដែលគ្រប់គ្រង ពីធំទៅតូច។ ស្លាកពណ៌មាសបង្ហាញក្រុមដែលជាម្ចាស់ធនាគារច្រើនជាងមួយ។ ចុចលើធនាគារណាមួយដើម្បីបើក។",
"The register":"បញ្ជី","Bank directory":"បញ្ជីធនាគារ","All types":"គ្រប់ប្រភេទ","Commercial":"ពាណិជ្ជ","Specialized":"ឯកទេស","All records":"កំណត់ត្រាទាំងអស់","With case files":"មានសំណុំរឿង","Ownership sourced":"មានប្រភពកម្មសិទ្ធិ","Licence withdrawn":"អាជ្ញាប័ណ្ណត្រូវបានដកហូត","Financial data":"ទិន្នន័យហិរញ្ញវត្ថុ",
"All owner countries":"គ្រប់ប្រទេសម្ចាស់","All ownership":"គ្រប់ប្រភេទកម្មសិទ្ធិ","Majority Cambodian capital":"ដើមទុនកម្ពុជាភាគច្រើន","Majority foreign capital":"ដើមទុនបរទេសភាគច្រើន","No capital data":"គ្មានទិន្នន័យដើមទុន",
"Name A–Z":"ឈ្មោះ ក–អ","Largest assets":"ទ្រព្យសកម្មធំបំផុត","Official actions first":"វិធានការផ្លូវការមុន","Highest NPL ratio":"អត្រា NPL ខ្ពស់បំផុត","Lowest NPL ratio":"អត្រា NPL ទាបបំផុត",
"All":"ទាំងអស់","Table":"តារាង","Cards":"កាត","Show more":"បង្ហាញបន្ថែម","Show more case files":"បង្ហាញសំណុំរឿងបន្ថែម","Open profile":"បើកប្រវត្តិ","Show less":"បង្ហាញតិច",
"Bank":"ធនាគារ","Type":"ប្រភេទ","Disclosed owner":"ម្ចាស់ដែលបានបង្ហាញ","Owner country":"ប្រទេសម្ចាស់","Foreign capital":"ដើមទុនបរទេស","Assets (KHR tn)":"ទ្រព្យសកម្ម (ពាន់ពាន់លានរៀល)","Net profit 2025 (KHR bn)":"ប្រាក់ចំណេញសុទ្ធ ២០២៥ (ពាន់លានរៀល)","NPL ratio":"អត្រា NPL","Record":"កំណត់ត្រា","Compare":"ប្រៀបធៀប",
"No case indexed":"គ្មានសំណុំរឿង","Allegation or dispute (unproven)":"ការចោទប្រកាន់ ឬវិវាទ (មិនទាន់បញ្ជាក់)","Sanction on the bank":"ទណ្ឌកម្មលើធនាគារ","Regulatory action on the bank":"វិធានការបទប្បញ្ញត្តិលើធនាគារ","Parent, shareholder or historical record":"កំណត់ត្រាក្រុមមេ ម្ចាស់ភាគហ៊ុន ឬប្រវត្តិ",
"Documented events":"ព្រឹត្តិការណ៍ដែលមានឯកសារ","Research notes":"កំណត់ចំណាំស្រាវជ្រាវ","How to read the ledger":"របៀបអានបញ្ជី","Financial security":"សន្តិសុខហិរញ្ញវត្ថុ","Integrity":"សុចរិតភាព","Coverage":"វិសាលភាព",
"Standards, corrections & coverage":"ស្តង់ដារ ការកែតម្រូវ និងវិសាលភាព","Contact & corrections":"ទំនាក់ទំនង និងការកែតម្រូវ","Data coverage":"វិសាលភាពទិន្នន័យ","Update history":"ប្រវត្តិធ្វើបច្ចុប្បន្នភាព",
"Key indicators":"សូចនាករសំខាន់ៗ","Individual reported indicators, not a safety rating.":"សូចនាករដែលបានរាយការណ៍ មិនមែនជាការវាយតម្លៃសុវត្ថិភាពទេ។","Ownership and control":"កម្មសិទ្ធិ និងការគ្រប់គ្រង","Financial sources":"ប្រភពហិរញ្ញវត្ថុ","Regulatory and integrity record":"កំណត់ត្រាបទប្បញ្ញត្តិ និងសុចរិតភាព","Timeline":"កាលប្បវត្តិ","Comparable banks":"ធនាគារប្រហាក់ប្រហែល",
"+ Add to comparison":"+ បន្ថែមទៅការប្រៀបធៀប","✓ In comparison":"✓ ក្នុងការប្រៀបធៀប","Copy link":"ចម្លងតំណ","Link copied":"បានចម្លងតំណ","Side by side":"ប្រៀបធៀបគ្នា","Compare banks":"ប្រៀបធៀបធនាគារ",
"Loans":"ឥណទាន","Assets":"ទ្រព្យសកម្ម","Net profit 2025":"ប្រាក់ចំណេញសុទ្ធ ២០២៥","Equity / assets":"មូលធន / ទ្រព្យសកម្ម","Most significant record":"កំណត់ត្រាសំខាន់បំផុត","NPL 2024 → 2025":"NPL ២០២៤ → ២០២៥",
"Commercial bank":"ធនាគារពាណិជ្ជ","Specialized bank":"ធនាគារឯកទេស","NPL at or below peers":"NPL ស្មើ ឬទាបជាងមធ្យមភាគ","NPL above peers":"NPL លើសមធ្យមភាគ",
"Cambodia":"កម្ពុជា","Canada":"កាណាដា","South Korea":"កូរ៉េខាងត្បូង","Malaysia":"ម៉ាឡេស៊ី","Japan":"ជប៉ុន","China":"ចិន","Taiwan":"តៃវ៉ាន់","Vietnam":"វៀតណាម","Thailand":"ថៃ","Singapore":"សិង្ហបុរី","France":"បារាំង","Laos":"ឡាវ","Individuals":"បុគ្គល","Not disclosed":"មិនបានបង្ហាញ"
};
const SUB=[[/^(\d+) of (\d+) banks/,"$1 នៃ $2 ធនាគារ"],[/^(\d+) banks$/,"ធនាគារ $1"],[/of assets/g,"នៃទ្រព្យសកម្ម"],[/(\d+) banks?\b/g,"ធនាគារ $1"],[/Show all (\d+)/,"បង្ហាញទាំង $1"],[/^Total assets \(KHR\)/,"ទ្រព្យសកម្មសរុប (រៀល)"],[/^Net profit 2025 \(KHR\)/,"ប្រាក់ចំណេញសុទ្ធ ២០២៥ (រៀល)"],[/ profitable/,"មានប្រាក់ចំណេញ"],[/ loss-making/," ខាត"],[/^Parent group:/,"ក្រុមមេ៖"],[/Commercial bank$/,"ធនាគារពាណិជ្ជ"],[/Specialized bank$/,"ធនាគារឯកទេស"]];
const PH={"Search banks or shareholders...":"ស្វែងរកធនាគារ ឬម្ចាស់ភាគហ៊ុន...","Find an owner or bank…":"ស្វែងរកម្ចាស់ ឬធនាគារ…","Jump to a bank…  (Esc to close)":"ទៅកាន់ធនាគារ… (Esc ដើម្បីបិទ)"};
let lang='en';try{lang=localStorage.getItem('lang')||'en'}catch(e){}
const btn=document.createElement('button');btn.className='icon lang';btn.id='lang';btn.setAttribute('aria-label',lang==='km'?'Switch to English':'ប្តូរទៅភាសាខ្មែរ');btn.textContent=lang==='km'?'EN':'ខ្មែរ';
el('theme').before(btn);btn.onclick=()=>{try{localStorage.setItem('lang',lang==='km'?'en':'km')}catch(e){}location.reload()};
if(lang!=='km')return;
document.documentElement.lang='km';document.documentElement.classList.add('km');
const f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600&family=Noto+Sans+Khmer:wght@400;600&display=swap';document.head.appendChild(f);
const tr=root=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.nodeValue,k=t.trim();if(!k||n.parentElement&&/SCRIPT|STYLE/.test(n.parentElement.tagName))continue;if(KM[k]){n.nodeValue=t.replace(k,KM[k]);continue}let v=t;for(const[r,s]of SUB)v=v.replace(r,s);if(v!==t)n.nodeValue=v}
 (root.querySelectorAll?root:document).querySelectorAll('[placeholder]').forEach(e=>{if(PH[e.placeholder])e.placeholder=PH[e.placeholder]});
 (root.querySelectorAll?root:document).querySelectorAll('option').forEach(o=>{if(KM[o.text])o.text=KM[o.text]})};
const h1=document.querySelector('h1');if(h1)h1.textContent='តើអ្នកណាជាម្ចាស់ធនាគារនៅកម្ពុជា?';
tr(document.body);
let busy=false;new MutationObserver(ms=>{if(busy)return;busy=true;for(const m of ms)m.addedNodes.forEach(x=>{if(x.nodeType===1)tr(x);else if(x.nodeType===3&&x.parentElement)tr(x.parentElement)});busy=false}).observe(document.body,{childList:true,subtree:true});
document.querySelector('main').insertAdjacentHTML('afterbegin','<p class="kmnote">ការបកប្រែនេះកំពុងរង់ចាំការពិនិត្យដោយអ្នកជំនាញ។ ឈ្មោះធនាគារ ទិន្នន័យ និងប្រភពនៅជាភាសាអង់គ្លេស។</p>');
})();
