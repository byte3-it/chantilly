import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Zap, ExternalLink, Type, Info, Copy } from 'lucide-react'
import { LandingPageBuilder, LandingPageRenderer, exportProject } from '@byte3-it/chantilly'
import type { Project, CustomBlockDefinition, TemplateDefinition } from '@byte3-it/chantilly'
import { saveProject, loadProject } from './mockStorage'
import { mockFileManager } from './mockFileManager'

const CUSTOM_BLOCKS: CustomBlockDefinition[] = [
  {
    id: 'cta-button',
    label: 'CTA Button',
    icon: <Zap size={16} />,
    elementType: 'button',
    defaults: {
      label: 'Get Started Free',
      href: '/signup',
      variant: 'primary',
      size: 'lg',
      textAlign: 'text-center',
      trackingId: 'hero-cta',
      campaign: 'homepage',
    },
    actionButton: {
      icon: <Info size={14} />,
      title: 'CTA Button info',
      onClick: (def: CustomBlockDefinition) => alert(`Block: ${def.id}\nTracking: ${def.defaults?.trackingId}`),
    },
  },
  {
    id: 'docs-link',
    label: 'Docs Link',
    icon: <ExternalLink size={16} />,
    elementType: 'link',
    defaults: {
      label: 'Read the Docs',
      href: '/docs',
      size: 'md',
      textAlign: 'text-left',
      rel: 'noopener noreferrer',
      target: '_blank',
    },
    actionButton: {
      icon: <Copy size={14} />,
      title: 'Copy docs URL',
      onClick: (def: CustomBlockDefinition) => navigator.clipboard.writeText(String(def.defaults?.href ?? '')),
    },
  },
  {
    id: 'fine-print',
    label: 'Fine Print',
    icon: <Type size={16} />,
    elementType: 'text',
    defaults: {
      label: 'No credit card required. Cancel anytime.',
      size: 'sm',
      textAlign: 'text-center',
    },
  },
]

