import type { Block, Project, ProjectSettings } from '../types/project'
import { DEFAULT_PROJECT_SETTINGS } from '../types/project'
import { parseInlineFormattingToHtml } from '../lib/parseInlineFormatting'

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const FONT_SIZE: Record<string, string> = {
  'text-xs':   'font-size:12px;line-height:16px;',
  'text-sm':   'font-size:14px;line-height:20px;',
  'text-base': 'font-size:16px;line-height:24px;',
  'text-lg':   'font-size:18px;line-height:28px;',
  'text-xl':   'font-size:20px;line-height:28px;',
  'text-2xl':  'font-size:24px;line-height:32px;',
  'text-3xl':  'font-size:30px;line-height:36px;',
  'text-4xl':  'font-size:36px;line-height:40px;',
  'text-5xl':  'font-size:48px;line-height:52px;',
}

const TEXT_ALIGN: Record<string, string> = {
  'text-left':   'text-align:left;',
  'text-center': 'text-align:center;',
  'text-right':  'text-align:right;',
}

const IMG_WIDTH: Record<string, string> = {
  'w-full': 'width:100%;',
  'w-1/2':  'width:50%;',
  'w-auto': 'width:auto;',
}

const SPACER_PADDING: Record<string, string> = {
  'py-1':  '4px',
  'py-2':  '8px',
  'py-3':  '12px',
  'py-4':  '16px',
  'py-6':  '24px',
  'py-8':  '32px',
  'py-10': '40px',
  'py-12': '48px',
  'py-16': '64px',
  'py-20': '80px',
}

const BORDER_WIDTH: Record<string, string> = {
  'border':   '1px',
  'border-2': '2px',
  'border-4': '4px',
}

const BUTTON_PADDING: Record<string, string> = {
  sm: '6px 12px',
  md: '8px 20px',
  lg: '12px 28px',
}

const BUTTON_FONT_SIZE: Record<string, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
}

// Wrap a block in a table row with consistent bottom spacing
function row(inner: string): string {
  return `        <tr><td style="padding-bottom:16px;">\n${inner}\n        </td></tr>`
}

