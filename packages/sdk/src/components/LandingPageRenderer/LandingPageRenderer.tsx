import React, { useEffect, useState } from 'react'
import type {
  Project,
  Block,
  HeadingBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  DividerBlock,
  SpacerBlock,
  CountdownBlock,
  ProjectSettings,
} from '../../types/project'
import { DEFAULT_PROJECT_SETTINGS } from '../../types/project'
import type { CustomBlock } from '../../types/customBlock'

export interface LandingPageRendererProps {
  project: Project
  className?: string
}

const sizeClasses = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2 text-base', lg: 'px-7 py-3 text-lg' }

function alignToFlex(textAlign: string) {
  if (textAlign === 'text-center') return 'flex justify-center'
  if (textAlign === 'text-right') return 'flex justify-end'
  return ''
}

function RenderHeading({ block }: { block: HeadingBlock }) {
  const Tag = block.level as keyof JSX.IntrinsicElements
  return (
    <Tag style={{ color: block.color }} className={`${block.textAlign} ${block.fontSize} font-bold`}>
      {block.text}
    </Tag>
  )
}

function RenderText({ block }: { block: TextBlock }) {
  return (
    <p style={{ color: block.color }} className={`${block.textAlign} ${block.fontSize}`}>
      {block.content}
    </p>
  )
}

function RenderImage({ block }: { block: ImageBlock }) {
  if (!block.src) return null
  return (
    <div className={alignToFlex(block.textAlign)}>
      <img src={block.src} alt={block.alt} className={`${block.width} h-auto rounded`} />
    </div>
  )
}

function RenderButton({ block, settings }: { block: ButtonBlock; settings: ProjectSettings }) {
  const buttonStyle: React.CSSProperties =
    block.variant === 'primary'
      ? { backgroundColor: settings.primaryColor, color: settings.primaryTextColor }
      : {
          backgroundColor: settings.secondaryColor,
          color: settings.secondaryTextColor,
          border: `1px solid ${settings.secondaryBorderColor}`,
        }

  return (
    <div className={alignToFlex(block.textAlign)}>
      <a
        href={block.href}
        style={buttonStyle}
        className={`inline-block rounded-md font-medium ${sizeClasses[block.size]}`}
      >
        {block.label}
      </a>
    </div>
  )
}

function RenderDivider({ block }: { block: DividerBlock }) {
  return (
    <div className="py-2">
      <hr
        style={{ borderColor: block.color }}
        className={`${block.thickness} ${block.style === 'dashed' ? 'border-dashed' : 'border-solid'}`}
      />
    </div>
  )
}

function RenderSpacer({ block }: { block: SpacerBlock }) {
  return <div className={block.height} />
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    expired: false,
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[3.5rem]">
      <span className="text-3xl font-bold tabular-nums leading-none">{pad(value)}</span>
      <span className="text-xs uppercase tracking-widest mt-1 opacity-60">{label}</span>
    </div>
  )
}

function RenderCountdown({ block }: { block: CountdownBlock }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(block.targetDate))

  useEffect(() => {
    setTimeLeft(calcTimeLeft(block.targetDate))
    const id = setInterval(() => setTimeLeft(calcTimeLeft(block.targetDate)), 1_000)
    return () => clearInterval(id)
  }, [block.targetDate])

  const alignClass =
    block.textAlign === 'text-center'
      ? 'items-center'
      : block.textAlign === 'text-right'
      ? 'items-end'
      : 'items-start'

  return (
    <div className={`flex flex-col gap-2 ${alignClass}`}>
      {block.label && (
        <p style={{ color: block.color }} className={`text-sm font-medium opacity-70 ${block.textAlign}`}>
          {block.label}
        </p>
      )}
      {timeLeft.expired ? (
        <p style={{ color: block.color }} className={`text-sm font-medium ${block.textAlign}`}>Time's up!</p>
      ) : (
        <div style={{ color: block.color }} className="flex gap-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </div>
      )}
    </div>
  )
}

function RenderCustomBlock({ block, settings }: { block: CustomBlock; settings: ProjectSettings }) {
  const buttonStyle: React.CSSProperties =
    block.variant === 'primary'
      ? { backgroundColor: settings.primaryColor, color: settings.primaryTextColor }
      : {
          backgroundColor: settings.secondaryColor,
          color: settings.secondaryTextColor,
          border: `1px solid ${settings.secondaryBorderColor}`,
        }

  return (
    <div className={alignToFlex(block.textAlign)}>
      {block.elementType === 'link' ? (
        <a href={block.href} className={`inline-block font-medium underline text-blue-600 ${sizeClasses[block.size]}`}>
          {block.label}
        </a>
      ) : (
        <a
          href={block.href}
          style={buttonStyle}
          className={`inline-block rounded-md font-medium ${sizeClasses[block.size]}`}
        >
          {block.label}
        </a>
      )}
    </div>
  )
}

function RenderBlock({ block, settings }: { block: Block; settings: ProjectSettings }) {
  switch (block.type) {
    case 'heading':  return <RenderHeading block={block} />
    case 'text':     return <RenderText block={block} />
    case 'image':    return <RenderImage block={block} />
    case 'button':   return <RenderButton block={block} settings={settings} />
    case 'divider':  return <RenderDivider block={block} />
    case 'spacer':   return <RenderSpacer block={block} />
    case 'countdown':return <RenderCountdown block={block} />
    case 'custom':   return <RenderCustomBlock block={block} settings={settings} />
  }
}

export function LandingPageRenderer({ project, className }: LandingPageRendererProps) {
  const settings = { ...DEFAULT_PROJECT_SETTINGS, ...project.settings }

  return (
    <div
      className={className}
      style={{ backgroundColor: settings.backgroundColor }}
    >
      <div className="flex flex-col gap-4">
        {project.blocks.map((block) => (
          <div key={block.id}>
            <RenderBlock block={block} settings={settings} />
          </div>
        ))}
      </div>
    </div>
  )
}
