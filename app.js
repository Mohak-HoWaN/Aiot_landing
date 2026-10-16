import { translations, products, validateCopy } from './copy.js';
import { sections, escape } from './render.js';
validateCopy();
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let language = 'en';
const t = key => translations[language][key];
let formState = '', sending = false;
let selected = 5, crossed = false, credit = false, demoMessage = 'ready';
const quantities = new Map();
let played = false, playing = false, timers = [];

function languageChange(code) {
  language = Object.hasOwn(translations, code) ? code : 'en';
  document.documentElement.lang = language;
  $('#language').value = language;
  const openFaqs = new Set($$('[data-faq][open]').map(el=>el.dataset.faq));
  $$('[data-i18n]').forEach(node=>{ node.textContent = t(node.dataset.i18n); });
  for (const [attribute, key] of [['aria-label','i18nAria'],['alt','i18nAlt']]) {
    $$(`[data-${key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}]`).forEach(node=>node.setAttribute(attribute,t(node.dataset[key])));
  }
  const rendered = sections(translations[language]);
  $$('[data-section]').forEach(node=>{ node.innerHTML = rendered[node.dataset.section]; });
  $$('[data-faq]').forEach(node=>{ node.open = openFaqs.has(node.dataset.faq); });
  // Never rebuild the form: values and the independently chosen contact language survive.
  $$('#pilot-form input, #pilot-form select, #pilot-form textarea').forEach(field=>field.setCustomValidity(''));
  updateDemo(); updateFormStatus(); observeReveals();
}

function cancelSequence() {
  timers.forEach(clearTimeout); timers = []; playing = false;
  $('#counter-scene').classList.remove('is-scanning');
}
function updateDemo() {
  $('#demo-select').value = String(selected);
  $('#pack-name').textContent = products[selected];
  $('#demo-pack').classList.toggle('is-crossed', crossed);
  $('#demo-pack').setAttribute('aria-pressed', String(crossed));
  $('#demo-add').disabled = crossed;
  $('#demo-back').disabled = !crossed;
  const rows = [...quantities].filter(([,qty])=>qty>0);
  $('#bill-rows').innerHTML = rows.length ? rows.map(([id,qty]) => `<div class="bill-row"><span>${escape(id===6?t('manualItem'):products[id])}<small>× ${qty}</small></span><strong>₹${qty*10}</strong><button type="button" data-remove="${id}" aria-label="${escape(t('remove'))}: ${escape(id===6?t('manualItem'):products[id])}">−</button></div>`).join('') : `<p class="empty-bill">${escape(t('empty'))}</p>`;
  $('#demo-total').textContent = `₹${rows.reduce((sum,[,qty])=>sum+qty*10,0)}`;
  $('#demo-credit').disabled = !rows.length || credit;
  $('#credit-note').hidden = !credit;
  $('#demo-message').textContent = t(demoMessage);
}
function move(toBill, automatic = false) {
  if (!automatic) { cancelSequence(); played = true; }
  if (toBill !== crossed) {
    quantities.set(selected, Math.max(0,(quantities.get(selected)||0)+(toBill?1:-1)));
    crossed = toBill; credit = false; demoMessage = toBill?'added':'removed';
  }
  $('#demo-pack').classList.toggle('is-recognised', toBill);
  updateDemo();
}
function finalFrame() {
  cancelSequence(); quantities.clear(); selected = 5; crossed = false; credit = false;
  move(true,true); played = true;
}
function replay() {
  cancelSequence(); played = true; selected = 5; crossed = false; credit = false; quantities.clear();
  $('#manual-panel').hidden = true; $('#demo-pack').classList.remove('is-recognised');
  demoMessage = 'ready'; updateDemo();
  if (reduced.matches || document.hidden) { finalFrame(); return; }
  playing = true;
  timers.push(setTimeout(()=>{ $('#demo-pack').classList.add('is-recognised'); $('#counter-scene').classList.add('is-scanning'); },220));
  timers.push(setTimeout(()=>move(true,true),850));
  timers.push(setTimeout(cancelSequence,1550));
}
$('#demo-add').addEventListener('click',()=>move(true));
$('#demo-back').addEventListener('click',()=>move(false));
$('#replay').addEventListener('click',replay);
$('#demo-select').addEventListener('change',event=>{
  cancelSequence(); played = true; selected = Number(event.target.value); crossed = false;
  $('#demo-pack').classList.remove('is-recognised'); demoMessage = 'ready'; updateDemo();
});
$('#bill-rows').addEventListener('click',event=>{
  const button = event.target.closest('[data-remove]'); if (!button) return;
  cancelSequence(); played = true;
  const id = Number(button.dataset.remove); quantities.set(id,Math.max(0,(quantities.get(id)||0)-1));
  if(id===selected) {crossed=false; $('#demo-pack').classList.remove('is-recognised');}
  credit=false; demoMessage='corrected'; updateDemo();
  // Preserve a useful focus location when the last row disappears.
  ($(`[data-remove="${id}"]`) || $('#demo-add')).focus({preventScroll:true});
});
$('#demo-manual').addEventListener('click',()=>{cancelSequence(); played=true; $('#manual-panel').hidden=false; $('#manual-add').focus({preventScroll:true});});
$('#manual-add').addEventListener('click',()=>{quantities.set(6,(quantities.get(6)||0)+1); credit=false; demoMessage='manualAdded';updateDemo();});
$('#demo-credit').addEventListener('click',()=>{cancelSequence();played=true;credit=true;demoMessage='creditDone';updateDemo();});

