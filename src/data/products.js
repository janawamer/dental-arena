export const specialties = [
  { id: 'endodontics',       label: 'Endodontics',         icon: '🦷', desc: 'High-quality instruments and materials for root canal therapy.' },
  { id: 'orthodontics',      label: 'Orthodontics',        icon: '😁', desc: 'Brackets, wires, and aligners for orthodontic treatment.' },
  { id: 'restorative',       label: 'Restorative',         icon: '🔬', desc: 'Composites, cements, and adhesives for restorations.' },
  { id: 'implantology',      label: 'Implantology',        icon: '🏥', desc: 'Implants, abutments, and bone graft materials.' },
  { id: 'oral-surgery',      label: 'Oral Surgery',        icon: '⚕️',  desc: 'Forceps, elevators, sutures, and anesthesia supplies.' },
  { id: 'periodontics',      label: 'Periodontics',        icon: '🩺', desc: 'Scalers, curettes, and ultrasonic systems.' },
  { id: 'prosthodontics',    label: 'Prosthodontics',      icon: '👑', desc: 'Impression materials, crowns, and denture supplies.' },
  { id: 'pediatric',         label: 'Pediatric Dentistry', icon: '👶', desc: 'Pediatric crowns, fluoride varnish, and kid-friendly tools.' },
  { id: 'infection-control', label: 'Infection Control',   icon: '🛡️',  desc: 'Gloves, masks, disinfectants, and sterilization.' },
  { id: 'digital',           label: 'Digital Dentistry',   icon: '💻', desc: 'Intraoral scanners, CAD/CAM systems, and CBCT.' },
  { id: 'microscopes',       label: 'Microscopes',         icon: '🔭', desc: 'Surgical microscopes and loupes.' },
  { id: 'all',               label: 'All Specialties',     icon: '⬛', desc: 'Browse our complete catalog.' },
]

export const categories = {
  endodontics:      ['Files', 'Irrigation', 'Obturation', 'Sealers', 'Endo Motors', 'Apex Locators', 'Instruments'],
  orthodontics:     ['Brackets', 'Wires', 'Bands', 'Pliers', 'Retainers', 'Aligners'],
  restorative:      ['Composites', 'Cements', 'Adhesives', 'Matrices', 'Burs', 'Curing Lights'],
  implantology:     ['Implants', 'Abutments', 'Drills', 'Membranes', 'Bone Graft', 'Motors'],
  'oral-surgery':   ['Forceps', 'Elevators', 'Sutures', 'Anesthesia', 'Retractors'],
  periodontics:     ['Scalers', 'Curettes', 'Ultrasonic', 'Membranes'],
  prosthodontics:   ['Impression', 'Crown & Bridge', 'Dentures', 'Articulators'],
  pediatric:        ['Pediatric Crowns', 'Matrices', 'Fluoride', 'Instruments'],
  'infection-control': ['Gloves', 'Masks', 'Sterilization', 'Disinfectants', 'Barriers'],
  digital:          ['Intraoral Scanners', 'CAD/CAM', 'CBCT', 'Software'],
  microscopes:      ['Dental Microscopes', 'Loupes', 'Accessories'],
}

