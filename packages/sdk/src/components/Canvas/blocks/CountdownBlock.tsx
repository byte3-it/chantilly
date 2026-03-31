import React, { useEffect, useState } from 'react'
import type { CountdownBlock as CountdownBlockType } from '../../../types/project'

interface Props {
  block: CountdownBlockType
  isSelected: boolean
  onClick: () => void
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

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[3.5rem]">
      <span className="text-3xl font-bold tabular-nums leading-none">{pad(value)}</span>
      <span className="text-xs uppercase tracking-widest mt-1 opacity-60">{label}</span>
    </div>
  )
}

export function CountdownBlock({ block, isSelected, onClick }: Props) {
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
    <div
      onClick={onClick}
      className={`cursor-pointer rounded px-1 -mx-1 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
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
            <Unit value={timeLeft.days} label="Days" />
            <Unit value={timeLeft.hours} label="Hours" />
            <Unit value={timeLeft.minutes} label="Min" />
            <Unit value={timeLeft.seconds} label="Sec" />
          </div>
        )}
      </div>
    </div>
  )
}
