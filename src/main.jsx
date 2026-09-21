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
  { title: 'Thermal power projects', projects: ['LVS Power Plant', 'Ind-Barath Power Gencom Limited', 'Cauvery Power Generation Chennai (P) Ltd.', 'BGR Energy Systems Ltd.', 'Lanco Industries Ltd.', 'Neyveli Lignite Corporation'], image: '/images/manufac/chimney-stack.jpg' },
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
  { id: 'eq1', title: 'Motorised Winches', detail: 'Heavy-duty winch systems up to 100 T capacity with dual braking.', icon: '↗', capacity: 'Up to 100 T', image: '/images/equipment/winch.jpg' },
  { id: 'eq2', title: 'Hydraulic Jacks', detail: 'High-tonnage synchronous lifting hydraulic jacks.', icon: '⊞', capacity: 'Up to 400 T', image: '/images/equipment/jack.jpg' },
  { id: 'eq3', title: 'Rolling Machines', detail: '3-roller precision bending machines for heavy SS & MS plates.', icon: '○', capacity: 'Up to 36 mm', image: '/images/equipment/roller.jpg' },
  { id: 'eq4', title: 'Welding Systems', detail: 'Industrial multi-process MIG / TIG / K320 automatic welding plants.', icon: '⌁', capacity: 'Certified IBR', image: '/images/equipment/welder.jpg' },
  { id: 'eq5', title: 'Tank Jacks', detail: 'Specialised hydraulic tank erection jacking equipment.', icon: '↟', capacity: 'Up to 12 T / 2.5 m', image: '/images/equipment/tankjack.jpg' },
  { id: 'eq6', title: 'Air Compressors', detail: 'High-pressure diesel and electric industrial air compressor fleet.', icon: '◒', capacity: 'Up to 40 hp', image: '/images/equipment/compressor.jpg' },
];

function useReveal(dependency) {
  useEffect(() => {
    let observer;
    let safetyTimer;
    let fallbackTimer;
    let mutationObserver;

    const checkElements = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh + 200) {
          el.classList.add('is-visible');
        } else if (observer) {
          observer.observe(el);
        }
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '180px 0px' }
    );

    checkElements();
    const req = requestAnimationFrame(checkElements);

    window.addEventListener('scroll', checkElements, { passive: true });
    window.addEventListener('resize', checkElements, { passive: true });

    safetyTimer = setTimeout(() => {
      checkElements();
    }, 150);

    fallbackTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 450);

    mutationObserver = new MutationObserver(() => {
      checkElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(req);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      window.removeEventListener('scroll', checkElements);
      window.removeEventListener('resize', checkElements);
    };
  }, [dependency]);
}

