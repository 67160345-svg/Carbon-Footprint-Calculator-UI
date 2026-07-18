import { useState } from 'react'

type Screen = 'home' | 'input' | 'result' | 'actions' | 'offset'
type CategoryId = 'home-energy' | 'transport' | 'events' | 'food'

// ─── Design tokens ─────────────────────────────────────────────────────────
const C = {
  primary:      '#2A6041',
  primaryHover: '#1F4D32',
  primaryLight: '#E8F2EC',
  primaryMid:   '#74C69D',
  warm:         '#C17F5A',
  warmLight:    '#FEF3EC',
  blue:         '#4A6FA5',
  blueLight:    '#EDF2FF',
  earth:        '#8B6F47',
  earthLight:   '#FDF8EC',
  text:         '#1C1917',
  muted:        '#78716C',
  card:         '#FFFFFF',
  border:       '#EAE7E1',
  sidebar:      '#F0EDE7',
  appBg:        '#F6F3EE',
}

// ─── Shared primitives ──────────────────────────────────────────────────────

function PrimaryBtn({ label, onClick, outline, small }: {
  label: string; onClick: () => void; outline?: boolean; small?: boolean
}) {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      style={{
        border: outline ? `2px solid ${C.primary}` : 'none',
        background: outline ? 'transparent' : C.primary,
        color: outline ? C.primary : '#fff',
        borderRadius: 12, height: small ? 40 : 52,
        padding: small ? '0 20px' : '0 32px',
        fontSize: small ? 14 : 16, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.01em',
        opacity: active ? 0.82 : 1,
        transform: active ? 'scale(0.985)' : 'scale(1)',
        transition: 'opacity 0.1s, transform 0.1s, background 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, color: C.muted,
      letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 14px',
    }}>{children}</p>
  )
}

// ─── Sidebar nav ────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Screen; emoji: string; label: string }[] = [
  { id: 'home',    emoji: '🏠', label: 'Dashboard'   },
  { id: 'input',   emoji: '📊', label: 'Track Activity' },
  { id: 'result',  emoji: '🌡️', label: 'My Footprint' },
  { id: 'actions', emoji: '♻️', label: 'Reduce & Reuse' },
  { id: 'offset',  emoji: '🌳', label: 'Offset Carbon' },
]

