import { describe, it, expect } from 'vitest';
import { cn, formatDuration } from '../lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names and dedupes Tailwind utilities', () => {
      const result = cn('p-2', ['text-sm', { hidden: false }], 'p-4', undefined, null);
      // p-4 should win over p-2
      expect(result).toContain('p-4');
      expect(result).not.toContain('p-2');
      expect(result).toContain('text-sm');
    });

    it('handles falsy values and arrays/objects', () => {
      const result = cn('a', 0 as unknown as string, '', false as unknown as string, ['b', undefined], { c: true, d: false });
      expect(result.split(' ').sort()).toEqual(['a', 'b', 'c'].sort());
    });
  });

  describe('formatDuration', () => {
    it('formats seconds into HH:mm:ss for typical values', () => {
      expect(formatDuration(0)).toBe('00:00:00');
      expect(formatDuration(59)).toBe('00:00:59');
      expect(formatDuration(60)).toBe('00:01:00');
      expect(formatDuration(3599)).toBe('00:59:59');
      expect(formatDuration(3600)).toBe('01:00:00');
      expect(formatDuration(3661)).toBe('01:01:01');
    });

    it('pads with leading zeros', () => {
      expect(formatDuration(5)).toBe('00:00:05');
      expect(formatDuration(65)).toBe('00:01:05');
      expect(formatDuration(3605)).toBe('01:00:05');
    });
  });
});