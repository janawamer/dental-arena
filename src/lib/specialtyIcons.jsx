import {
  Stethoscope, Activity, Heart, Zap, Eye, Smile, Scissors,
  Package, Shield, Monitor, Pill, FlaskConical, Sun, Sparkles,
  Cpu, Wrench, Droplets, Baby, Wind, Syringe, Bone, Brain,
  Thermometer, Scan, Layers, Star, CircleDot, Aperture,
  ShieldPlus, Cross, Bandage, HeartPulse, Microscope as LucideMicroscope,
} from 'lucide-react'

const ic = (children) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    {children}
  </svg>
)

// Custom dental SVG icons — keyed by specialty ID
export const SPECIALTY_SVG = {
  endodontics: ic(<>
    <path d="M15 9C11 9 8 13 9 19L12 37C12.5 40 14 41 16 41C18 41 19.5 39 20 36L24 27L28 36C28.5 39 30 41 32 41C34 41 35.5 40 36 37L39 19C40 13 37 9 33 9C30 6 18 6 15 9Z"/>
    <line x1="20" y1="18" x2="19" y2="33"/><line x1="28" y1="18" x2="29" y2="33"/>
  </>),

  orthodontics: ic(<>
    <path d="M7 10C5 10 4 13 5 17L7 33C7.5 35 8.5 36 10 36C11.5 36 12.5 35 13 33L14 17C14.5 13 13 10 11 10L7 10Z"/>
    <path d="M17 9C15 9 14 12 14.5 17L16 35C16.5 37 17.5 38 19 38C20.5 38 21.5 37 22 35L23 17C23.5 12 22 9 20 9L17 9Z"/>
    <path d="M28 9C26 9 25 12 25.5 17L27 35C27.5 37 28.5 38 30 38C31.5 38 32.5 37 33 35L34 17C34.5 12 33 9 31 9L28 9Z"/>
    <path d="M39 10C37 10 36 13 36.5 17L38 33C38.5 35 39.5 36 41 36C42.5 36 43.5 35 44 33L45 17C45.5 13 44 10 42 10L39 10Z"/>
    <line x1="4" y1="21" x2="46" y2="21"/>
    <rect x="7" y="19" width="5" height="4" rx="1"/>
    <rect x="17.5" y="19" width="5" height="4" rx="1"/>
    <rect x="27.5" y="19" width="5" height="4" rx="1"/>
    <rect x="38" y="19" width="5" height="4" rx="1"/>
  </>),

  restorative: ic(<>
    <path d="M15 9C11 9 8 13 9 19L12 37C12.5 40 14 41 16 41C18 41 19.5 39 20 36L24 27L28 36C28.5 39 30 41 32 41C34 41 35.5 40 36 37L39 19C40 13 37 9 33 9C30 6 18 6 15 9Z"/>
    <path d="M15 9C18 6 30 6 33 9L36 16H12L15 9Z" fill="currentColor" opacity="0.15"/>
    <path d="M12 16H36"/>
  </>),

  implantology: ic(<>
    <path d="M24 6L20 10H28L24 6Z"/>
    <rect x="20" y="10" width="8" height="6" rx="1"/>
    <line x1="24" y1="16" x2="24" y2="42"/>
    <line x1="20" y1="20" x2="24" y2="20"/><line x1="28" y1="20" x2="24" y2="20"/>
    <line x1="20" y1="24" x2="24" y2="24"/><line x1="28" y1="24" x2="24" y2="24"/>
    <line x1="20" y1="28" x2="24" y2="28"/><line x1="28" y1="28" x2="24" y2="28"/>
    <line x1="20" y1="32" x2="24" y2="32"/><line x1="28" y1="32" x2="24" y2="32"/>
    <line x1="20" y1="36" x2="24" y2="36"/><line x1="28" y1="36" x2="24" y2="36"/>
    <ellipse cx="24" cy="42" rx="6" ry="2"/>
  </>),

  'oral-surgery': ic(<>
    <path d="M6 8L18 22M6 22L18 8" strokeWidth="2.5"/>
    <circle cx="12" cy="15" r="3"/>
    <path d="M18 22L26 32C27 33 27 35 26 36L25 37C24 38 22 38 21 37L12 28"/>
    <path d="M26 32L36 36C38 37 40 36 41 34L42 32C43 30 42 28 40 27L32 24"/>
    <path d="M26 36C27 38 26 41 24 42C21 44 18 42 18 39"/>
  </>),

  periodontics: ic(<>
    <path d="M16 10C13 10 10 13 11 19L14 38C14.5 41 16 42 18 42C20 42 21.5 40 22 37L24 28L26 37C26.5 40 28 42 30 42C32 42 33.5 41 34 38L37 19C38 13 35 10 32 10C29 7 19 7 16 10Z"/>
    <path d="M8 20C12 14 20 12 24 14C28 12 36 14 40 20" strokeWidth="1.5" opacity="0.6"/>
    <line x1="42" y1="12" x2="38" y2="38" strokeWidth="1.5"/>
    <circle cx="42" cy="11" r="2.5" fill="currentColor" opacity="0.3"/>
  </>),

  prosthodontics: ic(<>
    <path d="M8 16C8 14 10 12 12 12H36C38 12 40 14 40 16V20H8V16Z"/>
    <path d="M8 20H40"/>
    <path d="M12 20C12 20 11 22 11 26C11 32 13 36 16 36C19 36 20 32 20 28H28C28 32 29 36 32 36C35 36 37 32 37 26C37 22 36 20 36 20"/>
    <line x1="16" y1="20" x2="16" y2="36"/>
    <line x1="32" y1="20" x2="32" y2="36"/>
    <path d="M11 14C11 10 13 8 16 8C19 8 20 10 20 12"/>
    <path d="M28 12C28 10 29 8 32 8C35 8 37 10 37 14"/>
  </>),

  pediatric: ic(<>
    <path d="M17 12C14 12 12 15 13 19L15 34C15.5 36.5 17 37.5 19 37.5C21 37.5 22.5 36 23 33.5L24 28L25 33.5C25.5 36 27 37.5 29 37.5C31 37.5 32.5 36.5 33 34L35 19C36 15 34 12 31 12C28.5 10 19.5 10 17 12Z"/>
    <circle cx="20" cy="19" r="1.8" fill="currentColor"/>
    <circle cx="28" cy="19" r="1.8" fill="currentColor"/>
    <path d="M20 24Q24 28 28 24"/>
  </>),

  'infection-control': ic(<>
    <path d="M24 5L8 11V24C8 33 15 40 24 43C33 40 40 33 40 24V11L24 5Z"/>
    <line x1="24" y1="17" x2="24" y2="31"/>
    <line x1="17" y1="24" x2="31" y2="24"/>
  </>),

  digital: ic(<>
    <rect x="6" y="9" width="36" height="24" rx="2"/>
    <rect x="8" y="11" width="32" height="20" rx="1"/>
    <path d="M4 33H44L42 38H6L4 33Z"/>
    <path d="M19 15C17 15 16 17 16.5 20L18 27C18.5 29 19.5 30 21 30C22.5 30 23.5 29 24 27L24.5 25L25 27C25.5 29 26.5 30 28 30C29.5 30 30.5 29 31 27L32.5 20C33 17 32 15 30 15C28 13.5 21 13.5 19 15Z" strokeWidth="1.4"/>
  </>),

  microscopes: ic(<>
    <rect x="20" y="5" width="8" height="5" rx="1.5"/>
    <line x1="24" y1="10" x2="24" y2="20"/>
    <path d="M18 20H30L28 24H20L18 20Z"/>
    <line x1="24" y1="24" x2="24" y2="32"/>
    <line x1="14" y1="32" x2="34" y2="32"/>
    <rect x="16" y="36" width="16" height="5" rx="2"/>
    <path d="M24 10C24 10 34 10 34 22"/>
    <circle cx="34" cy="22" r="2" fill="currentColor" opacity="0.2"/>
  </>),

  consumables: ic(<>
    <path d="M30 6L34 10L18 26L14 22L30 6Z"/>
    <path d="M34 10L38 14L36 16L32 12L34 10Z"/>
    <path d="M14 22L10 26L8 32L6 38L12 36L18 34L22 30L18 26L14 22Z"/>
    <line x1="8" y1="32" x2="14" y2="26"/>
    <path d="M36 20C36 20 40 22 42 28C44 34 40 42 34 42C28 42 24 38 24 32"/>
    <path d="M36 20C33 18 30 19 28 22"/>
    <path d="M42 28C40 26 38 26 36 28"/>
  </>),

  instruments: ic(<>
    <circle cx="10" cy="12" r="6"/>
    <circle cx="10" cy="12" r="3" fill="currentColor" opacity="0.15"/>
    <line x1="14" y1="16" x2="38" y2="40"/>
    <path d="M36 38L40 34L44 38L40 42L36 38Z"/>
    <line x1="28" y1="6" x2="28" y2="42" strokeWidth="1.5" opacity="0.5"/>
    <line x1="28" y1="6" x2="30" y2="10"/><line x1="28" y1="6" x2="26" y2="10"/>
    <line x1="28" y1="42" x2="26" y2="38"/><line x1="28" y1="42" x2="30" y2="38"/>
  </>),

  bleaching: ic(<>
    <path d="M15 10C11 10 8 14 9 20L12 38C12.5 41 14 42 16 42C18 42 19.5 40 20 37L24 28L28 37C28.5 40 30 42 32 42C34 42 35.5 41 36 38L39 20C40 14 37 10 33 10C30 7 18 7 15 10Z"/>
    <line x1="6" y1="8" x2="8" y2="12"/><line x1="4" y1="14" x2="8" y2="14"/><line x1="6" y1="20" x2="8" y2="16"/>
    <line x1="42" y1="8" x2="40" y2="12"/><line x1="44" y1="14" x2="40" y2="14"/><line x1="42" y1="20" x2="40" y2="16"/>
    <line x1="24" y1="4" x2="24" y2="8"/>
  </>),

  all: ic(<>
    <rect x="6" y="6" width="15" height="15" rx="2"/>
    <rect x="27" y="6" width="15" height="15" rx="2"/>
    <rect x="6" y="27" width="15" height="15" rx="2"/>
    <rect x="27" y="27" width="15" height="15" rx="2"/>
  </>),
}

