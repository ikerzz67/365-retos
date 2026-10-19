const $=id=>document.getElementById(id);
const now=new Date();
// El día del reto empieza a las 07:00, no a medianoche.
const challengeDate=new Date(now);if(now.getHours()<7)challengeDate.setDate(challengeDate.getDate()-1);
const start=new Date(challengeDate.getFullYear(),0,0);const day=Math.floor((challengeDate-start)/86400000);const dailyIndex=(day-1+CHALLENGES.length)%CHALLENGES.length;const current=dailyIndex;
// Si la app permanece abierta, recárgala al próximo cambio de reto (07:00).
const nextChange=new Date(now);nextChange.setHours(7,0,0,0);if(nextChange<=now)nextChange.setDate(nextChange.getDate()+1);setTimeout(()=>location.reload(),Math.max(1000,nextChange-now));
$('date').textContent=new Intl.DateTimeFormat('es-ES',{weekday:'short',day:'numeric',month:'short'}).format(now).toUpperCase();
function getDone(){try{return JSON.parse(localStorage.getItem('udr-done')||'[]')}catch{return []}}
function render(){const c=CHALLENGES[current];$('challenge').textContent=c.text;$('category').textContent=c.category;$('count').textContent='RETO '+String(current+1).padStart(3,'0')+' / 365';$('done').textContent=getDone().includes(current)?'✓ Completado':'○ Marcar hecho';}
function renderProgress(){const a=getDone();$('progress-label').textContent=a.length+' retos completados';$('progress-bar').style.width=Math.min(100,a.length/365*100)+'%';const el=$('completed');el.innerHTML='';if(!a.length){el.innerHTML='<p class="empty">Cuando completes un reto, aparecerá aquí.</p>';return}a.slice().sort((x,y)=>y-x).slice(0,20).forEach(i=>{if(!CHALLENGES[i])return;let d=document.createElement('div');d.className='completed-item';let s=document.createElement('span');s.textContent=CHALLENGES[i].category;d.appendChild(s);d.appendChild(document.createTextNode(CHALLENGES[i].text));el.appendChild(d)})}
$('done').addEventListener('click',()=>{let a=getDone();if(a.includes(current))a=a.filter(n=>n!==current);else a.push(current);localStorage.setItem('udr-done',JSON.stringify(a));render();renderProgress()});render();renderProgress();
