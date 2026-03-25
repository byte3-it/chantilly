import type { Block, Project, ProjectSettings } from '../types/project'
import { DEFAULT_PROJECT_SETTINGS } from '../types/project'

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderBlock(block: Block, s: ProjectSettings): string {
  switch (block.type) {
    case 'heading': {
      const tag = block.level
      return `    <${tag} class="${block.textAlign} ${block.color} ${block.fontSize} font-bold mb-4">${escape(block.text)}</${tag}>`
    }
    case 'text': {
      return `    <p class="${block.textAlign} ${block.color} ${block.fontSize} mb-4">${escape(block.content)}</p>`
    }
    case 'image': {
      if (!block.src) return ''
      const wrapAlign =
        block.textAlign === 'text-center'
          ? 'flex justify-center'
          : block.textAlign === 'text-right'
          ? 'flex justify-end'
          : ''
      const wrapper = wrapAlign ? `<div class="${wrapAlign}">` : ''
      const wrapperClose = wrapAlign ? '</div>' : ''
      return `    ${wrapper}<img src="${escape(block.src)}" alt="${escape(block.alt)}" class="${block.width} h-auto mb-4" />${wrapperClose}`
    }
    case 'button': {
      const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2 text-base', lg: 'px-7 py-3 text-lg' }
      const btnStyle =
        block.variant === 'primary'
          ? `background-color:${s.primaryColor};color:${s.primaryTextColor};`
          : `background-color:${s.secondaryColor};color:${s.secondaryTextColor};border:1px solid ${s.secondaryBorderColor};`
      const alignClass =
        block.textAlign === 'text-center'
          ? 'flex justify-center'
          : block.textAlign === 'text-right'
          ? 'flex justify-end'
          : ''
      const wrapper = alignClass ? `<div class="${alignClass}">` : ''
      const wrapperClose = alignClass ? '</div>' : ''
      return `    ${wrapper}<a href="${escape(block.href)}" style="${btnStyle}" class="inline-block rounded-md font-medium ${sizes[block.size]} mb-4">${escape(block.label)}</a>${wrapperClose}`
    }
    case 'divider': {
      return `    <hr class="${block.thickness} ${block.color} ${block.style === 'dashed' ? 'border-dashed' : 'border-solid'} my-4" />`
    }
    case 'spacer': {
      return `    <div class="${block.height}"></div>`
    }
    case 'countdown': {
      const safeId = `cd_${block.id.replace(/[^a-z0-9]/gi, '_')}`
      const alignWrap =
        block.textAlign === 'text-center'
          ? 'flex flex-col items-center'
          : block.textAlign === 'text-right'
          ? 'flex flex-col items-end'
          : 'flex flex-col items-start'
      return `    <div class="${alignWrap}">
      ${block.label ? `<p class="text-sm font-medium opacity-70 ${block.color} mb-2">${escape(block.label)}</p>` : ''}
      <div id="${safeId}" class="flex gap-6 ${block.color}">
        <div class="flex flex-col items-center"><span id="${safeId}_d" class="text-4xl font-bold tabular-nums">00</span><span class="text-xs uppercase tracking-widest mt-1 opacity-60">Days</span></div>
        <div class="flex flex-col items-center"><span id="${safeId}_h" class="text-4xl font-bold tabular-nums">00</span><span class="text-xs uppercase tracking-widest mt-1 opacity-60">Hours</span></div>
        <div class="flex flex-col items-center"><span id="${safeId}_m" class="text-4xl font-bold tabular-nums">00</span><span class="text-xs uppercase tracking-widest mt-1 opacity-60">Min</span></div>
        <div class="flex flex-col items-center"><span id="${safeId}_s" class="text-4xl font-bold tabular-nums">00</span><span class="text-xs uppercase tracking-widest mt-1 opacity-60">Sec</span></div>
      </div>
    </div>
    <script>(function(){var t=new Date("${escape(block.targetDate)}");function u(){var d=t-new Date();if(d<0)d=0;var p=function(n){return String(Math.floor(n)).padStart(2,"0");};document.getElementById("${safeId}_d").textContent=p(d/86400000);document.getElementById("${safeId}_h").textContent=p((d%86400000)/3600000);document.getElementById("${safeId}_m").textContent=p((d%3600000)/60000);document.getElementById("${safeId}_s").textContent=p((d%60000)/1000);}u();setInterval(u,1000);})();</script>`
    }
    case 'custom': {
      const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2 text-base', lg: 'px-7 py-3 text-lg' }
      const alignClass =
        block.textAlign === 'text-center'
          ? 'flex justify-center'
          : block.textAlign === 'text-right'
          ? 'flex justify-end'
          : ''
      const wrapper = alignClass ? `<div class="${alignClass}">` : ''
      const wrapperClose = alignClass ? '</div>' : ''
      if (block.elementType === 'text') {
        return `    ${wrapper}<span class="inline-block ${sizes[block.size]} mb-4">${escape(block.label)}</span>${wrapperClose}`
      }
      if (block.elementType === 'link') {
        return `    ${wrapper}<a href="${escape(block.href)}" class="inline-block font-medium underline text-blue-600 ${sizes[block.size]} mb-4">${escape(block.label)}</a>${wrapperClose}`
      }
      const btnStyle =
        block.variant === 'primary'
          ? `background-color:${s.primaryColor};color:${s.primaryTextColor};`
          : `background-color:${s.secondaryColor};color:${s.secondaryTextColor};border:1px solid ${s.secondaryBorderColor};`
      return `    ${wrapper}<a href="${escape(block.href)}" style="${btnStyle}" class="inline-block rounded-md font-medium ${sizes[block.size]} mb-4">${escape(block.label)}</a>${wrapperClose}`
    }
  }
}

export function exportToHtml(project: Project): string {
  const s: ProjectSettings = { ...DEFAULT_PROJECT_SETTINGS, ...project.settings }
  const blocks = project.blocks.map((b) => renderBlock(b, s)).filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="${escape(project.meta.lang || 'en')}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escape(project.meta.title || project.name)}</title>
  ${project.meta.description ? `<meta name="description" content="${escape(project.meta.description)}" />` : ''}
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased" style="background-color:${s.backgroundColor}">
  <div class="max-w-3xl mx-auto px-4 py-12">
${blocks}
  </div>
</body>
</html>`
}
