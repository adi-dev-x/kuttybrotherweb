import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Manufacturing, IBR Components & Services', path: '/capabilities' },
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
  {
    id: 'p1',
    type: 'power',
    kicker: 'Nuclear power',
    title: 'Kudankulam Nuclear Power Plant',
    client: 'Nuclear Power Corporation of India Ltd',
    location: 'Kudankulam, Tamil Nadu',
    year: '2019 - Present',
    scope: 'Specialised high-pressure piping erection, heavy equipment rigging, and certified nuclear grade fabrication.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '01'
  },
  {
    id: 'p2',
    type: 'power',
    kicker: 'Thermal power',
    title: 'Neyveli Lignite Corporation',
    client: 'Neyveli Lignite Corp Ltd',
    location: 'Neyveli, Tamil Nadu',
    year: '2015 - 2021',
    scope: 'Turnkey boiler structural erection, ducting overhaul, pressure vessel replacement, and annual shutdown support.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '02'
  },
  {
    id: 'p3',
    type: 'infrastructure',
    kicker: 'Aerospace',
    title: 'Indian Space Research Organisation',
    client: 'ISRO / SDSC SHAR',
    location: 'Sriharikota, AP',
    year: '2018 - Present',
    scope: 'Heavy launcher launchpad support structures, high-capacity winching systems, and precision structural fabrication.',
    image: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '03'
  },
  {
    id: 'p4',
    type: 'process',
    kicker: 'Carbon & black',
    title: 'Birla Carbon India Ltd',
    client: 'Aditya Birla Group',
    location: 'Gummidipoondi, TN',
    year: '2012 - Ongoing',
    scope: 'Continuous O&M services, reactor vessel overhaul, heavy duct fabrication, and mechanical turnarounds.',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e4bfb83d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '04'
  },
  {
    id: 'p5',
    type: 'process',
    kicker: 'Cement',
    title: 'UltraTech Cements (L&T)',
    client: 'UltraTech Cement / L&T',
    location: 'Reddiyarpatti, TN',
    year: '2016 - 2020',
    scope: 'Kiln shell repair, heavy plate rolling up to 36mm, clinker cooler structural erection, and silo fabrication.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '05'
  },
  {
    id: 'p6',
    type: 'infrastructure',
    kicker: 'Heavy engineering',
    title: 'Larsen & Toubro Limited',
    client: 'L&T Heavy Engineering',
    location: 'Kattupalli Port, Chennai',
    year: '2014 - Present',
    scope: 'Yard mechanical support, heavy crane lifting operations, subsea module pipe fabrication, and structural assembly.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80&fm=webp',
    index: '06'
  }
];

