# Kutty Brothers Website

A multi-page React website for **Kutty Brothers (KB)**, an industrial manufacturing, IBR components, fabrication, erection, equipment-hire and operations & maintenance company based in Chennai, India, established in **1982**.

The design uses a high-contrast **amber-yellow, black and cream** palette, editorial serif headlines with italic accents, industrial photography, scroll-reveal and parallax motion, interactive filters, modals, animated counters and moving client rails.

---

## Contents

- [Tech stack](#tech-stack)
- [Run locally](#run-locally)
- [Deployment](#deployment)
- [Site structure](#site-structure)
- [Global elements](#global-elements) — header, footer, floating contact hub, modals, toasts
- [Home page](#home-page)
- [About page](#about-page)
- [Manufacturing, IBR Components & Services page](#manufacturing-ibr-components--services-page)
- [Projects page](#projects-page)
- [Equipment page](#equipment-page)
- [Contact page](#contact-page)
- [Forms summary](#forms-summary)
- [Motion and interaction design](#motion-and-interaction-design)
- [Visual system](#visual-system)
- [SEO and metadata](#seo-and-metadata)
- [Assets](#assets)
- [Project structure](#project-structure)
- [Editing content](#editing-content)

---

## Tech stack

| Tool | Version | Purpose |
| --- | --- | --- |
| React | 18.3.1 | UI components and state |
| React DOM | 18.3.1 | Rendering (`createRoot`) |
| Vite | 5.4.19 | Dev server and production build |
| @vitejs/plugin-react | 4.3.4 | JSX / Fast Refresh support |

There is no router library, CSS framework or backend. Routing, animations and forms are implemented by hand in `src/main.jsx` and `src/styles.css`.

## Run locally

```bash
npm install
npm run dev        # start the Vite dev server
npm run build      # create a production build in dist/
npm run preview    # serve the production build locally
```

## Deployment

The site is set up for **Vercel**. `vercel.json` rewrites every path to `/index.html`, so direct links and page refreshes on routes such as `/about` or `/projects` load correctly:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## Site structure

Routing is client-side and uses `window.history.pushState` with a custom `app-navigate` event. The browser back and forward buttons are supported via `popstate`. Unknown paths fall back to the Home page, and navigating scrolls to the top of the page.

| Page | Path | Navigation label | Purpose |
| --- | --- | --- | --- |
| Home | `/` | Home | Brand introduction, stats, clients, services, featured work, project brief form |
| About | `/about` | About | Company story, founder, quality standard, leadership, interactive timeline |
| Manufacturing & IBR | `/capabilities` | Manufacturing, IBR Components & Services | Filterable catalogue of 29 manufactured products and services, O&M partners |
| Projects | `/projects` | Projects | 15 industry sector cards covering the full project register, sector ticker |
| Equipment | `/equipment` | Equipment | Searchable hire fleet with availability request modal |
| Contact | `/contact` | Contact | Office details and enquiry form |

---

## Global elements

These appear on every page.

### Header

- **Brand mark:** KB logo image (`/images/kutty-logo.jpg`) with the stacked wordmark “KUTTY BROTHERS”, linking to Home.
- **Main navigation:** Home · About · Manufacturing, IBR Components & Services · Projects · Equipment · Contact.
- **Active state:** the current page's link is highlighted.
- **CTA button:** “Start enquiry ↗”, linking to Contact.
- **Scroll state:** after scrolling more than 30px the header gets a `scrolled` style.
- **Mobile menu:** below **650px** wide, a two-line toggle button opens and closes the navigation. The menu closes automatically after a route change.

### Footer

- **Brand block:** logo, an “ESTABLISHED SINCE 1982” badge and the statement:
  > Precision manufacturing, heavy fabrication, boiler components and dependable industrial services since 1982.
- **Explore column:** links to About, Manufacturing/IBR, Projects, Equipment and Contact.
- **Contact column:**
  - Phone: [+91 44 2652 1027](tel:+914426521027)
  - Email: [info@kuttybrothers.in](mailto:info@kuttybrothers.in)
  - Address: 276-D, Vanagaram Road, Athipet, Chennai 600058
- **Base bar:** “© {current year} Kutty Brothers. All rights reserved.”, the tag line “ESTABLISHED SINCE 1982 • CHENNAI, INDIA”, and a “Back to top ↑” link.

### Floating contact hub

A fixed button group on every page:

- **📞 Call Us:** opens `tel:+914426521027`.
- **✉ Enquire:** goes to the Contact page.

### Modals

The app renders three modals. Clicking the dark overlay or the **×** button closes them.

| Modal | Opened from | Contents | Action |
| --- | --- | --- | --- |
| **Project modal** | Home featured projects, Projects sector cards | Kicker, title, image, scope, and a spec grid with Client, Location, Project Timeline and Sector Category | “Enquire about similar projects” goes to Contact |
| **Manufacturing modal** | Manufacturing/IBR product cards | Eyebrow “Manufacturing & IBR Specifications”, title, product image, description, Standard Code (ASME / IBR / IS Codes), Material Grades (SS 304/316, Carbon Steel (MS), Alloy Steel) | “Request Spec Sheet & Enquiry” goes to Contact |
| **Equipment quote modal** | Equipment “Check availability” buttons | Eyebrow “Equipment Rental Enquiry”, “Request {item}”, a spec summary, and a form (see [Forms summary](#forms-summary)) | “Submit Availability Request” shows a toast |

### Toast notifications

Toasts are small ✓ confirmation messages that appear in a toast container and disappear after **4 seconds**. They appear after:

- the Home project brief is submitted,
- the Contact enquiry is submitted,
- an equipment availability request is submitted (“Availability request sent for {item}!”).

---

## Home page

### 1. Hero: “Built for the *work that matters.*”

- Full-screen industrial background image with a grain overlay.
- Supporting copy: “Manufacturing, IBR pressure components, heavy fabrication, and machinery for the industries that keep India moving.”
- CTA: **Explore manufacturing & IBR**, linking to `/capabilities`.
- Bottom bar: an animated mouse “Scroll to discover” indicator and the coordinate tag **13°04′ N 80°11′ E — CHENNAI**.
- Parallax: while scrolling, the image scales up and moves down, and the text drifts down and fades out.

### 2. Who we are: “Engineering is our *language.*”

- Lead: “For over four decades, Kutty Brothers has transformed complex industrial requirements into dependable work on the ground.”
- Body: covers plant construction, boiler components, specialised equipment and shutdown support, and KB's standard of safety.
- CTA: **Our story**, linking to `/about`.

### 3. At a glance (statistics panel)

A split layout with an industrial image beside a dark panel. The numbers count up (ease-out, about 2 seconds) the first time they scroll into view:

| Figure | Label | Sub-label |
| --- | --- | --- |
| **44+** | Years of experience | EST. 1982 |
| **15+** | Industrial sectors | — |
| **90+** | Landmark projects | — |

Footer copy: “Trusted by leading national institutions and industrial conglomerates across the full spectrum of Indian industry.”

### 4. Trusted by industry leaders: “Built with the *best in business.*”

- Intro: “Our work has earned the confidence of national institutions and leading industrial companies across India.”
- Client logos: **ISRO, Birla Carbon, Parrys (E.I.D.-Parry), Epsilon Carbon, Reliance Industries**.
- **Four marquee rows** that alternate direction (left, right, left, right). Each row starts from a different point in the logo list so the rows don't line up. Logos are shown in black and white.

### 5. What we do: “Strength at *every scale.*”

A CTA button (**Manufacturing & IBR**) and four hoverable service rows, each linking to `/capabilities`:

| Service | Description |
| --- | --- |
| Fabrication & erection | Precision execution for process plants, heavy structures and critical industrial systems. |
| IBR components | Certified boiler components, pressure vessels and technical repair services. |
| Operation & maintenance | Planned turnarounds and emergency support that keeps your operations on track. |
| Equipment hire | A capable fleet of lifting winches, hydraulic jacks, rolling and welding equipment. |

### 6. Selected work: “Proven under *pressure.*”

- Dark section with a pulsing **“LIVE FEATURED PROJECTS”** badge.
- Shows two project cards (one large, one standard) that **rotate automatically every 4 seconds** with a fade transition, cycling through three pairs:
  1. Kudankulam Nuclear Power Plant + Indian Space Research Organisation
  2. Neyveli Lignite Corporation + Birla Carbon India Ltd
  3. UltraTech Cements (L&T) + Larsen & Toubro Limited
- Each card shows the sector kicker, title and “client • location”. Clicking a card opens the **Project modal**.

Featured project data:

| # | Project | Sector | Client | Location | Period | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Kudankulam Nuclear Power Plant | Nuclear power | Nuclear Power Corporation of India Ltd | Kudankulam, Tamil Nadu | 2019 – Present | High-pressure piping erection, heavy equipment rigging, certified nuclear-grade fabrication |
| 02 | Neyveli Lignite Corporation | Thermal power | Neyveli Lignite Corp Ltd | Neyveli, Tamil Nadu | 2015 – 2021 | Turnkey boiler structural erection, ducting overhaul, pressure vessel replacement, annual shutdown support |
| 03 | Indian Space Research Organisation | Aerospace | ISRO / SDSC SHAR | Sriharikota, AP | 2018 – Present | Launchpad support structures, high-capacity winching systems, precision structural fabrication |
| 04 | Birla Carbon India Ltd | Carbon & black | Aditya Birla Group | Gummidipoondi, TN | 2012 – Ongoing | Continuous O&M, reactor vessel overhaul, heavy duct fabrication, mechanical turnarounds |
| 05 | UltraTech Cements (L&T) | Cement | UltraTech Cement / L&T | Reddiyarpatti, TN | 2016 – 2020 | Kiln shell repair, plate rolling up to 36 mm, clinker cooler erection, silo fabrication |
| 06 | Larsen & Toubro Limited | Heavy engineering | L&T Heavy Engineering | Kattupalli Port, Chennai | 2014 – Present | Yard mechanical support, heavy crane lifting, subsea module pipe fabrication, structural assembly |

### 7. Let's build: “Bring us your *toughest brief.*”

A contact band combining sales copy with a project brief form.

**Left column**

- Copy inviting briefs for fabrication tolerances, IBR boiler components, urgent shutdowns or equipment hire.
- Contact items:
  - 📞 Direct Engineering Line: +91 44 2652 1027
  - ✉️ Email RFQ & Drawings: info@kuttybrothers.in
  - 📍 Works & Headquarters: Athipet, Chennai, TN 600058
- Trust pills: **⚡ 24h Engineering Review** · **🔒 Strict Confidentiality & NDA** · **✓ Certified IBR & ISO Quality**

**Right column: “DIRECT RFQ / BRIEF — Start a conversation”**

The project brief form (fields listed in [Forms summary](#forms-summary)). After submission, the form is replaced by a **“Brief Submitted”** panel with a “Send another enquiry” reset button, and a toast appears.

---

## About page

### 1. Page hero: “Four decades of *making things work.*”

- Eyebrow: About Kutty Brothers.
- Copy: “An Indian engineering partner built on resourcefulness, skill and a promise to finish what we start.”
- Parallax background image.

### 2. Our beginning

- **Founder card:** portrait of **DR (HONS) ISMAIL.K**, with the overlay badge “DR (HONS) ISMAIL.K // FOUNDER (1982)” and the caption “Founder of Kutty Brothers · EST. 1982”.
- **Story copy:**
  - Kutty Brothers was founded in 1982 by DR (HONS) ISMAIL.K and his brothers to deliver work industrial clients could depend on.
  - It started with fabrication and erection, then expanded into tools and machinery hire, cranes, boiler repairs, and manufacturing boiler components and pressure vessels.
  - KB now operates across hydrocarbon, power, chemical, aerospace, steel, cement and other sectors.
  - It is still guided by careful project control, motivated people and lasting quality.

### 3. The KB standard: “Quality and safety are *non-negotiable.*”

A dark, image-led section with the copy “dependable work is responsible work” and three numbered values:

1. Skilled teams & certified welders
2. Well-maintained equipment fleet
3. Disciplined site execution

### 4. Leadership: “A legacy carried *forward.*”

- Intro: the founding values continue to guide KB's people, projects and future.
- **CEO card: Mr. Riyaz K.I**
  - Portrait with an “EXECUTIVE LEADERSHIP” badge and ambient glow.
  - Role pill: *Chief Executive Officer*. Tenure tag: *12+ Yrs Operations*.
  - Bio: the proceedings of the company now rest with Mr. Riyaz K.I, son of Mr. Ismail, who has been involved in all company operations for the past 12 years.
  - Focus areas:
    - Spearheading nuclear, aerospace & high-pressure sectors
    - Leading modernisation of heavy plant machinery & certified IBR fleet
  - Sign-off seal: “KB — EXECUTIVE / Leading today”, with the quote **“Precision at scale.”**

### 5. Our evolution: “Four decades of precision, *resilience & growth.*”

An interactive timeline with a progress rail and four era cards. Clicking a rail node, or clicking or hovering a card, makes that era active. The rail's progress bar then fills to that era, and the card shows “● CURRENT ERA”.

| Phase | Year | Badge | Title | Description | Highlights | Stat |
| --- | --- | --- | --- | --- | --- | --- |
| 01 / 04 | 1982 | FOUNDATION | The beginning | KB is founded to undertake structural fabrication and site erection projects. | Structural Steel Fabrication · Site Erection & Rigging · Heavy Industrial Frames | EST. 1982 — Foundation |
| 02 / 04 | 1990s | FLEET & CRANES | A broader capability | Expansion into equipment, heavy winch machinery and crane hire. | Heavy Winches to 100T · Hydraulic Jack Fleet · Heavy Crane Operations | 100 T — Winch Systems |
| 03 / 04 | 2000s | SPECIALISATION | Technical depth | Boiler repairs, IBR components and pressure vessels become core strengths. | Certified IBR Standards · High-Pressure Vessels · Thermal Columns & ESP | IBR WELDING — Coded Standards |
| 04 / 04 | Today | STRATEGIC PARTNER | A trusted partner | KB supports India's leading nuclear, aerospace and power projects. | ISRO Space Hardware · Nuclear Plant Installations · Turnkey Heavy Projects | 42+ YEARS — National Trust |

---

## Manufacturing, IBR Components & Services page

Path: `/capabilities`. This page has no image hero. It starts directly with the intro.

### 1. Intro: “Specialized *Industrial Offerings.*”

- Eyebrow: End-to-End Manufacturing & Services.
- Lead: “Built to ASME, TEMA, and IBR regulations with uncompromising quality, non-destructive testing (NDT), and certified welding standards.”

### 2. Category filter bar

Eight filter buttons. The selected one is highlighted.

| Filter | Key | Items |
| --- | --- | --- |
| All Products & Services | `all` | 29 |
| Vessels & Silos | `vessels` | 5 |
| Process Equipment & Towers | `process` | 5 |
| Structures & Sheds | `structures` | 5 |
| Thermal & IBR | `thermal` | 4 |
| Filtration & ESP | `filtration` | 3 |
| Piping & Allied | `piping` | 3 |
| Heavy Equipment & Aerospace | `heavy` | 4 |

### 3. Product and service catalogue (29 cards)

Each card shows an image, title and description, with a “Request Specifications ↗” footer. Clicking a card opens the **Manufacturing modal**.

| # | Product / service | Category | Description |
| --- | --- | --- | --- |
| 1 | Vessel | Vessels & Silos | High-pressure chemical and process storage vessels to ASME and IBR standards |
| 2 | Reactors | Process | Jacketed and limpeted reaction vessels with precision agitation |
| 3 | Industrial Sheds & Built-Up Structures | Structures | Pre-engineered steel buildings, factory sheds, built-up girders, crane gantries |
| 4 | Heavy Equipments | Heavy | Custom winch systems, heavy lifting beams, specialised machinery components |
| 5 | Dryers | Process | Rotary, fluid bed and continuous thermal drying systems |
| 6 | Piping and Allied Equipment | Piping | IBR-certified steam spools, manifolds, valve headers, alloy steel piping |
| 7 | Storage Tanks | Vessels & Silos | Large vertical and horizontal tanks in MS and SS |
| 8 | Launching Pads | Heavy | Aerospace launchpad support structures, umbilical towers, erection frames |
| 9 | Storage Silos (MS / SS) | Vessels & Silos | Silos for cement, fly ash, carbon black and bulk materials |
| 10 | Heavy Sliding Doors | Structures | Motorised hangar doors, blast-resistant doors, acoustic sliding barriers |
| 11 | Bag filters & ESP | Filtration | Pulse-jet baghouses and electrostatic precipitators for emission control |
| 12 | Chimney / Stack | Heavy | Self-supporting and guyed steel chimneys, flues, high-temperature stacks |
| 13 | Chutes | Heavy | Material transfer chutes with abrasion-resistant liners and drop boxes |
| 14 | Dish Ends | Vessels & Silos | Torispherical, ellipsoidal and hemispherical dished ends to code |
| 15 | Hot Gas Filters | Filtration | Ceramic and metallic high-temperature gas filtration vessels |
| 16 | Heat Exchangers | Thermal & IBR | Shell & tube exchangers, condensers, reboilers to TEMA and IBR |
| 17 | Evaporators | Thermal & IBR | Multiple-effect and falling-film evaporators for ZLD plants |
| 18 | Furnaces | Thermal & IBR | Annealing furnaces, process ovens, refractory-lined combustion chambers |
| 19 | Cartridge Filter Tanks | Filtration | SS multi-cartridge liquid filter tanks for pharma and chemical processes |
| 20 | Dampers | Piping | Louver, butterfly and guillotine gas isolation dampers |
| 21 | Bunkers | Structures | Heavy plate coal bunkers, limestone bins, surge hoppers |
| 22 | Distillation Column | Process | Distillation towers, fractionating and packed absorption columns |
| 23 | Expansion Bellows | Piping | Metallic and fabric expansion joints, flexible duct connectors |
| 24 | Hoppers | Structures | Conical and rectangular discharge hoppers with wear liners |
| 25 | Paint Booth (Automobile) | Structures | Downdraft spray booths with heated air handling and exhaust filtration |
| 26 | Drying Towers | Process | Spray drying towers and gas absorption columns |
| 27 | Absorption Towers | Process | Chemical absorption columns and gas scrubbers |
| 28 | Digesters | Vessels & Silos | Anaerobic and pulp digesters, bio-process treatment tanks |
| 29 | IBR | Thermal & IBR | Certified IBR steam headers, boilers, superheaters, steam drums, boiler components |

### 4. Operations & maintenance partners: “Keeping key plants *on.*”

A numbered grid of O&M clients:

01. Birla Carbon India Ltd
02. Saint-Gobain India
03. Epsilon Carbon Pvt Ltd
04. E.I.D-Parry India Ltd
05. SRHHL

---

## Projects page

### 1. Page hero: “Work that *moves industry.*”

- Eyebrow: Projects.
- Copy: “A cross-sector record of solving high-stakes engineering challenges for India's leading organisations.”

### 2. Our portfolio: “Across the map. *Across the spectrum.*”

- Intro: “Our work has supported industrial progress across power, process, manufacturing and national infrastructure.”
- **15 sector cards**, each with an image, sector title and client list.
- A card shows its first **3 clients**. If there are more, a **“View More + / Show Less −”** button expands the list.
- **“View sector experience ↗”**, or clicking a card that has 3 or fewer clients, opens the **Project modal** with a generated sector summary (location: India, timeline: 1982 – Present).

| # | Sector | Clients / projects |
| --- | --- | --- |
| 1 | Aerospace industry | ISRO (Indian Space Research Organisation) |
| 2 | Nuclear power | Kudankulam Nuclear Power Plant; Kalpakkam Atomic Power Plant |
| 3 | Thermal power | LVS Power Plant; Ind-Barath Power Gencom Limited; Cauvery Power Generation Chennai (P) Ltd.; BGR Energy Systems Ltd.; Lanco Industries Ltd.; Neyveli Lignite Corporation |
| 4 | Cement industry | ACC Cement Plant; UltraTech Cements (L&T) |
| 5 | Chemical industry | Adheeswara Chemicals Pvt. Ltd.; Coromandel Indarc; Coromandel International Limited; Coromandel Fertilisers Limited; Kamar Chemicals & Ind. Limited; Keerthi (Bangalore) Pvt. Ltd.; Krishna Chemicals & Ind. Limited; Royalaseema Hi-Strength Alkalis Ltd. |
| 6 | Water & effluent treatment plant | Quality Water Management |
| 7 | Hydrocarbon / refineries / diesel power | Andhra Petro Chemicals Ltd.; V.B. Ferro Alloys Limited; Viki Industries Limited; Cetex Limited; U.B. Petro Products; Airoil - Flaregas India Limited |
| 8 | Carbon & carbon black | Epsilon Carbon Pvt. Ltd.; Hi-Tech Carbon; Philips Carbon India Ltd. |
| 9 | Sugar & distilleries | Kothari Sugars; Shaw Wallce & Company Limited; A.P. Met Distillery Limited; Gemini Distillery Limited; Khoday Distillery Limited; Maharashtra Distillery Limited; Aravind Distilleries |
| 10 | Steel industry | Kanishk Steel Limited; VKG Steels Limited; SISCOL Limited; Pinakini Steels Limited |
| 11 | Textile industry | Loyal Textile Limited; Valli Mills Limited |
| 12 | Pharma & drugs industry | Malladi Drugs & Pharmaceutical Ltd.; Aswini Bio-Pharma Limited; Lactochem Limited; J.K. Pharma Limited |
| 13 | Glass industry | Saint-Gobain Glass India Limited |
| 14 | Automobile industry | Visteon Ford India; Heavy Vehicle Factory; Ford Motors India Limited; Hwashin Automotive India Limited; Hyundai Motors India Limited |
| 15 | Heavy engineering | L&T Limited; Rishabh Engineering Limited; Southern Structurals Limited; Chennai Harbour; Balda Mothersons India Limited; Chowal India Limited; Liporite Limited |

### 3. Sector ticker

A scrolling strip that reads:
**Hydrocarbon ✦ Chemical ✦ Nuclear ✦ Cement ✦ Aerospace ✦ Steel ✦ Thermal Power**

---

## Equipment page

### 1. Page hero: “Ready when the *work calls.*”

- Eyebrow: Tools & equipment.
- Copy: “A versatile fleet of proven equipment, available to strengthen your site capacity and keep your programme moving.”

### 2. Equipment hire fleet: “Capability you can *call on.*”

Lead: “Access well-maintained equipment and technical support from a team that understands the realities of industrial worksites.”

### 3. Search bar

A live search box (“Search equipment fleet (e.g. Winches, Jacks, Rolling)…”). It filters cards by title or description as you type and ignores letter case.

### 4. Equipment grid

Each card shows a “0N / capacity” tag, a photo, an icon, the title and a description, plus a **Check availability ↗** button that opens the **Equipment quote modal**.

| # | Equipment | Icon | Capacity tag | Description |
| --- | --- | --- | --- | --- |
| 01 | Motorised Winches | ↗ | Up to 100 T | Heavy-duty winch systems up to 100 T with dual braking |
| 02 | Hydraulic Jacks | ⊞ | Up to 400 T | High-tonnage synchronous lifting hydraulic jacks |
| 03 | Rolling Machines | ○ | Up to 36 mm | 3-roller precision bending machines for heavy SS & MS plates |
| 04 | Welding Systems | ⌁ | Certified IBR | Multi-process MIG / TIG / K320 automatic welding plants |
| 05 | Tank Jacks | ↟ | Up to 12 T / 2.5 m | Hydraulic tank erection jacking equipment |
| 06 | Air Compressors | ◒ | Up to 40 hp | High-pressure diesel and electric compressor fleet |

### 5. Equipment CTA: “Tell us what you *need to lift.*”

A dark banner with the eyebrow “Need something specific?” and a **Talk to our team** button linking to Contact.

---

## Contact page

### 1. Contact hero: “Let's get *to work.*”

- Eyebrow: Contact us.
- Copy: “For project enquiries, equipment availability or partnership opportunities, our team is ready to talk.”

### 2. Find us: “Chennai, *Tamil Nadu.*”

| Label | Detail | Link |
| --- | --- | --- |
| Visit Head Office | Door No: 276-D, Vanagaram Road, Athipet, Chennai, TN 600058 | Opens Google Maps in a new tab |
| Call Us Direct | +91 44 2652 1027 | `tel:` link |
| Email Us | info@kuttybrothers.in | `mailto:` link |

### 3. Send an enquiry

Heading: “Tell us a little about your project or equipment requirement.” After submission, the form shows **“Thank you.”**, the message “Your enquiry has been received…”, and a **Send another enquiry** reset button. A toast also appears.

---

## Forms summary

> **Important:** All forms are front-end only. Submitting them shows a success state or toast in the browser. **No data is sent to an email address, API or database.** A form handler (for example Formspree, EmailJS or a serverless function) must be connected before they collect real enquiries.

| Form | Location | Fields (* = required) | On submit |
| --- | --- | --- | --- |
| Project brief | Home → Let's build | Your Name*, Company / Organisation*, Work Email*, Phone Number*, Service / Requirement Category (select), Project Scope & Specifications*, consent checkbox* | “Brief Submitted” panel + toast |
| Enquiry | Contact page | Your Name*, Company / Organisation, Email Address*, Contact Number, How can we help?*, consent checkbox* | “Thank you.” panel + toast |
| Equipment availability | Equipment quote modal | Your Name*, Contact Number*, Estimated Hire Duration (7 / 15 / 30 / 90 days, default 15) | Modal closes + toast |

The project brief category options are:

- Heavy Structural Fabrication & Erection
- Certified IBR Boiler Components & Pressure Vessels
- Heavy Equipment & Winch Rental
- Plant Shutdown & Turnaround Maintenance
- General Engineering Enquiry / Other

---

## Motion and interaction design

| Effect | Where | How |
| --- | --- | --- |
| Scroll reveal | Any element with `data-reveal` | `IntersectionObserver` plus a scroll/resize check and a `MutationObserver`. A fallback timer (450 ms) reveals everything, so content never stays hidden |
| Hero parallax | Home hero, page heroes, contact hero | `requestAnimationFrame` transforms tied to `scrollY`. Text fades out as you scroll |
| Animated counters | Home “At a glance” | Count up from 0 with a cubic ease-out, once per page view |
| Client marquee | Home clients | 4 rows moving in alternating directions, black-and-white logos |
| Auto-rotating projects | Home “Selected work” | Pair changes every 4 s with a fade-out/fade-in |
| Interactive timeline | About | Click/hover selects an era, and the rail bar animates to it |
| Category filters | Manufacturing/IBR | Instant filtering with a card fade-in animation |
| Expandable cards | Projects | View More / Show Less client lists |
| Live search | Equipment | Filters as you type |
| Modals | Projects, manufacturing, equipment | Overlay fade and dialog slide-up |
| Toasts | Form submissions | Slide-in confirmations that disappear after 4 s |
| Hover states | Service rows, cards, portraits, buttons | Image zoom, colour shifts, arrow movement, yellow glow |
| Sticky header | All pages | Changes style after 30px of scrolling |
| Reduced motion | Global | `prefers-reduced-motion: reduce` turns off animations and transitions and shows all revealed content immediately |

## Visual system

**Colour tokens** (`:root` in `src/styles.css`):

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#11110f` | Primary dark / text |
| `--dark-slate` | `#181816` | Dark sections |
| `--card-bg` | `#21211d` | Dark cards |
| `--yellow` | `#f59e0b` | Brand accent |
| `--yellow-light` | `#fde68a` | Light accent |
| `--cream` | `#f7f6f1` | Light backgrounds |
| `--muted` | `#6d6d68` | Secondary text |

**Typography** (Google Fonts):

- **Playfair Display** (`--serif`): headlines and italic `<em>` accents.
- **Manrope** (`--sans`): body text and UI.
- **DM Mono** (`--mono`): eyebrows, labels, coordinates and technical tags.

**Responsive breakpoints:** 1320px, 1100px, 1080px, 900px and 650px. The mobile navigation appears at 650px.

## SEO and metadata

`index.html` includes:

- Meta description and `theme-color` (`#11110f`).
- Open Graph title (“Kutty Brothers | Engineered for Industry Since 1982”), description and image.
- Favicon and Apple touch icon (the KB logo).
- Preconnect hints for Google Fonts.
- **JSON-LD structured data** (`EngineeringCompany`): name, description, founding date 1982, full postal address, telephone and email.

## Assets

| Asset | Location | Used on |
| --- | --- | --- |
| KB logo | `public/images/kutty-logo.jpg` | Header, footer, favicon, OG image |
| Founder portrait | `public/images/ismail-founder.jpeg` | About → Our beginning |
| CEO portrait | `public/images/riyas-ceo.jpeg` | About → Leadership |
| Client logos | `public/images/clients/` (`isro.png`, `birla-carbon.png`, `parrys.png`, `epsilon-carbon.jpg`, `reliance.png`) | Home → Trusted by industry leaders |
| Equipment photos | `public/images/equipment/` (`winch`, `jack`, `roller`, `welder`, `tankjack`, `compressor`) | Equipment grid, About timeline |
| Manufacturing photos | `public/images/manufac/` (29 web-named files) | Manufacturing/IBR catalogue, Projects sector cards, About timeline |
| Original manufacturing photos | `public/images/manufac images/` | Source originals (not referenced by the code) |
| Stock industrial imagery | Remote Unsplash URLs in `src/main.jsx` and `src/styles.css` | Heroes, featured projects, some sector cards, background panels |

## Project structure

```
kuttybrthswebsite/
├── index.html          # HTML shell, fonts, SEO meta, JSON-LD
├── vercel.json         # SPA rewrites for Vercel
├── package.json        # Scripts and dependencies
├── public/
│   ├── favicon.ico / favicon.png
│   └── images/         # Logo, portraits, clients/, equipment/, manufac/
└── src/
    ├── main.jsx        # All pages, components, data, routing and interactions
    └── styles.css      # Design tokens, layouts, animations, breakpoints
```

## Editing content

Most content lives in data arrays at the top of `src/main.jsx`:

| To change… | Edit |
| --- | --- |
| Navigation links | `navItems` |
| Home featured projects / project modal data | `projects` |
| Projects page sector cards | `sectorPortfolio` |
| Home client logos | `clientPartners` |
| Manufacturing / IBR catalogue | `manufacturingItems` (filter labels in `mfgCategories` inside `Capabilities`) |
| Equipment fleet | `equipment` |
| Timeline eras | `eras` inside `Timeline` |
| O&M partners | the array inside the `Capabilities` “Keeping key plants on” section |
| Contact details | `HomeContactSection`, `Contact`, `Footer`, `FloatingHub` and the JSON-LD in `index.html` (the phone, email and address are repeated in each) |