export const products = [
  // Endodontics
  { id: 'e1', name: 'ProTaper Gold Files (S1–F3)', brand: 'Dentsply Sirona', specialty: 'endodontics', category: 'Files',        price: 850,  oldPrice: 1100, rating: 4.8, reviews: 124 },
  { id: 'e2', name: 'WaveOne Gold Reciprocating File', brand: 'Dentsply',    specialty: 'endodontics', category: 'Files',        price: 950,  oldPrice: null, rating: 4.7, reviews: 89  },
  { id: 'e3', name: 'Endovac Irrigation System',    brand: 'Kerr',          specialty: 'endodontics', category: 'Irrigation',   price: 3200, oldPrice: 3800, rating: 4.9, reviews: 56  },
  { id: 'e4', name: 'AH Plus Root Canal Sealer',    brand: 'Dentsply',      specialty: 'endodontics', category: 'Sealers',      price: 450,  oldPrice: null, rating: 4.6, reviews: 210 },
  { id: 'e5', name: 'X-Smart IQ Endo Motor',        brand: 'Dentsply',      specialty: 'endodontics', category: 'Endo Motors',  price: 7800, oldPrice: 9500, rating: 4.9, reviews: 43  },
  { id: 'e6', name: 'Root ZX II Apex Locator',      brand: 'J.Morita',      specialty: 'endodontics', category: 'Apex Locators', price: 6200, oldPrice: null, rating: 4.8, reviews: 77  },
  { id: 'e7', name: 'NaOCl Irrigation Solution',    brand: 'Cerkamed',      specialty: 'endodontics', category: 'Irrigation',   price: 180,  oldPrice: null, rating: 4.4, reviews: 340 },
  { id: 'e8', name: 'Reciproc Blue R25 Files',      brand: 'VDW',           specialty: 'endodontics', category: 'Files',        price: 720,  oldPrice: 880,  rating: 4.7, reviews: 98  },

  // Orthodontics
  { id: 'o1', name: 'MBT Roth Bracket System 0.022"', brand: '3M Unitek',   specialty: 'orthodontics', category: 'Brackets',   price: 1450, oldPrice: 1800, rating: 4.8, reviews: 155 },
  { id: 'o2', name: 'NiTi Round Wire 0.014"',       brand: 'Ormco',         specialty: 'orthodontics', category: 'Wires',      price: 280,  oldPrice: null, rating: 4.5, reviews: 200 },
  { id: 'o3', name: 'Damon Q Self-Ligating Brackets', brand: 'Ormco',       specialty: 'orthodontics', category: 'Brackets',   price: 3900, oldPrice: 4500, rating: 4.9, reviews: 88  },
  { id: 'o4', name: 'Molar Bands with Tubes',       brand: 'AmericanOrtho', specialty: 'orthodontics', category: 'Bands',      price: 650,  oldPrice: null, rating: 4.3, reviews: 120 },

  // Restorative
  { id: 'r1', name: 'Filtek Z350 XT Composite A2',  brand: '3M',            specialty: 'restorative',  category: 'Composites', price: 620,  oldPrice: 780,  rating: 4.9, reviews: 412 },
  { id: 'r2', name: 'Tetric EvoCeram A3 Composite', brand: 'Ivoclar',       specialty: 'restorative',  category: 'Composites', price: 680,  oldPrice: null, rating: 4.7, reviews: 290 },
  { id: 'r3', name: 'RelyX Universal Luting Cement', brand: '3M',           specialty: 'restorative',  category: 'Cements',    price: 950,  oldPrice: 1150, rating: 4.8, reviews: 178 },
  { id: 'r4', name: 'Scotchbond Universal Adhesive', brand: '3M',           specialty: 'restorative',  category: 'Adhesives',  price: 880,  oldPrice: null, rating: 4.8, reviews: 321 },
  { id: 'r5', name: 'Elipar DeepCure-S LED Light',  brand: '3M',            specialty: 'restorative',  category: 'Curing Lights', price: 5500, oldPrice: 6800, rating: 4.9, reviews: 67 },
  { id: 'r6', name: 'Diamond Bur Set (10 pcs)',      brand: 'Mani',          specialty: 'restorative',  category: 'Burs',       price: 350,  oldPrice: null, rating: 4.5, reviews: 510 },

  // Implantology
  { id: 'i1', name: 'Straumann BL 4.1mm Implant',  brand: 'Straumann',     specialty: 'implantology', category: 'Implants',   price: 4500, oldPrice: null, rating: 5.0, reviews: 234 },
  { id: 'i2', name: 'Nobel Active 4.3mm Implant',   brand: 'Nobel Biocare', specialty: 'implantology', category: 'Implants',   price: 5200, oldPrice: 6000, rating: 4.9, reviews: 189 },
  { id: 'i3', name: 'Bio-Oss 0.5g Bone Graft',      brand: 'Geistlich',     specialty: 'implantology', category: 'Bone Graft', price: 1450, oldPrice: 1750, rating: 4.9, reviews: 143 },
  { id: 'i4', name: 'Bio-Gide Resorbable Membrane', brand: 'Geistlich',     specialty: 'implantology', category: 'Membranes',  price: 1850, oldPrice: null, rating: 4.8, reviews: 98  },

  // Infection Control
  { id: 'ic1', name: 'Nitrile Exam Gloves (100 box)', brand: 'Cranberry',   specialty: 'infection-control', category: 'Gloves', price: 220, oldPrice: 280, rating: 4.6, reviews: 890 },
  { id: 'ic2', name: 'N95 Respirator Masks (20 pk)', brand: '3M',           specialty: 'infection-control', category: 'Masks',  price: 350, oldPrice: null, rating: 4.7, reviews: 560 },
  { id: 'ic3', name: 'Cavicide Surface Disinfectant 1L', brand: 'Metrex',   specialty: 'infection-control', category: 'Disinfectants', price: 280, oldPrice: 340, rating: 4.8, reviews: 430 },

  // Periodontics
  { id: 'p1', name: 'Gracey Curette 1/2 Columbia',  brand: 'Hu-Friedy',     specialty: 'periodontics', category: 'Curettes',   price: 550,  oldPrice: null, rating: 4.7, reviews: 178 },
  { id: 'p2', name: 'Sickle Scaler H6/H7',          brand: 'Hu-Friedy',     specialty: 'periodontics', category: 'Scalers',    price: 480,  oldPrice: 600,  rating: 4.6, reviews: 210 },
  { id: 'p3', name: 'Cavitron Ultrasonic Scaler',   brand: 'Dentsply',      specialty: 'periodontics', category: 'Ultrasonic', price: 12000, oldPrice: 14500, rating: 4.9, reviews: 88 },
]