const sectorPortfolio = [
  { title: 'Aerospace industry projects', projects: ['ISRO (Indian Space Research Organisation)'], image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1000&q=80&fm=webp' },
  { title: 'Nuclear power projects', projects: ['Kudankulam Nuclear Power Plant', 'Kalpakkam Atomic Power Plant'], image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80&fm=webp' },
  { title: 'Thermal power projects', projects: ['LVS Power Plant', 'Ind-Barath Power Gencom Limited', 'Cauvery Power Generation Chennai (P) Ltd.', 'BGR Energy Systems Ltd.', 'Lanco Industries Ltd.', 'Neyveli Lignite Corporation'], image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80&fm=webp' },
  { title: 'Cement industry projects', projects: ['ACC Cement Plant', 'UltraTech Cements (L&T)'], image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80&fm=webp' },
  { title: 'Chemical industry projects', projects: ['Adheeswara Chemicals Pvt. Ltd.', 'Coromandel Indarc', 'Coromandel International Limited', 'Coromandel Fertilisers Limited', 'Kamar Chemicals & Ind. Limited', 'Keerthi (Bangalore) Pvt. Ltd.', 'Krishna Chemicals & Ind. Limited', 'Royalaseema Hi-Strength Alkalis Ltd.'], image: '/images/manufac/reactors.jpg' },
  { title: 'Water & effluent treatment plant projects', projects: ['Quality Water Management'], image: '/images/manufac/cartridge-filter-tanks.jpg' },
  { title: 'Hydrocarbon / refineries / diesel power', projects: ['Andhra Petro Chemicals Ltd.', 'V.B. Ferro Alloys Limited', 'Viki Industries Limited', 'Cetex Limited', 'U.B. Petro Products', 'Airoil - Flaregas India Limited'], image: '/images/manufac/distillation-column.jpg' },
  { title: 'Carbon & carbon black', projects: ['Epsilon Carbon Pvt. Ltd.', 'Hi-Tech Carbon', 'Philips Carbon India Ltd.'], image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80&fm=webp' },
  { title: 'Sugar & distilleries', projects: ['Kothari Sugars', 'Shaw Wallce & Company Limited', 'A.P. Met Distillery Limited', 'Gemini Distillery Limited', 'Khoday Distillery Limited', 'Maharashtra Distillery Limited', 'Aravind Distilleries'], image: '/images/manufac/drying-towers.jpg' },
  { title: 'Steel industry', projects: ['Kanishk Steel Limited', 'VKG Steels Limited', 'SISCOL Limited', 'Pinakini Steels Limited'], image: '/images/manufac/industrial-sheds.jpg' },
  { title: 'Textile industry', projects: ['Loyal Textile Limited', 'Valli Mills Limited'], image: '/images/manufac/heavy-sliding-doors.jpg' },
  { title: 'Pharma & drugs industry', projects: ['Malladi Drugs & Pharmaceutical Ltd.', 'Aswini Bio-Pharma Limited', 'Lactochem Limited', 'J.K. Pharma Limited'], image: '/images/manufac/hot-gas-filters.png' },
  { title: 'Glass industry', projects: ['Saint-Gobain Glass India Limited'], image: '/images/manufac/furnaces.jpg' },
  { title: 'Automobile industry', projects: ['Visteon Ford India', 'Heavy Vehicle Factory', 'Ford Motors India Limited', 'Hwashin Automotive India Limited', 'Hyundai Motors India Limited'], image: '/images/manufac/paint-booth.jpg' },
  { title: 'Heavy engineering', projects: ['L&T Limited', 'Rishabh Engineering Limited', 'Southern Structurals Limited', 'Chennai Harbour', 'Balda Mothersons India Limited', 'Chowal India Limited', 'Liporite Limited'], image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80&fm=webp' },
];

const clientPartners = [
  { id: 'isro', name: 'ISRO', image: '/images/clients/isro.png' },
  { id: 'birla', name: 'Birla Carbon', image: '/images/clients/birla-carbon.png' },
  { id: 'parrys', name: 'Parrys', image: '/images/clients/parrys.png' },
  { id: 'epsilon', name: 'Epsilon Carbon', image: '/images/clients/epsilon-carbon.jpg' },
  { id: 'reliance', name: 'Reliance Industries', image: '/images/clients/reliance.png' },
];

// 29 Manufacturing, IBR Components & Services Items with images from manufac folder
const manufacturingItems = [
  { id: 'm1', cat: 'vessels', title: 'Vessel', desc: 'High-pressure chemical and process storage vessels manufactured to ASME and IBR standards.', image: '/images/manufac/vessel.png' },
  { id: 'm2', cat: 'process', title: 'Reactors', desc: 'Jacketed and limpeted chemical reaction vessels with precision agitation systems.', image: '/images/manufac/reactors.jpg' },
  { id: 'm3', cat: 'structures', title: 'Industrial Sheds & Built-Up Structures', desc: 'Pre-engineered steel buildings, heavy factory sheds, built-up girders, and crane gantries.', image: '/images/manufac/industrial-sheds.jpg' },
  { id: 'm4', cat: 'heavy', title: 'Heavy Equipments', desc: 'Custom engineered winch systems, heavy lifting beams, and specialized machinery components.', image: '/images/manufac/heavy-equipments.jpg' },
  { id: 'm5', cat: 'process', title: 'Dryers', desc: 'Rotary dryers, fluid bed dryers, and continuous thermal drying systems for industrial processing.', image: '/images/manufac/dryers.jpg' },
  { id: 'm6', cat: 'piping', title: 'Piping and Allied Equipment', desc: 'IBR certified high-pressure steam spools, manifolds, valve headers, and alloy steel piping systems.', image: '/images/manufac/piping-allied.jpg' },
  { id: 'm7', cat: 'vessels', title: 'Storage Tanks', desc: 'Large capacity vertical & horizontal storage tanks in Carbon Steel (MS) and Stainless Steel (SS).', image: '/images/manufac/storage-tanks.jpg' },
  { id: 'm8', cat: 'heavy', title: 'Launching Pads', desc: 'High-precision aerospace launchpad support structures, umbilical towers, and erection frames.', image: '/images/manufac/launching-pads.jpg' },
  { id: 'm9', cat: 'vessels', title: 'Storage Silos ( MS / SS )', desc: 'Mild steel & Stainless steel storage silos for cement, fly ash, carbon black, and bulk materials.', image: '/images/manufac/storage-silos.jpg' },
  { id: 'm10', cat: 'structures', title: 'Heavy Sliding Doors', desc: 'Motorised industrial hangar doors, blast-resistant doors, and acoustic sliding barriers.', image: '/images/manufac/heavy-sliding-doors.jpg' },
  { id: 'm11', cat: 'filtration', title: 'Bag filters & ESP', desc: 'Pulse-jet baghouses and Electrostatic Precipitators (ESP) for stack emission control.', image: '/images/manufac/bag-filters-esp.jpg' },
  { id: 'm12', cat: 'heavy', title: 'Chimney / Stack', desc: 'Self-supporting and guyed steel industrial chimneys, flues, and high-temperature thermal exhaust stacks.', image: '/images/manufac/chimney-stack.jpg' },
  { id: 'm13', cat: 'heavy', title: 'Chutes', desc: 'Heavy-duty material transfer chutes with abrasion-resistant liners and drop boxes.', image: '/images/manufac/chutes.jpg' },
  { id: 'm14', cat: 'vessels', title: 'Dish Ends', desc: 'Torispherical, ellipsoidal, and hemispherical dished ends spun and pressed to code.', image: '/images/manufac/dish-ends.jpg' },
  { id: 'm15', cat: 'filtration', title: 'Hot Gas Filters', desc: 'Ceramic and metallic hot gas filtration vessels engineered for high-temperature gas cleanup.', image: '/images/manufac/hot-gas-filters.png' },
  { id: 'm16', cat: 'thermal', title: 'Heat Exchangers', desc: 'Shell & tube heat exchangers, condensers, and reboilers built to TEMA and IBR specifications.', image: '/images/manufac/heat-exchangers.png' },
  { id: 'm17', cat: 'thermal', title: 'Evaporators', desc: 'Multiple-effect evaporators and falling film evaporators for effluent zero liquid discharge (ZLD) plants.', image: '/images/manufac/evaporators.jpg' },
  { id: 'm18', cat: 'thermal', title: 'Furnaces', desc: 'Annealing furnaces, process heat ovens, and refractory-lined high-temperature combustion chambers.', image: '/images/manufac/furnaces.jpg' },
  { id: 'm19', cat: 'filtration', title: 'Cartridge Filter Tanks', desc: 'Stainless steel multi-cartridge liquid filter tanks for pharmaceutical and chemical processes.', image: '/images/manufac/cartridge-filter-tanks.jpg' },
  { id: 'm20', cat: 'piping', title: 'Dampers', desc: 'Louver dampers, butterfly dampers, and guillotine gas isolation gates for power & steel plants.', image: '/images/manufac/dampers.jpg' },
  { id: 'm21', cat: 'structures', title: 'Bunkers', desc: 'Heavy plate coal bunkers, limestone bins, and raw material surge hoppers.', image: '/images/manufac/bunkers.jpg' },
  { id: 'm22', cat: 'process', title: 'Distillation Column', desc: 'High-aspect distillation towers, fractionating columns, and packed absorption columns.', image: '/images/manufac/distillation-column.jpg' },
  { id: 'm23', cat: 'piping', title: 'Expansion Bellows', desc: 'Metallic expansion joints, fabric bellows, and flexible duct expansion relief connectors.', image: '/images/manufac/expansion-bellows.jpg' },
  { id: 'm24', cat: 'structures', title: 'Hoppers', desc: 'Conical and rectangular discharge hoppers with internal wear protection liners.', image: '/images/manufac/hoppers.jpg' },
  { id: 'm25', cat: 'structures', title: 'Paint Booth (Automobile)', desc: 'Downdraft industrial paint spray booths with heated air handling and exhaust filtration.', image: '/images/manufac/paint-booth.jpg' },
  { id: 'm26', cat: 'process', title: 'Drying Towers', desc: 'Spray drying towers and gas absorption columns for chemical and food industry processing.', image: '/images/manufac/drying-towers.jpg' },
  { id: 'm27', cat: 'process', title: 'Absorption Towers', desc: 'Chemical absorption columns and gas scrubbers engineered for toxic emission removal.', image: '/images/manufac/absorption-towers.jpg' },
  { id: 'm28', cat: 'vessels', title: 'Digesters', desc: 'Anaerobic digesters, pulp digesters, and high-capacity bio-process treatment tanks.', image: '/images/manufac/digesters.jpg' },
  { id: 'm29', cat: 'thermal', title: 'IBR', desc: 'Certified IBR steam headers, boilers, superheaters, steam drums, and boiler components.', image: '/images/manufac/ibr.jpg' },
];

const equipment = [
  { id: 'eq1', title: 'Motorised Winches', detail: 'Heavy-duty winch systems up to 100 T capacity with dual braking.', icon: '↗', capacity: 'Up to 100 T' },
  { id: 'eq2', title: 'Hydraulic Jacks', detail: 'High-tonnage synchronous lifting hydraulic jacks.', icon: '⊞', capacity: 'Up to 400 T' },
  { id: 'eq3', title: 'Rolling Machines', detail: '3-roller precision bending machines for heavy SS & MS plates.', icon: '○', capacity: 'Up to 36 mm' },
  { id: 'eq4', title: 'Welding Systems', detail: 'Industrial multi-process MIG / TIG / K320 automatic welding plants.', icon: '⌁', capacity: 'Certified IBR' },
  { id: 'eq5', title: 'Tank Jacks', detail: 'Specialised hydraulic tank erection jacking equipment.', icon: '↟', capacity: 'Up to 12 T / 2.5 m' },
  { id: 'eq6', title: 'Air Compressors', detail: 'High-pressure diesel and electric industrial air compressor fleet.', icon: '◒', capacity: 'Up to 40 hp' },
];

function useReveal(dependency) {
  useEffect(() => {
    let observer;
    let safetyTimer;

    const revealAll = () => {
      const elements = document.querySelectorAll('[data-reveal]');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '100px 0px' }
      );

      elements.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 150) {
          item.classList.add('is-visible');
        } else {
          observer.observe(item);
        }
      });
    };

    const req = requestAnimationFrame(() => {
      revealAll();
      safetyTimer = setTimeout(() => {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
          el.classList.add('is-visible');
        });
      }, 250);
    });

    return () => {
      cancelAnimationFrame(req);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (observer) observer.disconnect();
    };
  }, [dependency]);
}