let drag = null, suppressClick = false;
const pack = $('#demo-pack'), scene = $('#counter-scene');
pack.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  cancelSequence(); played=true; const box=scene.getBoundingClientRect();
  drag={id:event.pointerId,startX:event.clientX,box,last:event.clientX,moved:false};
  pack.setPointerCapture(event.pointerId); pack.classList.add('is-dragging');
});
pack.addEventListener('pointermove',event=>{
  if(!drag || event.pointerId!==drag.id)return;
  drag.last=event.clientX; drag.moved ||= Math.abs(event.clientX-drag.startX)>5;
  if(drag.moved){const x=Math.max(pack.offsetWidth/2+3,Math.min(drag.box.width-pack.offsetWidth/2-3,event.clientX-drag.box.left));pack.style.transform=`translate(calc(-50% + ${x-drag.box.width*.72}px),-50%)`;}
});
pack.addEventListener('pointerup',event=>{
  if(!drag || event.pointerId!==drag.id)return;
  const wasDragged=drag.moved, toBill=(drag.last-drag.box.left)/drag.box.width<.30;
  drag=null; pack.classList.remove('is-dragging'); pack.style.transform='';
  if(wasDragged){suppressClick=true;move(toBill);setTimeout(()=>suppressClick=false,0);}
});
pack.addEventListener('pointercancel',()=>{drag=null;pack.classList.remove('is-dragging');pack.style.transform='';});
pack.addEventListener('click',()=>{if(!suppressClick)move(!crossed);});
pack.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft');}});

if('IntersectionObserver' in window){
  const demoObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting && !played) replay();
    else if(!entry.isIntersecting && playing) finalFrame();
  }),{threshold:.2});
  demoObserver.observe($('#checkout-demo'));
}
document.addEventListener('visibilitychange',()=>{if(document.hidden && playing)finalFrame();});
reduced.addEventListener('change',()=>{if(reduced.matches && (!played || playing))finalFrame();});

