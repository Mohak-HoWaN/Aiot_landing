// Landing-only browser checks. Does not start the product app or access its database.
// All non-local requests are intercepted; form responses are synthetic.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { translations } from './copy.js';
const root=fileURLToPath(new URL('.',import.meta.url));
const imagesOnly=process.argv.includes('--images-only');
const previewBase=process.env.PREVIEW_URL || process.argv.find(arg=>arg.startsWith('--url='))?.slice(6) || 'http://127.0.0.1:4173';
const out=resolve(root,'.qa'); await mkdir(out,{recursive:true});
const browserPath=process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser=spawn(browserPath,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-extensions','--disable-sync','--remote-debugging-port=9437',`--user-data-dir=${resolve(out,'chrome-profile')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let socket,sequence=0;const pending=new Map();
const results={date:new Date().toISOString(),scope:'landing only; mocked form responses; no product app or database',layouts:[],checks:[],consoleErrors:[],blockedExternal:[],assetFailures:[]};
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const check=(name,condition)=>{assert.ok(condition,name);results.checks.push(name);};
let mode='success',nativeSubmission=null;
try{
  let targets;
  for(let i=0;i<80;i++){try{targets=await(await fetch('http://127.0.0.1:9437/json/list')).json();break;}catch{await delay(100);}}
  if(!targets)throw Error('Headless Chrome did not start');
  socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{socket.addEventListener('open',r,{once:true});socket.addEventListener('error',j,{once:true});});
  socket.addEventListener('message',async event=>{
    const message=JSON.parse(event.data);
    if(message.id){const p=pending.get(message.id);pending.delete(message.id);message.error?p?.reject(Error(JSON.stringify(message.error))):p?.resolve(message.result);return;}
    if(message.method==='Runtime.exceptionThrown')results.consoleErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if(message.method==='Network.responseReceived' && message.params.response.url.startsWith(previewBase+'/') && message.params.response.status>=400)results.assetFailures.push(message.params.response.url);
    if(message.method==='Fetch.requestPaused'){
      const {requestId,request,resourceType}=message.params;
      if(request.url.startsWith(previewBase+'/')||request.url.startsWith('data:')){await send('Fetch.continueRequest',{requestId});return;}
      if(request.url.startsWith('https://formsubmit.co/')){
        if(mode==='timeout')return; // Let the app's AbortController expire; never send to the service.
        if(resourceType==='Document')nativeSubmission={method:request.method,body:request.postData};
        if(mode==='network'){await send('Fetch.failRequest',{requestId,errorReason:'Failed'});return;}
        const body=resourceType==='Document'?'<html><body>Intercepted native POST. Nothing sent.</body></html>':JSON.stringify(mode==='success'?{success:'true',message:'The form was submitted successfully.'}:mode==='pending'?{success:'true',message:'Please activate your form through the confirmation email.'}:{success:false,message:'Unavailable'});
        await send('Fetch.fulfillRequest',{requestId,responseCode:mode==='error'?503:200,responseHeaders:[{name:'Content-Type',value:resourceType==='Document'?'text/html':'application/json'},{name:'Access-Control-Allow-Origin',value:'*'},{name:'Access-Control-Allow-Headers',value:'content-type,accept'},{name:'Access-Control-Allow-Methods',value:'POST,OPTIONS'}],body:Buffer.from(body).toString('base64')});return;
      }
      results.blockedExternal.push(request.url);await send('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'});
    }
  });
  await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*'}]});
  const viewport=async(width,height=844)=>send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  async function ready(){for(let i=0;i<60;i++){if(await evaluate('document.readyState === "complete" && document.querySelector("#language")?.disabled === false'))return;await delay(50);}throw Error('Page did not initialise');}
  const navigate=async()=>{await send('Page.navigate',{url:previewBase+'/'});await ready();};
  const snap=async(name)=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(resolve(out,name+'.png'),Buffer.from(r.data,'base64'));};
  await viewport(1366,768);
  // Social card uses the labelled enhanced receipt, retaining the original sample values.
  const frame=await send('Page.getFrameTree');
  await send('Page.setDocumentContent',{frameId:frame.frameTree.frame.id,html:`<!doctype html><html><head><link rel="stylesheet" href="${previewBase}/styles.css"><style>body{width:1200px;height:630px;background:#edf2ff;display:grid;grid-template-columns:1.2fr 1fr;align-items:center;padding:60px;gap:70px}h1{font-size:58px}p{font-size:23px;margin-top:24px}.receipt-detail{width:350px}.eyebrow{font-size:16px;margin-bottom:20px;text-transform:none}.caption{font-size:16px}</style></head><body><div><p class="eyebrow">JonaRu Model-1 · Pilot preparation</p><h1>Your counter,<br>stock and udhaar.<br>Together.</h1><p>A working prototype for small shops.<br>Request a Pilot Demo.</p></div><div><p class="eyebrow">Real app receipt · Demo data</p><div class="receipt-detail"><img src="${previewBase}/assets/receipt.png"></div><p class="caption">Original app capture. Sample data.</p></div></body></html>`});
  await viewport(1200,630);await evaluate('Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))');await delay(100);
  const social=await send('Page.captureScreenshot',{format:'png'});await writeFile(resolve(root,'assets/social-preview.png'),Buffer.from(social.data,'base64'));
  await viewport(1366,768);await navigate();await delay(1800);await snap('desktop-hero');
  if(imagesOnly){
    for(const width of [1366,390]){
      await viewport(width,844);await evaluate("window.scrollTo({top:0,behavior:'instant'})");
      await delay(100);await snap(`images-${width}-hero`);
      await evaluate("document.querySelectorAll('.feature-band')[1].scrollIntoView({behavior:'instant',block:'start'})");
      await evaluate('Promise.all([...document.querySelectorAll(".capture-1 img,.receipt-detail img")].map(i=>i.decode()))');
      await delay(100);await snap(`images-${width}-stock`);
      const result=await evaluate(`(()=>{const i=document.querySelector('.capture-1 img'),r=document.querySelector('.receipt-detail img');return {overflow:document.documentElement.scrollWidth>innerWidth,invoice:i.naturalWidth,receipt:r.naturalWidth,invoiceVisible:i.getBoundingClientRect().bottom>=i.parentElement.getBoundingClientRect().bottom && i.getBoundingClientRect().top<=i.parentElement.getBoundingClientRect().top}})()`);
      assert.ok(!result.overflow && result.invoice===1262 && result.receipt===1262 && result.invoiceVisible,JSON.stringify(result));
      results.layouts.push({width,...result});
    }
    await writeFile(resolve(out,'image-results.json'),JSON.stringify(results,null,2));
    console.log('Image preview checks passed at 1366 and 390 px; social preview refreshed.');
  } else {
  for(const width of [1366,768,390,320]){
    await viewport(width,width===1366?768:844);
    for(const lang of ['en','gu','hi','mr']){
      await evaluate(`document.querySelector('#language').value='${lang}';document.querySelector('#language').dispatchEvent(new Event('change'));window.scrollTo({top:0,behavior:'instant'});`);
      await delay(80);
      const metrics=await evaluate(`(()=>{
        const visible=el=>el.getClientRects().length && getComputedStyle(el).visibility!=='hidden' && !el.closest('[hidden]');
        const tiny=[...document.querySelectorAll('body *')].filter(el=>visible(el)&&[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(el).fontSize)<12).map(el=>el.tagName+':'+el.textContent.slice(0,40));
        const overflow=[...document.querySelectorAll('body *')].filter(el=>visible(el)&&!el.closest('.capture-viewport,.receipt-detail,.counter-scene')&&!el.classList.contains('honeypot')&&!el.classList.contains('sr-only')&&el.getBoundingClientRect().right>innerWidth+1).map(el=>el.className||el.tagName);
        const cta=document.querySelector('.hero-buttons .button').getBoundingClientRect();
        return {scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,tiny,overflow,ctaBottom:cta.bottom,ctaVisible:cta.top>=0&&cta.bottom<=innerHeight,lang:document.documentElement.lang};
      })()`);
      results.layouts.push({width,lang,...metrics});
    }
  }
  await viewport(390);await evaluate("document.querySelector('#language').value='en';document.querySelector('#language').dispatchEvent(new Event('change'));window.scrollTo({top:0,behavior:'instant'});");await snap('mobile-hero');
  check('Required information architecture order',await evaluate("[...document.querySelectorAll('main>section')].map(s=>s.id||s.getAttribute('aria-labelledby')).join('|')==='hero|demo-title|features|how-it-works|shop-owners|data-handling|faq|book-pilot'"));
  check('Four contact fields before optional details',await evaluate("[...document.querySelectorAll('#pilot-form input:not([type=hidden]):not([type=checkbox]):not(.honeypot)')].filter(n=>n.getClientRects().length && !n.closest('details:not([open])')).length===4 && !document.querySelector('.optional-fields').open"));
  check('Canonical and social URLs use supplied host',await evaluate("document.querySelector('link[rel=canonical]').href==='https://aiot.shahonthefloor.workers.dev/' && document.querySelector('meta[property=\"og:image\"]').content.startsWith('https://aiot.shahonthefloor.workers.dev/')"));
  await send('Accessibility.enable');
  const ax=await send('Accessibility.getFullAXTree');
  check('Exposed controls have accessible names',ax.nodes.filter(n=>!n.ignored && ['button','textbox','combobox','checkbox'].includes(n.role?.value)).every(n=>n.name?.value?.trim()));
  check('Visible heading hierarchy has no skipped levels',await evaluate("(()=>{let level=0;return [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(n=>!n.closest('[hidden],details:not([open])')).every(n=>{const next=Number(n.tagName[1]),ok=next<=level+1;level=next;return ok})})()"));
  check('English CTA above fold on 1366x768 and 390x844',results.layouts.filter(r=>r.lang==='en'&&[1366,390].includes(r.width)).every(r=>r.ctaVisible));
  // Form values and contact language survive all website language choices.
  await evaluate(`(()=>{const f=document.querySelector('#pilot-form');f.elements['Owner name'].value='Demo Owner';f.elements['Shop name'].value='Demo Shop';f.elements.Phone.value='9876543210';f.elements.City.value='Ahmedabad';f.elements['Preferred language'].value='Gujarati';f.elements['Contact consent'].checked=true;})()`);
  for(const lang of ['hi','gu','mr','en']){
    await evaluate(`document.querySelector('#language').value='${lang}';document.querySelector('#language').dispatchEvent(new Event('change'));`);
    const messages=await evaluate(`(()=>{const f=document.querySelector('#pilot-form'),owner=f.elements['Owner name'],phone=f.elements.Phone,email=f.elements.email;owner.value='';owner.reportValidity();const required=owner.validationMessage;owner.value='Demo Owner';owner.dispatchEvent(new Event('input',{bubbles:true}));phone.value='12';phone.reportValidity();const phoneMessage=phone.validationMessage;phone.value='9876543210';phone.dispatchEvent(new Event('input',{bubbles:true}));email.value='invalid';email.reportValidity();const emailMessage=email.validationMessage;email.value='';email.dispatchEvent(new Event('input',{bubbles:true}));return {required,phoneMessage,emailMessage};})()`);
    check(`${lang}: localised required, phone and email validation`,messages.required===translations[lang].required && messages.phoneMessage===translations[lang].phoneInvalid && messages.emailMessage===translations[lang].emailInvalid);
    await evaluate("document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'})");await delay(600);if(lang!=='en')await snap(`mobile-${lang}`);
  }
  check('Form entries and independent contact language preserved',await evaluate("document.querySelector('#pilot-form').elements['Owner name'].value==='Demo Owner' && document.querySelector('#pilot-form').elements['Preferred language'].value==='Gujarati'"));
  // Native keyboard menu and FAQ behaviour.
  await evaluate("document.querySelector('.menu-toggle').focus()");
  const key=async(key,code=key)=>{const keyCode=({Enter:13,Escape:27,ArrowLeft:37,ArrowRight:39,Tab:9})[key]||32;await send('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:keyCode,nativeVirtualKeyCode:keyCode,text:key==='Enter'?'\r':undefined});await send('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:keyCode});await delay(70);};
  await key('Enter');check('Keyboard opens mobile menu',await evaluate("!document.querySelector('#mobile-nav').hidden"));
  await key('Escape');check('Escape closes menu and returns focus',await evaluate("document.querySelector('#mobile-nav').hidden && document.activeElement===document.querySelector('.menu-toggle')"));
  await evaluate("document.querySelector('.faq-list summary').focus()");await key('Enter');check('FAQ expands by keyboard',await evaluate("document.querySelector('.faq-list details').open"));await key('Enter');
  await evaluate("document.querySelector('#checkout-demo').scrollIntoView({behavior:'instant',block:'center'})");await delay(1800);
  await evaluate("document.querySelector('#demo-back').click();document.querySelector('#demo-add').click()");check('Demo crossing adds item',await evaluate("document.querySelector('#demo-total').textContent==='₹10'"));
  await evaluate("document.querySelector('[data-remove]').click()");check('Cashier correction removes item',await evaluate("document.querySelector('#demo-total').textContent==='₹0'"));
  for(let id=0;id<6;id++){
    await evaluate(`document.querySelector('#demo-select').value='${id}';document.querySelector('#demo-select').dispatchEvent(new Event('change'));document.querySelector('#demo-add').click();`);
    check(`Product ${id+1}: button adds`,await evaluate("document.querySelector('#demo-total').textContent==='₹10'"));
    check(`Product ${id+1}: matching loaded photo`,await evaluate(`document.querySelector('#pack-image').decode().then(()=>document.querySelector('#pack-image').alt===document.querySelector('#demo-select').selectedOptions[0].textContent)`));
    await evaluate("document.querySelector('#demo-back').click()");
    check(`Product ${id+1}: crossing back removes`,await evaluate("document.querySelector('#demo-total').textContent==='₹0'"));
  }
  await evaluate("document.querySelector('#demo-add').click();document.querySelector('#demo-select').value='0';document.querySelector('#demo-select').dispatchEvent(new Event('change'));document.querySelector('#demo-select').value='5';document.querySelector('#demo-select').dispatchEvent(new Event('change'));");
  check('Changing selection preserves tracked crossing without duplicate',await evaluate("document.querySelector('#demo-add').disabled && document.querySelector('#demo-total').textContent==='₹10'"));
  await evaluate("document.querySelector('#demo-back').click()");
  await evaluate("document.querySelector('#counter-scene').scrollIntoView({behavior:'instant',block:'center'});document.querySelector('#demo-pack').focus({preventScroll:true})");
  await key('ArrowLeft');check('Keyboard left adds product',await evaluate("document.querySelector('#demo-total').textContent==='₹10'"));
  await key('ArrowRight');check('Keyboard right removes product',await evaluate("document.querySelector('#demo-total').textContent==='₹0'"));await delay(700);
  async function dragProduct(fraction){
    const point=await evaluate(`(()=>{const p=document.querySelector('#demo-pack').getBoundingClientRect(),s=document.querySelector('#counter-scene').getBoundingClientRect();return {x:p.x+p.width/2,y:p.y+p.height/2,end:s.x+s.width*${fraction}}})()`);
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
    for(let step=1;step<=8;step++)await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+(point.end-point.x)*step/8,y:point.y,buttons:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.end,y:point.y,button:'left',clickCount:1});await delay(700);
  }
  await dragProduct(.18);check('Pointer drag across line adds product',await evaluate("document.querySelector('#demo-total').textContent==='₹10'"));
  await dragProduct(.72);check('Pointer drag back removes product',await evaluate("document.querySelector('#demo-total').textContent==='₹0'"));
  await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  async function touchDrag(fraction){
    const p=await evaluate(`(()=>{const p=document.querySelector('#demo-pack').getBoundingClientRect(),s=document.querySelector('#counter-scene').getBoundingClientRect();return {x:p.x+p.width/2,y:p.y+p.height/2,end:s.x+s.width*${fraction}}})()`);
    await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:p.x,y:p.y,id:1}]});
    for(let i=1;i<=8;i++)await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x+(p.end-p.x)*i/8,y:p.y,id:1}]});
    await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await delay(700);
  }
  await touchDrag(.18);check('Touch drag adds exactly one item',await evaluate("document.querySelector('#demo-total').textContent==='₹10'"));
  await touchDrag(.72);check('Touch drag back removes item',await evaluate("document.querySelector('#demo-total').textContent==='₹0'"));
  await send('Emulation.setTouchEmulationEnabled',{enabled:false});
  await evaluate("document.querySelector('#demo-manual').click();document.querySelector('#manual-add').click();document.querySelector('#demo-make-bill').click();document.querySelector('#pay-cash').click()");
  check('Manual add and cash payment simulation work',await evaluate("document.querySelector('#demo-total').textContent==='₹10' && !document.querySelector('#payment-success').hidden"));
  await delay(2350);check('Payment confirmation automatically dismisses',await evaluate("document.querySelector('#demo-payment').hidden && !document.querySelector('#demo-make-bill').disabled"));
  await snap('mobile-demo');
  const billHeight=await evaluate("document.querySelector('.demo-bill').getBoundingClientRect().height");
  await evaluate("document.querySelector('#demo-make-bill').click()");
  await key('Escape');check('Escape dismisses payment and restores focus',await evaluate("document.querySelector('#demo-payment').hidden && document.activeElement.id==='demo-make-bill'"));
  await evaluate("document.querySelector('#demo-make-bill').click();document.querySelector('#pay-upi').click()");
  check('UPI opens a distinct demo QR',await evaluate("!document.querySelector('#payment-qr').hidden && document.querySelector('#payment-qr img').alt.includes('Not a payment code')"));
  check('Payment overlay preserves bill height',Math.abs(await evaluate("document.querySelector('.demo-bill').getBoundingClientRect().height")-billHeight)<1);
  await evaluate("document.querySelector('.demo-bill').scrollIntoView({behavior:'instant',block:'center'})");await snap('mobile-upi');
  await delay(1800);check('UPI does not confirm early',await evaluate("!document.querySelector('#payment-qr').hidden && document.querySelector('#payment-success').hidden"));
  await delay(1300);check('UPI confirms after three seconds',await evaluate("document.querySelector('#payment-qr').hidden && !document.querySelector('#payment-success').hidden"));
  await snap('mobile-payment');await delay(2350);
  check('UPI confirmation dismisses without growing section',await evaluate("document.querySelector('#demo-payment').hidden") && Math.abs(await evaluate("document.querySelector('.demo-bill').getBoundingClientRect().height")-billHeight)<1);
  await evaluate("document.querySelector('#demo-make-bill').click();document.querySelector('#pay-upi').click()");
  // The bill is inert during payment, so use the external product control to edit instead.
  await evaluate("document.querySelector('#demo-add').click()");await delay(3100);
  check('Editing cancels pending payment completion',await evaluate("document.querySelector('#demo-payment').hidden"));
  for(const lang of ['en','gu','hi','mr']){
    await evaluate(`document.querySelector('#language').value='${lang}';document.querySelector('#language').dispatchEvent(new Event('change'));document.querySelector('#demo-make-bill').click();document.querySelector('#pay-upi').click()`);
    check(`${lang}: payment controls are localised`,await evaluate(`document.querySelector('#pay-cash').textContent===${JSON.stringify(translations[lang].payCash)} && document.querySelector('.payment-disclaimer').textContent===${JSON.stringify(translations[lang].paymentDisclaimer)}`));
    await key('Escape');
  }
  await evaluate("document.querySelector('#language').value='en';document.querySelector('#language').dispatchEvent(new Event('change'))");
  await evaluate("document.querySelector('#features').scrollIntoView({behavior:'instant'})");await delay(80);check('Mobile bar appears after hero',await evaluate("!document.querySelector('#mobile-booking').hidden"));
  await evaluate("document.querySelector('#book-pilot').scrollIntoView({behavior:'instant'})");await delay(80);check('Mobile bar hides at form',await evaluate("document.querySelector('#mobile-booking').hidden"));
  for(const responseMode of ['error','network','pending','timeout','success']){
    mode=responseMode;await evaluate("document.querySelector('.form-submit').click()");
    for(let i=0;i<450;i++){if(await evaluate("!document.querySelector('.form-submit').disabled && !document.querySelector('#form-status').hidden"))break;await delay(50);}
    const state=await evaluate("({success:document.querySelector('#form-status').classList.contains('form-success'),text:document.querySelector('#form-status').textContent,fallback:!document.querySelector('#form-fallback').hidden})");
    check(`Mock form ${responseMode}`,responseMode==='success'?state.success&&!state.fallback:!state.success&&state.fallback);
  }
  check('Closed optional fields open on validation failure',await evaluate("(()=>{const f=document.querySelector('#pilot-form');document.querySelector('.optional-fields').open=false;f.elements.email.value='invalid';f.elements.email.reportValidity();const opened=document.querySelector('.optional-fields').open;f.elements.email.value='';f.elements.email.dispatchEvent(new Event('input',{bubbles:true}));return opened;})()"));
  check('No uncaught browser exceptions',results.consoleErrors.length===0);
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await navigate();
  check('Fresh load resets to English',await evaluate("document.documentElement.lang==='en'"));
  check('Reduced motion shows static final demo',await evaluate("document.querySelector('#demo-total').textContent==='₹10' && document.getAnimations().filter(a=>a.playState==='running').length===0"));
  await evaluate("document.querySelector('#demo-make-bill').click();document.querySelector('#pay-cash').click()");
  check('Reduced motion payment is static',await evaluate("!document.querySelector('#payment-success').hidden && document.getAnimations().filter(a=>a.playState==='running').length===0"));
  // No JavaScript: English content and the native POST remain usable.
  await send('Emulation.setScriptExecutionDisabled',{value:true});await send('Page.navigate',{url:previewBase+'/'});await delay(200);
  check('No-JS English camera steps, privacy, workflows and FAQ present',await evaluate("document.querySelectorAll('.steps article').length===4 && document.querySelectorAll('.privacy-grid>div').length===4 && document.querySelectorAll('.feature-band').length===3 && document.querySelectorAll('.faq-list details').length===11"));
  mode='success';await evaluate(`(()=>{const f=document.querySelector('#pilot-form');f.elements['Owner name'].value='Demo';f.elements['Shop name'].value='Demo Shop';f.elements.Phone.value='9876543210';f.elements.City.value='Ahmedabad';f.elements['Contact consent'].checked=true;f.querySelector('[type=submit]').click();})()`);await delay(250);
  check('No-JS form performs native POST (intercepted, not sent)',nativeSubmission?.method==='POST');
  await send('Emulation.setScriptExecutionDisabled',{value:false});await viewport(1366,768);await navigate();
  await evaluate("document.querySelector('#features').scrollIntoView({behavior:'instant'})");await snap('desktop-features');
  await evaluate("document.querySelector('#status-title').scrollIntoView({behavior:'instant'})");await snap('desktop-status');
  const loaded=await evaluate("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().then(()=>true,()=>false)}))");
  check('All page images load',loaded.every(Boolean));check('No broken local asset requests',results.assetFailures.length===0);
  await writeFile(resolve(out,'results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({checks:results.checks.length,layoutCount:results.layouts.length,overflow:results.layouts.filter(x=>x.scrollWidth>x.width||x.overflow.length),tiny:results.layouts.filter(x=>x.tiny.length),consoleErrors:results.consoleErrors,output:out},null,2));
  assert.ok(results.layouts.every(r=>r.scrollWidth<=r.width && r.tiny.length===0),'Layout overflow or tiny text');
  }
}catch(error){await writeFile(resolve(out,'results.json'),JSON.stringify(results,null,2));console.error(error);process.exitCode=1;}
finally{try{await send('Browser.close');}catch{}socket?.close();browser.kill();}
