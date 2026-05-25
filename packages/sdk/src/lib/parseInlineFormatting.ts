import React from 'react'

/**
 * Parses a string with simple inline formatting markers and returns React nodes.
 * Supported: *text* → <strong>, _text_ → <em>, ~text~ → <u>
 */
export function parseInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_|~[^~]+~)/)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
      return React.createElement('strong', { key: i }, part.slice(1, -1))
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2)
      return React.createElement('em', { key: i }, part.slice(1, -1))
    if (part.startsWith('~') && part.endsWith('~') && part.length > 2)
      return React.createElement('u', { key: i }, part.slice(1, -1))
    return part
  })
}

/**
 * Converts inline formatting markers to HTML tags.
 * Supported: *text* → <strong>, _text_ → <em>, ~text~ → <u>
 * Also converts \n to <br>.
 */
export function parseInlineFormattingToHtml(text: string): string {
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/~([^~]+)~/g, '<u>$1</u>')
}