// Lucide icon map for additional icons
const LUCIDE = {
  stethoscope: Stethoscope,
  activity: Activity,
  heart: Heart,
  'heart-pulse': HeartPulse,
  zap: Zap,
  eye: Eye,
  smile: Smile,
  scissors: Scissors,
  package: Package,
  shield: Shield,
  'shield-plus': ShieldPlus,
  monitor: Monitor,
  pill: Pill,
  flask: FlaskConical,
  sun: Sun,
  sparkles: Sparkles,
  cpu: Cpu,
  wrench: Wrench,
  droplets: Droplets,
  baby: Baby,
  wind: Wind,
  syringe: Syringe,
  bone: Bone,
  brain: Brain,
  thermometer: Thermometer,
  scan: Scan,
  layers: Layers,
  star: Star,
  'circle-dot': CircleDot,
  aperture: Aperture,
  cross: Cross,
  bandage: Bandage,
  microscope: LucideMicroscope,
}

// Render any icon by key
export function renderSpecialtyIcon(key) {
  if (!key) return SPECIALTY_SVG.endodontics
  if (SPECIALTY_SVG[key]) return SPECIALTY_SVG[key]
  if (key.startsWith('lucide-')) {
    const name = key.slice(7)
    const Icon = LUCIDE[name]
    if (Icon) return <Icon style={{ width: '60%', height: '60%' }} strokeWidth={1.8} />
  }
  return SPECIALTY_SVG.endodontics
}