export const hotDeals = [
  { id: 'hd1', name: 'ProTaper Gold Files Pack',    brand: 'Dentsply Sirona', category: 'Endodontics',       price: 650,  oldPrice: 1100, expiryDays: 5  },
  { id: 'hd2', name: 'Filtek Z350 XT Composite A2', brand: '3M ESPE',        category: 'Restorative',        price: 380,  oldPrice: 620,  expiryDays: 12 },
  { id: 'hd3', name: 'Nitrile Gloves Box (100pcs)', brand: 'Cranberry',       category: 'Infection Control',  price: 140,  oldPrice: 220,  expiryDays: 3  },
  { id: 'hd4', name: 'MBT Bracket System 0.022"',   brand: '3M Unitek',       category: 'Orthodontics',       price: 950,  oldPrice: 1450, expiryDays: 18 },
  { id: 'hd5', name: 'AH Plus Root Canal Sealer',   brand: 'Dentsply',        category: 'Endodontics',        price: 280,  oldPrice: 450,  expiryDays: 7  },
  { id: 'hd6', name: 'Scotchbond Universal Adhesive', brand: '3M',            category: 'Restorative',        price: 520,  oldPrice: 880,  expiryDays: 22 },
  { id: 'hd7', name: 'N95 Masks (20 pack)',          brand: '3M',             category: 'Infection Control',  price: 200,  oldPrice: 350,  expiryDays: 9  },
  { id: 'hd8', name: 'Lidocaine 2% Carpules (50pk)', brand: 'Septodont',      category: 'Oral Surgery',       price: 320,  oldPrice: 550,  expiryDays: 6  },
  { id: 'hd9', name: 'Gracey Curette Set (5pcs)',    brand: 'Hu-Friedy',       category: 'Periodontics',       price: 1200, oldPrice: 1900, expiryDays: 14 },
  { id: 'hd10', name: 'Diamond Bur Set 10pcs',       brand: 'Mani',           category: 'Restorative',        price: 180,  oldPrice: 350,  expiryDays: 4  },
  { id: 'hd11', name: 'Fluoride Varnish 5% (50 doses)', brand: 'Colgate',     category: 'Pediatric',          price: 220,  oldPrice: 380,  expiryDays: 30 },
  { id: 'hd12', name: 'Cavicide Disinfectant 1L',    brand: 'Metrex',         category: 'Infection Control',  price: 160,  oldPrice: 280,  expiryDays: 20 },
]

