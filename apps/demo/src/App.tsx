import React from 'react'
import { Zap, ExternalLink } from 'lucide-react'
import { LandingPageBuilder, useBuilderStore, exportToHtml } from '@byte3-it/landing-page-builder'
import type { Project, CustomBlockDefinition, TemplateDefinition } from '@byte3-it/landing-page-builder'
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
  },
]

const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'A clean product landing page with hero, features highlight, and call-to-action.',
    project: {
      id: 'tpl-saas',
      name: 'SaaS Landing Page',
      meta: { title: 'The Best SaaS Tool', description: 'Supercharge your workflow today.', lang: 'en' },
      blocks: [
        { id: 's1', type: 'heading', text: 'Supercharge Your Workflow', level: 'h1', textAlign: 'text-center', color: 'text-gray-900', fontSize: 'text-5xl' },
        { id: 's2', type: 'text', content: 'The all-in-one platform that helps teams ship faster, collaborate better, and grow smarter.', textAlign: 'text-center', color: 'text-gray-500', fontSize: 'text-xl' },
        { id: 's3', type: 'spacer', height: 'py-4' },
        { id: 's4', type: 'button', label: 'Start for Free', href: '/signup', variant: 'primary', size: 'lg', textAlign: 'text-center' },
        { id: 's5', type: 'spacer', height: 'py-12' },
        { id: 's6', type: 'divider', style: 'solid', color: 'border-gray-200', thickness: 'border' },
        { id: 's7', type: 'spacer', height: 'py-8' },
        { id: 's8', type: 'heading', text: 'Everything you need', level: 'h2', textAlign: 'text-center', color: 'text-gray-900', fontSize: 'text-3xl' },
        { id: 's9', type: 'text', content: '⚡ Blazing fast performance — Deploy in seconds, scale to millions.', textAlign: 'text-left', color: 'text-gray-700', fontSize: 'text-base' },
        { id: 's10', type: 'text', content: '🔒 Enterprise-grade security — SOC 2 Type II certified, end-to-end encryption.', textAlign: 'text-left', color: 'text-gray-700', fontSize: 'text-base' },
        { id: 's11', type: 'text', content: '🤝 Built for teams — Real-time collaboration, roles, and permissions.', textAlign: 'text-left', color: 'text-gray-700', fontSize: 'text-base' },
        { id: 's12', type: 'spacer', height: 'py-8' },
        { id: 's13', type: 'heading', text: 'Ready to get started?', level: 'h2', textAlign: 'text-center', color: 'text-gray-900', fontSize: 'text-3xl' },
        { id: 's14', type: 'text', content: 'Join 10,000+ teams already using our platform. No credit card required.', textAlign: 'text-center', color: 'text-gray-500', fontSize: 'text-lg' },
        { id: 's15', type: 'spacer', height: 'py-4' },
        { id: 's16', type: 'button', label: 'Get Started Free', href: '/signup', variant: 'primary', size: 'lg', textAlign: 'text-center' },
      ],
    },
  },
  {
    id: 'personal-bio',
    name: 'Personal Bio',
    description: 'A minimal personal page to introduce yourself and share your work.',
    project: {
      id: 'tpl-bio',
      name: 'Personal Bio',
      meta: { title: 'Jane Doe — Designer & Developer', description: 'Personal portfolio and bio.', lang: 'en' },
      blocks: [
        { id: 'b1', type: 'spacer', height: 'py-8' },
        { id: 'b2', type: 'image', src: 'https://picsum.photos/seed/portrait/200/200', alt: 'Profile photo', width: 'w-auto', textAlign: 'text-center' },
        { id: 'b3', type: 'spacer', height: 'py-4' },
        { id: 'b4', type: 'heading', text: 'Jane Doe', level: 'h1', textAlign: 'text-center', color: 'text-gray-900', fontSize: 'text-4xl' },
        { id: 'b5', type: 'text', content: 'Designer & Developer · San Francisco, CA', textAlign: 'text-center', color: 'text-gray-500', fontSize: 'text-lg' },
        { id: 'b6', type: 'spacer', height: 'py-4' },
        { id: 'b7', type: 'divider', style: 'solid', color: 'border-gray-200', thickness: 'border' },
        { id: 'b8', type: 'spacer', height: 'py-4' },
        { id: 'b9', type: 'heading', text: 'About me', level: 'h2', textAlign: 'text-left', color: 'text-gray-900', fontSize: 'text-2xl' },
        { id: 'b10', type: 'text', content: "I'm a product designer and front-end developer passionate about crafting clean, intuitive interfaces. I've helped startups and Fortune 500s ship products used by millions of people.", textAlign: 'text-left', color: 'text-gray-700', fontSize: 'text-base' },
        { id: 'b11', type: 'spacer', height: 'py-4' },
        { id: 'b12', type: 'heading', text: 'Get in touch', level: 'h2', textAlign: 'text-left', color: 'text-gray-900', fontSize: 'text-2xl' },
        { id: 'b13', type: 'button', label: 'Email me', href: 'mailto:jane@example.com', variant: 'primary', size: 'md', textAlign: 'text-left' },
        { id: 'b14', type: 'button', label: 'View GitHub', href: 'https://github.com', variant: 'secondary', size: 'md', textAlign: 'text-left' },
      ],
    },
  },
]

const DEMO_PROJECT: Project = {
  id: 'demo-project-1',
  name: 'My Landing Page',
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
      color: 'text-gray-900',
      fontSize: 'text-4xl',
    },
    {
      id: 'block-2',
      type: 'text',
      content: 'Build beautiful landing pages visually with drag and drop. No coding required.',
      textAlign: 'text-center',
      color: 'text-gray-600',
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
      color: 'border-gray-200',
      thickness: 'border',
    },
  ],
}

function BuilderPane() {
  return (
    <LandingPageBuilder
      initialProject={DEMO_PROJECT}
      onSave={(project: Project) => {
        saveProject(project)
        const html = exportToHtml(project)
        console.log('[demo] exported HTML length:', html.length)
        alert('Project saved to localStorage!')
      }}
      fileManager={mockFileManager}
      customBlocks={CUSTOM_BLOCKS}
      templates={TEMPLATES}
    />
  )
}

function ProjectJson() {
  const project = useBuilderStore((s) => s.project)

  return (
    <div className="w-96 bg-gray-900 text-gray-100 flex flex-col shrink-0 border-l border-gray-700">
      <div className="px-4 py-2.5 border-b border-gray-700 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Project JSON
        </span>
      </div>
      <pre className="flex-1 overflow-auto p-4 text-xs leading-relaxed font-mono">
        {JSON.stringify(project, null, 2)}
      </pre>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 min-w-0">
        <BuilderPane />
      </div>
      <ProjectJson />
    </div>
  )
}