function useBannerScroll(dependency) {
  useEffect(() => {
    let animationFrameId;

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scY = window.scrollY;

        // 1. Home Hero parallax scroll effect
        const heroImg = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        if (heroImg && scY <= 900) {
          heroImg.style.transform = `translate3d(0, ${scY * 0.38}px, 0) scale(${1 + scY * 0.0003})`;
        }
        if (heroContent && scY <= 900) {
          heroContent.style.transform = `translate3d(0, ${scY * 0.18}px, 0)`;
          heroContent.style.opacity = `${Math.max(0, 1 - scY / 650)}`;
        }

        // 2. PageHero parallax scroll effect (About, Projects, Equipment, etc.)
        const pageHeroImg = document.querySelector('.page-hero-image');
        const pageHeroContent = document.querySelector('.page-hero-content');
        if (pageHeroImg && scY <= 700) {
          pageHeroImg.style.transform = `translate3d(0, ${scY * 0.38}px, 0) scale(${1 + scY * 0.00035})`;
        }
        if (pageHeroContent && scY <= 700) {
          pageHeroContent.style.transform = `translate3d(0, ${scY * 0.18}px, 0)`;
          pageHeroContent.style.opacity = `${Math.max(0, 1 - scY / 550)}`;
        }

        // 3. Contact Hero parallax scroll effect
        const contactHero = document.querySelector('.contact-hero');
        if (contactHero && scY <= 600) {
          contactHero.style.transform = `translate3d(0, ${scY * 0.15}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
      </section>

      <section className="numbers">
        <div className="numbers-image"></div>
        <div className="numbers-panel">
          <Eyebrow light>At a glance</Eyebrow>
          <div className="stats">
            <div>
              <AnimatedCounter end="44" suffix="+" />
              <span>Years of<br />experience</span>
              <span className="since-year-sub">EST. 1982</span>
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
      </section>

      <section className="services section">
        <div className="section-top" data-reveal>
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2>Strength at<br /><em>every scale.</em></h2>
          </div>
          <Button to="/capabilities">Manufacturing & IBR</Button>
        </div>
        <div className="service-list" data-reveal>
          {[
            ['Fabrication & erection', 'Precision execution for process plants, heavy structures and critical industrial systems.'],
            ['IBR components', 'Certified boiler components, pressure vessels and technical repair services.'],
            ['Operation & maintenance', 'Planned turnarounds and emergency support that keeps your operations on track.'],
            ['Equipment hire', 'A capable fleet of lifting winches, hydraulic jacks, rolling and welding equipment.']
          ].map(([title, text]) => (
            <a
              href="/capabilities"
              onClick={(e) => navigate(e, '/capabilities')}
              className="service-row"
              key={title}
            >
              <h3>{title}</h3>
              <p>{text}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <ProjectsPreview onSelectProject={onSelectProject} />

      <HomeContactSection />
    </>
  );
}

function HomeContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (addToast) {
      addToast('Your project brief has been submitted successfully! Our engineering team will follow up within 24 hours.');
    }
  }

  return (
    <section className="contact-band" id="brief">
      <div className="contact-band-content" data-reveal>
        <div className="contact-band-text">
          <div className="contact-band-eyebrow">
            <span className="contact-band-dash"></span>
            LET’S BUILD
          </div>
          <h2>
            Bring us your<br />
            <em>toughest brief.</em>
          </h2>
          <p className="contact-band-desc">
            Have a demanding fabrication tolerance, certified IBR boiler component requirement, urgent turnaround shutdown, or heavy equipment hire need? Submit your specifications directly to our engineering desk.
          </p>

          <div className="contact-band-meta-list">
            <a href="tel:+914426521027" className="contact-band-meta-item">
              <span className="meta-icon">📞</span>
              <div>
                <span className="meta-sub">Direct Engineering Line</span>
                <strong>+91 44 2652 1027</strong>
              </div>
            </a>
            <a href="mailto:info@kuttybrothers.in" className="contact-band-meta-item">
              <span className="meta-icon">✉️</span>
              <div>
                <span className="meta-sub">Email RFQ & Drawings</span>
                <strong>info@kuttybrothers.in</strong>
              </div>
            </a>
            <div className="contact-band-meta-item">
              <span className="meta-icon">📍</span>
              <div>
                <span className="meta-sub">Works & Headquarters</span>
                <strong>Athipet, Chennai, TN 600058</strong>
              </div>
            </div>
          </div>

          <div className="contact-band-trust-pills">
            <span className="trust-pill">⚡ 24h Engineering Review</span>
            <span className="trust-pill">🔒 Strict Confidentiality & NDA</span>
            <span className="trust-pill">✓ Certified IBR & ISO Quality</span>
          </div>
        </div>

        <div className="contact-band-form-container">
          <div className="contact-band-card">
            {submitted ? (
              <div className="contact-band-success">
                <div className="contact-success-badge">✓</div>
                <h3>Brief Submitted</h3>
                <p>
                  Thank you! Your project requirements have been routed directly to our senior engineering desk. We will evaluate your specifications and get in touch within 24 hours.
                </p>
                <button
                  type="button"
                  className="contact-band-reset-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send another enquiry <Arrow />
                </button>
              </div>
            ) : (
              <form className="contact-band-form" onSubmit={handleSubmit}>
                <div className="contact-band-form-header">
                  <span className="form-kicker">DIRECT RFQ / BRIEF</span>
                  <h3>Start a conversation</h3>
                  <p>Submit your project requirements below to receive technical evaluation and quotation.</p>
                </div>

                <div className="contact-band-grid-row">
                  <label className="contact-band-field" htmlFor="brief-name">
                    <span>Your Name *</span>
                    <input id="brief-name" name="name" type="text" required placeholder="e.g. Rajesh Kumar" />
                  </label>
                  <label className="contact-band-field" htmlFor="brief-company">
                    <span>Company / Organisation *</span>
                    <input id="brief-company" name="company" type="text" required placeholder="e.g. NPCIL, L&T, UltraTech" />
                  </label>
                </div>

                <div className="contact-band-grid-row">
                  <label className="contact-band-field" htmlFor="brief-email">
                    <span>Work Email *</span>
                    <input id="brief-email" name="email" type="email" required placeholder="name@company.com" />
                  </label>
                  <label className="contact-band-field" htmlFor="brief-phone">
                    <span>Phone Number *</span>
                    <input id="brief-phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
                  </label>
                </div>

                <label className="contact-band-field" htmlFor="brief-category">
                  <span>Service / Requirement Category</span>
                  <select id="brief-category" name="category" defaultValue="Structural Fabrication & Erection">
                    <option value="Structural Fabrication & Erection">Heavy Structural Fabrication & Erection</option>
                    <option value="Certified IBR Boiler Components">Certified IBR Boiler Components & Pressure Vessels</option>
                    <option value="Heavy Equipment & Winch Rental">Heavy Equipment & Winch Rental</option>
                    <option value="Operation & Turnaround Maintenance">Plant Shutdown & Turnaround Maintenance</option>
                    <option value="General Engineering Brief">General Engineering Enquiry / Other</option>
                  </select>
                </label>

                <label className="contact-band-field" htmlFor="brief-scope">
                  <span>Project Scope & Specifications *</span>
                  <textarea
                    id="brief-scope"
                    name="scope"
                    required
                    rows="3"
                    placeholder="Describe tonnage, dimensions, material grade, site location, timeline or equipment needed..."
                  ></textarea>
                </label>

                <label className="contact-band-consent" htmlFor="brief-consent">
                  <input id="brief-consent" name="consent" type="checkbox" required />
                  <span>I agree to receive direct technical correspondence regarding this project brief.</span>
                </label>

                <button id="brief-submit-btn" type="submit" className="contact-band-submit-btn">
                  Start a conversation <Arrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview({ onSelectProject }) {
  const [pairIndex, setPairIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Rotate through 3 pairs of featured projects
  const pairs = [
    [projects[0], projects[2]], // Nuclear (Kudankulam) & Aerospace (ISRO)
    [projects[1], projects[3]], // Thermal (Neyveli) & Carbon (Birla Carbon)
    [projects[4], projects[5]], // Cement (UltraTech) & Heavy Engineering (L&T)
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPairIndex((prev) => (prev + 1) % pairs.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, [pairs.length]);

  const currentPair = pairs[pairIndex];

  return (
    <section className="projects-preview">
      <div className="project-preview-top section" data-reveal>
        <div>
          <div className="project-auto-badge">
            <span className="est-dot"></span> LIVE FEATURED PROJECTS
          </div>
          <Eyebrow light>Selected work</Eyebrow>
          <h2>Proven under<br /><em>pressure.</em></h2>
        </div>
      </div>

      <div className={`project-feature-grid ${fade ? 'fade-in' : 'fade-out'}`}>
        <article
          className="project-feature large"
          onClick={() => onSelectProject(currentPair[0])}
        >
          <img src={currentPair[0].image} alt={currentPair[0].title} loading="lazy" key={`img1-${currentPair[0].id}`} />
          <div>
            <span>{currentPair[0].kicker}</span>
            <h3>{currentPair[0].title}</h3>
            <p className="project-meta-line">{currentPair[0].client} • {currentPair[0].location}</p>
            <Arrow />
          </div>
        </article>
        <article
          className="project-feature"
          onClick={() => onSelectProject(currentPair[1])}
        >
          <img src={currentPair[1].image} alt={currentPair[1].title} loading="lazy" key={`img2-${currentPair[1].id}`} />
          <div>
            <span>{currentPair[1].kicker}</span>
            <h3>{currentPair[1].title}</h3>
            <p className="project-meta-line">{currentPair[1].client} • {currentPair[1].location}</p>
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
        <div className="story-media" data-reveal>
          <Eyebrow>Our beginning</Eyebrow>
          <div className="story-founder-card">
            <div className="story-founder-frame">
              <img
                src="/images/ismail-founder.jpeg"
                alt="DR (HONS) ISMAIL.K, Founder of Kutty Brothers"
                loading="lazy"
              />
              <div className="story-founder-overlay"></div>
              <div className="story-founder-badge">
                <span className="founder-badge-dot"></span>
                <span>DR (HONS) ISMAIL.K // FOUNDER (1982)</span>
              </div>
            </div>
            <div className="story-founder-caption">
              <div>
                <strong>DR (HONS) ISMAIL.K</strong>
                <small>Founder of Kutty Brothers</small>
              </div>
              <span className="story-caption-year">EST. 1982</span>
            </div>
          </div>
        </div>
        <div className="story-copy" data-reveal>
          <p className="lead">Kutty Brothers was founded in 1982 by DR (HONS) ISMAIL.K and his brothers with a clear ambition: deliver work industrial clients could depend on.</p>
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
  const [activeEra, setActiveEra] = useState(0);

  const eras = [
    {
      phase: '01 / 04',
      badge: 'FOUNDATION',
      year: '1982',
      title: 'The beginning',
      text: 'KB is founded to undertake structural fabrication and site erection projects.',
      highlights: ['Structural Steel Fabrication', 'Site Erection & Rigging', 'Heavy Industrial Frames'],
      stat: 'EST. 1982',
      metric: 'Foundation',
      image: '/images/manufac/industrial-sheds.jpg'
    },
    {
      phase: '02 / 04',
      badge: 'FLEET & CRANES',
      year: '1990s',
      title: 'A broader capability',
      text: 'The business expands into equipment, heavy winch machinery and crane hire.',
      highlights: ['Heavy Winches to 100T', 'Hydraulic Jack Fleet', 'Heavy Crane Operations'],
      stat: '100 T',
      metric: 'Winch Systems',
      image: '/images/equipment/winch.jpg'
    },
    {
      phase: '03 / 04',
      badge: 'SPECIALISATION',
      year: '2000s',
      title: 'Technical depth',
      text: 'Boiler repairs, IBR components and pressure vessels become core strengths.',
      highlights: ['Certified IBR Standards', 'High-Pressure Vessels', 'Thermal Columns & ESP'],
      stat: 'IBR WELDING',
      metric: 'Coded Standards',
      image: '/images/manufac/ibr.jpg'
    },
    {
      phase: '04 / 04',
      badge: 'STRATEGIC PARTNER',
      year: 'Today',
      title: 'A trusted partner',
      text: 'KB supports India’s leading nuclear, aerospace and power industrial projects.',
      highlights: ['ISRO Space Hardware', 'Nuclear Plant Installations', 'Turnkey Heavy Projects'],
      stat: '42+ YEARS',
      metric: 'National Trust',
      image: '/images/manufac/launching-pads.jpg'
    }
  ];

  return (
    <section className="section timeline">
      <div className="timeline-header" data-reveal>
        <div>
          <Eyebrow>Our evolution</Eyebrow>
          <h2>Four decades of precision,<br /><em>resilience & growth.</em></h2>
        </div>
        <p className="timeline-intro-text">
          From pioneering structural fabrication in 1982 to engineering mission-critical installations for India’s nuclear, aerospace, and energy infrastructure.
        </p>
      </div>

      {/* Progress Track */}
      <div className="timeline-rail" data-reveal>
        <div
          className="timeline-rail-bar"
          style={{ width: `${((activeEra + 0.5) / eras.length) * 100}%` }}
        ></div>
        {eras.map((era, idx) => (
          <button
            key={era.year}
            type="button"
            className={`timeline-node ${activeEra === idx ? 'active' : ''}`}
            onClick={() => setActiveEra(idx)}
            aria-label={`Select era ${era.year}`}
          >
            <span className="node-dot"></span>
            <div className="node-labels">
              <span className="node-year">{era.year}</span>
              <span className="node-sub">{era.badge}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Cards Grid */}
      <div className="timeline-grid" data-reveal>
        {eras.map((era, idx) => (
          <article
            key={era.year}
            className={`timeline-card ${activeEra === idx ? 'is-active' : ''}`}
            onClick={() => setActiveEra(idx)}
            onMouseEnter={() => setActiveEra(idx)}
          >
            <div className="card-ambient-glow"></div>

            {/* Visual Hero Banner */}
            <div className="card-hero-banner">
              <img src={era.image} alt={era.title} className="card-banner-img" loading="lazy" />
              <div className="card-banner-overlay"></div>
              <div className="card-top-chips">
                <span className="phase-tag">{era.phase}</span>
                <span className="badge-tag">{era.badge}</span>
              </div>
              <div className="year-hero">
                <span className="year-num">{era.year}</span>
                <span className="corner-accent"></span>
              </div>
            </div>

            <div className="card-body">
              <h3 className="era-title">{era.title}</h3>
              <p className="era-desc">{era.text}</p>

              <div className="card-tags">
                {era.highlights.map((h, i) => (
                  <span key={i} className="highlight-pill">
                    <span className="pill-bullet">◈</span>
                    <span>{h}</span>
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <div className="stat-box">
                  <strong>{era.stat}</strong>
                  <small>{era.metric}</small>
                </div>
                <span className="card-indicator">
                  {activeEra === idx ? '● CURRENT ERA' : 'VIEW ERA ↗'}
                </span>
              </div>
            </div>
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
        <p>The values that established Kutty Brothers continue to guide its people, its projects, and its future across four decades of engineering leadership.</p>
      </div>
      <div className="leadership-grid single-leader">
        <article className="leader-card ceo" data-reveal>
          <div className="leader-ambient-glow"></div>
          <div className="leader-portrait-wrap">
            <div className="portrait-frame">
              <img src="/images/riyas-ceo.jpeg" alt="Mr. Riyaz K.I, CEO of Kutty Brothers" loading="lazy" />
              <div className="portrait-overlay"></div>
              <div className="portrait-badge">
                <span className="badge-dot"></span>
                <span>EXECUTIVE LEADERSHIP</span>
              </div>
            </div>
          </div>
          <div className="leader-copy">
            <div className="leader-role-strip">
              <span className="leader-role-pill gold">Chief Executive Officer</span>
              <span className="leader-tenure">12+ Yrs Operations</span>
            </div>
            <h3>Mr. Riyaz K.I</h3>
            <p className="leader-bio">
              The proceedings of the company now rest with Mr. Riyaz K.I, son of Mr. Ismail, who has been involved in all company operations for the past 12 years.
            </p>
            <div className="leader-pillars">
              <div className="pillar-item">
                <span className="pillar-icon">◈</span>
                <span>Spearheading nuclear, aerospace & high-pressure sectors</span>
              </div>
              <div className="pillar-item">
                <span className="pillar-icon">◈</span>
                <span>Leading modernization of heavy plant machinery & certified IBR fleet</span>
              </div>
            </div>
            <div className="leader-signoff">
              <div className="signoff-seal">
                <span className="seal-kb">KB</span>
                <div className="seal-text">
                  <strong>EXECUTIVE</strong>
                  <em>Leading today</em>
                </div>
              </div>
              <span className="signoff-quote">“Precision at scale.”</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Capabilities({ onSelectMfgItem }) {
  const [activeCat, setActiveCat] = useState('all');

  const mfgCategories = [
    { id: 'all', label: 'All Products & Services' },
    { id: 'vessels', label: 'Vessels & Silos' },
    { id: 'process', label: 'Process Equipment & Towers' },
    { id: 'structures', label: 'Structures & Sheds' },
    { id: 'thermal', label: 'Thermal & IBR' },
    { id: 'filtration', label: 'Filtration & ESP' },
    { id: 'piping', label: 'Piping & Allied' },
    { id: 'heavy', label: 'Heavy Equipment & Aerospace' },
  ];

  const filteredItems = manufacturingItems.filter((item) => {
    return activeCat === 'all' || item.cat === activeCat;
  });

  return (
    <>
      <section className="section capability-intro" style={{ paddingTop: '150px' }}>
        <div data-reveal>
          <Eyebrow>End-to-End Manufacturing & Services</Eyebrow>
          <h2>Specialized<br /><em>Industrial Offerings.</em></h2>
        </div>
        <p className="lead" data-reveal>Built to ASME, TEMA, and IBR regulations with uncompromising quality, non-destructive testing (NDT), and certified welding standards.</p>
      </section>

      {/* Category Filter Bar */}
      <section className="section" style={{ paddingTop: '10px', paddingBottom: '30px' }}>
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

      {/* Manufacturing, IBR Components & Services Items Grid */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="mfg-card-grid" data-reveal>
          {filteredItems.map((item) => (
            <article
              className="mfg-card"
              key={item.id}
              onClick={() => onSelectMfgItem(item)}
            >
              <div className="mfg-card-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mfg-card-img"
                  loading="lazy"
                />
              </div>
              <div className="mfg-card-body">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="mfg-card-footer">
                  <span>Request Specifications</span>
                  <Arrow />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="clients section">
        <Eyebrow>Operations & maintenance partners</Eyebrow>
        <h2>Keeping key plants <em>on.</em></h2>
        <div className="client-grid" data-reveal>
          {['Birla Carbon India Ltd', 'Saint-Gobain India', 'Epsilon Carbon Pvt Ltd', 'E.I.D-Parry India Ltd', 'SRHHL'].map((client, index) => (
            <div key={client}>
              <span>0{index + 1}</span>
              {client}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SectorCard({ sector, onSelectProject }) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 3;
  const hasMore = sector.projects.length > maxVisible;
  const visibleProjects = expanded ? sector.projects : sector.projects.slice(0, maxVisible);

  function toggleExpand() {
    if (hasMore) {
      setExpanded((prev) => !prev);
    } else if (onSelectProject) {
      onSelectProject({
        title: sector.title,
        kicker: 'Key Sector Experience',
        client: sector.projects.join(', '),
        scope: `Specialised engineering, fabrication, erection and EPC support for ${sector.title}. Major project execution includes ${sector.projects.join(', ')}.`,
        image: sector.image,
        location: 'India',
        year: '1982 - Present'
      });
    }
  }

  return (
    <article
      className={`sector-project-card ${expanded ? 'is-expanded' : ''}`}
      key={sector.title}
      onClick={toggleExpand}
      style={{ cursor: 'pointer' }}
    >
      <div className="sector-card-media">
        <img src={sector.image} alt={sector.title} loading="lazy" />
      </div>
      <div className="sector-card-content">
        <div>
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
                setExpanded((prev) => !prev);
              }}
            >
              {expanded ? 'Show Less −' : 'View More +'}
            </button>
          )}
        </div>
        <div
          className="sector-card-bottom"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectProject) {
              onSelectProject({
                title: sector.title,
                kicker: 'Key Sector Experience',
                client: sector.projects.join(', '),
                scope: `Specialised engineering, fabrication, erection and EPC support for ${sector.title}. Major project execution includes ${sector.projects.join(', ')}.`,
                image: sector.image,
                location: 'India',
                year: '1982 - Present'
              });
            }
          }}
        >
          <span>View sector experience</span>
          <Arrow />
        </div>
      </div>
    </article>
  );
}

function Projects({ onSelectProject }) {
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

        <div className="sector-project-grid" data-reveal>
          {sectorPortfolio.map((sector) => (
            <SectorCard
              sector={sector}
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

      <section className="equipment-grid section" data-reveal>
        {filteredEquipment.map((item, i) => (
          <article className="equipment-card" key={item.id}>
            <div className="equipment-card-image-box">
              <span className="eq-count">0{i + 1} / {item.capacity}</span>
              <img src={item.image} alt={item.title} className="equipment-card-img" loading="lazy" />
            </div>
            <div className="equipment-card-body">
              <div className="eq-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <button type="button" onClick={() => onRequestEquipment(item)}>
                Check availability <Arrow />
              </button>
            </div>
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
          <div className="footer-brand-wrap">
            <Logo />
            <span className="since-highlight-badge footer-since-badge">ESTABLISHED SINCE 1982</span>
          </div>
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
        <span>ESTABLISHED SINCE 1982 • CHENNAI, INDIA</span>
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
  useBannerScroll(path);

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
