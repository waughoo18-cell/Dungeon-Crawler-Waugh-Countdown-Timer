import OBR from '@owlbear-rodeo/sdk';
import './style.css';
const KEY='com.dungeoncrawlerwaugh.timer/state';
const DEFAULT={title:'DUNGEON COUNTDOWN',remainingMs:3600000,running:false,endAt:null,revision:0};
let state={...DEFAULT}, isGM=false, connected=false, editing=false;
const app=document.getElementById('app');
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const remaining=()=>Math.max(0,state.running?state.endAt-Date.now():state.remainingMs);
const parts=ms=>{let n=Math.ceil(ms/1000);return [Math.floor(n/86400),Math.floor(n%86400/3600),Math.floor(n%3600/60),n%60]};
function render(){
 app.innerHTML=`<header><span class="dot"></span> DUNGEON CRAWLER WAUGH</header><main><div class="subtitle">${escapeHTML(state.title)}</div><div class="clock">${['DAYS','HOURS','MINUTES','SECONDS'].map((label,i)=>`<div class="digit"><strong id="n${i}">00</strong><small>${label}</small></div>`).join('')}</div><div id="status"></div>${isGM?`<section><h3>Dungeon Master Controls</h3><label>Timer title<input id="title" maxlength="80" value="${escapeHTML(state.title)}"/></label><div class="inputs">${['Days','Hours','Minutes','Seconds'].map((label,i)=>`<label>${label}<input type="number" id="v${i}" min="0" max="999999" value="${parts(remaining())[i]}"/></label>`).join('')}</div><button id="apply">Apply Time Live</button><div class="buttons"><button id="toggle">${state.running?'Pause':'Start / Resume'}</button><button id="reset">Reset to 1 Hour</button></div><p>Changes are published to all connected players. Applying time while running continues the countdown from the new value.</p></section>`:`<div class="viewer">Player view · Only the GM can edit the timer.</div>`}</main><footer>${connected?'Connected to Owlbear Rodeo':'Open this inside Owlbear Rodeo'}</footer>`;
 updateClock();
 if(isGM){const ids=['title','v0','v1','v2','v3'];ids.forEach(id=>document.getElementById(id).addEventListener('focus',()=>editing=true));
 document.getElementById('apply').onclick=async()=>{const values=[0,1,2,3].map(i=>Math.max(0,Number(document.getElementById('v'+i).value)||0));const ms=((values[0]*86400+values[1]*3600+values[2]*60+values[3])*1000);await save({title:document.getElementById('title').value.trim()||DEFAULT.title,remainingMs:ms,endAt:state.running?Date.now()+ms:null});editing=false;};
 document.getElementById('toggle').onclick=async()=>{const ms=remaining();await save({running:!state.running,remainingMs:ms,endAt:state.running?null:Date.now()+ms});};
 document.getElementById('reset').onclick=async()=>{await save({remainingMs:3600000,running:false,endAt:null});};
 }}
function updateClock(){parts(remaining()).forEach((n,i)=>{const el=document.getElementById('n'+i);if(el)el.textContent=String(n).padStart(2,'0')});const status=document.getElementById('status');if(status)status.textContent=remaining()===0?'TIME EXPIRED':state.running?'COUNTDOWN ACTIVE':'COUNTDOWN PAUSED';}
async function save(patch){if(!connected||!isGM)return;const current=(await OBR.room.getMetadata())[KEY]||DEFAULT;const next={...DEFAULT,...current,...patch,revision:Date.now()};await OBR.room.setMetadata({[KEY]:next});state=next;render();}
render();setInterval(updateClock,200);
OBR.onReady(async()=>{connected=true;const role=await OBR.player.getRole();isGM=role==='GM';const metadata=await OBR.room.getMetadata();state={...DEFAULT,...(metadata[KEY]||{})};render();OBR.room.onMetadataChange(metadata=>{const incoming=metadata[KEY];if(!incoming)return;state={...DEFAULT,...incoming};if(!editing||!isGM)render();else updateClock();});OBR.player.onChange(player=>{const newGM=player.role==='GM';if(isGM!==newGM){isGM=newGM;editing=false;render();}});});
