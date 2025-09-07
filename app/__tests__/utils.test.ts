import { describe, it, expect } from 'vitest'
import { cn, formatDuration } from '@/lib/utils'
import { translations, type Language } from '@/lib/translations'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
  })

  it('tailwind-merge removes conflicts', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })
})

describe('formatDuration', () => {
  it('formats seconds to HH:MM:SS', () => {
    expect(formatDuration(0)).toBe('00:00:00')
    expect(formatDuration(59)).toBe('00:00:59')
    expect(formatDuration(60)).toBe('00:01:00')
    expect(formatDuration(3661)).toBe('01:01:01')
  })
})

describe('translations', () => {
  it('has consistent keys across languages', () => {
    const enKeys = new Set(Object.keys(translations.en))
    const deKeys = new Set(Object.keys(translations.de))

    // every en key exists in de
    for (const key of enKeys) {
      expect(deKeys.has(key)).toBe(true)
    }

    // every de key exists in en
    for (const key of deKeys) {
      expect(enKeys.has(key)).toBe(true)
    }
  })

  it('Language type matches translation keys', () => {
    const langs: Language[] = ['en', 'de']
    expect(langs.every(l => l in translations)).toBe(true)
  })
})