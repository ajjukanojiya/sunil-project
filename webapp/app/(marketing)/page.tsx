
'use client';
import { useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const extScripts: string[] = [];
    let loadedCount = 0;
    
    const runInlineScripts = () => {
      const scriptContents: string[] = ["\n(function(){\n  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;\n  window.loadThree=function(cb){if(window.THREE)return cb();if(window.__tl){window.__tlcb.push(cb);return;}window.__tl=1;window.__tlcb=[cb];var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=function(){window.__tlcb.forEach(function(f){f();});};s.onerror=function(){};document.head.appendChild(s);};\n\n  /* animate dashboard roas bars on reveal */\n  (function(){const d=document.getElementById('demo');if(!d)return;const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){d.querySelectorAll('.roasbar .bb i').forEach(b=>b.style.width=b.dataset.w+'%');o.disconnect();}}),{threshold:.25});o.observe(d);})();\n\n  const prog=document.getElementById('progress'),nav=document.getElementById('nav');\n  addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';nav.classList.toggle('solid',h.scrollTop>30);},{passive:true});\n\n  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:0.14});\n  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));\n  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,to=+el.dataset.n;let n=0;const step=Math.max(1,to/45);\n    const tm=setInterval(()=>{n+=step;if(n>=to){n=to;clearInterval(tm);}el.textContent=Math.floor(n).toLocaleString('en-IN');},20);cio.unobserve(el);}}),{threshold:0.5});\n  document.querySelectorAll('[data-n]').forEach(el=>cio.observe(el));\n\n  /* ====== NEURAL NETWORK CANVAS ====== */\n  const fireOut={};\n  (function(){\n    const c=document.getElementById('neural');if(!c)return;const x=c.getContext('2d');let w,h,dpr=Math.min(devicePixelRatio,2);\n    const MONO='700 7.5px \"JetBrains Mono\",monospace';\n    function rs(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);}\n    rs();addEventListener('resize',rs);\n    const IN=[['META','#7E8BFF'],['GOOGLE','#F4B544'],['SEO','#34E6AE'],['COSTS','#3CE0FF']];\n    const OUT=[['SCALE','#34E6AE'],['PAUSE','#FF7A66'],['FIX SEO','#7E8BFF'],['WRITE','#F4B544']];\n    const HID=4;\n    function lay(n,i){return {x:0,y:0,n,i};}\n    function pos(col,idx,count){const padY=26;const x0=col===0?w*0.13:col===1?w*0.5:w*0.87;const gap=(h-padY*2)/(count-1);return {x:x0,y:padY+gap*idx};}\n    const sigs=[];let last=0,flash={};\n    function spawn(forceOut){const i=(Math.random()*IN.length)|0;const m=(Math.random()*HID)|0;const o=forceOut!=null?forceOut:(Math.random()*OUT.length)|0;\n      sigs.push({i,m,o,t:0,col:IN[i][1]});}\n    function frame(ts){requestAnimationFrame(frame);const t=ts*0.001;x.clearRect(0,0,w,h);\n      const inP=IN.map((_,k)=>pos(0,k,IN.length)), hP=[...Array(HID)].map((_,k)=>pos(1,k,HID)), outP=OUT.map((_,k)=>pos(2,k,OUT.length));\n      // connections\n      x.lineWidth=1;\n      inP.forEach(a=>hP.forEach(b=>{x.strokeStyle='rgba(120,140,220,0.10)';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();}));\n      hP.forEach(a=>outP.forEach(b=>{x.strokeStyle='rgba(120,140,220,0.10)';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();}));\n      // spawn\n      if(ts-last>(reduce?600:260)){last=ts;spawn();}\n      // signals\n      for(let s=sigs.length-1;s>=0;s--){const g=sigs[s];g.t+=0.02;\n        let px,py;\n        if(g.t<1){const a=inP[g.i],b=hP[g.m],e=g.t;px=a.x+(b.x-a.x)*e;py=a.y+(b.y-a.y)*e;}\n        else if(g.t<2){const a=hP[g.m],b=outP[g.o],e=g.t-1;px=a.x+(b.x-a.x)*e;py=a.y+(b.y-a.y)*e;}\n        else{flash[g.o]=ts;sigs.splice(s,1);continue;}\n        x.beginPath();x.arc(px,py,2.2,0,7);x.fillStyle=g.col;x.shadowColor=g.col;x.shadowBlur=9;x.fill();x.shadowBlur=0;\n      }\n      // hidden nodes (brain)\n      hP.forEach((p,k)=>{const pr=6+Math.sin(t*2+k)*1.6;\n        const gr=x.createRadialGradient(p.x,p.y,0,p.x,p.y,pr+6);gr.addColorStop(0,'rgba(60,224,255,.9)');gr.addColorStop(1,'rgba(60,224,255,0)');\n        x.beginPath();x.arc(p.x,p.y,pr+6,0,7);x.fillStyle=gr;x.fill();\n        x.beginPath();x.arc(p.x,p.y,pr,0,7);x.fillStyle='#cfeffd';x.fill();});\n      // input nodes\n      inP.forEach((p,k)=>{x.beginPath();x.arc(p.x,p.y,5.5,0,7);x.fillStyle=IN[k][1];x.shadowColor=IN[k][1];x.shadowBlur=6;x.fill();x.shadowBlur=0;\n        x.fillStyle=IN[k][1];x.font=MONO;x.textAlign='right';x.textBaseline='middle';x.fillText(IN[k][0],p.x-10,p.y);});\n      // output nodes\n      outP.forEach((p,k)=>{const f=flash[k]&&ts-flash[k]<400;const r2=f?8:5.5;\n        x.beginPath();x.arc(p.x,p.y,r2,0,7);x.fillStyle=f?'#fff':OUT[k][1];x.shadowColor=OUT[k][1];x.shadowBlur=f?16:6;x.fill();x.shadowBlur=0;\n        x.fillStyle=OUT[k][1];x.font=MONO;x.textAlign='left';x.textBaseline='middle';x.fillText(OUT[k][0],p.x+10,p.y);});\n    }\n    requestAnimationFrame(frame);\n    window.__fireOut=(o)=>{for(let k=0;k<3;k++)setTimeout(()=>spawn(o),k*120);};\n  })();\n\n  /* reasoning terminal + interactive prompt */\n  const rterm=document.getElementById('rterm');\n  const LOG=[['03:12','meta','META','analysing 142 campaigns…'],\n    ['03:12','ai','CORE','<b>Velvet Brow Gel</b> real ROAS 0.7x → <b>PAUSE</b> · <span class=\"money\">saved ₹6,400</span>'],\n    ['03:14','google','GOOGLE','Aurora Lash PMax 2.8x → <b>SCALE +40%</b>'],\n    ['03:15','seo','SEO','rewrote 3 metas · <b>live</b>'],\n    ['03:17','ai','CORE','blended ROAS 3.4x · net <span class=\"money\">+₹14,200</span>'],\n    ['03:22','google','GOOGLE','added 12 wasted-spend negatives'],\n    ['03:24','seo','SEO','blog \"PMax vs Search\" → <b>queued</b>']];\n  let li=0,logTimer=null;\n  function pushLog(r){const d=document.createElement('div');d.className='ln';d.innerHTML=`<span class=\"ts\">${r[0]}</span> <span class=\"${r[1]}\">${r[2]}</span> ${r[3]}`;\n    d.style.opacity=0;d.style.transform='translateY(6px)';d.style.transition='.35s';rterm.appendChild(d);requestAnimationFrame(()=>{d.style.opacity=1;d.style.transform='none';});\n    while(rterm.children.length>4)rterm.removeChild(rterm.firstChild);}\n  function runLog(){pushLog(LOG[li%LOG.length]);li++;logTimer=setTimeout(runLog,reduce?2400:1700);}\n  runLog();\n\n  const RESP={\n    meta:['google'!=='x'&&'META','<b>Aurora Lash Serum</b> 2.8x after costs → scaling budget +40%','SCALE',0],\n    google:['GOOGLE','found <b>₹9,200/mo</b> wasted on 14 zero-conv terms → adding negatives','PAUSE',1],\n    seo:['SEO','3 pages miss rival keywords → rewriting titles + schema','FIX SEO',2],\n    audit:['CORE','2 campaigns lose money after returns (0.7x / 0.9x) → recommend pause','PAUSE',1]\n  };\n  function ask(key){const r=RESP[key];const cls=key==='audit'?'ai':key;\n    if(r){pushLog(['now',cls==='meta'?'meta':cls==='google'?'google':cls==='seo'?'seo':'ai',r[0],r[1]+' <b>→ '+r[2]+'</b>']);if(window.__fireOut)window.__fireOut(r[3]);}\n    else{pushLog(['now','ai','CORE','analysing your Meta · Google · SEO → ranking highest-impact moves']);if(window.__fireOut)window.__fireOut((Math.random()*4)|0);}}\n  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>ask(c.dataset.goal)));\n  document.getElementById('askGo').addEventListener('click',()=>ask('x'));\n  document.getElementById('askInput').addEventListener('keydown',e=>{if(e.key==='Enter')ask('x');});\n\n  /* live metrics */\n  (function(){const mp=document.getElementById('mProfit'),mr=document.getElementById('mRoas'),ma=document.getElementById('mActs');let pf=0,ac=0;const tg=14200;\n    const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=setInterval(()=>{pf+=Math.max(1,Math.round((tg-pf)/12));if(pf>=tg){pf=tg;clearInterval(t);}mp.textContent='+₹'+pf.toLocaleString('en-IN');},40);o.disconnect();}}),{threshold:.4});\n    if(mp)o.observe(mp.closest('.hudbox'));\n    setInterval(()=>{if(mr)mr.textContent=(3.2+Math.random()*.5).toFixed(1)+'x';},2600);\n    setInterval(()=>{if(ma){ac=Math.min(99,ac+1);ma.textContent=ac;}},1700);})();\n\n  /* growth chart + funnel */\n  (function(){const ai=document.getElementById('lineAI'),flat=document.getElementById('lineFlat'),tip=document.getElementById('aiTip');\n    if(ai){const la=ai.getTotalLength(),lf=flat.getTotalLength();ai.style.strokeDasharray=la;ai.style.strokeDashoffset=reduce?0:la;flat.style.strokeDasharray=lf;flat.style.strokeDashoffset=reduce?0:lf;\n      const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){ai.style.transition='stroke-dashoffset 1.7s cubic-bezier(.16,1,.3,1)';flat.style.transition='stroke-dashoffset 1.4s ease';ai.style.strokeDashoffset=0;flat.style.strokeDashoffset=0;setTimeout(()=>{tip.style.transition='opacity .4s';tip.style.opacity=1;},1500);o.disconnect();}}),{threshold:.4});o.observe(document.getElementById('growthSvg'));}\n    const fo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');fo.unobserve(e.target);}}),{threshold:.3});\n    const fn=document.getElementById('funnel');if(fn)fo.observe(fn);})();\n\n  /* pricing */\n  const plans=[...document.querySelectorAll('.plan')],sumRows=document.getElementById('sumRows'),discRow=document.getElementById('discRow'),discVal=document.getElementById('discVal'),discLbl=document.getElementById('discLbl'),totVal=document.getElementById('totVal');\n  const inr=v=>'₹'+v.toLocaleString('en-IN');\n  function recalc(){const sel=plans.filter(p=>p.classList.contains('on'));sumRows.innerHTML='';let sub=0;\n    if(!sel.length){sumRows.innerHTML='<div class=\"srow\">Select a service to begin</div>';discRow.style.display='none';totVal.textContent='₹0';return;}\n    sel.forEach(p=>{const pr=+p.dataset.price;sub+=pr;sumRows.insertAdjacentHTML('beforeend',`<div class=\"srow\"><span>${p.dataset.name}</span><span>${inr(pr)}/mo</span></div>`);});\n    const off=sel.length>=3?.30:sel.length===2?.20:0;\n    if(off){const d=Math.round(sub*off);discRow.style.display='flex';discLbl.textContent=`Bundle discount (${off*100}% off)`;discVal.textContent='–'+inr(d);totVal.textContent=inr(sub-d);}else{discRow.style.display='none';totVal.textContent=inr(sub);}}\n  plans.forEach(p=>p.addEventListener('click',()=>{p.classList.toggle('on');recalc();}));recalc();\n\n  /* ====== 3D ENGINE: how the AI works ====== */\n  (function(){\n    const steps=[...document.querySelectorAll('.es')];let ph=0;\n    function tick(){steps.forEach((s,i)=>s.classList.toggle('on',i===ph));window.__phase=ph;ph=(ph+1)%(steps.length||1);}\n    if(steps.length){tick();setInterval(tick,2600);}\n\n    const sec=document.getElementById('engine');if(!sec)return;\n    let loaded=false,visible=false;\n    new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;if(e.isIntersecting&&!loaded){loaded=true;load();}}),{threshold:.05}).observe(sec);\n    function load(){window.loadThree(init);}\n\n    function dotTex(){const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.8)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(cv);}\n    function panelTex(label,sub,hex){const w=512,h=300,cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');const r=26,m=10;\n      function rr(){x.beginPath();x.moveTo(m+r,m);x.arcTo(w-m,m,w-m,h-m,r);x.arcTo(w-m,h-m,m,h-m,r);x.arcTo(m,h-m,m,m,r);x.arcTo(m,m,w-m,m,r);x.closePath();}\n      const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(140,160,225,0.16)');g.addColorStop(1,'rgba(18,26,50,0.34)');x.fillStyle=g;rr();x.fill();\n      x.lineWidth=3;x.strokeStyle=hex;x.shadowColor=hex;x.shadowBlur=26;rr();x.stroke();x.shadowBlur=0;\n      x.fillStyle=hex;x.font='700 24px \"JetBrains Mono\",monospace';x.textBaseline='top';x.fillText(sub,40,44);\n      x.fillStyle='#fff';x.font='800 60px \"Space Grotesk\",sans-serif';x.fillText(label,40,104);\n      const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return t;}\n\n    function init(){\n      const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;\n      const canvas=document.getElementById('engine3d');\n      const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});\n      function size(){const r=sec.getBoundingClientRect();renderer.setSize(r.width,r.height);renderer.setPixelRatio(Math.min(devicePixelRatio,2));camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}\n      const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0A0E1C,0.04);\n      const camera=new THREE.PerspectiveCamera(52,1,0.1,200);camera.position.set(0,0,17);\n      const world=new THREE.Group();world.position.x=1.8;scene.add(world);\n      const dot=dotTex();\n\n      // nebula\n      const NB=reduce?900:2200,gN=new THREE.BufferGeometry(),pN=new Float32Array(NB*3),cN=new Float32Array(NB*3);\n      const pal=[new THREE.Color('#3C5BFF'),new THREE.Color('#F4B544'),new THREE.Color('#34E6AE'),new THREE.Color('#7E8BFF')];\n      for(let i=0;i<NB;i++){pN[i*3]=(Math.random()-.5)*40;pN[i*3+1]=(Math.random()-.5)*26;pN[i*3+2]=-Math.random()*34+4;const c=pal[(Math.random()*pal.length)|0];cN[i*3]=c.r;cN[i*3+1]=c.g;cN[i*3+2]=c.b;}\n      gN.setAttribute('position',new THREE.BufferAttribute(pN,3));gN.setAttribute('color',new THREE.BufferAttribute(cN,3));\n      const nebula=new THREE.Points(gN,new THREE.PointsMaterial({size:.32,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.85}));world.add(nebula);\n\n      // core\n      const coreWire=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),new THREE.MeshBasicMaterial({color:0x3CE0FF,wireframe:true,transparent:true,opacity:.5}));world.add(coreWire);\n      const coreInner=new THREE.Mesh(new THREE.IcosahedronGeometry(1.55,0),new THREE.MeshBasicMaterial({color:0x6E7BFF,transparent:true,opacity:.25,blending:THREE.AdditiveBlending}));world.add(coreInner);\n      const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:dot,color:0x3CE0FF,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));glow.scale.set(9,9,1);world.add(glow);\n      // SW label sprite on core\n      (function(){const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d');x.fillStyle='#eaf6ff';x.font='800 64px \"Space Grotesk\",sans-serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='#3CE0FF';x.shadowBlur=20;x.fillText('SW',64,68);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));sp.scale.set(2.4,2.4,1);world.add(sp);})();\n\n      // panels\n      const panels=[];\n      function panel(label,sub,hex,px,py,face){const mat=new THREE.MeshBasicMaterial({map:panelTex(label,sub,hex),transparent:true,opacity:.95,depthWrite:false,side:THREE.DoubleSide});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(4.2,2.46),mat);mesh.position.set(px,py,0);mesh.rotation.y=face;mesh.userData={by:py,ph:Math.random()*6};world.add(mesh);panels.push(mesh);}\n      const INc=['#7E8BFF','#F4B544','#34E6AE'];\n      panel('META','CHANNEL',INc[0],-5.6,3,.45);panel('GOOGLE','CHANNEL',INc[1],-5.6,0,.45);panel('SEO','CHANNEL',INc[2],-5.6,-3,.45);\n      panel('SCALE','ACTION','#34E6AE',5.6,4.1,-.45);panel('PAUSE','ACTION','#FF7A66',5.6,1.37,-.45);panel('FIX SEO','ACTION','#7E8BFF',5.6,-1.37,-.45);panel('WRITE','ACTION','#F4B544',5.6,-4.1,-.45);\n\n      // connection lines + streams\n      const Pin=[new THREE.Vector3(-5.6,3,0),new THREE.Vector3(-5.6,0,0),new THREE.Vector3(-5.6,-3,0)];\n      const Pout=[new THREE.Vector3(5.6,4.1,0),new THREE.Vector3(5.6,1.37,0),new THREE.Vector3(5.6,-1.37,0),new THREE.Vector3(5.6,-4.1,0)];\n      const CORE=new THREE.Vector3(0,0,0);\n      (function(){const seg=[];Pin.forEach(p=>{seg.push(p.x,p.y,p.z,0,0,0);});Pout.forEach(p=>{seg.push(0,0,0,p.x,p.y,p.z);});const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(seg,3));world.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x5566aa,transparent:true,opacity:.18})));})();\n\n      const ST=reduce?28:70,gS=new THREE.BufferGeometry(),pS=new Float32Array(ST*3),cS=new Float32Array(ST*3);\n      const inCol=INc.map(h=>new THREE.Color(h));const streams=[];\n      for(let i=0;i<ST;i++){streams.push({a:(Math.random()*3)|0,b:(Math.random()*4)|0,t:Math.random()*2,sp:.010+Math.random()*.010});const c=inCol[streams[i].a];cS[i*3]=c.r;cS[i*3+1]=c.g;cS[i*3+2]=c.b;}\n      gS.setAttribute('position',new THREE.BufferAttribute(pS,3));gS.setAttribute('color',new THREE.BufferAttribute(cS,3));\n      const streamsP=new THREE.Points(gS,new THREE.PointsMaterial({size:.34,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));world.add(streamsP);\n      const posAttr=gS.attributes.position,colAttr=gS.attributes.color,_v=new THREE.Vector3();\n\n      size();addEventListener('resize',size);\n      let tmx=0,tmy=0,mx=0,my=0,spin=0;\n      if(!reduce)addEventListener('mousemove',e=>{tmx=e.clientX/innerWidth-.5;tmy=e.clientY/innerHeight-.5;});\n      const clock=new THREE.Clock();\n      function frame(){requestAnimationFrame(frame);if(!visible)return;const t=clock.getElapsedTime();\n        mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;spin+=.0015;\n        world.rotation.y=spin*0.6+mx*.5;world.rotation.x=my*.26;\n        coreWire.rotation.y=t*.4;coreWire.rotation.x=t*.2;coreInner.rotation.y=-t*.3;\n        const pl=1+Math.sin(t*1.6)*.04;coreInner.scale.setScalar(pl);glow.material.opacity=.5+Math.sin(t*1.6)*.12;\n        nebula.rotation.y=t*.02;\n        for(let i=0;i<ST;i++){const s=streams[i];s.t+=s.sp;if(s.t>2){s.t=0;s.a=(Math.random()*3)|0;s.b=(Math.random()*4)|0;const c=inCol[s.a];cS[i*3]=c.r;cS[i*3+1]=c.g;cS[i*3+2]=c.b;}\n          let p;if(s.t<1)p=_v.copy(Pin[s.a]).lerp(CORE,s.t);else p=_v.copy(CORE).lerp(Pout[s.b],s.t-1);\n          pS[i*3]=p.x;pS[i*3+1]=p.y;pS[i*3+2]=p.z;}\n        posAttr.needsUpdate=true;colAttr.needsUpdate=true;\n        panels.forEach(m=>{m.position.y=m.userData.by+Math.sin(t*.7+m.userData.ph)*.15;});\n        renderer.render(scene,camera);\n      }\n      frame();\n    }\n  })();\n\n  /* ====== DEMO VIDEO (click to load YouTube) ====== */\n  (function(){\n    const box=document.getElementById('demoVideo'),fac=document.getElementById('vfacade');if(!box||!fac)return;\n    function ytId(v){if(!v)return '';v=(''+v).trim();const m=v.match(/(?:youtu\\.be\\/|[?&]v=|embed\\/|shorts\\/|live\\/)([A-Za-z0-9_-]{6,})/);return m?m[1]:(/^[A-Za-z0-9_-]{6,}$/.test(v)?v:'');}\n    fac.addEventListener('click',function(){const id=ytId(box.dataset.yt);\n      if(!id){fac.querySelector('.vnote').textContent='⚠ Pehle code me data-yt=\"\" me apna YouTube link daalein';return;}\n      box.innerHTML='<iframe src=\"https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&modestbranding=1\" title=\"ScaleWin demo\" allow=\"autoplay; encrypted-media; picture-in-picture; web-share\" allowfullscreen></iframe>';});\n  })();\n\n  /* ====== MARKETING UNIVERSE 3D ====== */\n  (function(){\n    const sec=document.getElementById('universe');if(!sec)return;\n    let loaded=false,visible=false;\n    new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;if(e.isIntersecting&&!loaded){loaded=true;window.loadThree(init);}}),{threshold:.05}).observe(sec);\n    function dotTex(){const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.8)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(cv);}\n    function chip(text,hex,kind){const w=320,h=128,cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');const r=22,m=8;\n      function rr(a,b,ww,hh){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+ww,b,a+ww,b+hh,r);x.arcTo(a+ww,b+hh,a,b+hh,r);x.arcTo(a,b+hh,a,b,r);x.arcTo(a,b,a+ww,b,r);x.closePath();}\n      if(kind==='ad'){const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,hex);g.addColorStop(1,'#10162a');x.fillStyle=g;rr(m,m,w-2*m,h-2*m);x.fill();\n        x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=2;rr(m,m,w-2*m,h-2*m);x.stroke();\n        x.fillStyle='rgba(255,255,255,.95)';x.font='800 34px \"Space Grotesk\",sans-serif';x.textBaseline='middle';x.fillText('AD ✦',44,h/2);}\n      else{x.fillStyle='rgba(13,17,32,0.92)';rr(m,m,w-2*m,h-2*m);x.fill();x.lineWidth=3;x.strokeStyle=hex;x.shadowColor=hex;x.shadowBlur=22;rr(m,m,w-2*m,h-2*m);x.stroke();x.shadowBlur=0;\n        x.fillStyle=hex;x.beginPath();x.arc(42,h/2,9,0,7);x.fill();x.fillStyle='#eef2ff';x.font='700 34px \"JetBrains Mono\",monospace';x.textBaseline='middle';x.fillText(text,68,h/2+2);}\n      const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return t;}\n\n    function init(){\n      const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;\n      const canvas=document.getElementById('universe3d');\n      const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});\n      const camera=new THREE.PerspectiveCamera(55,1,0.1,200);camera.position.set(0,0,19);\n      function size(){const r=sec.getBoundingClientRect();renderer.setSize(r.width,r.height);renderer.setPixelRatio(Math.min(devicePixelRatio,2));camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}\n      const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x090C18,0.028);\n      const world=new THREE.Group();world.position.x=1.6;scene.add(world);\n      const dot=dotTex();\n      const NB=reduce?700:1700,gN=new THREE.BufferGeometry(),pN=new Float32Array(NB*3),cN=new Float32Array(NB*3);\n      const pal=[new THREE.Color('#3C5BFF'),new THREE.Color('#F4B544'),new THREE.Color('#34E6AE'),new THREE.Color('#7E8BFF')];\n      for(let i=0;i<NB;i++){pN[i*3]=(Math.random()-.5)*44;pN[i*3+1]=(Math.random()-.5)*28;pN[i*3+2]=-Math.random()*34+4;const c=pal[(Math.random()*pal.length)|0];cN[i*3]=c.r;cN[i*3+1]=c.g;cN[i*3+2]=c.b;}\n      gN.setAttribute('position',new THREE.BufferAttribute(pN,3));gN.setAttribute('color',new THREE.BufferAttribute(cN,3));\n      const nebula=new THREE.Points(gN,new THREE.PointsMaterial({size:.3,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.8}));world.add(nebula);\n      const coreWire=new THREE.Mesh(new THREE.IcosahedronGeometry(2.6,1),new THREE.MeshBasicMaterial({color:0xF4B544,wireframe:true,transparent:true,opacity:.45}));world.add(coreWire);\n      const coreInner=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,0),new THREE.MeshBasicMaterial({color:0x3CE0FF,transparent:true,opacity:.25,blending:THREE.AdditiveBlending}));world.add(coreInner);\n      const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:dot,color:0x6E7BFF,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));glow.scale.set(11,11,1);world.add(glow);\n      (function(){const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d');x.fillStyle='#eaf6ff';x.font='800 52px \"Space Grotesk\",sans-serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='#F4B544';x.shadowBlur=18;x.fillText('AI',64,68);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));sp.scale.set(2.6,2.6,1);world.add(sp);})();\n      const RINGS=[\n        {r:4.2,tilt:[0.5,0.0],sp:0.10,items:[['META','#7E8BFF'],['GOOGLE','#F4B544'],['SEO','#34E6AE'],['STORE','#7E8BFF']]},\n        {r:6.4,tilt:[-0.45,0.3],sp:-0.07,items:[['ROAS 3.4x','#34E6AE'],['CTR 2.1%','#3CE0FF'],['CPA −18%','#F4B544'],['+₹14,200','#34E6AE'],['AOV ₹899','#7E8BFF']]},\n        {r:8.4,tilt:[0.32,-0.25],sp:0.05,items:[['','#FF7A66','ad'],['CR 3.1%','#3CE0FF'],['RETARGET','#F4B544'],['A/B TEST','#7E8BFF'],['','#34E6AE','ad']]}\n      ];\n      const spinners=[];\n      RINGS.forEach(R=>{const rg=new THREE.Group();rg.rotation.x=R.tilt[0];rg.rotation.z=R.tilt[1];const spin=new THREE.Group();rg.add(spin);world.add(rg);spinners.push({spin,sp:R.sp});\n        R.items.forEach((it,k)=>{const ang=k/R.items.length*Math.PI*2;const isAd=it[2]==='ad';const s=new THREE.Sprite(new THREE.SpriteMaterial({map:chip(it[0],it[1],it[2]),transparent:true,depthWrite:false}));\n          s.scale.set(isAd?2.6:3.1,isAd?1.04:1.24,1);s.position.set(Math.cos(ang)*R.r,Math.sin(ang)*R.r*0.16,Math.sin(ang)*R.r);spin.add(s);});});\n      const ST=reduce?24:54,gS=new THREE.BufferGeometry(),pS=new Float32Array(ST*3),cS=new Float32Array(ST*3);\n      const scol=[new THREE.Color('#7E8BFF'),new THREE.Color('#F4B544'),new THREE.Color('#34E6AE'),new THREE.Color('#3CE0FF')];const streams=[];\n      function srand(){const a=Math.random()*Math.PI*2,r=5+Math.random()*4,y=(Math.random()-.5)*5;return new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r);}\n      for(let i=0;i<ST;i++){const out=Math.random()<0.4;streams.push({p:srand(),out,t:Math.random()});const c=scol[(Math.random()*scol.length)|0];cS[i*3]=c.r;cS[i*3+1]=c.g;cS[i*3+2]=c.b;}\n      gS.setAttribute('position',new THREE.BufferAttribute(pS,3));gS.setAttribute('color',new THREE.BufferAttribute(cS,3));\n      const streamsP=new THREE.Points(gS,new THREE.PointsMaterial({size:.36,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));world.add(streamsP);\n      const CORE=new THREE.Vector3(0,0,0),_v=new THREE.Vector3();\n      size();addEventListener('resize',size);\n      let tmx=0,tmy=0,mx=0,my=0,spin=0;if(!reduce)addEventListener('mousemove',e=>{tmx=e.clientX/innerWidth-.5;tmy=e.clientY/innerHeight-.5;});\n      const clock=new THREE.Clock();\n      function frame(){requestAnimationFrame(frame);if(!visible)return;const t=clock.getElapsedTime();\n        mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;spin+=.0012;world.rotation.y=spin*0.5+mx*.45;world.rotation.x=my*.22;\n        coreWire.rotation.y=t*.3;coreWire.rotation.x=t*.18;coreInner.rotation.y=-t*.25;coreInner.scale.setScalar(1+Math.sin(t*1.6)*.05);glow.material.opacity=.5+Math.sin(t*1.6)*.12;\n        nebula.rotation.y=t*.015;spinners.forEach(s=>s.spin.rotation.y+=s.sp*0.016);\n        for(let i=0;i<ST;i++){const s=streams[i];s.t+=0.02;if(s.t>1){s.t=0;s.p=srand();}let p;if(s.out)p=_v.copy(CORE).lerp(s.p,s.t);else p=_v.copy(s.p).lerp(CORE,s.t);pS[i*3]=p.x;pS[i*3+1]=p.y;pS[i*3+2]=p.z;}\n        gS.attributes.position.needsUpdate=true;renderer.render(scene,camera);\n      }\n      frame();\n    }\n  })();\n})();\n","\n(function(){var nav=document.getElementById('nav');if(!nav)return;\nnav.querySelectorAll('.navlinks a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');});});\n})();\n"];
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = '{\n' + scriptText + '\n}';
          document.body.appendChild(scriptEl);
        } catch (e) {
          console.error(e);
        }
      });
    };

    if (extScripts.length === 0) {
      runInlineScripts();
    } else {
      extScripts.forEach(src => {
        const el = document.createElement('script');
        el.src = src;
        el.async = false;
        el.onload = () => {
          loadedCount++;
          if (loadedCount === extScripts.length) runInlineScripts();
        };
        document.body.appendChild(el);
      });
    }
  }, []);

  // Intercept all <a> clicks for SPA routing
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.getAttribute('href') && target.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        router.push(target.getAttribute('href') as string);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLinkClick);
    }
    return () => {
      if (container) container.removeEventListener('click', handleLinkClick);
    }
  }, [router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  :root{
    --paper:#F4F2EA; --card:#FCFBF6; --ink:#171A28; --muted:#5C6478; --line:rgba(23,26,40,0.10);
    --indigo:#2F3DEE; --indigo-soft:#E7E8FD; --gold:#DC9E27; --gold-soft:#F6E9C6; --coral:#FF553F; --mint:#0BB07F;
    /* dark HUD tokens */
    --hud:#0C1020; --hud2:#11162A; --hudline:rgba(120,140,220,0.16);
    --neon-i:#7E8BFF; --neon-c:#3CE0FF; --neon-g:#F4B544; --neon-m:#34E6AE;
    --grad:linear-gradient(100deg,var(--indigo),var(--gold));
    --display:'Space Grotesk',system-ui,sans-serif;
    --body:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{background:var(--paper);color:var(--ink);font-family:var(--body);line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:var(--indigo);color:#fff}
  a{color:inherit;text-decoration:none}

  .bgfx{position:fixed;inset:0;z-index:0;pointer-events:none}
  .bgfx span{position:absolute;border-radius:50%;filter:blur(90px);opacity:.36;animation:drift 30s ease-in-out infinite}
  .bgfx .a{width:42vw;height:42vw;left:-8vw;top:-10vw;background:radial-gradient(circle,rgba(47,61,238,.34),transparent 62%)}
  .bgfx .b{width:38vw;height:38vw;right:-8vw;top:0;background:radial-gradient(circle,rgba(220,158,39,.40),transparent 62%);animation-delay:-12s}
  @keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(4vw,3vh)}}
  .bgfx .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(23,26,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(23,26,40,0.04) 1px,transparent 1px);background-size:46px 46px;
    -webkit-mask-image:linear-gradient(180deg,#000,transparent 60%);mask-image:linear-gradient(180deg,#000,transparent 60%)}

  .progress{position:fixed;top:0;left:0;height:3px;width:0;z-index:80;background:var(--grad)}

  nav{position:fixed;top:0;left:0;right:0;z-index:70;display:flex;align-items:center;justify-content:space-between;
    padding:15px clamp(18px,5vw,56px);transition:background .35s,border-color .35s;border-bottom:1px solid transparent}
  nav.solid{background:rgba(244,242,234,0.82);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
  .brand{display:flex;align-items:center;gap:11px;font-family:var(--display);font-weight:700;font-size:21px;letter-spacing:-0.01em}
  .brand .mk{width:30px;height:30px;border-radius:9px;background:var(--grad);position:relative;flex-shrink:0;box-shadow:0 8px 18px -6px rgba(47,61,238,.6);display:flex;align-items:center;justify-content:center}
  .brand .mk b{color:#fff;font-size:14px;font-weight:700}
  .brand .mk::after{content:'';position:absolute;inset:3px;border-radius:6px;border:1.5px solid rgba(255,255,255,.4)}
  .navlinks{display:flex;align-items:center;gap:24px;font-size:14px;font-weight:500}
  .navlinks a:not(.ncta){color:var(--muted);transition:color .2s}.navlinks a:not(.ncta):hover{color:var(--ink)}
  .ncta{background:var(--coral);color:#fff;padding:11px 21px;border-radius:30px;font-weight:600;font-size:14px;box-shadow:0 10px 24px -10px rgba(255,85,63,.7);transition:transform .2s}
  .ncta:hover{transform:translateY(-2px)}
  @media(max-width:860px){.navlinks a:not(.ncta){display:none}}

  .wrap{position:relative;z-index:5;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,40px)}

  /* hero */
  .hero{padding:clamp(112px,14vh,158px) 0 clamp(30px,4vh,52px)}
  .hero-grid{display:grid;grid-template-columns:0.96fr 1.04fr;gap:clamp(28px,4vw,54px);align-items:center}
  @media(max-width:980px){.hero-grid{grid-template-columns:1fr;gap:40px}}
  .badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:12px;background:var(--card);border:1px solid var(--line);color:var(--ink);padding:8px 15px;border-radius:30px;margin-bottom:24px;box-shadow:0 8px 22px -12px rgba(23,26,40,.4)}
  .badge .dot{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(11,176,127,.6);animation:pulse 2s infinite}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(11,176,127,.5)}70%{box-shadow:0 0 0 7px rgba(11,176,127,0)}100%{box-shadow:0 0 0 0 rgba(11,176,127,0)}}
  h1{font-family:var(--display);font-weight:700;font-size:clamp(38px,5.6vw,66px);line-height:1.0;letter-spacing:-0.035em}
  h1 .g{background:linear-gradient(100deg,var(--indigo),var(--gold),var(--indigo));background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 6s linear infinite}
  @keyframes shimmer{to{background-position:220% center}}
  .hero-sub{margin-top:22px;color:var(--muted);font-size:clamp(16px,1.6vw,19px);max-width:500px}
  .hero-sub b{color:var(--ink);font-weight:600}
  .ask{margin-top:26px;max-width:500px}
  .ask-bar{display:flex;align-items:center;gap:8px;background:var(--card);border:1.5px solid var(--line);border-radius:16px;padding:8px 8px 8px 16px;box-shadow:0 14px 34px -20px rgba(23,26,40,.5);transition:border-color .2s}
  .ask-bar:focus-within{border-color:var(--indigo)}
  .ask-bar .pfx{font-family:var(--mono);font-size:13px;color:var(--indigo);font-weight:700}
  .ask-bar input{flex:1;border:none;background:transparent;font-family:var(--body);font-size:15px;color:var(--ink);outline:none}
  .ask-bar button{border:none;cursor:pointer;background:var(--grad);color:#fff;width:38px;height:38px;border-radius:11px;font-size:17px;display:flex;align-items:center;justify-content:center;transition:transform .2s}
  .ask-bar button:hover{transform:scale(1.06)}
  .chips{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
  .chip{font-size:13px;font-weight:500;background:var(--card);border:1px solid var(--line);border-radius:30px;padding:8px 14px;cursor:pointer;transition:.2s;color:var(--muted)}
  .chip:hover{border-color:var(--indigo);color:var(--ink);transform:translateY(-2px)}
  .hero-cta{display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;align-items:center}
  .btn{font-family:var(--body);font-weight:600;font-size:15px;cursor:pointer;border:none;padding:16px 28px;border-radius:34px;display:inline-flex;align-items:center;gap:9px;transition:transform .2s,box-shadow .2s,gap .2s}
  .btn-1{background:var(--coral);color:#fff;box-shadow:0 14px 34px -12px rgba(255,85,63,.75)}.btn-1:hover{transform:translateY(-3px);gap:14px}
  .btn-2{background:var(--card);color:var(--ink);border:1px solid var(--line)}.btn-2:hover{transform:translateY(-3px);border-color:var(--indigo)}
  .reassure{font-family:var(--mono);font-size:12px;color:var(--muted);margin-top:16px}

  /* ===== DARK HUD CONSOLE ===== */
  .console-w{position:relative}
  .glow{position:absolute;inset:-30px;background:radial-gradient(60% 60% at 70% 25%,rgba(47,61,238,.45),transparent 70%),radial-gradient(50% 60% at 20% 85%,rgba(220,158,39,.35),transparent 70%);filter:blur(26px);z-index:-1}
  .hudbox{background:linear-gradient(160deg,var(--hud2),var(--hud));border:1px solid var(--hudline);border-radius:22px;padding:18px;
    box-shadow:0 60px 120px -50px rgba(12,16,32,.9),inset 0 1px 0 rgba(255,255,255,.05);position:relative;overflow:hidden;color:#cdd6f4}
  .hudbox::after{content:'';position:absolute;inset:0;pointer-events:none;
    background:repeating-linear-gradient(0deg,rgba(255,255,255,0.015) 0 1px,transparent 1px 3px)}
  /* corner brackets */
  .br{position:absolute;width:16px;height:16px;border-color:var(--neon-c);opacity:.6;z-index:3}
  .br.tl{top:10px;left:10px;border-left:1.5px solid;border-top:1.5px solid;border-radius:4px 0 0 0}
  .br.tr{top:10px;right:10px;border-right:1.5px solid;border-top:1.5px solid;border-radius:0 4px 0 0}
  .br.bl{bottom:10px;left:10px;border-left:1.5px solid;border-bottom:1.5px solid;border-radius:0 0 0 4px}
  .br.brr{bottom:10px;right:10px;border-right:1.5px solid;border-bottom:1.5px solid;border-radius:0 0 4px 0}
  .scan{position:absolute;left:0;right:0;height:60px;z-index:2;pointer-events:none;
    background:linear-gradient(180deg,transparent,rgba(60,224,255,0.06),transparent);animation:scan 4.5s linear infinite}
  @keyframes scan{0%{top:-60px}100%{top:100%}}
  .hud-top{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:4;padding:2px 4px 12px}
  .hud-top .nm{font-family:var(--mono);font-size:12px;font-weight:700;display:flex;align-items:center;gap:8px;color:#eaf0ff}
  .hud-top .nm .d{width:8px;height:8px;border-radius:50%;background:var(--neon-m);box-shadow:0 0 10px var(--neon-m);animation:pulse 2s infinite}
  .hud-top .mdl{font-family:var(--mono);font-size:9.5px;color:#6b76a0;letter-spacing:.03em}
  .hud-top .mdl b{color:var(--neon-c)}
  /* neural canvas */
  #neural{width:100%;height:208px;display:block;position:relative;z-index:1}
  .neural-cap{display:flex;justify-content:space-between;font-family:var(--mono);font-size:9px;color:#5b6488;letter-spacing:.08em;text-transform:uppercase;padding:2px 6px 0;position:relative;z-index:4}
  /* reasoning terminal */
  .rterm{background:rgba(0,0,0,0.32);border:1px solid var(--hudline);border-radius:12px;padding:11px 13px;margin:12px 4px 0;font-family:var(--mono);font-size:11px;line-height:1.85;height:92px;overflow:hidden;position:relative;z-index:4}
  .rterm .ln{white-space:nowrap;overflow:hidden}
  .rterm .ts{color:#586089}.rterm .meta{color:var(--neon-i)}.rterm .google{color:var(--neon-g)}.rterm .seo{color:var(--neon-m)}.rterm .ai{color:var(--neon-c)}.rterm .money{color:#ffd479}.rterm b{font-weight:700}
  .rterm .cur{display:inline-block;width:6px;height:12px;background:var(--neon-c);vertical-align:-2px;margin-left:2px;animation:bl 1s steps(1) infinite}
  @keyframes bl{50%{opacity:0}}
  .hud-metrics{display:flex;gap:9px;margin:11px 4px 2px;position:relative;z-index:4}
  .hm{flex:1;background:rgba(255,255,255,0.04);border:1px solid var(--hudline);border-radius:11px;padding:9px 11px}
  .hm .k{font-family:var(--mono);font-size:9px;letter-spacing:.04em;text-transform:uppercase;color:#6b76a0}
  .hm .v{font-family:var(--display);font-weight:700;font-size:19px;margin-top:2px;color:#eef2ff}
  .hm .v.up{color:var(--neon-m)}

  /* floating chips */
  .float{position:absolute;font-family:var(--mono);font-size:12px;font-weight:700;background:var(--card);border:1px solid var(--line);border-radius:30px;padding:8px 13px;box-shadow:0 14px 30px -14px rgba(23,26,40,.4);z-index:6;animation:bob 5s ease-in-out infinite}
  .float .up{color:var(--mint)}.float .dn{color:var(--coral)}
  .float.f1{top:-16px;right:18px;animation-delay:-1s}.float.f2{bottom:54px;left:-26px;animation-delay:-3s}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
  @media(max-width:980px){.float{display:none}}

  /* system status ticker */
  .ticker{margin-top:30px;background:var(--hud);border:1px solid var(--hudline);border-radius:12px;overflow:hidden;white-space:nowrap;padding:11px 0;
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
  .ticker .tr{display:inline-block;animation:scrollx 26s linear infinite;font-family:var(--mono);font-size:12px;color:#9aa6d4;letter-spacing:.04em}
  .ticker .tr span{margin:0 20px}.ticker .tr .ok{color:var(--neon-m)}.ticker .tr .hl{color:var(--neon-c)}
  @keyframes scrollx{to{transform:translateX(-50%)}}

  .trust{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden;margin-top:18px}
  @media(max-width:720px){.trust{grid-template-columns:1fr 1fr}}
  .trust .t{background:var(--card);padding:26px 22px;text-align:center}
  .trust .n{font-family:var(--display);font-weight:700;font-size:clamp(26px,3.4vw,38px);letter-spacing:-0.02em}.trust .n .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .trust .l{font-family:var(--mono);font-size:11px;color:var(--muted);text-transform:uppercase;margin-top:9px}

  section.block{padding:clamp(72px,10vh,128px) 0}
  .kick{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
  .kick::before{content:'';width:24px;height:1px;background:var(--gold)}
  .head{font-family:var(--display);font-weight:700;font-size:clamp(30px,4.7vw,55px);line-height:1.02;letter-spacing:-0.028em;max-width:880px}
  .head .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .lead{color:var(--muted);max-width:600px;margin-top:18px;font-size:clamp(16px,1.5vw,18px)}

  /* spend -> profit */
  .chartsec{display:grid;grid-template-columns:1fr 1.1fr;gap:46px;align-items:center;margin-top:46px}
  @media(max-width:860px){.chartsec{grid-template-columns:1fr;gap:30px}}
  .chartcard{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:26px;box-shadow:0 40px 80px -46px rgba(23,26,40,.45)}
  .chartcard .lg{display:flex;gap:18px;margin-bottom:14px;font-family:var(--mono);font-size:11px;color:var(--muted)}
  .chartcard .lg i{display:inline-block;width:12px;height:3px;border-radius:3px;margin-right:6px;vertical-align:2px}
  .chartcard svg{width:100%;height:200px;display:block;overflow:visible}
  .chartcard .ax{font-family:var(--mono);font-size:9px;fill:var(--muted)}
  .funnel{list-style:none;margin-top:8px}
  .funnel li{display:flex;align-items:center;gap:14px;padding:11px 0;border-top:1px solid var(--line)}
  .funnel li .st{font-family:var(--mono);font-size:11px;color:var(--muted);width:96px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
  .funnel li .bar{flex:1;height:12px;border-radius:8px;background:var(--paper);overflow:hidden}
  .funnel li .bar i{display:block;height:100%;background:var(--grad);width:0;border-radius:8px;transition:width 1.1s cubic-bezier(.16,1,.3,1)}
  .funnel li .vv{font-family:var(--display);font-weight:700;font-size:15px;width:64px;text-align:right;flex-shrink:0}
  .funnel li.profit .vv{color:var(--mint)}

  .talks{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:46px}
  @media(max-width:760px){.talks{grid-template-columns:1fr}}
  .talk{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;display:flex;gap:14px;align-items:flex-start;transition:transform .3s,box-shadow .3s}
  .talk:hover{transform:translateY(-5px);box-shadow:0 30px 60px -34px rgba(23,26,40,.45)}
  .talk .av{width:34px;height:34px;border-radius:10px;background:var(--grad);color:#fff;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-weight:700;font-size:13px}
  .talk .b{font-size:15px}.talk .b b{font-weight:600}
  .talk .act{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.05em;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-top:11px;font-weight:700}
  .act.p{background:rgba(255,85,63,.12);color:var(--coral)}.act.s{background:rgba(11,176,127,.14);color:var(--mint)}.act.f{background:var(--indigo-soft);color:var(--indigo)}.act.a{background:var(--gold-soft);color:#9a6c12}

  .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:46px}
  @media(max-width:880px){.svc-grid{grid-template-columns:1fr}}
  .svc{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:28px;transition:transform .35s,box-shadow .35s}
  .svc:hover{transform:translateY(-6px);box-shadow:0 34px 66px -36px rgba(23,26,40,.45)}
  .svc .ic{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-weight:700;font-size:19px;color:#fff;margin-bottom:16px}
  .svc.m .ic{background:linear-gradient(135deg,#2F3DEE,#6a52ff)}.svc.g .ic{background:linear-gradient(135deg,#DC9E27,#f0b94e)}.svc.s .ic{background:linear-gradient(135deg,#0BB07F,#46cda0)}
  .svc .sysno{font-family:var(--mono);font-size:11px;color:var(--muted)}
  .svc h3{font-family:var(--display);font-weight:700;font-size:24px;margin:6px 0;letter-spacing:-0.01em}
  .svc p{color:var(--muted);font-size:14.5px;margin-bottom:16px}
  .svc ul{list-style:none}.svc li{font-size:14px;padding:9px 0;border-top:1px solid var(--line);display:flex;gap:10px}
  .svc li::before{content:'↗';color:var(--gold);font-weight:700}
  .svc .spec{margin-top:16px;display:flex;gap:8px;font-family:var(--mono);font-size:10px;color:var(--muted)}
  .svc .spec b{color:var(--mint)}

  .checklist{margin-top:46px;border:1px solid var(--line);border-radius:20px;overflow:hidden;background:var(--card)}
  .ck{display:grid;grid-template-columns:66px 1fr;border-bottom:1px solid var(--line);transition:background .25s}
  .ck:last-child{border-bottom:none}.ck:hover{background:var(--paper)}
  .ck .no{font-family:var(--mono);font-size:14px;font-weight:700;color:var(--gold);display:flex;align-items:center;justify-content:center;border-right:1px solid var(--line)}
  .ck .ct{padding:23px 26px}.ck h4{font-family:var(--display);font-weight:600;font-size:20px}.ck p{color:var(--muted);font-size:14.5px;margin-top:5px}

  .wedge{margin-top:20px;border-radius:26px;padding:clamp(32px,5vw,56px);color:#fff;position:relative;overflow:hidden;background:linear-gradient(130deg,#10142A,#1d1a40 55%,#2e2618)}
  .wedge::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:34px 34px;opacity:.6}
  .wedge::before{content:'';position:absolute;right:-60px;top:-60px;width:280px;height:280px;background:radial-gradient(circle,rgba(220,158,39,.4),transparent 65%);filter:blur(10px)}
  .wedge>*{position:relative;z-index:1}
  .wedge .kick{color:var(--gold)}.wedge .kick::before{background:var(--gold)}
  .wedge h2{font-family:var(--display);font-weight:700;font-size:clamp(26px,3.6vw,44px);line-height:1.08;letter-spacing:-0.02em;max-width:780px}.wedge h2 .y{color:#FFD66B}
  .wcompare{display:flex;gap:13px;margin-top:32px;flex-wrap:wrap}
  .wcard{flex:1;min-width:190px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:15px;padding:19px;backdrop-filter:blur(4px)}
  .wcard .lbl{font-family:var(--mono);font-size:10.5px;text-transform:uppercase;color:rgba(255,255,255,.7)}
  .wcard .big{font-family:var(--display);font-weight:700;font-size:31px;margin-top:7px}.wcard.good .big{color:#7df0c4}.wcard.bad .big{color:#ffb9aa}
  .wcard .sm{font-size:13px;color:rgba(255,255,255,.75);margin-top:5px}

  .founder{display:grid;grid-template-columns:0.75fr 1.25fr;gap:46px;align-items:center;margin-top:18px}
  @media(max-width:840px){.founder{grid-template-columns:1fr;gap:30px}}
  .fimg{position:relative;border-radius:22px;overflow:hidden;border:1px solid var(--line);aspect-ratio:4/5;background:var(--card);box-shadow:0 40px 80px -44px rgba(23,26,40,.5)}
  .fimg img{width:100%;height:100%;object-fit:cover;display:block}
  .fimg .bd{position:absolute;left:16px;bottom:16px;background:rgba(252,251,246,0.93);backdrop-filter:blur(6px);border:1px solid var(--line);border-radius:13px;padding:11px 16px}
  .fimg .bd .nm{font-family:var(--display);font-weight:700;font-size:17px}.fimg .bd .rl{font-family:var(--mono);font-size:11px;color:var(--indigo);margin-top:2px}
  .quote{font-family:var(--display);font-weight:600;font-size:clamp(21px,2.4vw,30px);line-height:1.26;letter-spacing:-0.01em}.quote .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .founder .lead{margin-top:18px}
  .fstats{display:flex;gap:40px;margin-top:26px;flex-wrap:wrap}
  .fstats .n{font-family:var(--display);font-weight:700;font-size:30px}.fstats .n .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .fstats .l{font-family:var(--mono);font-size:11px;color:var(--muted);text-transform:uppercase;margin-top:5px;max-width:160px}

  .price-wrap{margin-top:46px;display:grid;grid-template-columns:1.4fr 1fr;gap:20px;align-items:start}
  @media(max-width:900px){.price-wrap{grid-template-columns:1fr}}
  .plans{display:grid;gap:12px}
  .plan{background:var(--card);border:1.5px solid var(--line);border-radius:16px;padding:20px 22px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:.25s;user-select:none}
  .plan:hover{border-color:var(--indigo)}.plan.on{border-color:var(--indigo);background:linear-gradient(100deg,var(--indigo-soft),rgba(220,158,39,.08))}
  .plan h4{font-family:var(--display);font-weight:600;font-size:19px}.plan p{color:var(--muted);font-size:13px;margin-top:3px}
  .plan .r{display:flex;align-items:center;gap:14px}.plan .pr{font-family:var(--display);font-weight:700;font-size:19px;white-space:nowrap}
  .plan .ck2{width:24px;height:24px;border-radius:7px;border:1.5px solid var(--line);position:relative;flex-shrink:0;transition:.2s}
  .plan.on .ck2{background:var(--indigo);border-color:var(--indigo)}
  .plan.on .ck2::after{content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700}
  .summary{background:var(--hud);color:#fff;border-radius:20px;padding:26px;position:sticky;top:88px;overflow:hidden;border:1px solid var(--hudline)}
  .summary::before{content:'';position:absolute;top:-40%;right:-30%;width:300px;height:300px;background:radial-gradient(circle,rgba(60,224,255,.3),transparent 62%)}
  .summary>*{position:relative;z-index:1}
  .summary .tg{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--neon-c);margin-bottom:16px}
  .srow{display:flex;justify-content:space-between;font-size:14px;color:rgba(255,255,255,.72);padding:7px 0}.srow.disc{color:var(--neon-m)}
  .stot{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid rgba(255,255,255,.16);margin-top:12px;padding-top:15px}
  .stot .tt{font-family:var(--mono);font-size:12px;text-transform:uppercase;color:rgba(255,255,255,.6)}.stot .tv{font-family:var(--display);font-weight:700;font-size:33px}
  .summary .btn{width:100%;justify-content:center;margin-top:18px}
  .summary .nt{font-family:var(--mono);font-size:10px;color:rgba(255,255,255,.55);text-align:center;margin-top:13px;line-height:1.7}

  .final{margin:0 clamp(0px,5vw,40px);border-radius:30px;padding:clamp(46px,7vw,90px) clamp(24px,5vw,56px);text-align:center;position:relative;overflow:hidden;
    background:radial-gradient(90% 130% at 100% 0%,rgba(47,61,238,.16),transparent 55%),radial-gradient(90% 130% at 0% 100%,rgba(220,158,39,.22),transparent 55%),var(--card);border:1px solid var(--line)}
  .final h2{font-family:var(--display);font-weight:700;font-size:clamp(32px,5.2vw,64px);line-height:1.0;letter-spacing:-0.03em}.final h2 .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .final p{color:var(--muted);max-width:480px;margin:20px auto 0;font-size:17px}.final .btn{margin-top:30px}.final .nt{font-family:var(--mono);font-size:12px;color:var(--mint);margin-top:18px}

  footer{padding:46px clamp(20px,5vw,56px) 38px;border-top:1px solid var(--line);margin-top:80px;position:relative;z-index:5;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;font-family:var(--mono);font-size:12px;color:var(--muted)}
  footer .fl{display:flex;gap:22px;flex-wrap:wrap}footer a:hover{color:var(--gold)}

  /* ===== 3D ENGINE SECTION ===== */
  .engine{position:relative;margin-top:0;background:radial-gradient(120% 100% at 80% 20%,#10162E,#0A0E1C 70%);overflow:hidden;min-height:90vh;display:flex;align-items:center}
  @media(max-width:820px){.engine{min-height:auto;padding:72px 0;flex-direction:column}}
  .engine #engine3d{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block}
  .engine .scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,12,24,0.94) 0%,rgba(8,12,24,0.6) 36%,transparent 60%)}
  @media(max-width:820px){.engine .scrim{background:linear-gradient(180deg,rgba(8,12,24,0.92) 0%,rgba(8,12,24,0.3) 55%)}}
  .engine .eo{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,40px);width:100%}
  .engine .inner{max-width:460px}
  @media(max-width:820px){.engine .inner{max-width:none}}
  .engine .kick{color:var(--neon-c)}.engine .kick::before{background:var(--neon-c)}
  .engine h2{font-family:var(--display);font-weight:700;font-size:clamp(30px,4.6vw,54px);line-height:1.02;letter-spacing:-0.028em;color:#eef2ff}
  .engine h2 .g{background:linear-gradient(100deg,var(--neon-c),var(--neon-g));-webkit-background-clip:text;background-clip:text;color:transparent}
  .engine .sub{color:#9aa6d4;margin-top:16px;font-size:16px;max-width:420px}
  .esteps{margin-top:30px;display:grid;gap:10px}
  .es{display:flex;gap:13px;align-items:flex-start;padding:14px 16px;border:1px solid var(--hudline);border-radius:13px;background:rgba(255,255,255,0.03);
    color:#aab4dc;font-size:14px;transition:.4s}
  .es b{font-family:var(--mono);font-size:12px;color:#5b6488;flex-shrink:0;transition:.4s}
  .es.on{border-color:var(--neon-c);background:linear-gradient(100deg,rgba(60,224,255,0.10),rgba(244,181,68,0.05));color:#eef2ff;box-shadow:0 0 30px -10px rgba(60,224,255,0.4)}
  .es.on b{color:var(--neon-c)}
  .engine .e3dnote{font-family:var(--mono);font-size:11px;color:#5b6488;margin-top:18px;letter-spacing:.04em}
  @media(prefers-reduced-motion:reduce){.engine #engine3d{opacity:.5}}

  /* ===== MARKETING UNIVERSE 3D ===== */
  .universe{position:relative;background:radial-gradient(120% 100% at 20% 20%,#11152C,#090C18 70%);overflow:hidden;min-height:92vh;display:flex;align-items:center}
  @media(max-width:820px){.universe{min-height:auto;padding:72px 0}}
  .universe #universe3d{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block}
  .universe .scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(9,12,24,0.94) 0%,rgba(9,12,24,0.55) 34%,transparent 58%)}
  @media(max-width:820px){.universe .scrim{background:linear-gradient(180deg,rgba(9,12,24,0.92) 0%,rgba(9,12,24,0.25) 55%)}}
  .universe .uo{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,40px);width:100%}
  .universe .inner{max-width:480px}
  .universe .kick{color:var(--neon-g)}.universe .kick::before{background:var(--neon-g)}
  .universe h2{font-family:var(--display);font-weight:700;font-size:clamp(30px,4.8vw,56px);line-height:1.0;letter-spacing:-0.03em;color:#eef2ff}
  .universe h2 .g{background:linear-gradient(100deg,var(--neon-g),var(--neon-c));-webkit-background-clip:text;background-clip:text;color:transparent}
  .universe .sub{color:#9aa6d4;margin-top:16px;font-size:16px;max-width:420px}
  .plogos{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap}
  .plog{font-family:var(--mono);font-size:11px;font-weight:700;color:#cdd6f4;background:rgba(255,255,255,0.05);border:1px solid var(--hudline);border-radius:9px;padding:8px 12px;display:flex;align-items:center;gap:7px}
  .plog i{width:9px;height:9px;border-radius:3px;display:inline-block}
  .uchips{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}
  .uchip{font-family:var(--mono);font-size:12px;font-weight:700;background:rgba(255,255,255,0.04);border:1px solid var(--hudline);border-radius:30px;padding:8px 14px;color:#cdd6f4}
  .uchip b{color:var(--neon-m)}

  /* ===== DASHBOARD MOCK ===== */
  .dashsec{padding:clamp(56px,8vh,96px) 0}
  .dash{border:1px solid var(--line);border-radius:20px;overflow:hidden;background:var(--card);box-shadow:0 60px 120px -50px rgba(23,26,40,.55)}
  .dash-bar{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid var(--line);background:var(--paper);font-family:var(--mono);font-size:12px;color:var(--muted)}
  .dash-bar .dots{display:flex;gap:6px}.dash-bar .dots i{width:11px;height:11px;border-radius:50%;background:var(--line)}
  .dash-bar .dots i:first-child{background:#FF6058}.dash-bar .dots i:nth-child(2){background:#FFBD2E}.dash-bar .dots i:nth-child(3){background:#28C840}
  .dash-bar .nm{font-weight:700;color:var(--ink)}.dash-bar .live{margin-left:auto;color:var(--mint);font-weight:700}
  .dash-body{padding:clamp(18px,3vw,26px)}
  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
  @media(max-width:680px){.kpis{grid-template-columns:1fr 1fr}}
  .kpi{border:1px solid var(--line);border-radius:14px;padding:16px}
  .kpi .k{font-family:var(--mono);font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
  .kpi .v{font-family:var(--display);font-weight:700;font-size:24px;margin-top:6px}
  .kpi .dl{font-family:var(--mono);font-size:11px;margin-top:5px}.kpi .dl.u{color:var(--mint)}.kpi .dl.d{color:var(--coral)}
  .dash-main{display:grid;grid-template-columns:1.5fr 1fr;gap:14px}
  @media(max-width:760px){.dash-main{grid-template-columns:1fr}}
  .camp{border:1px solid var(--line);border-radius:14px;overflow:hidden}
  .camp .ch{display:grid;grid-template-columns:1.6fr 0.9fr 1fr 0.9fr;gap:8px;padding:11px 16px;font-family:var(--mono);font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line);background:var(--paper)}
  .crow{display:grid;grid-template-columns:1.6fr 0.9fr 1fr 0.9fr;gap:8px;padding:13px 16px;align-items:center;border-bottom:1px solid var(--line);font-size:13.5px}
  .crow:last-child{border-bottom:none}
  .crow .nm{font-weight:600;display:flex;flex-direction:column;gap:2px}
  .crow .nm small{font-family:var(--mono);font-size:10px;color:var(--muted);font-weight:400}
  .pill{font-family:var(--mono);font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;display:inline-block;width:fit-content}
  .pill.meta{background:rgba(47,61,238,.1);color:var(--indigo)}.pill.google{background:var(--gold-soft);color:#9a6c12}.pill.seo{background:rgba(11,176,127,.12);color:var(--mint)}
  .roasbar{display:flex;align-items:center;gap:8px}.roasbar .bb{flex:1;height:7px;border-radius:6px;background:var(--paper);overflow:hidden}.roasbar .bb i{display:block;height:100%;border-radius:6px;background:var(--grad);width:0;transition:width 1.1s ease}
  .roasbar .vv{font-family:var(--display);font-weight:700;font-size:13px;width:34px}
  .st{font-family:var(--mono);font-size:10px;font-weight:700;padding:4px 9px;border-radius:20px;text-transform:uppercase}
  .st.scale{background:rgba(11,176,127,.14);color:var(--mint)}.st.pause{background:rgba(255,85,63,.12);color:var(--coral)}.st.watch{background:var(--gold-soft);color:#9a6c12}.st.fixed{background:rgba(47,61,238,.1);color:var(--indigo)}
  .airec{border:1px solid var(--line);border-radius:14px;padding:18px;background:linear-gradient(160deg,var(--indigo-soft),rgba(220,158,39,.06))}
  .airec .tg{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--indigo);font-weight:700;display:flex;align-items:center;gap:7px}
  .airec .tg .d{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 8px var(--mint)}
  .airec h4{font-family:var(--display);font-weight:700;font-size:17px;margin:11px 0 8px;line-height:1.25}
  .airec p{color:var(--muted);font-size:13.5px}
  .airec .proj{font-family:var(--display);font-weight:700;color:var(--mint);font-size:15px;margin-top:10px}
  .airec .ab{display:flex;gap:8px;margin-top:16px}
  .airec .ab a{font-family:var(--body);font-size:13px;font-weight:600;padding:9px 16px;border-radius:24px;cursor:pointer}
  .airec .ab .ap{background:var(--ink);color:#fff}.airec .ab .sn{border:1px solid var(--line);color:var(--muted)}

  /* ===== DEMO VIDEO ===== */
  .videosec{padding:clamp(56px,8vh,96px) 0}
  .video{position:relative;border-radius:22px;overflow:hidden;border:1px solid var(--line);aspect-ratio:16/9;background:#0b0f1e;box-shadow:0 60px 120px -50px rgba(23,26,40,.55);margin-top:40px}
  .video iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block}
  .vfacade{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;cursor:pointer;
    background:radial-gradient(80% 90% at 72% 18%,rgba(47,61,238,.5),transparent 60%),radial-gradient(70% 90% at 18% 92%,rgba(220,158,39,.45),transparent 60%),#0b0f1e}
  .vfacade::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:38px 38px;opacity:.4}
  .vbadge{position:absolute;top:18px;left:18px;font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:#cdd6f4;background:rgba(255,255,255,0.06);border:1px solid var(--hudline);border-radius:30px;padding:7px 13px;z-index:2}
  .vplay{position:relative;z-index:2;width:80px;height:80px;border-radius:50%;border:none;cursor:pointer;background:var(--coral);color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 0 rgba(255,85,63,.5);animation:vpulse 2.4s infinite;transition:transform .2s}
  .vplay:hover{transform:scale(1.08)}
  .vplay span{margin-left:4px}
  @keyframes vpulse{0%{box-shadow:0 0 0 0 rgba(255,85,63,.5)}70%{box-shadow:0 0 0 26px rgba(255,85,63,0)}100%{box-shadow:0 0 0 0 rgba(255,85,63,0)}}
  .vmeta{position:relative;z-index:2;font-family:var(--display);font-weight:600;font-size:clamp(16px,2vw,22px);color:#fff}
  .vnote{position:absolute;bottom:16px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:11px;color:#8a93bd;z-index:2;padding:0 16px}

  /* ===== BLOG ===== */
  .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:46px}
  @media(max-width:880px){.blog-grid{grid-template-columns:1fr}}
  .post{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;transition:transform .35s,box-shadow .35s;display:flex;flex-direction:column}
  .post:hover{transform:translateY(-6px);box-shadow:0 32px 64px -36px rgba(23,26,40,.45)}
  .post .ph{height:128px;position:relative;display:flex;align-items:flex-end;padding:14px}
  .post .ph::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:26px 26px;opacity:.5}
  .post.b1 .ph{background:radial-gradient(120% 120% at 12% 12%,rgba(47,61,238,.65),transparent 56%),#11162a}
  .post.b2 .ph{background:radial-gradient(120% 120% at 88% 12%,rgba(220,158,39,.65),transparent 56%),#11162a}
  .post.b3 .ph{background:radial-gradient(120% 120% at 50% 92%,rgba(11,176,127,.6),transparent 56%),#11162a}
  .post .cat{position:relative;z-index:1;font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.22);border-radius:20px;padding:4px 11px}
  .post .bd{padding:22px;display:flex;flex-direction:column;flex:1}
  .post h4{font-family:var(--display);font-weight:700;font-size:19px;margin-bottom:10px;line-height:1.25;letter-spacing:-0.01em}
  .post p{color:var(--muted);font-size:14px;flex:1}
  .post .meta{font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:16px;display:flex;gap:8px;align-items:center}
  .post .meta .arrow{margin-left:auto;color:var(--indigo);font-weight:700;transition:transform .2s}
  .post:hover .meta .arrow{transform:translateX(4px)}
  .blog-all{margin-top:30px;display:flex;justify-content:center}

  .reveal{opacity:0;transform:translateY(32px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .reveal.in{opacity:1;transform:none}
  .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}
  @media(prefers-reduced-motion:reduce){*{animation:none!important}.reveal{opacity:1;transform:none;transition:none}.funnel li .bar i{transition:none}.scan{display:none}}
  /* ===================== MOBILE FRIENDLY ===================== */
  html,body{overflow-x:hidden;max-width:100%}
  img,canvas,svg,video{max-width:100%}
  .bgfx{overflow:hidden}

  .navtog{display:none;background:none;border:none;cursor:pointer;width:40px;height:40px;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:0;z-index:95}
  .navtog span{display:block;height:2px;width:24px;background:var(--ink);border-radius:2px;transition:transform .25s,opacity .2s}
  #nav.open .navtog span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  #nav.open .navtog span:nth-child(2){opacity:0}
  #nav.open .navtog span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

  @media(max-width:860px){
    nav{padding:12px 18px}
    .navtog{display:flex}
    .navlinks{position:fixed;top:60px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;
      background:rgba(244,242,234,0.985);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);
      padding:8px 20px 20px;display:none;box-shadow:0 28px 46px -26px rgba(23,26,40,.45);max-height:calc(100dvh - 60px);overflow-y:auto}
    #nav.open .navlinks{display:flex}
    .navlinks a:not(.ncta){display:block!important;color:var(--ink);padding:15px 4px;border-bottom:1px solid var(--line);font-size:16px}
    .navlinks .ncta{margin-top:14px;text-align:center;padding:14px;font-size:15px;box-shadow:none}
  }

  @media(max-width:600px){
    .wrap{padding:0 18px}
    h1{font-size:clamp(28px,8.6vw,38px);letter-spacing:-0.02em;line-height:1.07}
    .hero{padding:90px 0 20px}
    .hero-sub{font-size:16px;max-width:100%;margin-top:18px}
    .ask{max-width:100%;margin-top:22px}
    .chips{gap:8px}
    section.block{padding:54px 0}
    .head{font-size:clamp(25px,7.4vw,33px);letter-spacing:-0.018em}
    .lead{font-size:15.5px;margin-top:14px}
    .kick{font-size:11px;letter-spacing:.1em;margin-bottom:13px}
    #neural{height:170px}
    .rterm{height:auto;max-height:none;font-size:10px;line-height:1.7;padding:10px 11px}
    .rterm .ln{white-space:normal;overflow:visible}
    .hud-metrics{gap:7px}.hm{padding:8px 9px}.hm .v{font-size:16px}.hm .k{font-size:8px}
    .hud-top .nm{font-size:11px}.hud-top .mdl{font-size:8.5px}
    .dash-body{padding:15px}
    .ticker{margin-top:20px}.ticker .tr{font-size:11px}
    .universe,.engine{padding:54px 0}
    .btn,.btn-1,.btn-2{font-size:15px}
  }
  @media(max-width:400px){
    h1{font-size:26px}.head{font-size:23px}
    .hud-metrics{flex-wrap:wrap}.hm{min-width:calc(50% - 4px)}
  }
  /* ============ MOBILE — PREMIUM HI-TECH (CSS/GPU only, zero extra load) ============ */
  @media(max-width:600px){
    .wrap{padding:0 16px}
    .hero{padding:80px 0 14px}
    .hero-grid{gap:16px;perspective:1100px}

    /* hero text column -> glowing dark AI-console card */
    .hero-grid>div:first-child{
      background:linear-gradient(165deg,#161d3a,#0c1126);
      border:1px solid rgba(255,255,255,.10);border-radius:26px;padding:26px 20px 22px;
      position:relative;overflow:hidden;isolation:isolate;
      box-shadow:0 40px 80px -42px rgba(12,17,38,.9)}
    /* animated aurora (transform-only -> GPU) */
    .hero-grid>div:first-child::before{content:'';position:absolute;inset:-45%;z-index:-1;
      background:
        radial-gradient(38% 38% at 28% 20%,rgba(47,61,238,.55),transparent 60%),
        radial-gradient(38% 38% at 82% 28%,rgba(220,158,39,.48),transparent 60%),
        radial-gradient(42% 42% at 60% 92%,rgba(11,176,127,.36),transparent 60%);
      filter:blur(34px);animation:auroraM 16s ease-in-out infinite;will-change:transform}
    @keyframes auroraM{0%,100%{transform:translate3d(0,0,0) scale(1)}33%{transform:translate3d(6%,-4%,0) scale(1.1)}66%{transform:translate3d(-5%,4%,0) scale(1.05)}}
    /* tech grid sheen */
    .hero-grid>div:first-child::after{content:'';position:absolute;inset:0;z-index:-1;
      background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
      background-size:28px 28px;
      -webkit-mask-image:radial-gradient(circle at 72% 8%,#000,transparent 76%);mask-image:radial-gradient(circle at 72% 8%,#000,transparent 76%)}

    .hero .badge{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#e6eaff;box-shadow:none;margin-bottom:18px}
    .hero h1{color:#fff;font-size:clamp(28px,8.2vw,37px);line-height:1.1;letter-spacing:-.02em}
    .hero-sub{color:#aab2da;font-size:15px;margin-top:16px;max-width:100%}
    .hero-sub b{color:#fff}

    .hero .ask{margin-top:20px;max-width:100%}
    .hero .ask-bar{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.2);box-shadow:0 12px 30px -18px rgba(0,0,0,.8)}
    .hero .ask-bar input{color:#fff}
    .hero .ask-bar input::placeholder{color:#8b93bd}
    .hero .ask-bar .pfx{color:#86a0ff}

    /* chips -> single swipeable row */
    .hero .chips{flex-wrap:nowrap;overflow-x:auto;gap:8px;padding-bottom:4px;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity}
    .hero .chips::-webkit-scrollbar{display:none}
    .hero .chip{flex:0 0 auto;scroll-snap-align:start;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.16);color:#cfd6f5}

    .hero .hero-cta{flex-direction:column;gap:10px;margin-top:22px}
    .hero .hero-cta .btn{width:100%;justify-content:center}
    .hero .hero-cta .btn-2{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.22);color:#fff}
    .hero .reassure{color:#8b93bd}

    /* live console card: gentle 3D float + glow (transform-only) */
    .console-w{margin-top:4px;transform-style:preserve-3d;animation:float3dM 10s ease-in-out infinite;will-change:transform}
    @keyframes float3dM{0%,100%{transform:rotateX(0) rotateY(0) translateY(0)}50%{transform:rotateX(3deg) rotateY(-4.5deg) translateY(-7px)}}
    .console-w .glow{filter:blur(30px);opacity:.9}
    .hudbox{padding:16px;border-radius:20px}
    #neural{height:176px}
    .rterm{height:auto;max-height:none;font-size:10px;line-height:1.7;padding:10px 11px}
    .rterm .ln{white-space:normal;overflow:visible}
    .hud-metrics{gap:7px}.hm{padding:8px 9px}.hm .v{font-size:16px}.hm .k{font-size:8px}

    /* section + heading polish */
    section.block{padding:54px 0}
    .head{font-size:clamp(25px,7.2vw,33px);letter-spacing:-.018em}
    .lead{font-size:15.5px}
  }
  /* respect reduced-motion: kill the heavy bits */
  @media(max-width:600px) and (prefers-reduced-motion:reduce){
    .hero-grid>div:first-child::before{animation:none}
    .console-w{animation:none;transform:none}
  }
  /* ===== MOBILE: readable hero text + section polish ===== */
  @media(max-width:600px){
    /* hero paragraph readable */
    .hero-sub{color:#d2d8f3;font-size:15.5px;line-height:1.62;font-weight:400}
    .hero-sub b{color:#fff;font-weight:600}
    .hero-grid>div:first-child::before{opacity:.68}

    /* trust stats -> dark premium strip (extends the hero zone) */
    .trust{grid-template-columns:1fr 1fr;background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.10);box-shadow:0 34px 64px -42px rgba(12,17,38,.75);margin-top:20px}
    .trust .t{background:linear-gradient(160deg,#141a33,#0e1228);padding:22px 14px}
    .trust .n{color:#fff;font-size:27px}
    .trust .l{color:#9298c4}

    /* content cards get depth + a gradient accent so they aren't flat */
    .svc{box-shadow:0 26px 52px -34px rgba(23,26,40,.55);position:relative;overflow:hidden;padding:24px}
    .svc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad);z-index:2}
    .talk{box-shadow:0 22px 46px -32px rgba(23,26,40,.5)}
    .plan{box-shadow:0 16px 34px -28px rgba(23,26,40,.42)}
    .svc-grid{margin-top:30px}.talks{margin-top:30px}

    /* heading accent line under section titles */
    .head{position:relative;padding-bottom:4px}
  }
` }} />
      <Header />
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `
<div class="bgfx"><span class="a"></span><span class="b"></span><div class="grid"></div></div>
<div class="progress" id="progress"></div>



<!-- HERO -->
<div class="wrap hero" id="home">
  <div class="hero-grid">
    <div>
      <span class="badge"><span class="dot"></span> autonomous AI agent · online</span>
      <h1>An AI agent that runs your Meta, Google &amp; SEO — and <span class="g">decides like a marketer.</span></h1>
      <p class="hero-sub">It reads every campaign, keyword and page, then <b>acts</b> 24/7 — pausing money-losers, scaling winners, fixing SEO. Built on ₹300 crore of real ad-spend experience.</p>
      <div class="ask">
        <div class="ask-bar"><span class="pfx">&gt;_</span><input id="askInput" type="text" placeholder="Ask the agent anything…"><button id="askGo" aria-label="Ask">↵</button></div>
        <div class="chips">
          <span class="chip" data-goal="meta">Scale my Meta ads</span>
          <span class="chip" data-goal="google">Cut wasted Google spend</span>
          <span class="chip" data-goal="seo">Rank my product pages</span>
          <span class="chip" data-goal="audit">Find my losing campaigns</span>
        </div>
      </div>
      <div class="hero-cta">
        <a href="/signup" class="btn btn-1">Start 3-day free trial →</a>
        <a href="#agent" class="btn btn-2">See the AI work</a>
      </div>
      <div class="reassure">No card for trial · GST invoice · Cancel anytime · scalewin.ai 🇮🇳</div>
    </div>

    <div class="console-w">
      <div class="glow"></div>
      <div class="float f1">ROAS <span class="up">3.4x ↑</span></div>
      <div class="float f2">Wasted spend <span class="dn">−₹9,200 ↓</span></div>
      <div class="hudbox reveal">
        <span class="br tl"></span><span class="br tr"></span><span class="br bl"></span><span class="br brr"></span><div class="scan"></div>
        <div class="hud-top">
          <span class="nm"><span class="d"></span> SCALEWIN&nbsp;AGENT</span>
          <span class="mdl">model: <b>scalewin-marketer-v2</b> · ctx 30d · conf 0.91</span>
        </div>
        <div class="neural-cap"><span>INPUTS</span><span>NEURAL CORE</span><span>ACTIONS</span></div>
        <canvas id="neural"></canvas>
        <div class="rterm" id="rterm"></div>
        <div class="hud-metrics">
          <div class="hm"><div class="k">Profit today</div><div class="v up" id="mProfit">+₹0</div></div>
          <div class="hm"><div class="k">Blended ROAS</div><div class="v" id="mRoas">3.4x</div></div>
          <div class="hm"><div class="k">Decisions</div><div class="v" id="mActs">0</div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="ticker" aria-hidden="true">
    <div class="tr">
      <span class="ok">●</span><span>meta_api <span class="ok">connected</span></span><span>google_ads <span class="ok">connected</span></span><span>seo_engine <span class="ok">active</span></span><span>campaigns watched <span class="hl">412</span></span><span>keywords <span class="hl">18,402</span></span><span>pages scanned <span class="hl">92</span></span><span>avg latency <span class="hl">42ms</span></span><span>uptime <span class="ok">99.9%</span></span>
      <span class="ok">●</span><span>meta_api <span class="ok">connected</span></span><span>google_ads <span class="ok">connected</span></span><span>seo_engine <span class="ok">active</span></span><span>campaigns watched <span class="hl">412</span></span><span>keywords <span class="hl">18,402</span></span><span>pages scanned <span class="hl">92</span></span><span>avg latency <span class="hl">42ms</span></span><span>uptime <span class="ok">99.9%</span></span>
    </div>
  </div>

  <div class="trust">
    <div class="t reveal"><div class="n">₹<span class="g" data-n="1500">0</span> Cr+</div><div class="l">Ad spend behind the AI</div></div>
    <div class="t reveal d1"><div class="n"><span data-n="12">0</span>+ yrs</div><div class="l">Founder experience</div></div>
    <div class="t reveal d2"><div class="n">3-in-<span class="g">1</span></div><div class="l">Meta · Google · SEO</div></div>
    <div class="t reveal d3"><div class="n">24/7</div><div class="l">Always optimising</div></div>
  </div>
</div>

<!-- DEMO VIDEO  ▼▼▼  apna YouTube link niche data-yt="" me paste karein  ▼▼▼ -->
<div class="wrap"><section class="videosec" id="watch">
  <div class="kick reveal">See it in action</div>
  <h2 class="head reveal d1">Watch the AI <span class="g">do the work.</span></h2>
  <p class="lead reveal d2">A quick walkthrough of what you'll see every morning — winners, money-losers, and exactly what to do next.</p>

  <!-- ★ YAHAN apna YouTube link daalein: data-yt="https://youtu.be/XXXXXXXXXXX"  (ya sirf video ID) -->
  <div class="video reveal d1" id="demoVideo" data-yt="">
    <div class="vfacade" id="vfacade">
      <div class="vbadge">● ScaleWin · demo</div>
      <button class="vplay" aria-label="Play demo"><span>▶</span></button>
      <div class="vmeta">Watch the 2-minute demo</div>
      <div class="vnote">↳ Paste your YouTube link in the code (data-yt) — landscape 16:9</div>
    </div>
  </div>
</section></div>

<!-- DASHBOARD MOCK -->
<div class="wrap"><section class="dashsec" id="demo">
  <div class="kick reveal">What you see every morning</div>
  <h2 class="head reveal d1">Your whole account, <span class="g">already sorted by the AI.</span></h2>
  <p class="lead reveal d2">Best campaigns, what's losing money, and exactly what to do next — in one glance.</p>
  <div class="dash reveal d1" style="margin-top:40px">
    <div class="dash-bar"><span class="dots"><i></i><i></i><i></i></span> <span class="nm">ScaleWin · Dashboard</span> <span class="live">● LIVE · today</span></div>
    <div class="dash-body">
      <div class="kpis">
        <div class="kpi"><div class="k">Ad spend</div><div class="v">₹48,200</div><div class="dl d">−6% vs yest</div></div>
        <div class="kpi"><div class="k">Revenue</div><div class="v">₹1,64,800</div><div class="dl u">+18% ▲</div></div>
        <div class="kpi"><div class="k">Blended ROAS</div><div class="v">3.4x</div><div class="dl u">+0.4 ▲</div></div>
        <div class="kpi"><div class="k">Net profit</div><div class="v" style="color:var(--mint)">+₹52,400</div><div class="dl u">+₹14,200 today</div></div>
      </div>
      <div class="dash-main">
        <div class="camp">
          <div class="ch"><span>Campaign</span><span>Channel</span><span>ROAS</span><span>Status</span></div>
          <div class="crow"><span class="nm">Aurora Lash Growth Serum</span><span class="pill meta">META</span><span class="roasbar"><span class="bb"><i data-w="70"></i></span><span class="vv">2.8x</span></span><span class="st scale">Scaling</span></div>
          <div class="crow"><span class="nm">Velvet Brow Gel <small>losing money after returns</small></span><span class="pill meta">META</span><span class="roasbar"><span class="bb"><i data-w="18"></i></span><span class="vv">0.7x</span></span><span class="st pause">Paused</span></div>
          <div class="crow"><span class="nm">Nova Lip Tint — Search</span><span class="pill google">GOOGLE</span><span class="roasbar"><span class="bb"><i data-w="92"></i></span><span class="vv">4.1x</span></span><span class="st scale">Scaling</span></div>
          <div class="crow"><span class="nm">Pulse Drop — PMax</span><span class="pill google">GOOGLE</span><span class="roasbar"><span class="bb"><i data-w="46"></i></span><span class="vv">1.9x</span></span><span class="st watch">Watching</span></div>
          <div class="crow"><span class="nm">Terra Hair Oil page <small>+3 keywords added</small></span><span class="pill seo">SEO</span><span class="roasbar"><span class="bb"><i data-w="80"></i></span><span class="vv">pg.1</span></span><span class="st fixed">Fixed</span></div>
        </div>
        <div class="airec">
          <div class="tg"><span class="d"></span> AI recommendation</div>
          <h4>Shift ₹4,000/day from Velvet Brow Gel → Aurora Lash Serum</h4>
          <p>Velvet Brow Gel is 0.7x after costs; Aurora Lash is 2.8x with headroom. Reallocating today.</p>
          <div class="proj">Projected: +₹6,800/mo profit</div>
          <div class="ab"><a class="ap">Apply</a><a class="sn">Snooze</a></div>
        </div>
      </div>
    </div>
  </div>
</section></div>

<!-- MARKETING UNIVERSE 3D -->
<section class="universe" id="universe">
  <canvas id="universe3d"></canvas>
  <div class="scrim"></div>
  <div class="uo"><div class="inner">
    <div class="kick">One brain, every channel</div>
    <h2>Your entire marketing <span class="g">universe — run by one AI.</span></h2>
    <p class="sub">Platforms, creatives and metrics all feed one model that thinks like a ₹300 Cr marketer — and acts in real time.</p>
    <div class="plogos">
      <span class="plog"><i style="background:#2F3DEE"></i>Meta</span>
      <span class="plog"><i style="background:#DC9E27"></i>Google</span>
      <span class="plog"><i style="background:#0BB07F"></i>SEO</span>
      <span class="plog"><i style="background:#7E8BFF"></i>Store</span>
    </div>
    <div class="uchips">
      <span class="uchip">ROAS <b>3.4x</b></span><span class="uchip">CTR <b>2.1%</b></span><span class="uchip">CPA <b>−18%</b></span><span class="uchip">Profit <b>+₹14.2k</b></span>
    </div>
  </div></div>
</section>

<!-- GROWTH -->

<div class="wrap"><section class="block" id="growth">
  <div class="kick reveal">The difference an AI brain makes</div>
  <h2 class="head reveal d1">Same ad spend. <span class="g">More profit.</span></h2>
  <p class="lead reveal d2">ScaleWin doesn't just spend your budget — it compounds it. Same store, with and without the AI optimising daily.</p>
  <div class="chartsec">
    <div class="chartcard reveal d1">
      <div class="lg"><span><i style="background:var(--muted)"></i>Without AI</span><span><i style="background:var(--gold)"></i>With ScaleWin</span></div>
      <svg viewBox="0 0 320 200" id="growthSvg" preserveAspectRatio="none">
        <line x1="0" y1="170" x2="320" y2="170" stroke="var(--line)"></line>
        <path id="lineFlat" d="M0 150 L53 148 L106 146 L160 150 L213 144 L266 148 L320 142" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"></path>
        <path id="lineAI" d="M0 150 L53 138 L106 120 L160 96 L213 70 L266 44 L320 18" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle id="aiTip" cx="320" cy="18" r="4.5" fill="var(--gold)" opacity="0"></circle>
        <text class="ax" x="0" y="190">Mar</text><text class="ax" x="150" y="190">Jun</text><text class="ax" x="300" y="190">Sep</text>
      </svg>
    </div>
    <div class="reveal d2">
      <ul class="funnel" id="funnel">
        <li><span class="st">Impressions</span><span class="bar"><i data-w="100"></i></span><span class="vv">820k</span></li>
        <li><span class="st">Clicks</span><span class="bar"><i data-w="74"></i></span><span class="vv">31k</span></li>
        <li><span class="st">Sales</span><span class="bar"><i data-w="48"></i></span><span class="vv">1,240</span></li>
        <li class="profit"><span class="st">Net profit</span><span class="bar"><i data-w="34"></i></span><span class="vv">+38%</span></li>
      </ul>
      <p class="lead" style="margin-top:18px;font-size:15px">The AI plugs the leaks at every stage — pausing money-losers, scaling winners, fixing pages — so more of every rupee turns into profit.</p>
    </div>
  </div>
</section></div>

<!-- AGENT -->
<div class="wrap"><section class="block" id="agent">
  <div class="kick reveal">The brain, not just a dashboard</div>
  <h2 class="head reveal d1">Other tools show charts. <span class="g">ScaleWin makes the call — and acts.</span></h2>
  <p class="lead reveal d2">Trained on 12+ years and ₹300 Cr+ of real campaigns, it works across all three channels every morning and already handled the obvious moves.</p>
  <div class="talks">
    <div class="talk reveal d1"><span class="av">SW</span><div class="b">"<b>Velvet Brow Gel</b> spent ₹6,400 today. After shipping &amp; returns it's <b>0.7x</b> — quietly losing money. Paused it. You keep the ₹6,400."<span class="act p">Paused · saved ₹6,400</span></div></div>
    <div class="talk reveal d2"><span class="av">SW</span><div class="b">"<b>Aurora Lash Serum</b> is your hidden winner — <b>2.8x after costs</b>. Pushed budget +40% before rivals catch on."<span class="act s">Scaled +40%</span></div></div>
    <div class="talk reveal d1"><span class="av">SW</span><div class="b">"Top product page was missing <b>3 keywords</b> rivals rank for. Rewrote meta &amp; H1 — live now."<span class="act f">SEO fixed</span></div></div>
    <div class="talk reveal d2"><span class="av">SW</span><div class="b">"Best creative is fatiguing — CTR down <b>22% in 3 days</b>. Swap to the next one before ROAS drops?"<span class="act a">Needs your call</span></div></div>
  </div>
</section></div>

<!-- 3D ENGINE -->
<section class="engine" id="engine">
  <canvas id="engine3d"></canvas>
  <div class="scrim"></div>
  <div class="eo"><div class="inner">
    <div class="kick">Inside the engine</div>
    <h2>How the AI <span class="g">actually works.</span></h2>
    <p class="sub">It pulls every signal from your channels, reasons like a marketer, then fires the right action — live, in 3D.</p>
    <div class="esteps">
      <div class="es" data-i="0"><b>01</b><span>Reads your data — every campaign, keyword &amp; page across Meta, Google &amp; SEO.</span></div>
      <div class="es" data-i="1"><b>02</b><span>Reasons like a marketer — real profit maths: cost, shipping &amp; returns.</span></div>
      <div class="es" data-i="2"><b>03</b><span>Acts across channels — scales winners, pauses losers, fixes pages.</span></div>
    </div>
    <div class="e3dnote">↳ move your mouse over the engine</div>
  </div></div>
</section>

<!-- CHANNELS -->

<div class="wrap"><section class="block" id="channels">
  <div class="kick reveal">Three channels, one AI</div>
  <h2 class="head reveal d1">Run one channel, or let it <span class="g">connect all three.</span></h2>
  <p class="lead reveal d2">No agency junior connects Meta, Google and SEO on every decision. The AI does.</p>
  <div class="svc-grid">
    <div class="svc m reveal d1"><div class="ic">f</div><div class="sysno">MODULE 01</div><h3>Meta Ads</h3><p>social feeds that launch, optimise and scale themselves.</p>
      <ul><li>Auto campaign creation from your creatives</li><li>Daily optimisation &amp; budget shifts</li><li>Creative-fatigue alerts before ROAS drops</li><li>Profit-based calls, not just ROAS</li></ul>
      <div class="spec"><span>decisions/day <b>~40</b></span><span>checks <b>24/7</b></span></div></div>
    <div class="svc g reveal d2"><div class="ic">G</div><div class="sysno">MODULE 02</div><h3>Google Ads</h3><p>Search &amp; Performance Max with keyword-level intelligence.</p>
      <ul><li>Search + PMax automation</li><li>Keyword research &amp; quality-score fixes</li><li>Wasted-spend detection &amp; auto-pause</li><li>Bid &amp; budget tuning every day</li></ul>
      <div class="spec"><span>keywords <b>18k+</b></span><span>scan <b>hourly</b></span></div></div>
    <div class="svc s reveal d3"><div class="ic">S</div><div class="sysno">MODULE 03</div><h3>SEO &amp; Content</h3><p>Page-health fixes plus AI blogs that actually rank and convert.</p>
      <ul><li>Product-page SEO scoring &amp; fixes</li><li>AI-written blogs, auto-published</li><li>Keyword ranking tracking</li><li>Organic growth on autopilot</li></ul>
      <div class="spec"><span>pages <b>92</b></span><span>blogs <b>auto</b></span></div></div>
  </div>
</section></div>

<!-- HOW -->
<div class="wrap"><section class="block" id="how">
  <div class="kick reveal">Live in minutes</div>
  <h2 class="head reveal d1">From signup to <span class="g">fully autonomous</span> in 4 steps.</h2>
  <p class="lead reveal d2">No agency calls, no week-long onboarding. Connect, set your numbers, and the AI runs it.</p>
  <div class="checklist reveal d1">
    <div class="ck"><div class="no">01</div><div class="ct"><h4>Connect accounts</h4><p>Link Meta, Google Ads and your website in a few clicks — secure, official OAuth.</p></div></div>
    <div class="ck"><div class="no">02</div><div class="ct"><h4>Set your numbers</h4><p>Tell us product cost &amp; shipping once. The AI tracks real profit, not vanity ROAS.</p></div></div>
    <div class="ck"><div class="no">03</div><div class="ct"><h4>The AI takes over</h4><p>Campaigns launch and optimise daily. Blogs get written. Pages get fixed. Automatically.</p></div></div>
    <div class="ck"><div class="no">04</div><div class="ct"><h4>You stay in control</h4><p>Plain-language recommendations. Approve, tweak, or let it run. Your call, always.</p></div></div>
  </div>
</section></div>

<!-- WEDGE -->
<div class="wrap"><section class="block">
  <div class="wedge reveal">
    <div class="kick">The thing agencies hide</div>
    <h2>A 3x ROAS campaign can still <span class="y">lose you money.</span> ScaleWin is the only one that does the real maths — cost, shipping, returns — before it decides.</h2>
    <div class="wcompare">
      <div class="wcard bad"><div class="lbl">What agencies report</div><div class="big">3.0x ROAS</div><div class="sm">Looks like a winner 🎉</div></div>
      <div class="wcard bad"><div class="lbl">After cost + shipping + returns</div><div class="big">0.9x</div><div class="sm">Actually bleeding cash</div></div>
      <div class="wcard good"><div class="lbl">ScaleWin's verdict</div><div class="big">Paused</div><div class="sm">Money back in your pocket</div></div>
    </div>
  </div>
</section></div>

<!-- FOUNDER -->
<div class="wrap"><section class="block" id="founder">
  <div class="kick reveal">Not "just another AI tool"</div>
  <h2 class="head reveal d1">Years of real expertise, <span class="g">turned into an AI.</span></h2>
  <div class="founder">
    <div class="fimg reveal d1">
      <img src="https://cdn.shopify.com/s/files/1/0501/4234/7435/files/WhatsApp_Image_2026-05-28_at_5.39.09_PM.jpg?v=1779970324" alt="Ajay Kumar, Founder" loading="lazy">
      <div class="bd"><div class="nm">Ajay Kumar</div><div class="rl">Founder · 12+ yrs</div></div>
    </div>
    <div class="reveal d2">
      <div class="quote">"When ScaleWin says <span class="g">scale this</span> or <span class="g">this one's quietly losing money</span> — that's not a guess. That's experience talking."</div>
      <p class="lead">12+ years in performance marketing and ₹300 crore+ in ad spend managed across D2C, beauty, fashion, wellness &amp; fintech. ScaleWin is built with expert marketers — add up all our spend and it's ₹1,500 crore+ of real-world experience inside one AI.</p>
      <div class="fstats">
        <div><div class="n">₹<span class="g" data-n="300">0</span> Cr+</div><div class="l">Managed personally</div></div>
        <div><div class="n">₹<span class="g" data-n="1500">0</span> Cr+</div><div class="l">Combined team experience</div></div>
      </div>
    </div>
  </div>
</section></div>

<!-- PRICING -->
<div class="wrap"><section class="block" id="pricing">
  <div class="kick reveal">Simple, honest pricing</div>
  <h2 class="head reveal d1">Pick your channels. <span class="g">Bundle &amp; save.</span></h2>
  <p class="lead reveal d2">Any single service, or combine them — the more you add, the more you save. Founding-member pricing, locked for early brands.</p>
  <div class="price-wrap">
    <div class="plans reveal d1">
      <div class="plan on" data-price="5999" data-name="Meta Ads"><div><h4>Meta Ads</h4><p>social feeds, fully automated</p></div><div class="r"><span class="pr">₹5,999/mo</span><span class="ck2"></span></div></div>
      <div class="plan" data-price="5999" data-name="Google Ads"><div><h4>Google Ads</h4><p>Search &amp; PMax with keyword intelligence</p></div><div class="r"><span class="pr">₹5,999/mo</span><span class="ck2"></span></div></div>
      <div class="plan" data-price="4999" data-name="SEO &amp; Content"><div><h4>SEO &amp; Content</h4><p>Page fixes + AI blogs that rank</p></div><div class="r"><span class="pr">₹4,999/mo</span><span class="ck2"></span></div></div>
    </div>
    <div class="summary reveal d2">
      <div class="tg">Your plan</div><div id="sumRows"></div>
      <div class="srow disc" id="discRow" style="display:none"><span id="discLbl">Bundle discount</span><span id="discVal">–₹0</span></div>
      <div class="stot"><span class="tt">Total / month</span><span class="tv" id="totVal">₹5,999</span></div>
      <a href="/signup" class="btn btn-1">Start 3-day free trial →</a>
      <div class="nt">2 services = 20% off · all 3 = 30% off<br>No card for trial · GST invoice · Cancel anytime 🇮🇳</div>
    </div>
  </div>
</section></div>

<!-- BLOG -->
<div class="wrap"><section class="block" id="blog">
  <div class="kick reveal">From the blog</div>
  <h2 class="head reveal d1">Recent <span class="g">marketing insights.</span></h2>
  <p class="lead reveal d2">Practical tips on ads, SEO and growth for Indian brands — written from real experience, not theory.</p>
  <div class="blog-grid">
    <article class="post b1 reveal d1" onclick="location.href='blog-article.html'" style="cursor:pointer"><a href="/blog-article"><div class="ph"><span class="cat">Meta Ads</span></div></a><div class="bd"><h4>Why your 3x ROAS campaign might still be losing money</h4><p>ROAS looks great, but after product cost and shipping, many D2C campaigns quietly lose money. Here's how to spot it.</p><div class="meta">14 Jun 2026 · 5 min read <span class="arrow">→</span></div></div></article>
    <article class="post b2 reveal d2" onclick="location.href='blog-article.html'" style="cursor:pointer"><a href="/blog-article"><div class="ph"><span class="cat">Google Ads</span></div></a><div class="bd"><h4>Performance Max vs Search: where should new brands start?</h4><p>A simple breakdown of which Google Ads campaign type works best when you're starting out with a limited budget.</p><div class="meta">9 Jun 2026 · 6 min read <span class="arrow">→</span></div></div></article>
    <article class="post b3 reveal d3" onclick="location.href='blog-article.html'" style="cursor:pointer"><a href="/blog-article"><div class="ph"><span class="cat">SEO</span></div></a><div class="bd"><h4>How AI-written blogs can rank without sounding robotic</h4><p>Mass-producing content can hurt SEO. Here's how to use AI for blogs that actually rank and bring organic sales.</p><div class="meta">3 Jun 2026 · 4 min read <span class="arrow">→</span></div></div></article>
  </div>
  <div class="blog-all reveal d2"><a href="/blog" class="btn btn-2">View all articles →</a></div>
</section></div>

<!-- FINAL -->
<section class="block" style="padding-top:0">
  <div class="final reveal">
    <h2>Let one AI run your<br>Meta, Google &amp; <span class="g">SEO.</span></h2>
    <p>Start your 3-day free trial today. No card, no agency contracts, no jargon — just an AI that scales what works.</p>
    <a href="/signup" class="btn btn-1">Start free trial →</a>
    <div class="nt">— AGENT ONLINE · READY TO SCALE —</div>
  </div>
</section>







` }} 
      />
      <Footer />
    </>
  );
}
