// Genera cv/src/*.html (diseño y ATS, ES y EN) y los exporta a PDF A4 con Chrome.
// Uso: node cvgen.cjs <ruta-al-repo>
const fs=require('fs'), path=require('path'), puppeteer=require('puppeteer-core');
const repo=process.argv[2]; const src=path.join(repo,'cv','src'); fs.mkdirSync(src,{recursive:true});

const T={
 es:{
  title:'Desarrollador de software full stack',
  contact:['+54 9 353 427-5207','urendadiego@gmail.com','linkedin.com/in/diegourenda','github.com/urendadiego','urendadiego.github.io/portfolio','Villa María, Córdoba, Argentina'],
  h:{contact:'Contacto',profile:'Perfil',exp:'Experiencia',academic:'Proyecto académico',skills:'Habilidades técnicas',tech:'Tecnologías',edu:'Educación',cert:'Certificaciones',lang:'Idiomas'},
  profile:'Desarrollador de software full stack, con tres aplicaciones en uso diario en la empresa donde trabajo. Me motivan los problemas que todavía no sé resolver: estudio lo que haga falta, lo aplico y lo sostengo en producción. Soy constante y paciente con los problemas difíciles. Diez años de atención al público me enseñaron a escuchar, a mantener la calma y a explicar lo técnico con claridad. Uso Claude Code como herramienta central y reviso y verifico cada cambio.',
  jobs:[
   {role:'Desarrollador de software (autónomo)',where:'Para Delmar Calefacción S.A.S.',when:'Dic. 2025 – actualidad',items:[
    '<b>Warma:</b> digitalización del cálculo térmico que la empresa hacía en papel desde hace más de 40 años. Diseñar una instalación pasó de 3–4 horas a 1 hora, y ya se usó en más de 50 proyectos.',
    '<b>Nexo Delmar:</b> stock, precios y ventas de MercadoLibre y Tienda Nube (~300 productos) reunidos en un solo lugar, en reemplazo de los recuentos manuales de inventario.',
    '<b>Caldera Care:</b> gestión del servicio técnico, que atiende de 10 a 15 clientes por día. Por primera vez la empresa puede medir el trabajo de cada técnico.',
    'Cada proyecto requirió aprender algo nuevo (integraciones con marketplaces, geometría de planos, webhooks) y llevarlo a producción. También: migración de un sistema legacy y corrección de los datos fiscales de ~1.800 clientes con AFIP.',
    'Desarrollo con Claude Code: planifico, acoto las tareas del agente, reviso cada cambio y lo verifico con pruebas y en la aplicación funcionando.']},
   {role:'Ventas técnicas y servicio técnico',where:'Delmar Calefacción S.A.S. · Villa María',when:'Jun. 2025 – actualidad',items:[
    'Diseño y venta de sistemas de calefacción central, desde el cálculo de la instalación hasta el presupuesto.',
    'Atención y asesoramiento técnico a clientes e instaladores.',
    'Service técnico de equipos e instalaciones de calefacción.']},
   {role:'Playero',where:'Estación de servicio Shell',when:'2015 – 2025',items:[
    'Diez años de atención al público y caja, resolviendo problemas en el momento y muchas veces bajo presión.',
    'Soporte informático del punto de venta.']}],
  academic:{name:'Monix: homebanking web y Android',meta:'Práctica Profesionalizante I · en equipo · monix-homebanking.vercel.app',text:'Homebanking hecho en equipo, conectado a un Banco Central simulado: transferencias, préstamos y pagos por QR, NFC y Bluetooth.'},
  skillsAts:[['Lenguajes','TypeScript, JavaScript, Python, SQL'],['Frontend','React, Vite, Tailwind CSS'],['Backend','FastAPI, SQLAlchemy, APIs REST'],['Bases de datos','PostgreSQL, Supabase, PL/pgSQL'],['Integraciones','OAuth 2.0, webhooks, MercadoLibre, Tienda Nube, AFIP'],['Herramientas','Git, GitHub, Vercel, Render, Linux'],['Desarrollo con IA','Claude Code, agentes de IA'],['Calidad','pruebas automatizadas (Vitest, pytest), code review'],['Uso académico','Node.js, Express, Docker']],
  skillsSide:[['Desarrollo','React, TypeScript, Python, FastAPI'],['Datos','PostgreSQL, Supabase, PL/pgSQL'],['Con IA','Claude Code, agentes de IA'],['Herramientas','Git, Vercel, Render, Linux'],['Uso académico','Node.js, Express, Docker']],
  edu:[['Analista en Sistemas de Computación','Instituto Leibnitz','2025 – 2027 (previsto)'],['Bachiller en Informática','Instituto La Santísima Trinidad','2010 – 2016']],
  cert:[['Linux nivel inicial','Instituto Leibnitz · 2026'],['EF SET English Certificate (C2)','EF · 2021 · efset.org/cert/JsXiSg']],
  langs:['Español: nativo','Inglés: C2 (EF SET 77/100)']
 },
 en:{
  title:'Full-Stack Software Developer',
  contact:['+54 9 353 427-5207','urendadiego@gmail.com','linkedin.com/in/diegourenda','github.com/urendadiego','urendadiego.github.io/portfolio','Villa María, Córdoba, Argentina'],
  h:{contact:'Contact',profile:'Profile',exp:'Experience',academic:'Academic project',skills:'Technical skills',tech:'Technologies',edu:'Education',cert:'Certifications',lang:'Languages'},
  profile:'Full-stack software developer with three applications in daily use at the company where I work. I\'m drawn to problems I don\'t yet know how to solve: I learn what\'s needed, apply it and keep it running in production. I\'m persistent and patient with hard problems, and ten years of customer-facing work taught me to listen, stay calm and explain technical things clearly. I use Claude Code as my core tool, and I review and verify every change.',
  jobs:[
   {role:'Software Developer (self-employed)',where:'For Delmar Calefacción S.A.S.',when:'Dec 2025 – present',items:[
    '<b>Warma:</b> digitized the heating load calculation the company had done on paper for over 40 years. Designing an installation went from 3–4 hours to 1 hour, across 50+ projects so far.',
    '<b>Nexo Delmar:</b> brought stock, prices and sales from MercadoLibre and Tienda Nube (~300 products) into one place, replacing manual inventory counts.',
    '<b>Caldera Care:</b> operations management for the technical service team, which handles 10 to 15 customers a day. For the first time, the company can measure each technician\'s work.',
    'Each project required learning something new (marketplace integrations, floor-plan geometry, webhooks) and taking it to production. Also migrated a legacy system and corrected the tax data of ~1,800 customers against the Argentine tax authority.',
    'I build with Claude Code: I plan, scope the agent\'s tasks, review every change, and verify it with tests and in the running app.']},
   {role:'Technical Sales and Service',where:'Delmar Calefacción S.A.S. · Villa María',when:'Jun 2025 – present',items:[
    'Design and sale of central heating systems, from installation sizing to the final quote.',
    'Technical advice to customers and installers.',
    'Service and repair of heating equipment and installations.']},
   {role:'Service Station Attendant',where:'Shell service station',when:'2015 – 2025',items:[
    'Ten years of customer service and cash handling, solving problems on the spot and often under pressure.',
    'IT support for the point of sale.']}],
  academic:{name:'Monix: web and Android home banking app',meta:'Professional Practice I · team project · monix-homebanking.vercel.app',text:'Team-built home banking app connected to a simulated Central Bank: transfers, loans, and QR, NFC and Bluetooth payments.'},
  skillsAts:[['Languages','TypeScript, JavaScript, Python, SQL'],['Frontend','React, Vite, Tailwind CSS'],['Backend','FastAPI, SQLAlchemy, REST APIs'],['Databases','PostgreSQL, Supabase, PL/pgSQL'],['Integrations','OAuth 2.0, webhooks, MercadoLibre, Tienda Nube, AFIP'],['Tools','Git, GitHub, Vercel, Render, Linux'],['AI-assisted development','Claude Code, AI agents'],['Quality','automated testing (Vitest, pytest), code review'],['Academic use','Node.js, Express, Docker']],
  skillsSide:[['Development','React, TypeScript, Python, FastAPI'],['Data','PostgreSQL, Supabase, PL/pgSQL'],['With AI','Claude Code, AI agents'],['Tools','Git, Vercel, Render, Linux'],['Academic use','Node.js, Express, Docker']],
  edu:[['Computer Systems Analyst','Instituto Leibnitz','2025 – 2027 (expected)'],['High school diploma, Computer Science track','Instituto La Santísima Trinidad','2010 – 2016']],
  cert:[['Linux, beginner level','Instituto Leibnitz · 2026'],['EF SET English Certificate (C2)','EF · 2021 · efset.org/cert/JsXiSg']],
  langs:['Spanish: native','English: C2 (EF SET 77/100)']
 }
};