function Sidebar({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) {
  return (
    <aside style={{
      width: 240, background: C.sidebar, borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', padding: '28px 0', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: C.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🌿</div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>EcoTrace</p>
            <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>Carbon Calculator</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 12px' }}>
        <SectionLabel>Navigation</SectionLabel>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isActive ? C.primaryLight : 'transparent',
                color: isActive ? C.primary : C.muted,
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                fontFamily: 'inherit', marginBottom: 2,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
              {item.label}
              {isActive && (
                <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: C.primary }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* User card */}
      <div style={{ padding: '16px 20px 0', borderTop: `1px solid ${C.border}`, margin: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: C.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>👤</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>Alex Johnson</p>
            <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Top bar ────────────────────────────────────────────────────────────────

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  return (
    <div style={{
      height: 72, borderBottom: `1px solid ${C.border}`, background: C.card,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', flexShrink: 0,
    }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: '2px 0 0' }}>{subtitle}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{today}</p>
        <div style={{
          background: C.primaryLight, borderRadius: 20, padding: '6px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>This week: 42.8 kgCO₂e</span>
        </div>
      </div>
    </div>
  )
}

// ─── Stat card ──────────────────────────────────────────────────────────────

function StatCard({ emoji, label, value, sub, bg, accent }: {
  emoji: string; label: string; value: string; sub: string; bg: string; accent: string
}) {
  return (
    <div style={{
      background: C.card, borderRadius: 18, padding: '22px 24px',
      border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 13, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
      }}>{emoji}</div>
      <div>
        <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 26, fontWeight: 800, color: accent, margin: '0 0 2px', fontFamily: "'DM Serif Display', serif" }}>{value}</p>
        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{sub}</p>
      </div>
    </div>
  )
}

// ─── Screen 1: Home Dashboard ───────────────────────────────────────────────

const CATEGORIES = [
  { id: 'home-energy' as CategoryId, emoji: '⚡', label: 'Home & Energy', desc: 'Appliances, AC, heating & cooling', bg: C.primaryLight, accent: C.primary },
  { id: 'transport'   as CategoryId, emoji: '🚗', label: 'Transportation',  desc: 'Car trips, flights, daily commute', bg: C.warmLight,    accent: C.warm  },
  { id: 'events'      as CategoryId, emoji: '🎉', label: 'Events',          desc: 'Parties, concerts, weddings',     bg: C.blueLight,    accent: C.blue  },
  { id: 'food'        as CategoryId, emoji: '🥗', label: 'Food & Diet',     desc: 'Meals, groceries, food waste',    bg: C.earthLight,   accent: C.earth },
]

function HomeScreen({ onSelect }: { onSelect: (c: CategoryId) => void }) {
  const [hovered, setHovered] = useState<CategoryId | null>(null)

  return (
    <div style={{ padding: '36px 40px', overflowY: 'auto', height: '100%' }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
        <StatCard emoji="📅" label="Today's Footprint" value="8.7" sub="kgCO₂e logged" bg={C.primaryLight} accent={C.primary} />
        <StatCard emoji="📈" label="This Week" value="42.8" sub="kgCO₂e total" bg={C.warmLight} accent={C.warm} />
        <StatCard emoji="🌳" label="Trees Offset" value="12" sub="this month" bg={C.primaryLight} accent={C.primary} />
        <StatCard emoji="📉" label="vs Last Week" value="−12%" sub="great progress!" bg={C.earthLight} accent={C.earth} />
      </div>

      {/* Category section */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel>Track a new activity</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === cat.id ? cat.bg : C.card,
                border: `2px solid ${hovered === cat.id ? cat.accent + '50' : C.border}`,
                borderRadius: 18, padding: '24px 20px', textAlign: 'left', cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s, transform 0.12s',
                transform: hovered === cat.id ? 'translateY(-2px)' : 'none',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 14, lineHeight: 1 }}>{cat.emoji}</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 6px' }}>{cat.label}</p>
              <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>{cat.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Weekly activity */}
        <div style={{ background: C.card, borderRadius: 18, padding: '24px', border: `1px solid ${C.border}` }}>
          <SectionLabel>Weekly Activity</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {[5.2, 8.1, 6.4, 9.8, 7.3, 8.7, 4.1].map((v, i) => {
              const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
              const isToday = i === 5
              const maxH = 80
              const h = (v / 12) * maxH
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: '100%', height: h, borderRadius: 6,
                    background: isToday ? C.primary : C.primaryLight,
                    transition: 'height 0.3s',
                  }} />
                  <span style={{ fontSize: 10, color: isToday ? C.primary : C.muted, fontWeight: isToday ? 700 : 400 }}>{days[i]}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tip card */}
        <div style={{ background: C.primary, borderRadius: 18, padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>💡</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', margin: 0, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Daily Tip</p>
          </div>
          <p style={{ fontSize: 16, color: '#fff', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
            Setting your AC 2°C warmer can cut cooling energy by up to <strong>18%</strong> — without sacrificing comfort.
          </p>
          <p style={{ fontSize: 13, color: C.primaryMid, margin: 0 }}>Potential saving: ~2.1 kgCO₂e / day</p>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 2: Smart Input ──────────────────────────────────────────────────

function RangeSlider({ label, hint, value, min, max, unit, step = 1, onChange }: {
  label: string; hint?: string; value: number; min: number; max: number
  unit: string; step?: number; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  const track = `linear-gradient(to right, ${C.primary} ${pct}%, #DDD9D1 ${pct}%)`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{label}</span>
          {hint && <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{hint}</span>}
        </div>
        <span style={{
          fontSize: 28, fontWeight: 700, color: C.primary,
          fontFamily: "'DM Serif Display', Georgia, serif",
        }}>
          {value}<span style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Outfit, sans-serif', color: C.muted }}> {unit}</span>
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ background: track }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: C.muted }}>{min} {unit}</span>
        <span style={{ fontSize: 11, color: C.muted }}>{max} {unit}</span>
      </div>
    </div>
  )
}

function Stepper({ label, hint, value, min, max, unit, onChange }: {
  label: string; hint?: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{label}</span>
        {hint && <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{hint}</span>}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        background: C.appBg, borderRadius: 14, border: `1.5px solid ${C.border}`,
        overflow: 'hidden', width: 'fit-content',
      }}>
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          style={{
            width: 52, height: 52, border: 'none', background: 'transparent',
            fontSize: 22, cursor: 'pointer', color: C.text, fontFamily: 'inherit',
            borderRight: `1.5px solid ${C.border}`,
          }}
        >−</button>
        <div style={{ padding: '0 28px', textAlign: 'center' }}>
          <span style={{
            fontSize: 32, fontWeight: 800, color: C.primary,
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}>{value}</span>
          <span style={{ fontSize: 14, color: C.muted, marginLeft: 6 }}>{unit}</span>
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          style={{
            width: 52, height: 52, border: 'none', background: C.primary,
            fontSize: 22, cursor: 'pointer', color: '#fff', fontFamily: 'inherit',
            borderLeft: `1.5px solid ${C.border}`,
          }}
        >+</button>
      </div>
    </div>
  )
}

function InputScreen({ category, acTemp, setAcTemp, duration, setDuration, roomSize, setRoomSize, onCalculate }: {
  category: CategoryId
  acTemp: number; setAcTemp: (v: number) => void
  duration: number; setDuration: (v: number) => void
  roomSize: number; setRoomSize: (v: number) => void
  onCalculate: () => void
}) {
  const cat = CATEGORIES.find(c => c.id === category)!
  const preview = ((30 - acTemp) * 0.5 + duration * 0.8 + roomSize * 0.1).toFixed(1)

  return (
    <div style={{ padding: '36px 40px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        {/* Left: inputs */}
        <div>
          {/* Category badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, background: cat.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>{cat.emoji}</div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>{cat.label}</h2>
              <p style={{ fontSize: 13.5, color: C.muted, margin: '2px 0 0' }}>Adjust parameters to calculate your footprint</p>
            </div>
          </div>

          {/* Sliders card */}
          <div style={{
            background: C.card, borderRadius: 22, padding: '28px 28px 24px',
            border: `1px solid ${C.border}`, marginBottom: 16,
          }}>
            <SectionLabel>Temperature & Space</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <RangeSlider
                label="AC Temperature" hint="lower = more energy"
                value={acTemp} min={16} max={30} unit="°C" onChange={setAcTemp}
              />
              <RangeSlider
                label="Room Size" hint="affects cooling load"
                value={roomSize} min={10} max={80} unit="m²" onChange={setRoomSize}
              />
            </div>
          </div>

          {/* Stepper card */}
          <div style={{
            background: C.card, borderRadius: 22, padding: '28px 28px 24px',
            border: `1px solid ${C.border}`, marginBottom: 24,
          }}>
            <SectionLabel>Duration</SectionLabel>
            <Stepper
              label="Hours of Use" hint="per day"
              value={duration} min={1} max={24} unit="hours" onChange={setDuration}
            />
          </div>

          <PrimaryBtn label="Calculate Impact →" onClick={onCalculate} />
        </div>

        {/* Right: live preview panel */}
        <div style={{ position: 'sticky', top: 0 }}>
          <div style={{ background: C.primary, borderRadius: 22, padding: '28px 24px', marginBottom: 14 }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 8px' }}>Live Estimate</p>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>
              {preview}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, margin: '4px 0 20px' }}>kgCO₂e</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'AC load', value: `${((30 - acTemp) * 0.5).toFixed(1)} kg` },
                { label: 'Duration', value: `${(duration * 0.8).toFixed(1)} kg` },
                { label: 'Room factor', value: `${(roomSize * 0.1).toFixed(1)} kg` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: C.primaryLight, borderRadius: 18, padding: '18px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 13, color: C.primary, margin: 0, lineHeight: 1.6 }}>
              Each degree warmer on your AC saves roughly <strong>0.5 kgCO₂e</strong> per hour of use.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 3: Result & Impact ──────────────────────────────────────────────

function ResultScreen({ carbonKg, drivingKm, treesNeeded, onNext }: {
  carbonKg: string; drivingKm: number; treesNeeded: number; onNext: () => void
}) {
  const val = parseFloat(carbonKg)
  const level = val < 7 ? 'Low' : val < 14 ? 'Moderate' : 'High'
  const levelColor = level === 'Low' ? C.primary : level === 'Moderate' ? C.warm : '#D94F2E'
  const bulbHours = Math.round(val * 12)
  const flightMins = Math.round(val * 3.2)

  return (
    <div style={{ padding: '36px 40px', overflowY: 'auto', height: '100%' }}>
      {/* Hero row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Big number */}
        <div style={{
          background: C.card, borderRadius: 24, padding: '36px 36px',
          border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div>
            <SectionLabel>Session Footprint</SectionLabel>
            <div style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 96, color: C.text, lineHeight: 1, letterSpacing: '-3px',
            }}>{carbonKg}</div>
            <p style={{ fontSize: 20, color: C.muted, margin: '4px 0 0', letterSpacing: '0.04em' }}>kgCO₂e</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: levelColor + '15', borderRadius: 20, padding: '6px 16px',
            }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: levelColor }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: levelColor }}>{level} Impact</span>
            </span>
            <span style={{ fontSize: 13, color: C.muted }}>Home & Energy · Today</span>
          </div>
        </div>

        {/* Progress to goal */}
        <div style={{ background: C.primary, borderRadius: 24, padding: '36px 36px' }}>
          <SectionLabel><span style={{ color: 'rgba(255,255,255,0.6)' }}>Monthly Goal</span></SectionLabel>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 6px' }}>Progress this month</p>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 48, color: '#fff', lineHeight: 1, margin: '0 0 18px',
          }}>127.4 <span style={{ fontSize: 20, fontFamily: 'Outfit', fontWeight: 400 }}>/ 200 kg</span></div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, height: 8, marginBottom: 10 }}>
            <div style={{ width: '63.7%', height: '100%', background: C.primaryMid, borderRadius: 6 }} />
          </div>
          <p style={{ color: C.primaryMid, fontSize: 13, margin: 0 }}>63.7% of monthly budget used — on track 🎯</p>
        </div>
      </div>

      {/* Comparison cards */}
      <SectionLabel>This Equals...</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { emoji: '🚗', value: `${drivingKm} km`, label: 'driven by car', bg: C.warmLight, accent: C.warm },
          { emoji: '🌳', value: `${treesNeeded}`, label: 'trees to offset', bg: C.primaryLight, accent: C.primary },
          { emoji: '💡', value: `${bulbHours}h`, label: '100W bulb runtime', bg: C.earthLight, accent: C.earth },
          { emoji: '✈️', value: `${flightMins} min`, label: 'of short-haul flight', bg: C.blueLight, accent: C.blue },
        ].map(item => (
          <div key={item.label} style={{
            background: item.bg, borderRadius: 20, padding: '22px 18px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>{item.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: item.accent, fontFamily: "'DM Serif Display', serif" }}>{item.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 5, lineHeight: 1.45 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <PrimaryBtn label="See How to Reduce →" onClick={onNext} />
    </div>
  )
}

// ─── Screen 4: Zero-Waste Actions ──────────────────────────────────────────

const TIPS = [
  { emoji: '🌡️', title: 'Raise AC temperature by 2°C', desc: 'Setting to 26°C instead of 24°C reduces energy use by up to 18% per hour with negligible comfort impact.', saving: '~2.1 kgCO₂e / day', effort: 'Easy' },
  { emoji: '⏱️', title: 'Limit runtime to 6 hours', desc: 'Run AC only during peak heat hours (12pm–6pm). Switch to ceiling fans during cooler morning and evening periods.', saving: '~3.4 kgCO₂e / day', effort: 'Easy' },
  { emoji: '🪟', title: 'Seal windows and doors', desc: 'Proper weatherstripping prevents cool air from escaping and reduces AC runtime by 20–30%.', saving: '~1.8 kgCO₂e / day', effort: 'Medium' },
]

function ActionsScreen({ carbonKg, onOffset }: {
  carbonKg: string; onOffset: () => void
}) {
  return (
    <div style={{ padding: '36px 40px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Tips */}
        <div>
          <p style={{ fontSize: 14, color: C.muted, margin: '0 0 24px' }}>
            Based on your <strong style={{ color: C.text }}>{carbonKg} kgCO₂e</strong> session — here are your highest-impact changes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TIPS.map((tip, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 20, padding: '22px 22px',
                border: `1px solid ${C.border}`, display: 'flex', gap: 18, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16, background: C.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, flexShrink: 0,
                }}>{tip.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <p style={{ fontSize: 15.5, fontWeight: 600, color: C.text, margin: 0 }}>{tip.title}</p>
                    <span style={{
                      background: tip.effort === 'Easy' ? C.primaryLight : C.warmLight,
                      color: tip.effort === 'Easy' ? C.primary : C.warm,
                      fontSize: 11, fontWeight: 600, borderRadius: 6, padding: '2px 9px',
                    }}>{tip.effort}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: C.muted, margin: '0 0 12px', lineHeight: 1.6 }}>{tip.desc}</p>
                  <span style={{
                    display: 'inline-block', background: C.primaryLight, borderRadius: 8,
                    padding: '4px 12px', fontSize: 12, fontWeight: 600, color: C.primary,
                  }}>Save {tip.saving}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: impact summary + CTA */}
        <div style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: C.primary, borderRadius: 20, padding: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 14px' }}>Potential savings</p>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, color: '#fff', lineHeight: 1, margin: '0 0 6px' }}>7.3</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '0 0 18px' }}>kgCO₂e per day</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
              <p style={{ color: C.primaryMid, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                That's <strong>~2.6 tonnes</strong> annually — equivalent to planting 65 trees 🌱
              </p>
            </div>
          </div>

          <div style={{ background: C.card, borderRadius: 20, padding: '22px', border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 14.5, fontWeight: 600, color: C.text, margin: '0 0 6px' }}>Can't reduce right now?</p>
            <p style={{ fontSize: 13, color: C.muted, margin: '0 0 18px', lineHeight: 1.6 }}>
              Offset your <strong>{carbonKg} kgCO₂e</strong> by supporting certified reforestation projects.
            </p>
            <PrimaryBtn label="🌿  Offset Carbon Now" onClick={onOffset} outline small />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 5: Carbon Offset Checkout ──────────────────────────────────────

type PayMethod = 'card' | 'wallet'

const PAY_METHODS = [
  { id: 'card' as PayMethod, emoji: '💳', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
  { id: 'wallet' as PayMethod, emoji: '📱', label: 'Digital Wallet', sub: 'Apple Pay, Google Pay' },
]

function OffsetScreen({ carbonKg, offsetCost, onNav }: {
  carbonKg: string; offsetCost: string; onNav: (s: Screen) => void
}) {
  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [confirmed, setConfirmed] = useState(false)
  const trees = Math.ceil(parseFloat(carbonKg) / 4.5)

  if (confirmed) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', padding: '40px',
      }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 96, marginBottom: 24, lineHeight: 1 }}>🌍</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: C.text, margin: '0 0 14px', fontFamily: "'DM Serif Display', serif" }}>Thank you, Alex!</h2>
          <p style={{ fontSize: 16, color: C.muted, margin: '0 0 32px', lineHeight: 1.7 }}>
            Your <strong>{carbonKg} kgCO₂e</strong> has been fully offset through certified
            reforestation in the Amazon. Your contribution matters.
          </p>
          <div style={{
            background: C.primaryLight, borderRadius: 20, padding: '20px 24px',
            marginBottom: 32, textAlign: 'left',
          }}>
            <p style={{ fontSize: 15, color: C.primary, margin: 0, lineHeight: 1.7 }}>
              🌱 You've helped plant approximately <strong>{trees} trees</strong> in Pará, Brazil today.
            </p>
          </div>
          <PrimaryBtn label="Back to Dashboard" onClick={() => { setConfirmed(false); onNav('home') }} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '36px 40px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* Left: payment form */}
        <div>
          {/* Project card */}
          <div style={{ marginBottom: 24 }}>
            <SectionLabel>Selected Project</SectionLabel>
            <div style={{
              background: C.card, borderRadius: 20, padding: '20px 20px',
              border: `1px solid ${C.border}`, display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: C.primaryLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0,
              }}>🌳</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: 0 }}>Amazon Reforestation</p>
                    <p style={{ fontSize: 12.5, color: C.muted, margin: '2px 0 0' }}>Pará, Brazil · Verified by Gold Standard</p>
                  </div>
                  <span style={{ background: C.primaryLight, color: C.primary, fontSize: 11, fontWeight: 600, borderRadius: 7, padding: '3px 10px' }}>Active</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.6 }}>
                  Protecting 50,000 hectares of tropical rainforest and supporting local indigenous communities.
                </p>
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div style={{ marginBottom: 24 }}>
            <SectionLabel>Payment Method</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PAY_METHODS.map(method => {
                const isActive = payMethod === method.id
                return (
                  <button
                    key={method.id}
                    onClick={() => setPayMethod(method.id)}
                    style={{
                      background: isActive ? C.primaryLight : C.card,
                      border: `2px solid ${isActive ? C.primary : C.border}`,
                      borderRadius: 16, padding: '14px 18px',
                      display: 'flex', alignItems: 'center', gap: 14,
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{method.emoji}</span>
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: 0 }}>{method.label}</p>
                      <p style={{ fontSize: 12.5, color: C.muted, margin: '2px 0 0' }}>{method.sub}</p>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: `2px solid ${isActive ? C.primary : C.border}`,
                      background: isActive ? C.primary : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {isActive && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <p style={{ fontSize: 12.5, color: C.muted, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🔒</span> Payments are secured with 256-bit SSL encryption. Your data is never stored.
          </p>

          <PrimaryBtn label={`Confirm Payment  ·  $${offsetCost}`} onClick={() => setConfirmed(true)} />
        </div>

        {/* Right: order summary */}
        <div style={{ position: 'sticky', top: 0 }}>
          <div style={{ background: C.primary, borderRadius: 22, padding: '26px 24px', marginBottom: 14 }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 18px' }}>Order Summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Offset amount</span>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#fff' }}>{carbonKg} kgCO₂e</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16 }}>
              {[
                { label: 'Carbon credits', value: `$${(parseFloat(offsetCost) * 0.85).toFixed(2)}` },
                { label: 'Platform fee (5%)', value: `$${(parseFloat(offsetCost) * 0.1).toFixed(2)}` },
                { label: 'Project admin', value: `$${(parseFloat(offsetCost) * 0.05).toFixed(2)}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, color: '#fff', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: 22, color: C.primaryMid, fontWeight: 800 }}>${offsetCost}</span>
              </div>
            </div>
          </div>

          <div style={{ background: C.primaryLight, borderRadius: 16, padding: '16px 18px' }}>
            <p style={{ fontSize: 13, color: C.primary, margin: 0, lineHeight: 1.65 }}>
              🌱 Your offset will plant ~<strong>{trees} trees</strong> and generate verified carbon credits registered on the Gold Standard registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────

const SCREEN_META: Record<Screen, { title: string; subtitle: string }> = {
  home:    { title: 'Dashboard',      subtitle: 'Your carbon footprint at a glance' },
  input:   { title: 'Track Activity', subtitle: 'Log an activity to calculate its impact' },
  result:  { title: 'My Footprint',   subtitle: 'Session results and impact breakdown' },
  actions: { title: 'Reduce & Reuse', subtitle: 'Personalised recommendations to cut your footprint' },
  offset:  { title: 'Offset Carbon',  subtitle: 'Support verified environmental projects' },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [category, setCategory] = useState<CategoryId>('home-energy')
  const [acTemp, setAcTemp] = useState(24)
  const [duration, setDuration] = useState(4)
  const [roomSize, setRoomSize] = useState(25)

  const carbonKg = ((30 - acTemp) * 0.5 + duration * 0.8 + roomSize * 0.1).toFixed(1)
  const drivingKm = Math.round(parseFloat(carbonKg) * 4.2)
  const treesNeeded = Math.ceil(parseFloat(carbonKg) / 4.5)
  const offsetCost = (parseFloat(carbonKg) * 0.35).toFixed(2)

  const goTo = (s: Screen) => setScreen(s)
  const meta = SCREEN_META[screen]

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      background: C.appBg, color: C.text,
    }}>
      <Sidebar active={screen} onNav={goTo} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar title={meta.title} subtitle={meta.subtitle} />

        <main style={{ flex: 1, overflow: 'hidden' }}>
          {screen === 'home' && (
            <HomeScreen onSelect={cat => { setCategory(cat); goTo('input') }} />
          )}
          {screen === 'input' && (
            <InputScreen
              category={category}
              acTemp={acTemp} setAcTemp={setAcTemp}
              duration={duration} setDuration={setDuration}
              roomSize={roomSize} setRoomSize={setRoomSize}
              onCalculate={() => goTo('result')}
            />
          )}
          {screen === 'result' && (
            <ResultScreen
              carbonKg={carbonKg}
              drivingKm={drivingKm}
              treesNeeded={treesNeeded}
              onNext={() => goTo('actions')}
            />
          )}
          {screen === 'actions' && (
            <ActionsScreen
              carbonKg={carbonKg}
              onOffset={() => goTo('offset')}
            />
          )}
          {screen === 'offset' && (
            <OffsetScreen
              carbonKg={carbonKg}
              offsetCost={offsetCost}
              onNav={goTo}
            />
          )}
        </main>
      </div>
    </div>
  )
}
