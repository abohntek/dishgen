// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { exportRecipesToDoc } from '../lib/doc-export';
import type { Recipe } from '../lib/types';

describe('doc-export', () => {
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Sample',
      ingredients: ['x', 'y'],
      instructions: ['do a', 'do b'],
      cookingTime: '30 minutes',
      difficulty: 'Medium',
      userIngredients: ['a', 'b', 'c'],
      createdAt: new Date(0),
      healthBenefits: 'stress-reducing, anti-inflammatory',
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();

    // Ensure URL blob APIs exist in JSDOM test env
    if (!(URL as any).createObjectURL) {
      (URL as any).createObjectURL = vi.fn().mockReturnValue('blob:mock');
    } else {
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    }
    if (!(URL as any).revokeObjectURL) {
      (URL as any).revokeObjectURL = vi.fn();
    } else {
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    }

    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Ensure alert exists for spying in JSDOM
    if (typeof window.alert !== 'function') {
      (window as any).alert = () => {};
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('alerts when no recipes provided', () => {
    const alertSpy = vi.spyOn(window, 'alert');
    exportRecipesToDoc([]);
    expect(alertSpy).toHaveBeenCalled();
  });

  it('creates a doc blob and triggers download, including health benefits when present', () => {
    const anchor = document.createElement('a');
    const clickSpy = vi.spyOn(anchor, 'click');
    const createElementSpy = vi.spyOn(document as any, 'createElement').mockReturnValue(anchor as any);
    const appendSpy = vi.spyOn(document.body as any, 'appendChild' as any);
    const removeSpy = vi.spyOn(document.body as any, 'removeChild' as any);

    exportRecipesToDoc(sampleRecipes);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('handles errors gracefully', () => {
    const alertSpy = vi.spyOn(window, 'alert');
    vi.spyOn(document as any, 'createElement').mockImplementation(() => { throw new Error('boom'); });
    exportRecipesToDoc(sampleRecipes);
    expect(console.error).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
  });
});
