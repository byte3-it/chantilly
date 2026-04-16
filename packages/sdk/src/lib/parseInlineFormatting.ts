import React from 'react'

/**
 * Parses a string with simple inline formatting markers and returns React nodes.
 * Supported: *text* → <strong>text</strong>
 */
export function parseInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return React.createElement('strong', { key: i }, part.slice(1, -1))
    }
    return part
  })
}

/**
 * Converts inline formatting markers to HTML tags.
 * Supported: *text* → <strong>text</strong>
 */
export function parseInlineFormattingToHtml(text: string): string {
  return text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
}
