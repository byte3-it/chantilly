import React from 'react'
import type { CustomBlock as CustomBlockType } from '../../../types/customBlock'
import { DEFAULT_PROJECT_SETTINGS } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'

interface Props {
  block: CustomBlockType
  isSelected: boolean
  onClick: () => void
}

const sizeClasses = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2 text-base', lg: 'px-7 py-3 text-lg' }

export function CustomBlock({ block, isSelected, onClick }: Props) {
  const settings = { ...DEFAULT_PROJECT_SETTINGS, ...useBuilderStore((s) => s.project.settings) }

  const alignClass =
    block.textAlign === 'text-center'
      ? 'flex justify-center'
      : block.textAlign === 'text-right'
      ? 'flex justify-end'
      : ''

  const buttonStyle: React.CSSProperties =
    block.variant === 'primary'
      ? { backgroundColor: settings.primaryColor, color: settings.primaryTextColor }
      : {
          backgroundColor: settings.secondaryColor,
          color: settings.secondaryTextColor,
          border: `1px solid ${settings.secondaryBorderColor}`,
        }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded px-1 -mx-1 ${
        isSelected ? 'ring-2 ring-violet-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      <div className={alignClass}>
        {block.elementType === 'text' ? (
          <span className={`inline-block ${sizeClasses[block.size]}`}>
            {block.label || 'Text'}
          </span>
        ) : block.elementType === 'link' ? (
          <span className={`inline-block font-medium underline text-blue-600 ${sizeClasses[block.size]}`}>
            {block.label || 'Link'}
          </span>
        ) : (
          <span
            style={buttonStyle}
            className={`inline-block rounded-md font-medium ${sizeClasses[block.size]}`}
          >
            {block.label || 'Button'}
          </span>
        )}
      </div>
    </div>
  )
}
