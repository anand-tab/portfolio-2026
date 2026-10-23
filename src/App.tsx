import { useRef, useState, useEffect, type FormEvent, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, X, Terminal, Layers3, Workflow, Database, Radio, ShieldCheck,
  Zap, Code2, ExternalLink, Check, CircleDot, Activity, Dumbbell, Image as ImageIcon
} from 'lucide-react'

type ProjectTab = 'overview' | 'architecture' | 'decisions'

const tech = ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'React']

const architecture = [
  { name: 'API Gateway', note: 'Entry point · auth & routing', icon: ShieldCheck },
  { name: 'Order Service', note: 'Idempotency · order lifecycle', icon: Workflow },
  { name: 'Redis', note: 'Atomic stock reservation', icon: Database },
  { name: 'Kafka', note: 'Asynchronous event stream', icon: Radio },
  { name: 'Inventory Service', note: 'Consume events · persist stock', icon: Layers3 },
]

function App() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('overview')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showTerminal) terminalInputRef.current?.focus()
  }, [showTerminal])

  const runTerminalCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const command = terminalInput.trim()
    if (!command) return
    const key = command.toLowerCase()
    const commands: Record<string, string[]> = {
      help: ['Available commands: about, projects, experience, skills, contact, clear, help', 'Tip: use ↑ / ↓ to browse command history.'],
      about: ["I'm Sumanshu Anand, a software developer focused on Java, Spring Boot, backend systems, and thoughtful product engineering."],
      projects: ['FlashDrop — event-driven flash-sale platform (Redis, Kafka, Spring Boot)', 'Fitt Mee — fitness tracking with activity-informed calorie and exercise guidance', 'Swapping Autoencoder — computer vision and image manipulation'],
      experience: ['TCS — Software Developer · backend development with Java and Spring Boot', 'UnifyApps — Software Developer Intern · May–July 2024'],
      skills: ['Java · Spring Boot · REST APIs · Microservices · Kafka · Redis · PostgreSQL · Docker · React'],
      contact: ['GitHub: github.com/anand-tab', 'LinkedIn: linkedin.com/in/sumanshu-anand/'],
      whoami: ['sumanshu-anand · software developer'],
      pwd: ['/home/sumanshu/portfolio'],
      ls: ['about.md  projects/  experience.md  skills.json  contact.txt'],
    }
    if (key === 'clear' || key === 'clear()') {
      setTerminalHistory([]); setTerminalInput(''); setHistoryIndex(-1); return
    }
    const output = commands[key] ?? [`Command not found: ${command}`, "Type 'help' to see available commands."]
    setTerminalHistory(previous => [...previous, { command, output }])
    setTerminalInput('')
    setHistoryIndex(-1)
  }

  const handleTerminalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (terminalHistory.length) { const next = historyIndex < 0 ? terminalHistory.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(next); setTerminalInput(terminalHistory[next].command) }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex >= 0) { const next = historyIndex + 1; if (next >= terminalHistory.length) { setHistoryIndex(-1); setTerminalInput('') } else { setHistoryIndex(next); setTerminalInput(terminalHistory[next].command) } }
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('YOUR_PROFESSIONAL_EMAIL')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:hello@sumanshu.dev'
    }
  }

  const scrollTo = (id: string) => {
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Sumanshu Anand home">
          <span className="brand-mark">sa<span>.</span></span>
          <span className="brand-name">SUMANSHU ANAND</span>
        </a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <button onClick={() => scrollTo('work')}>Selected work <span>01</span></button>
          <button onClick={() => scrollTo('approach')}>Approach <span>02</span></button>
          <button onClick={() => scrollTo('about')}>About <span>03</span></button>
          <button className="mobile-contact" onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={14} /></button>
        </nav>
        <button className="top-cta" onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={15} /></button>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? 'Close menu' : 'Open menu'}>
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <span className="status-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> BUILDING WHAT'S NEXT
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08 }}>
            I build systems<br />that <span className="gradient-text">hold up</span><br />under pressure<span className="lime-dot">.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .18 }}>
            I'm Sumanshu — a software developer working across backend engineering, distributed systems, and the details that make digital products feel effortless.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>
            <button className="button button-primary" onClick={() => scrollTo('work')}>Explore my work <ArrowDownRight size={17} /></button>
            <button className="button button-quiet" onClick={() => setShowTerminal(!showTerminal)}><Terminal size={16} /> {showTerminal ? 'Close terminal' : 'Open terminal'}</button>
          </motion.div>
          <AnimatePresence>
            {showTerminal && (
              <motion.div className="terminal-panel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <div className="terminal-top"><span /><span /><span /> <small>sumanshu@portfolio ~</small><button type="button" className="terminal-clear" onClick={() => setTerminalHistory([])}>clear output</button></div>
                <div className="terminal-output" aria-live="polite">
                  <p className="terminal-welcome">Interactive portfolio shell. Type <b>help</b> to get started.</p>
                  {terminalHistory.map((entry, index) => <div className="terminal-entry" key={`${entry.command}-${index}`}><p><i>➜</i> {entry.command}</p>{entry.output.map((line, lineIndex) => <strong key={lineIndex}>{line}</strong>)}</div>)}
                </div>
                <form className="terminal-form" onSubmit={runTerminalCommand}>
                  <label htmlFor="portfolio-terminal-input"><i>➜</i></label>
                  <input id="portfolio-terminal-input" ref={terminalInputRef} value={terminalInput} onChange={event => setTerminalInput(event.target.value)} onKeyDown={handleTerminalKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Enter a portfolio terminal command" placeholder="type a command…" />
                  <button type="submit">RUN ↵</button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hero-footnote"><span>BASED IN INDIA</span><span className="footnote-line" /><span>OPEN TO GREAT PROBLEMS</span></div>
        </div>

        <motion.div className="universe" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .2 }}>
          <div className="universe-label"><span>FIG. 01</span> SYSTEMS IN MOTION</div>
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-middle" />
          <div className="orbit orbit-inner" />
          <div className="orbit-node node-top"><Radio size={15} /><span>EVENT STREAM</span></div>
          <div className="orbit-node node-right"><Database size={15} /><span>STATE</span></div>
          <div className="orbit-node node-bottom"><Workflow size={15} /><span>ORCHESTRATION</span></div>
          <div className="orbit-node node-left"><ShieldCheck size={15} /><span>RESILIENCE</span></div>
          <div className="core-glow" />
          <div className="core">
            <div className="core-grid" />
            <span className="core-symbol">S<span>.</span></span>
            <span className="core-caption">ENGINEER / 001</span>
          </div>
          <div className="universe-coordinate coord-a">19°04' N<br />72°52' E</div>
          <div className="universe-coordinate coord-b">FIG. 001 — 2026</div>
          <div className="universe-scanline" />
        </motion.div>
      </section>

      <section className="ticker" aria-label="Technology focus">
        <div className="ticker-label">CURRENT TOOLKIT</div>
        <div className="ticker-track">{[...tech, ...tech].map((item, i) => <span key={`${item}-${i}`}><i />{item}</span>)}</div>
      </section>

      <section className="section-wrap work-section" id="work">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="section-index">01</span> / SELECTED WORK</div><h2>Built to solve<br /><span className="muted-heading">real problems.</span></h2></div>
          <p className="section-intro">Less “look what I used.” More “here's the problem, the decision, and why it matters.”</p>
        </div>

        <motion.article className="project-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65 }}>
          <div className="project-visual">
            <div className="visual-topline"><span>PROJECT_001</span><span className="live-indicator"><i /> SYSTEM DESIGN STUDY</span></div>
            <div className="flashdrop-wordmark">flash<span>drop</span><sup>®</sup></div>
            <p className="visual-subtitle">REAL-TIME FLASH SALE PLATFORM</p>
            <div className="visual-flow">
              <div className="flow-card flow-client"><Code2 size={18} /><b>CLIENT</b><small>Checkout request</small></div>
              <div className="flow-connector"><span /></div>
              <div className="flow-card flow-gateway"><ShieldCheck size={18} /><b>GATEWAY</b><small>Auth · route</small></div>
              <div className="flow-connector"><span /></div>
              <div className="flow-card flow-order"><Workflow size={18} /><b>ORDER</b><small>Idempotency</small></div>
              <div className="flow-branch"><span /><span /></div>
              <div className="flow-lower">
                <div className="flow-card flow-redis"><Database size={17} /><b>REDIS</b><small>Reserve stock</small></div>
                <div className="flow-card flow-kafka"><Radio size={17} /><b>KAFKA</b><small>Publish event</small></div>
                <div className="flow-card flow-inventory"><Layers3 size={17} /><b>INVENTORY</b><small>Persist update</small></div>
              </div>
            </div>
            <div className="visual-bottomline"><span>EVENT-DRIVEN ARCHITECTURE</span><span>01 / 03</span></div>
          </div>
          <div className="project-details">
            <div className="project-meta"><span>FLAGSHIP PROJECT</span><span>JAVA · DISTRIBUTED SYSTEMS</span></div>
            <h3>FlashDrop<span className="lime-dot">.</span></h3>
            <p className="project-lead">What happens when demand spikes, stock is limited, and retries are inevitable?</p>
            <p className="project-body">FlashDrop explores a flash-sale checkout flow designed around atomic stock reservation, idempotent requests, and asynchronous inventory processing — where correctness matters as much as speed.</p>
            <div className="project-tabs" role="tablist" aria-label="FlashDrop project details">
              {(['overview', 'architecture', 'decisions'] as ProjectTab[]).map(tab => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div className="tab-content" key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>
                {activeTab === 'overview' && <><h4>The challenge</h4><p>Prevent overselling and duplicate orders when users retry checkout or requests arrive concurrently.</p><h4>Core idea</h4><p>Reserve stock atomically, create a pending order, then use events to coordinate downstream inventory work.</p></>}
                {activeTab === 'architecture' && <><h4>Follow the request</h4><p>Each component has a focused responsibility. Select the sequence below to trace the system's key boundaries.</p><div className="architecture-list">{architecture.map((item, i) => <div className="architecture-row" key={item.name}><span className="architecture-number">0{i + 1}</span><item.icon size={16} /><span><b>{item.name}</b><small>{item.note}</small></span><ArrowRight size={14} /></div>)}</div></>}
                {activeTab === 'decisions' && <><h4>Trade-offs, not buzzwords</h4><ul className="decision-list"><li><b>Redis atomic reservation</b><span>Fast coordination for scarce stock; reservation expiry and recovery need deliberate handling.</span></li><li><b>Idempotency key</b><span>Repeated checkout attempts should resolve to one logical operation; keys need a clear lifecycle.</span></li><li><b>Kafka events</b><span>Decouple inventory processing, while accepting eventual consistency and planning for retries.</span></li></ul></>}
              </motion.div>
            </AnimatePresence>
            <div className="project-tags">{['Spring Boot', 'Redis', 'Kafka', 'PostgreSQL', 'Docker'].map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="project-links">
              <a href="https://github.com/anand-tab/flashdrop" target="_blank" rel="noreferrer">Explore repository <ArrowUpRight size={15} /></a>
              <span className="project-note"><CircleDot size={12} /> Personal engineering project</span>
            </div>
          </div>
        </motion.article>

        <div className="project-grid-secondary">
          <motion.article className="mini-project" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55 }}>
            <div className="mini-project-art fitness-art"><div className="art-label">DAILY BALANCE / 02</div><div className="fitness-ring"><Activity size={30} /><strong>CAL</strong><span>IN · OUT</span></div><div className="fitness-stats"><span><Dumbbell size={13} /> ACTIVITY</span><span><Zap size={13} /> NUTRITION</span></div></div>
            <div className="mini-project-body"><div className="project-meta"><span>FITNESS · WELLNESS</span><span>02 / 03</span></div><h3>Fitt Mee<span className="lime-dot">.</span></h3><p>A fitness tracking application that connects daily workouts and exercise with calorie awareness, food guidance, and recommendations to help users align activity with their goals.</p><div className="project-tags">{['Java 21', 'Spring Boot', 'PostgreSQL', 'Fitness insights'].map(tag => <span key={tag}>{tag}</span>)}</div><p className="project-note"><Activity size={12} /> Product focus: activity-informed nutrition and exercise guidance.</p></div>
          </motion.article>
          <motion.article className="mini-project" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: .08 }}>
            <div className="mini-project-art autoencoder-art"><div className="art-label">IMAGE STUDY / 03</div><div className="image-panels"><div className="image-panel image-a"><ImageIcon size={22} /><span>STRUCTURE</span></div><div className="swap-arrow">↔</div><div className="image-panel image-b"><Layers3 size={22} /><span>TEXTURE</span></div></div><div className="autoencoder-caption">STRUCTURE × TEXTURE → TRANSFORMATION</div></div>
            <div className="mini-project-body"><div className="project-meta"><span>COMPUTER VISION</span><span>03 / 03</span></div><h3>Swapping Autoencoder<span className="lime-dot">.</span></h3><p>An image-manipulation project exploring how visual structure and texture can be represented separately and recombined to create transformed images.</p><div className="project-tags">{['Deep learning', 'Autoencoders', 'Image synthesis'].map(tag => <span key={tag}>{tag}</span>)}</div><p className="project-note"><ImageIcon size={12} /> Add your own generated examples and repository link before publishing.</p></div>
          </motion.article>
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="section-index">02</span> / HOW I THINK</div><h2>Good engineering<br /><span className="muted-heading">is a series of choices.</span></h2></div>
            <p className="section-intro">Tools matter. The reasoning behind them matters more.</p>
          </div>
          <div className="principles-grid">
            <article className="principle"><span className="principle-number">01</span><div className="principle-icon"><ShieldCheck /></div><h3>Correctness first</h3><p>Concurrency, retries, and partial failures are part of the design — not edge cases to ignore later.</p><span className="principle-footer">RELIABILITY <ArrowUpRight size={14} /></span></article>
            <article className="principle"><span className="principle-number">02</span><div className="principle-icon"><Workflow /></div><h3>Clear boundaries</h3><p>Separate responsibilities where it creates real value, not just more services to operate.</p><span className="principle-footer">ARCHITECTURE <ArrowUpRight size={14} /></span></article>
            <article className="principle"><span className="principle-number">03</span><div className="principle-icon"><Zap /></div><h3>Measure the impact</h3><p>Performance claims should come from repeatable measurements, and trade-offs should be explicit.</p><span className="principle-footer">PERFORMANCE <ArrowUpRight size={14} /></span></article>
          </div>
        </div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="about-left"><div className="eyebrow"><span className="section-index">03</span> / A LITTLE CONTEXT</div><h2>Curious by default.<br /><span className="muted-heading">Engineer by choice.</span></h2></div>
        <div className="about-right"><p className="about-statement">I'm a software developer with professional experience building backend applications and a strong interest in the systems behind reliable products.</p><p>My day-to-day toolkit includes Java, Spring Boot, APIs, and databases. Outside work, I use projects like FlashDrop to explore distributed systems, event-driven workflows, and the engineering trade-offs behind them.</p><p>I value ownership, clear communication, and getting into the details — especially when the first solution isn't the right one.</p>
          <div className="experience-line"><span className="experience-dot" /><div><b>Software Developer</b><span>TCS · Backend development, Java and Spring Boot</span></div><small>2024 — DEC 2026*</small></div>
          <div className="experience-line"><span className="experience-dot" /><div><b>Software Developer Intern</b><span>UnifyApps · API connectors, authentication, schemas and testing</span></div><small>MAY — JUL 2024</small></div>
          <div className="experience-line"><span className="experience-dot" /><div><b>Computer Science Engineering</b><span>SRM Institute of Science and Technology</span></div><small>2020 — 2024</small></div>
          <p className="footnote">*TCS last working day is shown as planned for Dec 22, 2026; update this if your employment status or date changes. Verify the UnifyApps start month before publishing.</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-wrap contact-inner">
          <div className="eyebrow"><span className="section-index">04</span> / NEXT TRANSMISSION</div>
          <h2>Have a good problem?<br /><span className="gradient-text">Let's work on it.</span></h2>
          <p>I'm interested in teams that value thoughtful engineering, meaningful ownership, and building things that last. Replace the email placeholder in the source before publishing.</p>
          <div className="contact-actions">
            <button className="button button-primary" onClick={copyEmail}>{copied ? <Check size={17} /> : <Mail size={17} />}{copied ? 'Email copied' : 'Copy email'} <ArrowUpRight size={15} /></button>
            <a className="button button-outline" href="https://github.com/anand-tab" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={14} /></a>
            <a className="button button-outline" href="https://www.linkedin.com/in/sumanshu-anand/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={14} /></a>
          </div>
          <div className="contact-orbit" aria-hidden="true"><div /><div /><div /><span>LET'S BUILD</span></div>
        </div>
      </section>

      <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">sa<span>.</span></span></a><span>DESIGNED WITH INTENT. BUILT WITH CURIOSITY.</span><button onClick={() => scrollTo('home')}>BACK TO TOP <ArrowUpRight size={13} /></button><span className="footer-year">© 2026 SUMANSHU ANAND</span></footer>
    </main>
  )
}

export default App