export const listings = [
  { id: 'l1', name: 'Planmeca ProMax 3D Cone Beam CT', category: 'Imaging',       condition: 'Used',  price: 280000, seller: 'Dr. Ahmed Khalil',  city: 'Cairo',       desc: '2019 model, excellent condition. Full service history available.' },
  { id: 'l2', name: 'A-dec 500 Dental Chair Package',  category: 'Dental Chairs', condition: 'Used',  price: 185000, seller: 'Dr. Sara Nasser',   city: 'Alexandria',  desc: '2021 model, used in private clinic. All functions working.' },
  { id: 'l3', name: 'W&H Implantmed Surgical Motor',   category: 'Motors',        condition: 'Used',  price: 42000,  seller: 'Dr. Mohamed Ali',   city: 'Giza',        desc: 'Like new condition, comes with all attachments and original box.' },
  { id: 'l4', name: 'Dentsply Cavitron Ultrasonic',    category: 'Equipment',     condition: 'Used',  price: 18000,  seller: 'Dr. Layla Hassan',  city: 'Cairo',       desc: '2020 model, serviced and calibrated. Extra tips included.' },
  { id: 'l5', name: 'Global Surgical Dental Microscope', category: 'Microscopes', condition: 'Used',  price: 320000, seller: 'Dr. Kareem Farouk', city: 'Mansoura',    desc: '6-step magnification, excellent optics. Selling due to relocation.' },
  { id: 'l6', name: 'iTero Element Intraoral Scanner', category: 'Scanners',      condition: 'Used',  price: 550000, seller: 'Dr. Nour Samir',   city: 'Cairo',       desc: '2022 model, great scan quality, includes laptop and case.' },
  { id: 'l7', name: 'Autoclave 23L Class B Melag',     category: 'Sterilization', condition: 'New',   price: 85000,  seller: 'Dental Supply Co.', city: 'Cairo',       desc: 'Brand new, sealed in original packaging. Imported directly.' },
  { id: 'l8', name: 'Kavo Handpiece Set (3 pieces)',   category: 'Handpieces',    condition: 'Used',  price: 28000,  seller: 'Dr. Rania Mostafa', city: 'Alexandria',  desc: 'High-speed and slow-speed, recently serviced. Good condition.' },
]

export const sponsors = [
  { id: 's1', brand: '3M ESPE',        title: 'Buy 3 Get 1 Free – Filtek Z350',     desc: 'Stock up on the world\'s most trusted composite. Valid on all shades.',                         code: '3M-BUY3',    expiry: 'July 31, 2024',    color: 'blue'   },
  { id: 's2', brand: 'Dentsply Sirona', title: '20% Off All ProTaper Files',          desc: 'Upgrade your endo workflow with ProTaper Gold and ProTaper Next.',                              code: 'DS-ENDO20',  expiry: 'Aug 15, 2024',     color: 'indigo' },
  { id: 's3', brand: 'Hu-Friedy',       title: 'Free Cassette on Orders Over 1,000 EGP', desc: 'Organize your instruments with a premium Hu-Friedy cassette, on us.',                      code: 'HF-CASS',    expiry: 'July 20, 2024',    color: 'purple' },
  { id: 's4', brand: 'Ivoclar',         title: '15% Off IPS e.max Press Ingots',     desc: 'The world\'s leading all-ceramic system at an unbeatable price.',                               code: 'IVC-EMAX15', expiry: 'Aug 31, 2024',     color: 'orange' },
  { id: 's5', brand: 'Geistlich',       title: 'Bundle Deal – Bio-Oss + Bio-Gide',   desc: 'Get the complete regeneration kit at 18% off the individual prices.',                           code: 'GEI-BUNDLE', expiry: 'Sep 10, 2024',     color: 'green'  },
  { id: 's6', brand: 'EMS',             title: 'Free Airflow Tips with System',       desc: 'Get a bonus pack of 20 Airflow nozzle tips with every Airflow system purchase.',                code: 'EMS-TIPS',   expiry: 'Aug 5, 2024',      color: 'teal'   },
]
