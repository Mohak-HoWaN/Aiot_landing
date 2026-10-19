// Read-only page captures. No form submission or product app/database access.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const base = process.env.CAPTURE_URL || 'http://127.0.0.1:4175';
const label = process.env.CAPTURE_LABEL || 'after';
const out = resolve('.qa', 'audit-' + label);
await mkdir(out, { recursive: true });
const browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--remote-debugging-port=9438', '--user-data-dir='+resolve('.qa/capture-profile'), 'about:blank'], { windowsHide:true, stdio:'ignore' });
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let socket, id=0; const pending=new Map(); const errors=[]; const metrics=[];
function send(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}));});}
async function run(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;}
async function snap(name){const r=await send('Page.captureScreenshot',{format:'png'});await writeFile(resolve(out,name+'.png'),Buffer.from(r.data,'base64'));}
try {
  let targets;
  for(let n=0;n<60;n++){try{targets=await(await fetch('http://127.0.0.1:9438/json/list')).json();break;}catch{await delay(100);}}
  if(!targets)throw Error('Chrome did not start');
  socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{socket.addEventListener('open',r,{once:true});socket.addEventListener('error',j,{once:true});});
  socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(Error(m.error.message)):p?.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);});
  await send('Page.enable');await send('Runtime.enable');
  await send('Page.navigate',{url:base+'/'});
  for(let n=0;n<100;n++){if(await run('document.readyState==="complete" && !!document.querySelector("#hero")'))break;await delay(100);}
  if(!await run('!!document.querySelector("#hero")'))throw Error('Landing page did not load');
  for(const width of [1366,768,390,320]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:false});
    await run("window.scrollTo({top:0,behavior:'instant'})");await delay(120);await snap(width+'-hero');
    await run("document.querySelector('#checkout-demo').scrollIntoView({block:'start',behavior:'instant'})");await delay(1800);await snap(width+'-demo');
    metrics.push(await run(`({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,inputs:document.querySelectorAll('#pilot-form input:not([type=hidden]):not(.honeypot),#pilot-form select,#pilot-form textarea').length,demoTop:document.querySelector('#checkout-demo').getBoundingClientRect().top+scrollY})`));
    if(label==='after' && [390,1366].includes(width)){
      for(const [name,selector] of [['stock','.capture-1'],['privacy','#data-handling'],['form','#pilot-form']]){
        await run(`document.querySelector('${selector}').scrollIntoView({block:'start',behavior:'instant'})`);await delay(150);await snap(width+'-'+name);
      }
    }
  }
  await writeFile(resolve(out,'metrics.json'),JSON.stringify({base,date:new Date().toISOString(),metrics,errors},null,2));
  console.log(JSON.stringify({out,metrics,errors}));
} finally {try{await send('Browser.close');}catch{}socket?.close();browser.kill();}