// Icon set for admin picker (two groups)
export const ICON_SET = [
  // Dental custom SVGs
  { key: 'endodontics',       label: 'Tooth / Endo' },
  { key: 'orthodontics',      label: 'Brackets' },
  { key: 'restorative',       label: 'Filling' },
  { key: 'implantology',      label: 'Implant' },
  { key: 'oral-surgery',      label: 'Scalpel' },
  { key: 'periodontics',      label: 'Probe' },
  { key: 'prosthodontics',    label: 'Crown' },
  { key: 'pediatric',         label: 'Pediatric' },
  { key: 'infection-control', label: 'Shield Cross' },
  { key: 'digital',           label: 'CAD Screen' },
  { key: 'microscopes',       label: 'Microscope' },
  { key: 'consumables',       label: 'Needle' },
  { key: 'instruments',       label: 'Instruments' },
  { key: 'bleaching',         label: 'Bleaching' },
  // Lucide general
  { key: 'lucide-stethoscope',  label: 'Stethoscope' },
  { key: 'lucide-activity',     label: 'Activity' },
  { key: 'lucide-heart',        label: 'Heart' },
  { key: 'lucide-heart-pulse',  label: 'Heartbeat' },
  { key: 'lucide-zap',          label: 'Zap' },
  { key: 'lucide-eye',          label: 'Eye' },
  { key: 'lucide-smile',        label: 'Smile' },
  { key: 'lucide-scissors',     label: 'Scissors' },
  { key: 'lucide-package',      label: 'Package' },
  { key: 'lucide-shield',       label: 'Shield' },
  { key: 'lucide-shield-plus',  label: 'Shield+' },
  { key: 'lucide-monitor',      label: 'Monitor' },
  { key: 'lucide-pill',         label: 'Pill' },
  { key: 'lucide-flask',        label: 'Flask' },
  { key: 'lucide-sun',          label: 'Sun' },
  { key: 'lucide-sparkles',     label: 'Sparkles' },
  { key: 'lucide-cpu',          label: 'CPU' },
  { key: 'lucide-wrench',       label: 'Wrench' },
  { key: 'lucide-droplets',     label: 'Droplets' },
  { key: 'lucide-baby',         label: 'Baby' },
  { key: 'lucide-syringe',      label: 'Syringe' },
  { key: 'lucide-bone',         label: 'Bone' },
  { key: 'lucide-brain',        label: 'Brain' },
  { key: 'lucide-thermometer',  label: 'Thermometer' },
  { key: 'lucide-scan',         label: 'Scan' },
  { key: 'lucide-layers',       label: 'Layers' },
  { key: 'lucide-bandage',      label: 'Bandage' },
  { key: 'lucide-microscope',   label: 'Microscope' },
  { key: 'lucide-cross',        label: 'Cross' },
]