function AnimatedCounter({ end, duration = 2000, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const targetNumber = parseInt(end, 10);
    if (isNaN(targetNumber)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * targetNumber));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(targetNumber);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <strong ref={elementRef}>{count}<sup>{suffix}</sup></strong>;
}

function Arrow({ up = false }) {
  return <span className={`arrow ${up ? 'up' : ''}`} aria-hidden="true">↗</span>;
}

function Logo() {
  return (
    <a href="/" className="brand" onClick={(e) => navigate(e, '/')} aria-label="Kutty Brothers home">
      <img src="/images/kutty-logo.jpg" alt="Kutty Brothers" className="brand-logo-img" />
      <span className="brand-name">KUTTY<br />BROTHERS</span>
    </a>
  );
}

function navigate(event, target) {
  event?.preventDefault();
  window.history.pushState({}, '', target);
  window.dispatchEvent(new Event('app-navigate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Logo />
        <nav className={open ? 'nav-open' : ''}>
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={path === item.path ? 'active' : ''}
              onClick={(e) => navigate(e, item.path)}
              title={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/contact" onClick={(e) => navigate(e, '/contact')}>
          Start enquiry <Arrow />
        </a>
        <button
          className={`menu-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <i></i>
          <i></i>
        </button>
      </div>
    </header>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? 'light' : ''}`}>
      <span></span>
      {children}
    </div>
  );
}

function Button({ children, to = '/contact', light = false, onClick }) {
  if (onClick) {
    return (
      <button onClick={onClick} className={`button ${light ? 'button-light' : ''}`}>
        {children}<Arrow />
      </button>
    );
  }
  return (
    <a href={to} onClick={(e) => navigate(e, to)} className={`button ${light ? 'button-light' : ''}`}>
      {children}<Arrow />
    </a>
  );
}

function ClientLogo({ client }) {
  return (
    <article className="client-logo-card" aria-label={client.name}>
      <div className="client-logo-art">
        <div className="client-img-wrapper">
          <img
            src={client.image}
            alt={`${client.name} logo`}
            className="client-bw-logo"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>✓</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  return React.useContext(ToastContext);
}

function ProjectModal({ project, onClose, onEnquire }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow" style={{ fontSize: '10px' }}>{project.kicker}</span>
            <h3>{project.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <img className="modal-image" src={project.image} alt={project.title} />
          <p className="lead" style={{ fontSize: '16px' }}>{project.scope}</p>

          <div className="modal-specs-grid">
            <div className="modal-spec-item">
              <label>Client</label>
              <strong>{project.client}</strong>
            </div>
            <div className="modal-spec-item">
              <label>Location</label>
              <strong>{project.location}</strong>
            </div>
            <div className="modal-spec-item">
              <label>Project Timeline</label>
              <strong>{project.year}</strong>
            </div>
            <div className="modal-spec-item">
              <label>Sector Category</label>
              <strong style={{ textTransform: 'capitalize' }}>{project.type} Engineering</strong>
            </div>
          </div>

          <Button onClick={() => { onClose(); onEnquire(project); }}>
            Enquire about similar projects
          </Button>
        </div>
      </div>
    </div>
  );
}

function ManufacturingModal({ item, onClose, onEnquire }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Manufacturing & IBR Specifications</span>
            <h3>{item.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <img className="modal-image" src={item.image} alt={item.title} style={{ objectFit: 'contain', background: '#f7f6f1', maxHeight: '320px' }} />
          <p className="lead" style={{ fontSize: '16px' }}>{item.desc}</p>
          <div className="modal-specs-grid">
            <div className="modal-spec-item">
              <label>Standard Code</label>
              <strong>ASME / IBR / IS Codes</strong>
            </div>
            <div className="modal-spec-item">
              <label>Material Grades</label>
              <strong>SS 304/316, Carbon Steel (MS), Alloy Steel</strong>
            </div>
          </div>
          <Button onClick={() => { onClose(); onEnquire(item); }}>
            Request Spec Sheet & Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}

function EquipmentQuoteModal({ item, onClose, onSubmit }) {
  if (!item) return null;
  const [formData, setFormData] = useState({ name: '', phone: '', days: '15' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item, formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Equipment Rental Enquiry</span>
            <h3>Request {item.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div style={{ background: '#f7f6f1', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
            <strong style={{ display: 'block', fontSize: '15px' }}>{item.title}</strong>
            <span style={{ fontSize: '12px', color: '#666' }}>Specification: {item.detail} ({item.capacity})</span>
          </div>

          <label style={{ display: 'block', marginBottom: '16px' }}>
            Your Name
            <input
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '16px' }}>
            Contact Number
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '24px' }}>
            Estimated Hire Duration (Days)
            <select
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: e.target.value })}
            >
              <option value="7">1 Week (7 Days)</option>
              <option value="15">15 Days</option>
              <option value="30">1 Month (30 Days)</option>
              <option value="90">3 Months (Long term)</option>
            </select>
          </label>

          <button type="submit" className="button modal-submit">
            Submit Availability Request <Arrow />
          </button>
        </form>
      </div>
    </div>
  );
}

function FloatingHub() {
  return (
    <div className="floating-hub">
      <a href="tel:+914426521027" className="floating-btn" title="Call Kutty Brothers">
        <span className="floating-icon">📞</span>
        <span>Call Us</span>
      </a>
      <a href="/contact" onClick={(e) => navigate(e, '/contact')} className="floating-btn" title="Quick Enquiry">
        <span className="floating-icon">✉</span>
        <span>Enquire</span>
      </a>
    </div>
  );
}

function HeroSection() {
  const heroImageRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 1000 && heroImageRef.current) {
        const scale = 1 + Math.min(scrollY, 800) / 10000;
        const translateY = scrollY * 0.12;
        heroImageRef.current.style.transform = `scale(${scale}) translate3d(0, ${translateY}px, 0)`;
      }
    };

    const handleScroll = () => {
      animationFrameId = window.requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-image" ref={heroImageRef}></div>
      <div className="hero-grain"></div>
      <div className="hero-content">
        <div className="status-pill">
          <span className="pulse"></span> Operational Across India
        </div>
        <Eyebrow light>Engineering excellence since 1982</Eyebrow>
        <h1>
          Built for the<br />
          <em>work that matters.</em>
        </h1>
        <p>Manufacturing, IBR pressure components, heavy fabrication, and machinery for the industries that keep India moving.</p>
        <Button to="/capabilities" light>Explore manufacturing & IBR</Button>
      </div>

      <div className="hero-bottom">
        <div className="scroll-indicator">
          <span className="mouse"><i></i></span>Scroll to discover
        </div>
        <div className="hero-coordinate">13°04′ N&nbsp;&nbsp; 80°11′ E — CHENNAI</div>
      </div>

      <div className="hero-stamp">
        <span>KB</span>
        <small>Since<br />1982</small>
      </div>
    </section>
  );
}

