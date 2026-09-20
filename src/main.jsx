import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Projects', path: '/projects' },
  { label: 'Equipment', path: '/equipment' },
  { label: 'Contact', path: '/contact' },
];

const projectGroups = [
  { id: 'all', name: 'All sectors', count: '90+' },
  { id: 'power', name: 'Power & energy', count: '24' },
  { id: 'process', name: 'Process industries', count: '38' },
  { id: 'infrastructure', name: 'Infrastructure', count: '28' },
];

const projects = [
  { type: 'power', kicker: 'Nuclear power', title: 'Kudankulam Nuclear Power Plant', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85', index: '01' },
  { type: 'power', kicker: 'Thermal power', title: 'Neyveli Lignite Corporation', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=85', index: '02' },
  { type: 'infrastructure', kicker: 'Aerospace', title: 'Indian Space Research Organisation', image: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=85', index: '03' },
  { type: 'process', kicker: 'Carbon & black', title: 'Birla Carbon India Ltd', image: 'https://images.unsplash.com/photo-1581092921461-7031e4bfb83d?auto=format&fit=crop&w=1200&q=85', index: '04' },
  { type: 'process', kicker: 'Cement', title: 'UltraTech Cements (L&T)', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85', index: '05' },
  { type: 'infrastructure', kicker: 'Heavy engineering', title: 'L&T Limited', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85', index: '06' },
];

const sectorPortfolio = [
  { title: 'Aerospace industry projects', projects: ['ISRO (Indian Space Research Organisation)'] },
  { title: 'Nuclear power projects', projects: ['Kudankulam Nuclear Power Plant', 'Kalpakkam Atomic Power Plant'] },
  { title: 'Thermal power projects', projects: ['LVS Power Plant', 'Ind-Barath Power Gencom Limited', 'Cauvery Power Generation Chennai (P) Ltd.', 'BGR Energy Systems Ltd.', 'Lanco Industries Ltd.', 'Neyveli Lignite Corporation'] },
  { title: 'Cement industry projects', projects: ['ACC Cement Plant', 'UltraTech Cements (L&T)'] },
  { title: 'Chemical industry projects', projects: ['Adheeswara Chemicals Pvt. Ltd.', 'Coromandel Indarc', 'Coromandel International Limited', 'Coromandel Fertilisers Limited', 'Kamar Chemicals & Ind. Limited', 'Keerthi (Bangalore) Pvt. Ltd.', 'Krishna Chemicals & Ind. Limited', 'Royalaseema Hi-Strength Alkalis Ltd.'] },
  { title: 'Water & effluent treatment plant projects', projects: ['Quality Water Management'] },
  { title: 'Hydrocarbon / refineries / diesel power', projects: ['Andhra Petro Chemicals Ltd.', 'V.B. Ferro Alloys Limited', 'Viki Industries Limited', 'Cetex Limited', 'U.B. Petro Products', 'Airoil - Flaregas India Limited'] },
  { title: 'Carbon & carbon black', projects: ['Epsilon Carbon Pvt. Ltd.', 'Hi-Tech Carbon', 'Philips Carbon India Ltd.'] },
  { title: 'Sugar & distilleries', projects: ['Kothari Sugars', 'Shaw Wallce & Company Limited', 'A.P. Met Distillery Limited', 'Gemini Distillery Limited', 'Khoday Distillery Limited', 'Maharashtra Distillery Limited', 'Aravind Distilleries'] },
  { title: 'Steel industry', projects: ['Kanishk Steel Limited', 'VKG Steels Limited', 'SISCOL Limited', 'Pinakini Steels Limited'] },
  { title: 'Textile industry', projects: ['Loyal Textile Limited', 'Valli Mills Limited'] },
  { title: 'Pharma & drugs industry', projects: ['Malladi Drugs & Pharmaceutical Ltd.', 'Aswini Bio-Pharma Limited', 'Lactochem Limited', 'J.K. Pharma Limited'] },
  { title: 'Glass industry', projects: ['Saint-Gobain Glass India Limited'] },
  { title: 'Automobile industry', projects: ['Visteon Ford India', 'Heavy Vehicle Factory', 'Ford Motors India Limited', 'Hwashin Automotive India Limited', 'Hyundai Motors India Limited'] },
  { title: 'Heavy engineering', projects: ['L&T Limited', 'Rishabh Engineering Limited', 'Southern Structurals Limited', 'Chennai Harbour', 'Balda Mothersons India Limited', 'Chowal India Limited', 'Liporite Limited'] },
];

const clientPartners = [
  { name: 'ISRO', label: 'Indian Space Research Organisation', domain: 'isro.gov.in', mark: 'ISRO' },
  { name: 'Birla Carbon India Ltd', label: 'Carbon & materials', domain: 'birlacarbon.com', mark: 'BIRLA\nCARBON' },
  { name: 'Saint-Gobain India Pvt Ltd', label: 'Advanced materials', domain: 'saint-gobain.com', mark: 'SAINT\nGOBAIN' },
  { name: 'Epsilon Carbon Pvt Ltd', label: 'Carbon & energy', domain: 'epsiloncarbon.com', mark: 'EPSILON\nCARBON' },
  { name: 'E.I.D.-Parry India Ltd', label: 'Aranthangi & Pugalur, Tamil Nadu', domain: 'eidparry.com', mark: 'E.I.D.\nPARRY' },
  { name: 'Reliance', label: 'Energy & manufacturing', domain: 'ril.com', mark: 'RELIANCE' },
  { name: 'Adani', label: 'Infrastructure & energy', domain: 'adani.com', mark: 'ADANI' },
  { name: 'Chennai Metro', label: 'Urban mobility', domain: 'chennaimetrorail.org', mark: 'CHENNAI\nMETRO' },
];

const equipment = [
  { title: 'Motorised Winches', detail: 'Up to 100 T', icon: '↗' },
  { title: 'Hydraulic Jacks', detail: 'Up to 400 T', icon: '⊞' },
  { title: 'Rolling Machines', detail: 'Up to 36 mm · SS / MS', icon: '○' },
  { title: 'Welding Systems', detail: 'MIG / TIG / K320', icon: '⌁' },
  { title: 'Tank Jacks', detail: 'Up to 2.5 m / 12 T', icon: '↟' },
  { title: 'Air Compressors', detail: 'Up to 40 hp', icon: '◒' },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 }
    );
    elements.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Arrow({ up = false }) {
  return <span className={`arrow ${up ? 'up' : ''}`} aria-hidden="true">↗</span>;
}

function Logo() {
  return <a href="/" className="brand" onClick={(e) => navigate(e, '/')} aria-label="Kutty Brothers home"><span className="brand-mark">KB<span>.</span></span><span className="brand-name">KUTTY<br />BROTHERS</span></a>;
}

function navigate(event, target) {
  event?.preventDefault();
  window.history.pushState({}, '', target);
  window.dispatchEvent(new Event('app-navigate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return <header className="site-header"><div className="header-inner"><Logo /><nav className={open ? 'nav-open' : ''}>{navItems.map((item) => <a key={item.path} href={item.path} className={path === item.path ? 'active' : ''} onClick={(e) => navigate(e, item.path)}>{item.label}</a>)}</nav><a className="header-cta" href="/contact" onClick={(e) => navigate(e, '/contact')}>Start an enquiry <Arrow /></a><button className={`menu-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation"><i></i><i></i></button></div></header>;
}

function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'light' : ''}`}><span></span>{children}</div>; }

function Button({ children, to = '/contact', light = false }) { return <a href={to} onClick={(e) => navigate(e, to)} className={`button ${light ? 'button-light' : ''}`}>{children}<Arrow /></a>; }

function ClientLogo({ client }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <article className="client-logo-card" aria-label={client.name}><div className="client-logo-art">{!imageFailed && <img src={`https://logo.clearbit.com/${client.domain}`} alt={`${client.name} logo`} loading="lazy" onError={() => setImageFailed(true)} />}<span className={imageFailed ? 'wordmark visible' : 'wordmark'}>{client.mark.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span></div><div className="client-logo-copy"><strong>{client.name}</strong><span>{client.label}</span></div></article>;
}

function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => { const update = () => setScrollY(window.scrollY); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <>
    <section className="hero"><div className="hero-image" style={{ transform: `scale(${1 + Math.min(scrollY, 800) / 12000}) translateY(${scrollY * 0.12}px)` }}></div><div className="hero-grain"></div><div className="hero-content"><Eyebrow light>Engineering excellence since 1982</Eyebrow><h1>Built for the<br /><em>work that matters.</em></h1><p>Fabrication, erection and engineered services for the industries that keep India moving.</p><Button to="/capabilities" light>Explore our capabilities</Button></div><div className="hero-bottom"><div className="scroll-indicator"><span className="mouse"><i></i></span>Scroll to discover</div><div className="hero-coordinate">13°04′ N&nbsp;&nbsp; 80°11′ E</div></div><div className="hero-stamp"><span>KB</span><small>Since<br />1982</small></div></section>
    <section className="intro section"><div className="intro-heading" data-reveal><Eyebrow>Who we are</Eyebrow><h2>Engineering<br />is our <em>language.</em></h2></div><div className="intro-copy" data-reveal><p className="lead">For over four decades, Kutty Brothers has transformed complex industrial requirements into dependable work on the ground.</p><p>From plant construction and boiler components to specialised equipment and shutdown support, we bring skilled people, reliable systems and an unwavering standard of safety to every site.</p><Button to="/about">Our story</Button></div><div className="statement" data-reveal><span>KB</span><p>QUALITY<br />WITHOUT<br /><em>COMPROMISE.</em></p></div></section>
    <section className="numbers"><div className="numbers-image"></div><div className="numbers-panel"><Eyebrow light>At a glance</Eyebrow><div className="stats"><div><strong>42<sup>+</sup></strong><span>Years of<br />experience</span></div><div><strong>15<sup>+</sup></strong><span>Industrial<br />sectors</span></div><div><strong>90<sup>+</sup></strong><span>Landmark<br />projects</span></div></div><p>Trusted by leading organisations across the full spectrum of Indian industry.</p></div></section>
    <section className="client-showcase"><div className="section client-showcase-head" data-reveal><div><Eyebrow>Trusted by industry leaders</Eyebrow><h2>Built with the<br /><em>best in business.</em></h2></div><p>Our work has earned the confidence of national institutions and leading industrial companies across India.</p></div><div className="client-track" data-reveal><div className="client-marquee">{[...clientPartners, ...clientPartners].map((client, index) => <ClientLogo client={client} key={`${client.name}-${index}`} />)}</div></div><div className="client-showcase-foot section" data-reveal><span>01 — 08</span><p>Hover to pause the client rail</p><span>Since 1982</span></div></section>
    <section className="services section"><div className="section-top" data-reveal><div><Eyebrow>What we do</Eyebrow><h2>Strength at<br /><em>every scale.</em></h2></div><Button to="/capabilities">All capabilities</Button></div><div className="service-list">{[
      ['01', 'Fabrication & erection', 'Precision execution for process plants, heavy structures and critical industrial systems.'],
      ['02', 'IBR components', 'Certified boiler components, pressure vessels and technical repair services.'],
      ['03', 'Operation & maintenance', 'Planned and emergency support that keeps your operations on track.'],
      ['04', 'Equipment hire', 'A capable fleet of lifting, welding, rolling and fabrication equipment.']
    ].map(([number, title, text]) => <a href="/capabilities" onClick={(e) => navigate(e, '/capabilities')} className="service-row" key={number} data-reveal><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><Arrow /></a>)}</div></section>
    <ProjectsPreview />
    <section className="contact-band"><div data-reveal><Eyebrow light>Let’s build</Eyebrow><h2>Bring us your<br /><em>toughest brief.</em></h2></div><Button to="/contact" light>Start a conversation</Button></section>
  </>;
}

function ProjectsPreview() { return <section className="projects-preview"><div className="project-preview-top section" data-reveal><div><Eyebrow light>Selected work</Eyebrow><h2>Proven under<br /><em>pressure.</em></h2></div><Button to="/projects" light>View all projects</Button></div><div className="project-feature-grid"><article className="project-feature large" data-reveal><img src={projects[0].image} alt="Industrial energy facility" /><div><span>{projects[0].kicker}</span><h3>{projects[0].title}</h3><Arrow /></div></article><article className="project-feature" data-reveal><img src={projects[2].image} alt="Space launch engineering" /><div><span>{projects[2].kicker}</span><h3>{projects[2].title}</h3><Arrow /></div></article></div></section>; }

function About() { return <>
  <PageHero eyebrow="About Kutty Brothers" title={<>Four decades of<br /><em>making things work.</em></>} text="An Indian engineering partner built on resourcefulness, skill and a promise to finish what we start." image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85" />
  <section className="section story"><div data-reveal><Eyebrow>Our beginning</Eyebrow><h2>A family business.<br />An industry <em>institution.</em></h2></div><div className="story-copy" data-reveal><p className="lead">Kutty Brothers was founded in 1982 by Mr. Ismail K and his brothers with a clear ambition: deliver work industrial clients could depend on.</p><p>Starting with fabrication and erection, KB steadily expanded into tools and machinery hire, cranes, boiler repairs, and the manufacture of boiler components and pressure vessels. Today, we operate across hydrocarbon, power, chemical, aerospace, steel, cement and more.</p><p>We remain guided by the same standards: careful project control, motivated people and quality that holds up long after handover.</p></div></section>
  <section className="principles"><div className="principle-image"></div><div className="principle-copy"><Eyebrow light>The KB standard</Eyebrow><h2>Quality and safety<br />are <em>non-negotiable.</em></h2><p>Every product, every project and every site decision is shaped by a simple belief: dependable work is responsible work.</p><div className="values"><span>01&nbsp; Skilled teams</span><span>02&nbsp; Reliable equipment</span><span>03&nbsp; Disciplined delivery</span></div></div></section>
  <Leadership />
  <Timeline />
</>; }

function Timeline() { return <section className="section timeline"><Eyebrow>Our evolution</Eyebrow><div className="timeline-grid">{[['1982', 'The beginning', 'KB is founded to undertake fabrication and erection projects.'], ['1990s', 'A broader capability', 'The business expands into equipment, machinery and crane hire.'], ['2000s', 'Technical depth', 'Boiler repairs, IBR components and pressure vessels become core strengths.'], ['Today', 'A trusted partner', 'KB supports the nation’s leading industrial and infrastructure projects.']].map(([year, title, text]) => <article data-reveal key={year}><span>{year}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>; }

function Leadership() { return <section className="leadership section"><div className="leadership-heading" data-reveal><div><Eyebrow>Leadership</Eyebrow><h2>A legacy carried<br /><em>forward.</em></h2></div><p>The values that established Kutty Brothers continue to guide its people, its projects and its future.</p></div><div className="leadership-grid"><article className="leader-card founder" data-reveal><div className="leader-portrait"><div className="portrait-glow"></div><img src="/images/ismail-founder.jpeg" alt="Mr. Ismail K, founder of Kutty Brothers" /><span>01</span></div><div className="leader-copy"><div><small>Founder</small><h3>Mr. Ismail K</h3></div><p>Founder of Kutty Brothers, whose vision and commitment to dependable engineering established the company’s foundation in 1982.</p><div className="leader-signoff"><span>KB</span><em>Since 1982</em></div></div></article><article className="leader-card ceo" data-reveal><div className="leader-portrait"><div className="portrait-glow"></div><img src="/images/riyas-ceo.jpeg" alt="Mr. Riyaz K.I, CEO of Kutty Brothers" /><span>02</span></div><div className="leader-copy"><div><small>Chief Executive Officer</small><h3>Mr. Riyaz K.I</h3></div><p>The proceedings of the company now rest with Mr. Riyaz K.I, son of Mr. Ismail, who has been involved in all company operations for the past 12 years.</p><div className="leader-signoff"><span>KB</span><em>Leading today</em></div></div></article></div></section>; }

function Capabilities() { return <>
  <PageHero eyebrow="Capabilities" title={<>Expertise that<br /><em>shows up.</em></>} text="Integrated industrial services with the reach, equipment and technical know-how to take on demanding work." image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=85" />
  <section className="section capability-intro"><div data-reveal><Eyebrow>End-to-end delivery</Eyebrow><h2>One partner.<br /><em>Serious capability.</em></h2></div><p className="lead" data-reveal>From engineering support to shutdown execution, our multidisciplinary teams work safely and precisely across the full project lifecycle.</p></section>
  <section className="capability-cards">{[
    { no: '01', title: 'Fabrication & erection', copy: 'Structural fabrication, piping, equipment erection and on-site installation for complex industrial facilities.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85' },
    { no: '02', title: 'IBR components & services', copy: 'Manufacturing and repairs for boiler components and pressure vessels, with uncompromising technical rigour.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85' },
    { no: '03', title: 'Operation & maintenance', copy: 'O&M, annual shutdowns and emergency turnarounds for critical production environments.', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85' },
    { no: '04', title: 'Transport & lifting', copy: 'Hydraulic cranes, boom lifts and transport vehicles ready for deployment when the job demands it.', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85' }
  ].map((card) => <article className="capability-card" data-reveal key={card.no}><div className="capability-photo"><img src={card.image} alt="" /></div><div className="capability-body"><span>{card.no}</span><h3>{card.title}</h3><p>{card.copy}</p><a href="/contact" onClick={(e) => navigate(e, '/contact')}>Enquire now <Arrow /></a></div></article>)}</section>
  <section className="clients section"><Eyebrow>Operations & maintenance</Eyebrow><h2>Keeping key plants <em>on.</em></h2><div className="client-grid">{['Birla Carbon India Ltd', 'Saint-Gobain India', 'Epsilon Carbon Pvt Ltd', 'E.I.D-Parry India Ltd', 'SRHHL'].map((client, index) => <div data-reveal key={client}><span>0{index + 1}</span>{client}</div>)}</div></section>
</>; }

function Projects() { const [active, setActive] = useState('all'); const visible = active === 'all' ? projects : projects.filter((project) => project.type === active); return <>
  <PageHero eyebrow="Projects" title={<>Work that<br /><em>moves industry.</em></>} text="A cross-sector record of solving high-stakes engineering challenges for India's leading organisations." image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=85" />
  <section className="section project-index"><div className="project-index-top"><div data-reveal><Eyebrow>Our portfolio</Eyebrow><h2>Across the map.<br /><em>Across the spectrum.</em></h2></div><p data-reveal>Our work has supported industrial progress across power, process, manufacturing and national infrastructure.</p></div><div className="filter-bar" data-reveal>{projectGroups.map((group) => <button className={active === group.id ? 'selected' : ''} key={group.id} onClick={() => setActive(group.id)}>{group.name}<span>{group.count}</span></button>)}</div><div className="project-grid">{visible.map((project) => <article className="project-card" key={project.index}><img src={project.image} alt="" /><div className="project-overlay"><span>{project.index} / {project.kicker}</span><h3>{project.title}</h3><Arrow /></div></article>)}</div></section>
  <section className="section project-directory"><div className="directory-heading" data-reveal><div><Eyebrow>Full project register</Eyebrow><h2>Depth wherever<br />it <em>counts.</em></h2></div><p>From national infrastructure to specialist process plants, the Kutty Brothers record spans the industries that build, power and move India.</p></div><div className="sector-project-grid">{sectorPortfolio.map((sector, index) => <article className="sector-project-card" data-reveal key={sector.title}><div className="sector-card-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{sector.projects.length} {sector.projects.length === 1 ? 'project' : 'projects'}</span></div><h3>{sector.title}</h3><ul>{sector.projects.map((project) => <li key={project}>{project}</li>)}</ul><div className="sector-card-bottom"><span>View sector experience</span><Arrow /></div></article>)}</div></section>
  <section className="sector-strip"><p>Hydrocarbon <i>✦</i> Chemical <i>✦</i> Nuclear <i>✦</i> Cement <i>✦</i> Aerospace <i>✦</i> Steel <i>✦</i> Power</p></section>
</>; }

function Equipment() { return <>
  <PageHero eyebrow="Tools & equipment" title={<>Ready when the<br /><em>work calls.</em></>} text="A versatile fleet of proven equipment, available to strengthen your site capacity and keep your programme moving." image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85" />
  <section className="section equipment-intro"><div data-reveal><Eyebrow>Equipment hire</Eyebrow><h2>Capability you<br />can <em>call on.</em></h2></div><p className="lead" data-reveal>Access well-maintained equipment and technical support from a team that understands the realities of industrial worksites.</p></section><section className="equipment-grid section">{equipment.map((item, i) => <article className="equipment-card" data-reveal key={item.title}><span className="eq-count">0{i + 1}</span><div className="eq-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.detail}</p><a href="/contact" onClick={(e) => navigate(e, '/contact')}>Check availability <Arrow /></a></article>)}</section>
  <section className="equipment-cta"><div><Eyebrow light>Need something specific?</Eyebrow><h2>Tell us what you<br /><em>need to lift.</em></h2></div><Button light>Talk to our team</Button></section>
</>; }

function Contact() { const [submitted, setSubmitted] = useState(false); function submit(event) { event.preventDefault(); setSubmitted(true); } return <>
  <section className="contact-hero"><div><Eyebrow light>Contact us</Eyebrow><h1>Let’s get<br /><em>to work.</em></h1></div><p>For project enquiries, equipment availability or partnership opportunities, our team is ready to talk.</p></section>
  <section className="section contact-main"><div className="contact-details" data-reveal><Eyebrow>Find us</Eyebrow><h2>Chennai,<br /><em>Tamil Nadu.</em></h2><div className="detail-list"><a href="https://maps.google.com/?q=276-D+Vanagaram+Road+Athipet+Chennai" target="_blank" rel="noreferrer"><span>Visit</span>Door No: 276-D, Vanagaram Road,<br />Athipet, Chennai, TN 600058</a><a href="tel:+914426521027"><span>Call</span>+91 44 2652 1027</a><a href="mailto:info@kuttybrothers.in"><span>Email</span>info@kuttybrothers.in</a></div></div><form className="enquiry-form" onSubmit={submit} data-reveal>{submitted ? <div className="form-success"><span>✓</span><h3>Thank you.</h3><p>Your enquiry has been received. Our team will be in touch shortly.</p><button type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <><div className="form-heading"><Eyebrow>Send an enquiry</Eyebrow><p>Tell us a little about your requirement.</p></div><label>Name<input required placeholder="Your name" /></label><label>Company name<input placeholder="Company / organisation" /></label><div className="form-dual"><label>Email ID<input type="email" required placeholder="you@company.com" /></label><label>Contact number<input type="tel" placeholder="+91" /></label></div><label>How can we help?<textarea required rows="4" placeholder="Tell us about the project or equipment you need"></textarea></label><label className="consent"><input type="checkbox" required /><span>I agree to receive a response to this enquiry.</span></label><button className="button form-button" type="submit">Send enquiry <Arrow /></button></>}</form></section>
</>; }

function PageHero({ eyebrow, title, text, image }) { return <section className="page-hero"><div className="page-hero-image" style={{ backgroundImage: `url(${image})` }}></div><div className="page-hero-shade"></div><div className="page-hero-content"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>; }

function Footer() { return <footer><div className="footer-main"><div><Logo /><p>Precision engineering and dependable industrial services since 1982.</p></div><div className="footer-links"><div><span>Explore</span>{navItems.slice(1).map((item) => <a href={item.path} onClick={(e) => navigate(e, item.path)} key={item.path}>{item.label}</a>)}</div><div><span>Contact</span><a href="tel:+914426521027">+91 44 2652 1027</a><a href="mailto:info@kuttybrothers.in">info@kuttybrothers.in</a><p>276-D, Vanagaram Road,<br />Athipet, Chennai 600058</p></div></div></div><div className="footer-base"><span>© {new Date().getFullYear()} Kutty Brothers</span><span>Chennai, India</span><a href="#top">Back to top ↑</a></div></footer>; }

function App() { const [path, setPath] = useState(window.location.pathname); useReveal(); useEffect(() => { const update = () => setPath(window.location.pathname); window.addEventListener('popstate', update); window.addEventListener('app-navigate', update); return () => { window.removeEventListener('popstate', update); window.removeEventListener('app-navigate', update); }; }, []); const pages = { '/': <Home />, '/about': <About />, '/capabilities': <Capabilities />, '/projects': <Projects />, '/equipment': <Equipment />, '/contact': <Contact /> }; return <><div id="top"></div><Header path={path} /><main>{pages[path] ?? <Home />}</main><Footer /></>; }

createRoot(document.getElementById('root')).render(<App />);