const font='<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">';
const jobs=t=>t.jobs.map(j=>`<div class="job"><div class="jh"><b>${j.role}</b></div><div class="meta">${j.where} · ${j.when}</div><ul>${j.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');

function designed(l){const t=T[l];return `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><title>CV Diego Urenda (${l.toUpperCase()})</title>${font}<style>
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:'IBM Plex Sans',Arial,sans-serif;color:#1d2433;font-size:9.6pt;line-height:1.42;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;overflow:hidden;display:grid;grid-template-columns:62mm 1fr;border-top:2mm solid #C2700F}
aside{background:#EEF0F4;padding:9mm 6.5mm 8mm 8.5mm;font-size:8.9pt;line-height:1.36}
main{padding:10mm 11mm 10mm 10mm}
.photo{width:34mm;height:34mm;border-radius:50%;border:.8mm solid #C2700F;object-fit:cover;display:block;margin:0 auto 5mm}
h1{font-size:21pt;line-height:1.1;margin:0}
.sub{color:#5b6475;font-size:11pt;margin:1mm 0 5mm}
h2{color:#B0650C;font-size:11pt;margin:5mm 0 2mm;font-weight:600}
aside h2:first-of-type{margin-top:0}
aside p,aside li{margin:0}
aside .k{font-weight:600;margin-top:1.2mm}
aside h2{margin:4mm 0 1.4mm}
aside .d{color:#5b6475}
aside ul{list-style:none;padding:0;margin:0}
.job{margin-bottom:3.2mm}
.jh b{font-size:10.2pt}
.meta{color:#6b7385;font-size:9pt;margin-bottom:1mm}
main ul{margin:0;padding-left:4.5mm}
main li{margin-bottom:.9mm}
p.profile{margin:0}
</style></head><body><div class="page">
<aside>
<img class="photo" src="../../img/diego.webp" alt="">
<h2>${t.h.contact}</h2><ul>${t.contact.map(c=>`<li>${c}</li>`).join('')}</ul>
<h2>${t.h.tech}</h2>${t.skillsSide.map(([k,v])=>`<p class="k">${k}</p><p>${v}</p>`).join('')}
<h2>${t.h.lang}</h2>${t.langs.map(x=>`<p>${x}</p>`).join('')}
<h2>${t.h.edu}</h2>${t.edu.map(([a,b,c])=>`<p class="k">${a}</p><p>${b}</p><p class="d">${c}</p>`).join('')}
<h2>${t.h.cert}</h2>${t.cert.map(([a,b])=>`<p class="k">${a}</p><p class="d">${b}</p>`).join('')}
</aside>
<main>
<h1>Diego Agustín Urenda</h1><p class="sub">${t.title}</p>
<h2>${t.h.profile}</h2><p class="profile">${t.profile}</p>
<h2>${t.h.exp}</h2>${jobs(t)}
<h2>${t.h.academic}</h2><div class="job"><div class="jh"><b>${t.academic.name}</b></div><div class="meta">${t.academic.meta}</div><p style="margin:0">${t.academic.text}</p></div>
</main></div></body></html>`}

function ats(l){const t=T[l];return `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><title>CV Diego Urenda ATS (${l.toUpperCase()})</title>${font}<style>
@page{size:A4;margin:10mm 14mm}
body{margin:0;font-family:'IBM Plex Sans',Arial,sans-serif;color:#111;font-size:9.1pt;line-height:1.32}
h1{font-size:18pt;margin:0}
.sub{font-size:11pt;color:#444;margin:.5mm 0 1mm}
.contact{color:#333;margin:0}
h2{font-size:10.5pt;margin:3.2mm 0 1.2mm;border-bottom:.3mm solid #999;padding-bottom:.6mm}
.job{margin-bottom:2mm}
.sk p{margin:0 0 .4mm}
.meta{color:#444;font-size:9.2pt}
ul{margin:.8mm 0 0;padding-left:4.5mm}
li{margin-bottom:.3mm}
p{margin:0}
</style></head><body>
<h1>Diego Agustín Urenda</h1><p class="sub">${t.title}</p>
<p class="contact">${t.contact.slice(0,2).join(' | ')} | ${t.contact[5]}</p>
<p class="contact">${t.contact.slice(2,5).join(' | ')}</p>
<h2>${t.h.profile}</h2><p>${t.profile}</p>
<h2>${t.h.exp}</h2>${jobs(t)}
<h2>${t.h.academic}</h2><div class="job"><b>${t.academic.name}</b><div class="meta">${t.academic.meta}</div><p>${t.academic.text}</p></div>
<h2>${t.h.skills}</h2><div class="sk">${t.skillsAts.reduce((acc,x,i)=>{if(i%2===0)acc.push([x]);else acc[acc.length-1].push(x);return acc},[]).map(g=>'<p>'+g.map(([k,v])=>'<b>'+k+':</b> '+v).join(' · ')+'</p>').join('')}</div>
<h2>${t.h.edu}</h2>${t.edu.map(([a,b,c])=>`<p><b>${a}</b> | ${b} | ${c}</p>`).join('')}
<h2>${t.h.cert}</h2>${t.cert.map(([a,b])=>`<p>${a} | ${b}</p>`).join('')}
<h2>${t.h.lang}</h2><p>${t.langs.join('. ')}.</p>
</body></html>`}

(async()=>{
  const files={};
  for(const l of ['es','en']){
    files[`CV_Diego_Urenda_${l.toUpperCase()}`]=designed(l);
    files[`CV_Diego_Urenda_ATS_${l.toUpperCase()}`]=ats(l);
  }
  const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new'});
  for(const [name,html] of Object.entries(files)){
    const hp=path.join(src,name+'.html'); fs.writeFileSync(hp,html);
    const p=await b.newPage(); await p.goto('file:///'+hp.replace(/\\/g,'/'),{waitUntil:'networkidle0'});
    await p.evaluateHandle('document.fonts.ready');
    const over=await p.evaluate(()=>{const pg=document.querySelector('.page');return pg?[pg.scrollHeight,pg.clientHeight,document.querySelector('aside').scrollHeight,document.querySelector('main').scrollHeight]:null});
    const out=path.join(repo,'cv',name+'.pdf');
    await p.pdf({path:out,format:'A4',printBackground:true,preferCSSPageSize:true});
    await p.setViewport({width:794,height:1123,deviceScaleFactor:1.3}); await p.screenshot({path:path.join(process.cwd(),'cvprev-'+name+'.png'),fullPage:true});
    const pages=(fs.readFileSync(out,'latin1').match(/\/Type\s*\/Page[^s]/g)||[]).length;
    console.log(name,'pages:',pages,'overflow(page,client,aside,main):',over);
    await p.close();
  }
  await b.close();
})();