const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'A modern dark product landing page with hero image, features, and call-to-action.',
    project: {
      id: 'tpl-saas',
      name: 'SaaS Landing Page',
      mode: 'web',
      meta: { title: 'The Best SaaS Tool', description: 'Supercharge your workflow today.', lang: 'en' },
      settings: {
        backgroundColor: '#0f172a',
        primaryColor: '#6366f1',
        primaryTextColor: '#ffffff',
        secondaryColor: '#1e293b',
        secondaryTextColor: '#e2e8f0',
        secondaryBorderColor: '#334155',
      },
      blocks: [
        { id: 's1', type: 'spacer', height: 'py-8' },
        { id: 's2', type: 'heading', text: 'Supercharge Your Workflow', level: 'h1', textAlign: 'text-center', color: '#ffffff', fontSize: 'text-5xl' },
        { id: 's3', type: 'text', content: 'The all-in-one platform that helps teams ship faster, collaborate better, and grow smarter.', textAlign: 'text-center', color: '#94A3B8', fontSize: 'text-xl' },
        { id: 's4', type: 'spacer', height: 'py-4' },
        { id: 's5', type: 'button', label: 'Start for Free', href: '/signup', variant: 'primary', size: 'lg', textAlign: 'text-center' },
        { id: 's6', type: 'button', label: 'View Demo →', href: '/demo', variant: 'secondary', size: 'lg', textAlign: 'text-center' },
        { id: 's7', type: 'spacer', height: 'py-8' },
        { id: 's8', type: 'image', src: 'https://picsum.photos/seed/dashboard/900/450', alt: 'Product screenshot', width: 'w-full', textAlign: 'text-center' },
        { id: 's9', type: 'spacer', height: 'py-12' },
        { id: 's10', type: 'divider', style: 'dashed', color: '#334155', thickness: 'border' },
        { id: 's11', type: 'spacer', height: 'py-8' },
        { id: 's12', type: 'heading', text: 'Everything you need', level: 'h2', textAlign: 'text-center', color: '#ffffff', fontSize: 'text-3xl' },
        { id: 's13', type: 'text', content: '⚡ Blazing fast performance — Deploy in seconds, scale to millions.', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 's14', type: 'text', content: '🔒 Enterprise-grade security — SOC 2 Type II certified, end-to-end encryption.', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 's15', type: 'text', content: '🤝 Built for teams — Real-time collaboration, roles, and permissions.', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 's16', type: 'text', content: '📊 Powerful analytics — Understand your users and grow with confidence.', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 's17', type: 'spacer', height: 'py-8' },
        { id: 's18', type: 'image', src: 'https://picsum.photos/seed/teamwork/900/350', alt: 'Team collaboration', width: 'w-full', textAlign: 'text-center' },
        { id: 's19', type: 'spacer', height: 'py-12' },
        { id: 's20', type: 'divider', style: 'dashed', color: '#334155', thickness: 'border' },
        { id: 's21', type: 'spacer', height: 'py-8' },
        { id: 's22', type: 'heading', text: 'Ready to get started?', level: 'h2', textAlign: 'text-center', color: '#ffffff', fontSize: 'text-3xl' },
        { id: 's23', type: 'text', content: 'Join 10,000+ teams already using our platform. No credit card required.', textAlign: 'text-center', color: '#94A3B8', fontSize: 'text-lg' },
        { id: 's24', type: 'spacer', height: 'py-4' },
        { id: 's25', type: 'button', label: 'Get Started Free', href: '/signup', variant: 'primary', size: 'lg', textAlign: 'text-center' },
        { id: 's26', type: 'spacer', height: 'py-8' },
      ],
    },
  },
  {
    id: 'event',
    name: 'Event',
    description: 'A bold event page with countdown, schedule, speakers, and venue details.',
    project: {
      id: 'tpl-event',
      name: 'DevConf 2026',
      mode: 'web',
      meta: { title: 'DevConf 2026 — The Developer Conference', description: 'The premier conference for developers. September 15–16, 2026 · Austin, TX.', lang: 'en' },
      settings: {
        backgroundColor: '#0c0a1e',
        primaryColor: '#f59e0b',
        primaryTextColor: '#000000',
        secondaryColor: '#1a1535',
        secondaryTextColor: '#fef3c7',
        secondaryBorderColor: '#4c1d95',
      },
      blocks: [
        { id: 'e1', type: 'image', src: 'https://picsum.photos/seed/conference/900/400', alt: 'Event banner', width: 'w-full', textAlign: 'text-center' },
        { id: 'e2', type: 'spacer', height: 'py-8' },
        { id: 'e3', type: 'heading', text: 'DevConf 2026', level: 'h1', textAlign: 'text-center', color: '#FBBF24', fontSize: 'text-5xl' },
        { id: 'e4', type: 'text', content: 'The premier conference for developers, engineers, and tech leaders.', textAlign: 'text-center', color: '#CBD5E1', fontSize: 'text-xl' },
        { id: 'e5', type: 'spacer', height: 'py-4' },
        { id: 'e6', type: 'text', content: '📅  September 15–16, 2026', textAlign: 'text-center', color: '#FCD34D', fontSize: 'text-lg' },
        { id: 'e7', type: 'text', content: '📍  Austin Convention Center · Austin, TX', textAlign: 'text-center', color: '#FCD34D', fontSize: 'text-lg' },
        { id: 'e8', type: 'spacer', height: 'py-8' },
        { id: 'e9', type: 'countdown', targetDate: '2026-09-15T09:00:00', label: 'Conference starts in', textAlign: 'text-center', color: '#ffffff' },
        { id: 'e10', type: 'spacer', height: 'py-8' },
        { id: 'e11', type: 'button', label: 'Register Now', href: '/register', variant: 'primary', size: 'lg', textAlign: 'text-center' },
        { id: 'e12', type: 'button', label: 'View Full Schedule', href: '/schedule', variant: 'secondary', size: 'lg', textAlign: 'text-center' },
        { id: 'e13', type: 'spacer', height: 'py-12' },
        { id: 'e14', type: 'divider', style: 'dashed', color: '#78350F', thickness: 'border' },
        { id: 'e15', type: 'spacer', height: 'py-8' },
        { id: 'e16', type: 'heading', text: 'About the Event', level: 'h2', textAlign: 'text-left', color: '#FBBF24', fontSize: 'text-3xl' },
        { id: 'e17', type: 'text', content: 'DevConf brings together 2,000+ developers from around the world for two days of talks, workshops, and networking. Whether you\'re a frontend wizard, backend engineer, or platform architect — there\'s something for everyone.', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e18', type: 'spacer', height: 'py-4' },
        { id: 'e19', type: 'image', src: 'https://picsum.photos/seed/audience/900/350', alt: 'Previous conference audience', width: 'w-full', textAlign: 'text-center' },
        { id: 'e20', type: 'spacer', height: 'py-12' },
        { id: 'e21', type: 'divider', style: 'dashed', color: '#78350F', thickness: 'border' },
        { id: 'e22', type: 'spacer', height: 'py-8' },
        { id: 'e23', type: 'heading', text: 'Schedule', level: 'h2', textAlign: 'text-left', color: '#FBBF24', fontSize: 'text-3xl' },
        { id: 'e24', type: 'heading', text: 'Day 1 — September 15', level: 'h3', textAlign: 'text-left', color: '#ffffff', fontSize: 'text-xl' },
        { id: 'e25', type: 'text', content: '09:00  Opening Keynote — The Future of Developer Experience', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e26', type: 'text', content: '10:30  Track A: Building Scalable APIs at the Edge', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e27', type: 'text', content: '10:30  Track B: Modern Frontend Architecture with React', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e28', type: 'text', content: '12:00  Lunch Break & Networking', textAlign: 'text-left', color: '#F59E0B', fontSize: 'text-base' },
        { id: 'e29', type: 'text', content: '13:30  Workshop: CI/CD Pipelines in 60 Minutes', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e30', type: 'text', content: '15:00  Panel: AI-Assisted Development — Hype vs. Reality', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e31', type: 'text', content: '18:00  Evening Social & Sponsor Expo', textAlign: 'text-left', color: '#F59E0B', fontSize: 'text-base' },
        { id: 'e32', type: 'spacer', height: 'py-4' },
        { id: 'e33', type: 'heading', text: 'Day 2 — September 16', level: 'h3', textAlign: 'text-left', color: '#ffffff', fontSize: 'text-xl' },
        { id: 'e34', type: 'text', content: '09:00  Keynote: Open Source in the Age of AI', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e35', type: 'text', content: '10:30  Track A: Designing for Performance', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e36', type: 'text', content: '10:30  Track B: Observability & Debugging at Scale', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e37', type: 'text', content: '12:00  Lunch Break & Lightning Talks', textAlign: 'text-left', color: '#F59E0B', fontSize: 'text-base' },
        { id: 'e38', type: 'text', content: '14:00  Hands-on Lab: Infrastructure as Code with Terraform', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e39', type: 'text', content: '16:30  Closing Keynote & Awards', textAlign: 'text-left', color: '#CBD5E1', fontSize: 'text-base' },
        { id: 'e40', type: 'spacer', height: 'py-12' },
        { id: 'e41', type: 'divider', style: 'dashed', color: '#78350F', thickness: 'border' },
        { id: 'e42', type: 'spacer', height: 'py-8' },
        { id: 'e43', type: 'heading', text: 'Venue', level: 'h2', textAlign: 'text-left', color: '#FBBF24', fontSize: 'text-3xl' },
        { id: 'e44', type: 'text', content: 'Austin Convention Center', textAlign: 'text-left', color: '#ffffff', fontSize: 'text-lg' },
        { id: 'e45', type: 'text', content: '500 E Cesar Chavez St, Austin, TX 78701', textAlign: 'text-left', color: '#94A3B8', fontSize: 'text-base' },
        { id: 'e46', type: 'spacer', height: 'py-4' },
        { id: 'e47', type: 'image', src: 'https://picsum.photos/seed/convention/900/350', alt: 'Austin Convention Center', width: 'w-full', textAlign: 'text-center' },
        { id: 'e48', type: 'spacer', height: 'py-4' },
        { id: 'e49', type: 'text', content: '✈️  Austin-Bergstrom International Airport is 20 min away by car or rideshare.', textAlign: 'text-left', color: '#94A3B8', fontSize: 'text-base' },
        { id: 'e50', type: 'text', content: '🏨  Discounted hotel rates available at the Marriott Downtown Austin — use code DEVCONF26.', textAlign: 'text-left', color: '#94A3B8', fontSize: 'text-base' },
        { id: 'e51', type: 'spacer', height: 'py-12' },
        { id: 'e52', type: 'divider', style: 'dashed', color: '#78350F', thickness: 'border' },
        { id: 'e53', type: 'spacer', height: 'py-8' },
        { id: 'e54', type: 'heading', text: 'Secure your spot today', level: 'h2', textAlign: 'text-center', color: '#FBBF24', fontSize: 'text-3xl' },
        { id: 'e55', type: 'text', content: 'Early bird tickets available until July 1st. Limited seats — don\'t miss out.', textAlign: 'text-center', color: '#CBD5E1', fontSize: 'text-lg' },
        { id: 'e56', type: 'spacer', height: 'py-4' },
        { id: 'e57', type: 'button', label: 'Get Your Ticket', href: '/register', variant: 'primary', size: 'lg', textAlign: 'text-center' },
        { id: 'e58', type: 'spacer', height: 'py-8' },
      ],
    },
  },
]

const DEMO_PROJECT: Project = {
  id: 'demo-project-1',
  name: 'My Landing Page',
  mode: 'web',
  meta: {
    title: 'Welcome to My Landing Page',
    description: 'A demo landing page built with the landing page builder',
    lang: 'en',
  },
  blocks: [
    {
      id: 'block-1',
      type: 'heading',
      text: 'Welcome to Landing Page Builder',
      level: 'h1',
      textAlign: 'text-center',
      color: '#111827',
      fontSize: 'text-4xl',
    },
    {
      id: 'block-2',
      type: 'text',
      content: 'Build beautiful landing pages visually with drag and drop. No coding required.',
      textAlign: 'text-center',
      color: '#4B5563',
      fontSize: 'text-lg',
    },
    {
      id: 'block-3',
      type: 'button',
      label: 'Get Started',
      href: '#',
      variant: 'primary',
      size: 'lg',
      textAlign: 'text-center',
    },
    {
      id: 'block-4',
      type: 'spacer',
      height: 'py-8',
    },
    {
      id: 'block-5',
      type: 'divider',
      style: 'solid',
      color: '#E5E7EB',
      thickness: 'border',
    },
  ],
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
    ? 'border-blue-500 text-blue-600'
    : 'border-transparent text-gray-500 hover:text-gray-700'
  }`

function AppBar({ mode, onModeChange }: { mode: 'web' | 'email'; onModeChange: (m: 'web' | 'email') => void }) {
  const isEmail = mode === 'email'
  const disabledTabCls = 'px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-300 cursor-not-allowed select-none'

  return (
    <header className="flex items-center px-4 bg-white border-b border-gray-200 shrink-0">
      <span className="text-sm font-semibold text-gray-800 mr-6">Landing Page Builder</span>
      <NavLink to="/" end className={navLinkClass}>Builder</NavLink>
      <NavLink to="/json" className={navLinkClass}>JSON</NavLink>
      {isEmail
        ? <span className={disabledTabCls} title="Not available in email mode">HTML Preview</span>
        : <NavLink to="/html" className={navLinkClass}>HTML Preview</NavLink>
      }
      {isEmail
        ? <NavLink to="/send-email" className={navLinkClass}>Send Email</NavLink>
        : <span className={disabledTabCls} title="Not available in web mode">Send Email</span>
      }
      {/* Dev-only mode switch */}
      <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
        <span>mode:</span>
        <button
          onClick={() => onModeChange('web')}
          className={`px-2 py-0.5 rounded ${mode === 'web' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:text-gray-600'}`}
        >web</button>
        <button
          onClick={() => onModeChange('email')}
          className={`px-2 py-0.5 rounded ${mode === 'email' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:text-gray-600'}`}
        >email</button>
      </div>
    </header>
  )
}

function BuilderPage({ mode }: { mode: 'web' | 'email' }) {
  return (
    <LandingPageBuilder
      initialProject={loadProject() ?? DEMO_PROJECT}
      onSave={(project: Project) => {
        saveProject(project)
        const html = exportProject(project)
        console.log('[demo] exported HTML length:', html.length)
        alert('Project saved to localStorage!')
      }}
      fileManager={mockFileManager}
      customBlocks={CUSTOM_BLOCKS}
      templates={TEMPLATES}
      mode={mode}
    />
  )
}

function JsonPage() {
  const project = loadProject() ?? DEMO_PROJECT
  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col">
      <div className="px-4 py-2.5 border-b border-gray-700 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project JSON</span>
      </div>
      <pre className="flex-1 overflow-auto p-4 text-xs leading-relaxed font-mono">
        {JSON.stringify(project, null, 2)}
      </pre>
    </div>
  )
}

function HtmlPage() {
  const project = loadProject() ?? DEMO_PROJECT
  // return <LandingPageRenderer project={project} className="max-w-2xl mx-auto px-6 py-12" />
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Renderer Preview</span>
      </div>
      <div className="flex-1 overflow-auto">
        <LandingPageRenderer project={project} className="max-w-2xl mx-auto px-6 py-12" />
      </div>
    </div>
  )
}