function renderBlock(block: Block, s: ProjectSettings): string {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level
      const style = `margin:0;${FONT_SIZE[block.fontSize] ?? ''}font-weight:700;${TEXT_ALIGN[block.textAlign] ?? ''}color:${block.color};`
      return row(`          <${Tag} style="${style}">${escape(block.text)}</${Tag}>`)
    }

    case 'text': {
      const style = `margin:0;${FONT_SIZE[block.fontSize] ?? ''}${TEXT_ALIGN[block.textAlign] ?? ''}color:${block.color};`
      if (block.backgroundColor) {
        const bannerStyle = `background-color:${block.backgroundColor};padding:12px 16px;border-radius:4px;`
        return row(`          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="${bannerStyle}"><p style="${style}">${parseInlineFormattingToHtml(escape(block.content))}</p></td></tr></table>`)
      }
      return row(`          <p style="${style}">${parseInlineFormattingToHtml(escape(block.content))}</p>`)
    }

    case 'image': {
      if (!block.src) return ''
      const imgStyle = `${IMG_WIDTH[block.width] ?? 'width:100%;'}height:auto;display:block;border-radius:4px;`
      const tdAlign =
        block.textAlign === 'text-center' ? 'center'
        : block.textAlign === 'text-right' ? 'right'
        : 'left'
      return row(`          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${tdAlign}"><img src="${escape(block.src)}" alt="${escape(block.alt)}" style="${imgStyle}" /></td></tr></table>`)
    }

    case 'button': {
      const btnStyle =
        block.variant === 'primary'
          ? `background-color:${s.primaryColor};color:${s.primaryTextColor};`
          : `background-color:${s.secondaryColor};color:${s.secondaryTextColor};border:1px solid ${s.secondaryBorderColor};`
      const aStyle = `${btnStyle}display:inline-block;padding:${BUTTON_PADDING[block.size]};font-size:${BUTTON_FONT_SIZE[block.size]};font-weight:500;border-radius:6px;text-decoration:none;`
      const tdAlign =
        block.textAlign === 'text-center' ? 'center'
        : block.textAlign === 'text-right' ? 'right'
        : 'left'
      return row(`          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${tdAlign}"><a href="${escape(block.href)}" style="${aStyle}">${escape(block.label)}</a></td></tr></table>`)
    }

    case 'divider': {
      const width = BORDER_WIDTH[block.thickness] ?? '1px'
      const color = block.color
      const style = block.style === 'dashed' ? 'dashed' : 'solid'
      return row(`          <hr style="margin:0;border:none;border-top:${width} ${style} ${color};" />`)
    }

    case 'spacer': {
      const padding = SPACER_PADDING[block.height] ?? '32px'
      return row(`          <div style="height:${padding};font-size:1px;line-height:${padding};">&nbsp;</div>`)
    }

    case 'countdown': {
      // JS is unavailable in email clients — render a static snapshot of the time remaining at export
      const diff = new Date(block.targetDate).getTime() - Date.now()
      const expired = diff <= 0
      const days    = expired ? 0 : Math.floor(diff / 86_400_000)
      const hours   = expired ? 0 : Math.floor((diff % 86_400_000) / 3_600_000)
      const minutes = expired ? 0 : Math.floor((diff % 3_600_000) / 60_000)
      const seconds = expired ? 0 : Math.floor((diff % 60_000) / 1_000)
      const pad = (n: number) => String(n).padStart(2, '0')
      const color = block.color
      const tableAlign =
        block.textAlign === 'text-center' ? 'center'
        : block.textAlign === 'text-right' ? 'right'
        : 'left'

      const unitCell = (val: string, label: string) =>
        `<td align="center" style="padding:0 12px;"><span style="display:block;font-size:36px;font-weight:700;color:${color};font-family:monospace;">${val}</span><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.6;color:${color};">${label}</span></td>`

      const labelRow = block.label
        ? `<tr><td colspan="4" align="${tableAlign}" style="padding-bottom:8px;font-size:13px;font-weight:500;opacity:0.7;color:${color};">${escape(block.label)}</td></tr>`
        : ''

      return row(`          <table cellpadding="0" cellspacing="0" border="0" align="${tableAlign}">${labelRow}<tr>${unitCell(pad(days), 'Days')}${unitCell(pad(hours), 'Hours')}${unitCell(pad(minutes), 'Min')}${unitCell(pad(seconds), 'Sec')}</tr></table>`)
    }

    case 'custom': {
      const tdAlign =
        block.textAlign === 'text-center' ? 'center'
        : block.textAlign === 'text-right' ? 'right'
        : 'left'

      let inner: string
      if (block.elementType === 'text') {
        inner = `<span style="display:inline-block;padding:${BUTTON_PADDING[block.size]};font-size:${BUTTON_FONT_SIZE[block.size]};">${escape(block.label)}</span>`
      } else if (block.elementType === 'link') {
        inner = `<a href="${escape(block.href)}" style="display:inline-block;padding:${BUTTON_PADDING[block.size]};font-size:${BUTTON_FONT_SIZE[block.size]};font-weight:500;text-decoration:underline;color:#2563eb;">${escape(block.label)}</a>`
      } else {
        const btnStyle =
          block.variant === 'primary'
            ? `background-color:${s.primaryColor};color:${s.primaryTextColor};`
            : `background-color:${s.secondaryColor};color:${s.secondaryTextColor};border:1px solid ${s.secondaryBorderColor};`
        const aStyle = `${btnStyle}display:inline-block;padding:${BUTTON_PADDING[block.size]};font-size:${BUTTON_FONT_SIZE[block.size]};font-weight:500;border-radius:6px;text-decoration:none;`
        inner = `<a href="${escape(block.href)}" style="${aStyle}">${escape(block.label)}</a>`
      }
      return row(`          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${tdAlign}">${inner}</td></tr></table>`)
    }
  }
}

export function exportToEmail(project: Project): string {
  const s: ProjectSettings = { ...DEFAULT_PROJECT_SETTINGS, ...project.settings }
  const blocks = project.blocks.map((b) => renderBlock(b, s)).filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="${escape(project.meta.lang || 'en')}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escape(project.meta.title || project.name)}</title>
  ${project.meta.description ? `<meta name="description" content="${escape(project.meta.description)}" />` : ''}
</head>
<body style="margin:0;padding:0;font-family:sans-serif;-webkit-font-smoothing:antialiased;background-color:${s.backgroundColor};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${s.backgroundColor};">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
${blocks}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