function Home({ onSelectProject }) {
  return (
    <>
      <HeroSection />

      <section className="intro section">
        <div className="intro-heading" data-reveal>
          <Eyebrow>Who we are</Eyebrow>
          <h2>Engineering<br />is our <em>language.</em></h2>
        </div>
        <div className="intro-copy" data-reveal>
          <p className="lead">For over four decades, Kutty Brothers has transformed complex industrial requirements into dependable work on the ground.</p>
          <p>From plant construction and boiler components to specialized equipment and shutdown support, we bring skilled people, reliable systems and an unwavering standard of safety to every site.</p>
          <Button to="/about">Our story</Button>
        </div>
        <div className="statement" data-reveal>
          <span>KB</span>
          <p>QUALITY<br />WITHOUT<br /><em>COMPROMISE.</em></p>
        </div>
      </section>

      <section className="numbers">
        <div className="numbers-image"></div>
        <div className="numbers-panel">
          <Eyebrow light>At a glance</Eyebrow>
          <div className="stats">
            <div>
              <AnimatedCounter end="42" suffix="+" />
              <span>Years of<br />experience</span>
            </div>
            <div>
              <AnimatedCounter end="15" suffix="+" />
              <span>Industrial<br />sectors</span>
            </div>
            <div>
              <AnimatedCounter end="90" suffix="+" />
              <span>Landmark<br />projects</span>
            </div>
          </div>
          <p>Trusted by leading national institutions and industrial conglomerates across the full spectrum of Indian industry.</p>
        </div>
      </section>

      <section className="client-showcase">
        <div className="section client-showcase-head" data-reveal>
          <div>
            <Eyebrow>Trusted by industry leaders</Eyebrow>
            <h2>Built with the<br /><em>best in business.</em></h2>
          </div>
          <p>Our work has earned the confidence of national institutions and leading industrial companies across India.</p>
        </div>
        <div className="client-marquee-container" data-reveal>
          {/* Row 1: Moves Left */}
          <div className="client-track">
            <div className="client-marquee move-left">
              {[...clientPartners, ...clientPartners, ...clientPartners, ...clientPartners].map((client, index) => (
                <ClientLogo client={client} key={`r1-${client.id}-${index}`} />
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="client-track">
            <div className="client-marquee move-right">
              {[...clientPartners.slice().reverse(), ...clientPartners.slice().reverse(), ...clientPartners.slice().reverse(), ...clientPartners.slice().reverse()].map((client, index) => (
                <ClientLogo client={client} key={`r2-${client.id}-${index}`} />
              ))}
            </div>
          </div>

          {/* Row 3: Moves Left */}
          <div className="client-track">
            <div className="client-marquee move-left-alt">
              {[...clientPartners.slice(2), ...clientPartners.slice(0, 2), ...clientPartners.slice(2), ...clientPartners.slice(0, 2), ...clientPartners.slice(2), ...clientPartners.slice(0, 2), ...clientPartners.slice(2), ...clientPartners.slice(0, 2)].map((client, index) => (
                <ClientLogo client={client} key={`r3-${client.id}-${index}`} />
              ))}
            </div>
          </div>

          {/* Row 4: Moves Right */}
          <div className="client-track">
            <div className="client-marquee move-right-alt">
              {[...clientPartners.slice(4), ...clientPartners.slice(0, 4), ...clientPartners.slice(4), ...clientPartners.slice(0, 4), ...clientPartners.slice(4), ...clientPartners.slice(0, 4), ...clientPartners.slice(4), ...clientPartners.slice(0, 4)].map((client, index) => (
                <ClientLogo client={client} key={`r4-${client.id}-${index}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="client-showcase-foot section" data-reveal>
          <span>01 — 05</span>
          <p>Leading Industrial Partners & Institutions</p>
          <span>Established 1982</span>
        </div>
      </section>

      <section className="services section">
        <div className="section-top" data-reveal>
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2>Strength at<br /><em>every scale.</em></h2>
          </div>
          <Button to="/capabilities">Manufacturing & IBR</Button>
        </div>
        <div className="service-list">
          {[
            ['01', 'Fabrication & erection', 'Precision execution for process plants, heavy structures and critical industrial systems.'],
            ['02', 'IBR components', 'Certified boiler components, pressure vessels and technical repair services.'],
            ['03', 'Operation & maintenance', 'Planned turnarounds and emergency support that keeps your operations on track.'],
            ['04', 'Equipment hire', 'A capable fleet of lifting winches, hydraulic jacks, rolling and welding equipment.']
          ].map(([number, title, text]) => (
            <a
              href="/capabilities"
              onClick={(e) => navigate(e, '/capabilities')}
              className="service-row"
              key={number}
              data-reveal
            >
              <span className="service-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <ProjectsPreview onSelectProject={onSelectProject} />

      <section className="contact-band">
        <div data-reveal>
          <Eyebrow light>Let’s build</Eyebrow>
          <h2>Bring us your<br /><em>toughest brief.</em></h2>
        </div>
        <Button to="/contact" light>Start a conversation</Button>
      </section>
    </>
  );
}

function ProjectsPreview({ onSelectProject }) {
  return (
    <section className="projects-preview">
      <div className="project-preview-top section" data-reveal>
        <div>
          <Eyebrow light>Selected work</Eyebrow>
          <h2>Proven under<br /><em>pressure.</em></h2>
        </div>
        <Button to="/projects" light>View all projects</Button>
      </div>
      <div className="project-feature-grid">
        <article
          className="project-feature large"
          data-reveal
          onClick={() => onSelectProject(projects[0])}
        >
          <img src={projects[0].image} alt="Industrial energy facility" loading="lazy" />
          <div>
            <span>{projects[0].kicker}</span>
            <h3>{projects[0].title}</h3>
            <Arrow />
          </div>
        </article>
        <article
          className="project-feature"
          data-reveal
          onClick={() => onSelectProject(projects[2])}
        >
          <img src={projects[2].image} alt="Space launch engineering" loading="lazy" />
          <div>
            <span>{projects[2].kicker}</span>
            <h3>{projects[2].title}</h3>
            <Arrow />
          </div>
        </article>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Kutty Brothers"
        title={<>Four decades of<br /><em>making things work.</em></>}
        text="An Indian engineering partner built on resourcefulness, skill and a promise to finish what we start."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80&fm=webp"
      />
      <section className="section story">
        <div data-reveal>
          <Eyebrow>Our beginning</Eyebrow>
          <h2>A family business.<br />An industry <em>institution.</em></h2>
        </div>
        <div className="story-copy" data-reveal>
          <p className="lead">Kutty Brothers was founded in 1982 by Mr. Ismail K and his brothers with a clear ambition: deliver work industrial clients could depend on.</p>
          <p>Starting with fabrication and erection, KB steadily expanded into tools and machinery hire, cranes, boiler repairs, and the manufacture of boiler components and pressure vessels. Today, we operate across hydrocarbon, power, chemical, aerospace, steel, cement and more.</p>
          <p>We remain guided by the same standards: careful project control, motivated people and quality that holds up long after handover.</p>
        </div>
      </section>
      <section className="principles">
        <div className="principle-image"></div>
        <div className="principle-copy">
          <Eyebrow light>The KB standard</Eyebrow>
          <h2>Quality and safety<br />are <em>non-negotiable.</em></h2>
          <p>Every product, every project and every site decision is shaped by a simple belief: dependable work is responsible work.</p>
          <div className="values">
            <span>01&nbsp; Skilled teams & certified welders</span>
            <span>02&nbsp; Well-maintained equipment fleet</span>
            <span>03&nbsp; Disciplined site execution</span>
          </div>
        </div>
      </section>
      <Leadership />
      <Timeline />
    </>
  );
}

function Timeline() {
  return (
    <section className="section timeline">
      <Eyebrow>Our evolution</Eyebrow>
      <div className="timeline-grid">
        {[
          ['1982', 'The beginning', 'KB is founded to undertake structural fabrication and site erection projects.'],
          ['1990s', 'A broader capability', 'The business expands into equipment, heavy winch machinery and crane hire.'],
          ['2000s', 'Technical depth', 'Boiler repairs, IBR components and pressure vessels become core strengths.'],
          ['Today', 'A trusted partner', 'KB supports India’s leading nuclear, aerospace and power industrial projects.']
        ].map(([year, title, text]) => (
          <article data-reveal key={year}>
            <span>{year}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="leadership section">
      <div className="leadership-heading" data-reveal>
        <div>
          <Eyebrow>Leadership</Eyebrow>
          <h2>A legacy carried<br /><em>forward.</em></h2>
        </div>
        <p>The values that established Kutty Brothers continue to guide its people, its projects and its future.</p>
      </div>
      <div className="leadership-grid">
        <article className="leader-card founder" data-reveal>
          <div className="leader-portrait">
            <div className="portrait-glow"></div>
            <img src="/images/ismail-founder.jpeg" alt="Mr. Ismail K, founder of Kutty Brothers" loading="lazy" />
            <span>01</span>
          </div>
          <div className="leader-copy">
            <div>
              <small>Founder</small>
              <h3>Mr. Ismail K</h3>
            </div>
            <p>Founder of Kutty Brothers, whose vision and commitment to dependable engineering established the company’s foundation in 1982.</p>
            <div className="leader-signoff">
              <span>KB</span>
              <em>Since 1982</em>
            </div>
          </div>
        </article>
        <article className="leader-card ceo" data-reveal>
          <div className="leader-portrait">
            <div className="portrait-glow"></div>
            <img src="/images/riyas-ceo.jpeg" alt="Mr. Riyaz K.I, CEO of Kutty Brothers" loading="lazy" />
            <span>02</span>
          </div>
          <div className="leader-copy">
            <div>
              <small>Chief Executive Officer</small>
              <h3>Mr. Riyaz K.I</h3>
            </div>
            <p>The proceedings of the company now rest with Mr. Riyaz K.I, son of Mr. Ismail, who has been involved in all company operations for the past 12 years.</p>
            <div className="leader-signoff">
              <span>KB</span>
              <em>Leading today</em>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Capabilities({ onSelectMfgItem }) {
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mfgCategories = [
    { id: 'all', label: 'All 29 Products & Services' },
    { id: 'vessels', label: 'Vessels & Silos' },
    { id: 'process', label: 'Process Equipment & Towers' },
    { id: 'structures', label: 'Structures & Sheds' },
    { id: 'thermal', label: 'Thermal & IBR' },
    { id: 'filtration', label: 'Filtration & ESP' },
    { id: 'piping', label: 'Piping & Allied' },
    { id: 'heavy', label: 'Heavy Equipment & Aerospace' },
  ];

  const filteredItems = manufacturingItems.filter((item) => {
    const matchesCat = activeCat === 'all' || item.cat === activeCat;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Manufacturing, IBR Components & Services"
        title={<>Precision fabrication.<br /><em>Certified engineering.</em></>}
        text="A comprehensive 29-product suite of heavy vessels, IBR boiler components, chemical reactors, towers, and industrial steel structures."
        image="/images/manufac/industrial-sheds.jpg"
      />

      <section className="section capability-intro">
        <div data-reveal>
          <Eyebrow>End-to-End Manufacturing & Services</Eyebrow>
          <h2>29 Specialized<br /><em>Industrial Offerings.</em></h2>
        </div>
        <p className="lead" data-reveal>Built to ASME, TEMA, and IBR regulations with uncompromising quality, non-destructive testing (NDT), and certified welding standards.</p>
      </section>

      {/* Live Search & Filter Bar */}
      <section className="section" style={{ paddingTop: '10px', paddingBottom: '30px' }}>
        <div className="search-box-container" data-reveal>
          <input
            className="search-input"
            type="text"
            placeholder="Search manufacturing items (e.g. Vessel, Reactor, IBR, Silo, ESP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-bar" data-reveal>
          {mfgCategories.map((cat) => (
            <button
              className={activeCat === cat.id ? 'selected' : ''}
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 29 Products Grid using actual manufac images */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredItems.map((item, idx) => (
            <article
              className="sector-project-card"
              data-reveal
              key={item.id}
              onClick={() => onSelectMfgItem(item)}
              style={{ cursor: 'pointer', minHeight: '390px' }}
            >
              <div className="sector-card-top">
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <span style={{ textTransform: 'uppercase' }}>{item.cat}</span>
              </div>
              <div style={{ overflow: 'hidden', height: '190px', borderRadius: '6px', margin: '16px 0', background: '#f7f6f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                />
              </div>
              <h3 style={{ fontSize: '22px', margin: '12px 0 8px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: '0 0 16px' }}>{item.desc}</p>
              <div className="sector-card-bottom">
                <span>Request Specifications</span>
                <Arrow />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="clients section">
        <Eyebrow>Operations & maintenance partners</Eyebrow>
        <h2>Keeping key plants <em>on.</em></h2>
        <div className="client-grid">
          {['Birla Carbon India Ltd', 'Saint-Gobain India', 'Epsilon Carbon Pvt Ltd', 'E.I.D-Parry India Ltd', 'SRHHL'].map((client, index) => (
            <div data-reveal key={client}>
              <span>0{index + 1}</span>
              {client}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SectorCard({ sector, index, onSelectProject }) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 3;
  const hasMore = sector.projects.length > maxVisible;
  const visibleProjects = expanded ? sector.projects : sector.projects.slice(0, maxVisible);

  return (
    <article className="sector-project-card" data-reveal key={sector.title}>
      <div className="sector-card-media">
        <img src={sector.image} alt={sector.title} loading="lazy" />
        <span className="sector-card-badge">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="sector-card-content">
        <div>
          <div className="sector-card-top">
            <span>{sector.projects.length} {sector.projects.length === 1 ? 'project' : 'projects'}</span>
          </div>
          <h3>{sector.title}</h3>
          <ul>
            {visibleProjects.map((project) => (
              <li key={project}>{project}</li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="view-more-btn"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? 'Show Less −' : `View More (+${sector.projects.length - maxVisible})`}
            </button>
          )}
        </div>
        <div
          className="sector-card-bottom"
          onClick={() => onSelectProject && onSelectProject({
            title: sector.title,
            kicker: `${sector.projects.length} ${sector.projects.length === 1 ? 'project' : 'projects'}`,
            client: sector.projects.join(', '),
            scope: `Specialised engineering, fabrication, erection and EPC support for ${sector.title}. Major project execution includes ${sector.projects.join(', ')}.`,
            image: sector.image,
            location: 'India',
            year: '1982 - Present',
            index: String(index + 1).padStart(2, '0')
          })}
        >
          <span>View sector experience</span>
          <Arrow />
        </div>
      </div>
    </article>
  );
}

function Projects({ onSelectProject }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSectors = sectorPortfolio.filter((sector) => {
    const term = searchTerm.toLowerCase();
    const matchesTitle = sector.title.toLowerCase().includes(term);
    const matchesProjects = sector.projects.some((p) => p.toLowerCase().includes(term));
    return matchesTitle || matchesProjects;
  });

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={<>Work that<br /><em>moves industry.</em></>}
        text="A cross-sector record of solving high-stakes engineering challenges for India's leading organisations."
        image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80&fm=webp"
      />

      <section className="section project-directory">
        <div className="directory-heading" data-reveal>
          <div>
            <Eyebrow>Our portfolio</Eyebrow>
            <h2>Across the map.<br /><em>Across the spectrum.</em></h2>
          </div>
          <p>Our work has supported industrial progress across power, process, manufacturing and national infrastructure.</p>
        </div>

        <div className="search-box-container" data-reveal style={{ marginBottom: '40px' }}>
          <input
            className="search-input"
            type="text"
            placeholder="Search projects by name, client, or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="sector-project-grid">
          {filteredSectors.map((sector, index) => (
            <SectorCard
              sector={sector}
              index={index}
              key={sector.title}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </section>

      <section className="sector-strip">
        <p>Hydrocarbon <i>✦</i> Chemical <i>✦</i> Nuclear <i>✦</i> Cement <i>✦</i> Aerospace <i>✦</i> Steel <i>✦</i> Thermal Power</p>
      </section>
    </>
  );
}

function Equipment({ onRequestEquipment }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.detail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageHero
        eyebrow="Tools & equipment"
        title={<>Ready when the<br /><em>work calls.</em></>}
        text="A versatile fleet of proven equipment, available to strengthen your site capacity and keep your programme moving."
        image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80&fm=webp"
      />

      <section className="section equipment-intro">
        <div data-reveal>
          <Eyebrow>Equipment hire fleet</Eyebrow>
          <h2>Capability you<br />can <em>call on.</em></h2>
        </div>
        <p className="lead" data-reveal>Access well-maintained equipment and technical support from a team that understands the realities of industrial worksites.</p>
      </section>

      <section className="section" style={{ paddingTop: '20px', paddingBottom: '0' }}>
        <div className="search-box-container" data-reveal>
          <input
            className="search-input"
            type="text"
            placeholder="Search equipment fleet (e.g. Winches, Jacks, Rolling)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </section>

      <section className="equipment-grid section">
        {filteredEquipment.map((item, i) => (
          <article className="equipment-card" data-reveal key={item.id}>
            <span className="eq-count">0{i + 1} / {item.capacity}</span>
            <div className="eq-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <button type="button" onClick={() => onRequestEquipment(item)}>
              Check availability <Arrow />
            </button>
          </article>
        ))}
      </section>

      <section className="equipment-cta">
        <div>
          <Eyebrow light>Need something specific?</Eyebrow>
          <h2>Tell us what you<br /><em>need to lift.</em></h2>
        </div>
        <Button light to="/contact">Talk to our team</Button>
      </section>
    </>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    addToast('Your enquiry has been successfully submitted!');
  }

  return (
    <>
      <section className="contact-hero">
        <div>
          <Eyebrow light>Contact us</Eyebrow>
          <h1>Let’s get<br /><em>to work.</em></h1>
        </div>
        <p>For project enquiries, equipment availability or partnership opportunities, our team is ready to talk.</p>
      </section>

      <section className="section contact-main">
        <div className="contact-details" data-reveal>
          <Eyebrow>Find us</Eyebrow>
          <h2>Chennai,<br /><em>Tamil Nadu.</em></h2>
          <div className="detail-list">
            <a href="https://maps.google.com/?q=276-D+Vanagaram+Road+Athipet+Chennai" target="_blank" rel="noreferrer">
              <span>Visit Head Office</span>Door No: 276-D, Vanagaram Road,<br />Athipet, Chennai, TN 600058
            </a>
            <a href="tel:+914426521027">
              <span>Call Us Direct</span>+91 44 2652 1027
            </a>
            <a href="mailto:info@kuttybrothers.in">
              <span>Email Us</span>info@kuttybrothers.in
            </a>
          </div>
        </div>

        <form className="enquiry-form" onSubmit={submit} data-reveal>
          {submitted ? (
            <div className="form-success">
              <span>✓</span>
              <h3>Thank you.</h3>
              <p>Your enquiry has been received. Our engineering team will review your requirements and be in touch shortly.</p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <Eyebrow>Send an enquiry</Eyebrow>
                <p>Tell us a little about your project or equipment requirement.</p>
              </div>

              <label>
                Your Name *
                <input required placeholder="Full Name" />
              </label>

              <label>
                Company / Organisation
                <input placeholder="Company Name" />
              </label>

              <div className="form-dual">
                <label>
                  Email Address *
                  <input type="email" required placeholder="you@company.com" />
                </label>
                <label>
                  Contact Number
                  <input type="tel" placeholder="+91 98765 43210" />
                </label>
              </div>

              <label>
                How can we help? *
                <textarea required rows="4" placeholder="Describe the scope, timeline, location, or equipment needed"></textarea>
              </label>

              <label className="consent">
                <input type="checkbox" required />
                <span>I agree to receive a direct response to this enquiry.</span>
              </label>

              <button className="button form-button" type="submit">
                Send enquiry <Arrow />
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="page-hero">
      <div className="page-hero-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="page-hero-shade"></div>
      <div className="page-hero-content">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Logo />
          <p>Precision manufacturing, heavy fabrication, boiler components and dependable industrial services since 1982.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            {navItems.slice(1).map((item) => (
              <a href={item.path} onClick={(e) => navigate(e, item.path)} key={item.path}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <span>Contact</span>
            <a href="tel:+914426521027">+91 44 2652 1027</a>
            <a href="mailto:info@kuttybrothers.in">info@kuttybrothers.in</a>
            <p>276-D, Vanagaram Road,<br />Athipet, Chennai 600058</p>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Kutty Brothers. All rights reserved.</span>
        <span>Chennai, Tamil Nadu, India</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

function MainApp() {
  const [path, setPath] = useState(window.location.pathname);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMfgItem, setSelectedMfgItem] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const { addToast } = useToast();

  useReveal(path);

  useEffect(() => {
    const update = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', update);
    window.addEventListener('app-navigate', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('app-navigate', update);
    };
  }, []);

  const handleEnquireProject = (project) => {
    setSelectedProject(null);
    navigate(null, '/contact');
  };

  const handleEnquireMfg = (item) => {
    setSelectedMfgItem(null);
    navigate(null, '/contact');
  };

  const handleEquipmentSubmit = (item, formData) => {
    setSelectedEquipment(null);
    addToast(`Availability request sent for ${item.title}!`);
  };

  const pages = {
    '/': <Home onSelectProject={setSelectedProject} />,
    '/about': <About />,
    '/capabilities': <Capabilities onSelectMfgItem={setSelectedMfgItem} />,
    '/projects': <Projects onSelectProject={setSelectedProject} />,
    '/equipment': <Equipment onRequestEquipment={setSelectedEquipment} />,
    '/contact': <Contact />
  };

  return (
    <>
      <div id="top"></div>
      <Header path={path} />
      <main>{pages[path] ?? <Home onSelectProject={setSelectedProject} />}</main>
      <Footer />
      <FloatingHub />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={handleEnquireProject}
      />

      <ManufacturingModal
        item={selectedMfgItem}
        onClose={() => setSelectedMfgItem(null)}
        onEnquire={handleEnquireMfg}
      />

      <EquipmentQuoteModal
        item={selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
        onSubmit={handleEquipmentSubmit}
      />
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