const menuToggle=$('.menu-toggle'), mobileNav=$('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';mobileNav.hidden=open;menuToggle.setAttribute('aria-expanded',String(!open));});
mobileNav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && !mobileNav.hidden){closeMenu();menuToggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
window.addEventListener('resize',()=>{if(getComputedStyle(menuToggle).display==='none')closeMenu();},{passive:true});
let scrollQueued=false;
function updateScroll(){
  pack.style.setProperty('--travel',`${scene.clientWidth*.54}px`);
  const max=document.documentElement.scrollHeight-innerHeight;
  $('.scroll-progress').style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;
  const hero=$('#hero').getBoundingClientRect(), form=$('#book-pilot').getBoundingClientRect();
  const editing=$('#pilot-form').contains(document.activeElement);
  const keyboard=window.visualViewport && visualViewport.height < innerHeight*.75;
  $('#mobile-booking').hidden=hero.bottom>84 || (form.bottom>0 && form.top<innerHeight) || editing || keyboard || innerWidth>700;
  scrollQueued=false;
}
function queueScroll(){if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',queueScroll,{passive:true});window.addEventListener('resize',queueScroll,{passive:true});
document.addEventListener('focusin',queueScroll);document.addEventListener('focusout',queueScroll);window.visualViewport?.addEventListener('resize',queueScroll);
let revealObserver;
function observeReveals(){
  if(reduced.matches || !('IntersectionObserver' in window))return;
  revealObserver?.disconnect();
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');revealObserver.unobserve(entry.target);}}),{threshold:.08});
  $$('.section-heading, .problem-grid article, .status-card').forEach(el=>revealObserver.observe(el));
}

const form=$('#pilot-form'), status=$('#form-status'), submitButton=$('.form-submit');
function updateFormStatus(){
  status.hidden=!formState;status.textContent=formState?t(formState):'';
  status.classList.toggle('form-success',formState==='formSuccess');
  submitButton.disabled=sending;
  submitButton.querySelector('[data-i18n]').textContent=t(sending?'submitting':'request');
}
function clearValidity(event){event.target.setCustomValidity?.('');}
form.addEventListener('input',()=>{if(formState==='formSuccess'){formState='';updateFormStatus();}});
form.addEventListener('input',clearValidity);form.addEventListener('change',clearValidity);
form.addEventListener('invalid',event=>{
  const field=event.target;field.setCustomValidity('');
  if(field.validity.valueMissing)field.setCustomValidity(t(field.type==='checkbox'?'consentRequired':'required'));
  else if(field.validity.typeMismatch)field.setCustomValidity(t('emailInvalid'));
  else if(field.validity.patternMismatch)field.setCustomValidity(t('phoneInvalid'));
},true);
form.addEventListener('submit',async event=>{
  if(sending){event.preventDefault();return;}
  for(const field of form.querySelectorAll('input[required]:not([type=checkbox])')){
    if(!field.value.trim()){event.preventDefault();field.setCustomValidity(t('required'));field.reportValidity();return;}
  }
  const phone=form.elements.namedItem('Phone'); const digits=phone.value.replace(/\D/g,'');
  if(digits.length<7||digits.length>15){event.preventDefault();phone.setCustomValidity(t('phoneInvalid'));phone.reportValidity();return;}
  if(event.submitter?.value==='native' || !window.fetch)return; // Native POST remains a no-JS/verification fallback.
  event.preventDefault();
  if(form.elements.namedItem('_honey').value){formState='formError';updateFormStatus();return;}
  sending=true;formState='';$('#form-fallback').hidden=true;updateFormStatus();
  const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),20000);
  try{
    const body=Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,String(value).trim()]));
    const action=new URL(form.action);
    const response=await fetch(`${action.origin}/ajax${action.pathname}`,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(body),signal:controller.signal});
    const data=await response.json();
    const needsVerification=/activat|verif|captcha|confirm.*email/i.test(String(data.message||''));
    if(needsVerification){formState='formPending';}
    else if(response.ok && (data.success===true||data.success==='true')){formState='formSuccess';}
    else{formState='formError';}
  }catch{formState='formError';}
  finally{clearTimeout(timeout);sending=false;$('#form-fallback').hidden=formState==='formSuccess';updateFormStatus();status.focus({preventScroll:true});}
});
window.addEventListener('pageshow',()=>{sending=false;updateFormStatus();});

// Every new load starts in English. No localStorage, browser-language detection or contact-language inference.
$('#language').disabled=false;menuToggle.hidden=false;
$('#language').addEventListener('change',event=>{languageChange(event.target.value);queueScroll();});
$$('#checkout-demo button, #demo-select').forEach(node=>node.disabled=false);
languageChange('en');
if(reduced.matches)finalFrame();
updateScroll();

// A separate, explicitly labelled motif; the real-app screenshot is never animated.
const signature=$('#signature');
let signatureTimer;
function finishSignature(){clearTimeout(signatureTimer);signature.classList.remove('is-playing');}
function playSignature(){
  finishSignature();
  if(reduced.matches)return;
  // Restart only on explicit replay or first entry.
  void signature.offsetWidth;
  signature.classList.add('is-playing');
  signatureTimer=setTimeout(finishSignature,1700);
}
$('#signature-replay').disabled=false;
$('#signature-replay').addEventListener('click',playSignature);
if('IntersectionObserver' in window){
  let seen=false;
  const signatureObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!seen){seen=true;playSignature();}else if(!entry.isIntersecting)finishSignature();}),{threshold:.15});
  signatureObserver.observe(signature);
}
reduced.addEventListener('change',()=>{if(reduced.matches)finishSignature();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)finishSignature();});
