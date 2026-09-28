(() => {
  const D = window.EEE_DATA;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const state = { selectedTalent: null, step: 1, editingId: null, editData: null };
  const STORAGE_KEY = 'eeePrivateRequestsV1';

  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const uid = () => `EEE-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const readOrders = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const writeOrders = orders => { localStorage.setItem(STORAGE_KEY, JSON.stringify(orders)); renderOrders(); };
  const getTalent = id => D.talents.find(t => t.id === id);

  function navSetup(){
    const nav = $('.main-nav');
    $('#mobileMenu').addEventListener('click', () => nav.classList.toggle('open'));
    $$('[data-nav]').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){
        $$('[data-nav]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    }), {rootMargin:'-40% 0px -50% 0px'});
    $$('.section').forEach(s => observer.observe(s));
  }

  function imgMarkup(t, cls=''){
    return `<img src="${esc(t.image)}" alt="${esc(t.name)}" class="${cls}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"/><span class="talent-placeholder" style="display:none">${esc(t.name.split(' ').map(x=>x[0]).join(''))}</span>`;
  }

  function renderTalents(){
    $('#talentGrid').innerHTML = D.talents.map(t => `
      <article class="talent-card" data-talent="${t.id}" data-accent="${t.accent}" tabindex="0">
        <div class="talent-media">${imgMarkup(t)}</div>
        <span class="talent-status">${esc(t.availability)}</span>
        <div class="talent-content">
          <span class="talent-level">${esc(t.level)}</span>
          <h3>${esc(t.name)}</h3>
          <div class="talent-tags">${t.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
        </div>
      </article>`).join('');
    $$('#talentGrid .talent-card').forEach(card => {
      const open = () => openTalent(card.dataset.talent);
      card.addEventListener('click', open); card.addEventListener('keydown',e=>{if(e.key==='Enter')open();});
    });
  }

  function openTalent(id){
    const t = getTalent(id); if(!t) return;
    const rows = Object.entries(t.services).slice(0,8).map(([key,val]) => `<div class="service-row"><span>${esc(D.serviceLabels[key]?.[0] || key)}</span><span class="service-state ${val}">${val==='available'?'Elérhető':'Külön jóváhagyással'}</span></div>`).join('');
    $('#talentModalContent').innerHTML = `<div class="talent-profile">
      <div class="profile-image">${imgMarkup(t)}</div>
      <div class="profile-copy">
        <p class="eyebrow">${esc(t.level)}</p><h2>${esc(t.name)}</h2>
        <p class="profile-desc">${esc(t.description)}</p>
        <div class="profile-facts"><div><small>Availability</small>${esc(t.availability)}</div><div><small>Languages</small>${esc(t.languages.join(' / '))}</div><div><small>Booking Level</small>${esc(t.level)}</div><div><small>Security</small>EEE Protected</div></div>
        <div class="service-preview"><h4>Service Preferences</h4>${rows}</div>
        <button class="btn btn-gold" id="bookTalentDirect">${esc(t.name.split(' ')[0])} foglalása</button>
      </div></div>`;
    const modal = $('#talentModal'); modal.showModal();
    $('#bookTalentDirect').addEventListener('click',()=>{modal.close();openBooking(id);});
  }

  $('#closeTalentModal').addEventListener('click',()=>$('#talentModal').close());

  function renderBookingTalents(){
    $('#bookingTalentGrid').innerHTML = D.talents.map(t => `<label class="booking-talent ${state.selectedTalent===t.id?'selected':''}" data-id="${t.id}">
      <input type="radio" name="talent" value="${t.id}" ${state.selectedTalent===t.id?'checked':''} hidden>
      <span class="booking-talent-avatar">${imgMarkup(t)}</span><span><strong>${esc(t.name)}</strong><small>${esc(t.level)} · ${esc(t.availability)}</small></span>
    </label>`).join('');
    $$('.booking-talent').forEach(el=>el.addEventListener('click',()=>{state.selectedTalent=el.dataset.id;renderBookingTalents();}));
  }

  function choiceMarkup(name, key, label, status, type='checkbox'){
    if(!status) return '';
    const isReq = status==='request';
    return `<label class="choice"><input type="${type}" name="${name}" value="${key}"><strong>${esc(label[0])}</strong><small>${esc(label[1]||'')}</small>${isReq?'<em>Külön jóváhagyással</em>':''}</label>`;
  }

  function renderExperienceChoices(){
    const t = getTalent(state.selectedTalent); if(!t) return;
    $('#serviceChoices').innerHTML = Object.entries(t.services).map(([k,v])=>choiceMarkup('services',k,D.serviceLabels[k]||[k,''],v)).join('');
    $('#interactionChoices').innerHTML = Object.entries(t.interactions).map(([k,v])=>choiceMarkup('interaction',k,D.interactionLabels[k]||[k,''],v,'radio')).join('');
    $('#guestChoices').innerHTML = Object.entries(t.guests).map(([k,v])=>choiceMarkup('guestConfig',k,D.guestLabels[k]||[k,''],v,'radio')).join('');
    $('#preferenceChoices').innerHTML = D.preferenceLabels.map(([k,l])=>`<label class="choice"><input type="checkbox" name="preferences" value="${k}"><strong>${esc(l)}</strong></label>`).join('');
  }

  function setStep(n){
    state.step = Math.max(1,Math.min(5,n));
    $$('.booking-step').forEach(el=>el.classList.toggle('active', Number(el.dataset.step)===state.step));
    $$('#bookingProgress span').forEach((el,i)=>el.classList.toggle('active',i+1<=state.step));
    $('#prevStep').disabled = state.step===1;
    $('#nextStep').hidden = state.step===5;
    $('#submitBooking').hidden = state.step!==5;
    if(state.step===2) renderExperienceChoices();
    applyPrefillForStep(state.step);
    if(state.step===5) renderReview();
  }

  function validateStep(){
    if(state.step===1 && !state.selectedTalent){alert('Válassz Talentet.');return false;}
    if(state.step===2){
      if(!$$('input[name="services"]:checked').length){alert('Válassz legalább egy szolgáltatási kategóriát.');return false;}
      if(!$('input[name="interaction"]:checked')){alert('Válassz interakciós szintet.');return false;}
      if(!$('input[name="guestConfig"]:checked')){alert('Válaszd ki a vendég konfigurációt.');return false;}
    }
    const section = $(`.booking-step[data-step="${state.step}"]`);
    for(const input of [...section.querySelectorAll('[required]')]){ if(!input.checkValidity()){input.reportValidity(); return false;} }
    return true;
  }

  function serializeForm(){
    const fd = new FormData($('#bookingForm')); const o={};
    for(const [k,v] of fd.entries()){
      if(o[k]!==undefined) o[k]=Array.isArray(o[k])?[...o[k],v]:[o[k],v]; else o[k]=v;
    }
    ['services','preferences'].forEach(k=>{if(!Array.isArray(o[k]))o[k]=o[k]?[o[k]]:[];});
    o.talent = state.selectedTalent;
    return o;
  }

  function labelList(values, map){ return (values||[]).map(v=>map[v]?.[0]||v).join(', ') || '—'; }
  function renderReview(){
    const o=serializeForm(), t=getTalent(o.talent);
    $('#bookingReview').innerHTML = `
      <div class="review-section"><h4>Talent és szolgáltatások</h4><p><b>Talent:</b> ${esc(t?.name||'—')}</p><p><b>Szolgáltatások:</b> ${esc(labelList(o.services,D.serviceLabels))}</p><p><b>Kapcsolati szint:</b> ${esc(D.interactionLabels[o.interaction]?.[0]||'—')}</p><p><b>Vendégek:</b> ${esc(D.guestLabels[o.guestConfig]?.[0]||'—')}</p><p><b>Egyedi kérés:</b> ${esc(o.requestDetails||'—')}</p></div>
      <div class="review-section"><h4>Esemény</h4><p><b>Dátum:</b> ${esc(o.date||'—')} ${esc(o.time||'')}</p><p><b>Időtartam:</b> ${esc(o.duration||'—')}</p><p><b>Típus:</b> ${esc(o.eventType||'—')}</p><p><b>Helyszín:</b> ${esc(o.venueName||'—')}</p><p><b>Cím:</b> ${esc(o.venueAddress||'—')}</p><p><b>Költségkeret:</b> ${esc(o.budget||'—')}</p></div>
      <div class="review-section"><h4>Ügyfél</h4><p><b>Név:</b> ${esc(o.clientName||'—')}</p><p><b>Elérhetőség:</b> ${esc(o.clientPhone||'—')}</p><p><b>Típus:</b> ${esc(o.clientType||'—')}</p><p><b>Cím:</b> ${esc(o.clientType==='company'?(o.companyAddress||'—'):(o.homeAddress||'—'))}</p></div>
      <div class="review-section"><h4>EEE megjegyzések</h4><p>${esc(o.eventDescription||o.clientNotes||'Nincs külön megjegyzés.')}</p><p><b>Biztonság:</b> ${esc(o.security||'—')}</p><p><b>Szállítás:</b> ${esc(o.transport||'—')}</p></div>`;
  }

  function openBooking(talentId=null, order=null){
    state.editingId = order?.id || null;
    state.editData = order?.data || null;
    state.selectedTalent = talentId || order?.data?.talent || null;
    $('#bookingForm').reset();
    renderBookingTalents();
    $('#bookingModal').showModal();
    setStep(1);
  }


  function applyPrefillForStep(step){
    const data = state.editData;
    if(!data) return;
    const section = $(`.booking-step[data-step="${step}"]`);
    if(!section) return;
    Object.entries(data).forEach(([k,v])=>{
      if(k==='talent') return;
      const vals = Array.isArray(v) ? v.map(String) : [String(v ?? '')];
      const els = [...section.querySelectorAll(`[name="${CSS.escape(k)}"]`)];
      els.forEach(el=>{
        if(el.type==='checkbox' || el.type==='radio') el.checked = vals.includes(el.value);
        else if(vals.length) el.value = vals[0];
      });
    });
    if(step===4) updateClientFields();
  }

  function updateClientFields(){
    const company=$('#clientType').value==='company';
    $$('[data-company-field]').forEach(x=>x.classList.toggle('hidden',!company));
    $$('[data-private-address]').forEach(x=>x.classList.toggle('hidden',company));
  }

  $('#clientType').addEventListener('change',updateClientFields);
  $('#openBookingTop').addEventListener('click',()=>openBooking());
  $('#openBookingHero').addEventListener('click',()=>openBooking());
  $('#closeBooking').addEventListener('click',()=>$('#bookingModal').close());
  $('#prevStep').addEventListener('click',()=>setStep(state.step-1));
  $('#nextStep').addEventListener('click',()=>{if(validateStep())setStep(state.step+1);});
  $('#saveDraft').addEventListener('click',()=>saveOrder('Draft',true));

  function saveOrder(status='Submitted',draft=false){
    const data=serializeForm(); if(!state.selectedTalent){alert('Válassz Talentet.');return;}
    const orders=readOrders();
    if(state.editingId){
      const idx=orders.findIndex(x=>x.id===state.editingId);
      if(idx>=0) orders[idx]={...orders[idx],status,data,updatedAt:new Date().toISOString()};
    }else{
      orders.unshift({id:uid(),status,data,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    }
    writeOrders(orders);
    state.editData = null;
    $('#bookingModal').close();
    openDrawer();
    if(!draft) alert('A privát foglalási kérelem elmentve.');
  }

  $('#bookingForm').addEventListener('submit',e=>{e.preventDefault();if(validateStep())saveOrder('Submitted');});
  $('#contactForm').addEventListener('submit',e=>{e.preventDefault();alert('Az üzenet elkészült. A közös háttérrendszer csatlakoztatása után innen küldhető majd el.');});

  function openDrawer(){ $('#modalOverlay').hidden=false; $('#ordersDrawer').classList.add('open'); $('#ordersDrawer').setAttribute('aria-hidden','false'); renderOrders(); }
  function closeDrawer(){ $('#modalOverlay').hidden=true; $('#ordersDrawer').classList.remove('open'); $('#ordersDrawer').setAttribute('aria-hidden','true'); }
  $('#profileButton').addEventListener('click',openDrawer); $('[data-close-drawer]').addEventListener('click',closeDrawer); $('#modalOverlay').addEventListener('click',closeDrawer); $('#newOrderFromDrawer').addEventListener('click',()=>{closeDrawer();openBooking();});
  $('#clearOrders').addEventListener('click',()=>{if(confirm('Biztosan törlöd az összes helyi megrendelést?'))writeOrders([]);});

  function fmtDate(v){try{return new Date(v).toLocaleString('hu-HU')}catch{return v}}
  function renderOrders(){
    const orders=readOrders(); const list=$('#ordersList');
    $('#orderCount').hidden=!orders.length; $('#orderCount').textContent=orders.length;
    if(!orders.length){list.innerHTML='<div class="empty-state"><strong>Nincs még megrendelés.</strong>Az első privát foglalási kérelem itt fog megjelenni.</div>';return;}
    list.innerHTML=''; const tpl=$('#orderTemplate');
    orders.forEach(order=>{
      const node=tpl.content.firstElementChild.cloneNode(true); const t=getTalent(order.data.talent);
      node.querySelector('.order-id').textContent=order.id;
      node.querySelector('.order-title').textContent=t?.name||'Ismeretlen Talent';
      node.querySelector('.status-pill').textContent=order.status==='Draft'?'Piszkozat':order.status==='Submitted'?'Beküldve':order.status;
      node.querySelector('.order-meta').innerHTML=`${esc(order.data.date||'Nincs dátum')} · ${esc(order.data.eventType||'Nincs eseménytípus')}<br>${esc(order.data.clientName||'Nincs kliensnév')} · ${esc(order.data.budget||'')}`;
      node.querySelector('.order-details').innerHTML=`
        <div><b>Talent:</b> ${esc(t?.name||'—')}</div><div><b>Szolgáltatások:</b> ${esc(labelList(order.data.services,D.serviceLabels))}</div><div><b>Kapcsolati szint:</b> ${esc(D.interactionLabels[order.data.interaction]?.[0]||'—')}</div><div><b>Vendégek:</b> ${esc(D.guestLabels[order.data.guestConfig]?.[0]||'—')}</div><div><b>Esemény:</b> ${esc(order.data.eventType||'—')} · ${esc(order.data.date||'—')} ${esc(order.data.time||'')}</div><div><b>Helyszín:</b> ${esc(order.data.venueName||'—')} — ${esc(order.data.venueAddress||'—')}</div><div><b>Ügyfél:</b> ${esc(order.data.clientName||'—')} · ${esc(order.data.clientPhone||'—')}</div><div><b>Cím:</b> ${esc(order.data.clientType==='company'?(order.data.companyAddress||'—'):(order.data.homeAddress||'—'))}</div><div><b>Egyedi kérés:</b> ${esc(order.data.requestDetails||'—')}</div><div><b>Esemény megjegyzései:</b> ${esc(order.data.eventDescription||'—')}</div><div><b>Létrehozva:</b> ${esc(fmtDate(order.createdAt))}</div>`;
      node.querySelector('.edit-order').addEventListener('click',()=>{closeDrawer();openBooking(order.data.talent,order);});
      node.querySelector('.delete-order').addEventListener('click',()=>{if(confirm('Törlöd ezt a megrendelést?'))writeOrders(readOrders().filter(x=>x.id!==order.id));});
      list.appendChild(node);
    });
  }

  renderTalents(); renderOrders(); navSetup();
})();