const MAILGUN_STORAGE_KEY = 'chantilly_mailgun_config'

interface MailgunConfig {
  domain: string
  apiKey: string
  region: 'eu' | 'us'
  to: string
}

function loadMailgunConfig(): MailgunConfig {
  try {
    return JSON.parse(localStorage.getItem(MAILGUN_STORAGE_KEY) ?? '{}')
  } catch {
    return { domain: '', apiKey: '', region: 'eu', to: '' }
  }
}

function saveMailgunConfig(cfg: MailgunConfig) {
  localStorage.setItem(MAILGUN_STORAGE_KEY, JSON.stringify(cfg))
}

function SendEmailPage() {
  const project = loadProject() ?? DEMO_PROJECT
  const saved = loadMailgunConfig()

  const [domain, setDomain] = useState(saved.domain ?? '')
  const [apiKey, setApiKey] = useState(saved.apiKey ?? '')
  const [region, setRegion] = useState<'eu' | 'us'>(saved.region ?? 'eu')
  const [to, setTo] = useState(saved.to ?? '')
  const [subject, setSubject] = useState(project.meta.title || project.name)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSend = async () => {
    if (!domain || !apiKey || !to) return
    saveMailgunConfig({ domain, apiKey, region, to })
    setStatus('sending')
    setErrorMsg('')

    try {
      const html = exportProject(project)
      const form = new FormData()
      form.append('from', `Chantilly Demo <mailgun@${domain}>`)
      form.append('to', to)
      form.append('subject', subject)
      form.append('html', html)

      const res = await fetch(`/api/mailgun-${region}/v3/${domain}/messages`, {
        method: 'POST',
        headers: { Authorization: `Basic ${btoa(`api:${apiKey}`)}` },
        body: form,
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`${res.status} — ${text}`)
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err))
      setStatus('error')
    }
  }

  const field = (label: string, node: React.ReactNode) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {node}
    </div>
  )

  const inputCls = 'border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-lg mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Mailgun config */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-800">Mailgun Configuration</h2>
          <p className="text-xs text-gray-500">Saved to localStorage — never sent to any server.</p>
          {field('Domain', (
            <input className={inputCls} placeholder="mg.yourdomain.com" value={domain} onChange={e => setDomain(e.target.value)} />
          ))}
          {field('API Key', (
            <input className={inputCls} type="password" placeholder="key-xxxxxxxxxxxxxxxx" value={apiKey} onChange={e => setApiKey(e.target.value)} />
          ))}
          {field('Region', (
            <select className={inputCls} value={region} onChange={e => setRegion(e.target.value as 'eu' | 'us')}>
              <option value="eu">EU (api.eu.mailgun.net)</option>
              <option value="us">US (api.mailgun.net)</option>
            </select>
          ))}
        </section>

        {/* Send */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-800">Send Test Email</h2>
          <p className="text-xs text-gray-500">
            Sends the current project as an email-safe HTML (inline styles, no scripts).
          </p>
          {field('To', (
            <input className={inputCls} type="email" placeholder="recipient@example.com" value={to} onChange={e => setTo(e.target.value)} />
          ))}
          {field('Subject', (
            <input className={inputCls} value={subject} onChange={e => setSubject(e.target.value)} />
          ))}
          <button
            onClick={handleSend}
            disabled={!domain || !apiKey || !to || status === 'sending'}
            className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'sending' ? 'Sending…' : 'Send Email'}
          </button>
          {status === 'success' && (
            <p className="text-sm text-green-600 font-medium">Email sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600">Error: {errorMsg}</p>
          )}
        </section>

      </div>
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState<'web' | 'email'>('web')

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <AppBar mode={mode} onModeChange={setMode} />
        <div className="flex-1 min-h-0 overflow-hidden">
          <Routes>
            <Route path="/" element={<BuilderPage mode={mode} />} />
            <Route path="/json" element={<JsonPage />} />
            <Route path="/html" element={<HtmlPage />} />
            <Route path="/send-email" element={<SendEmailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
