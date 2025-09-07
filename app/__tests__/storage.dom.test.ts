// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveRecipe, getSavedRecipes, removeRecipe, clearAllRecipes } from '../lib/storage';
import type { Recipe } from '../lib/types';

describe('storage', () => {
  const baseRecipe: Omit<Recipe, 'id' | 'createdAt'> = {
    title: 'Test Recipe',
    ingredients: ['a', 'b'],
    instructions: ['do this'],
    cookingTime: '10 minutes',
    difficulty: 'Easy',
    userIngredients: ['a', 'b', 'c'],
    healthBenefits: 'stress-reducing',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns empty list when no saved recipes', () => {
    expect(getSavedRecipes()).toEqual([]);
  });

  it('saves and retrieves recipes', () => {
    const r1: Recipe = { ...baseRecipe, id: '1', createdAt: new Date(0) };
    const r2: Recipe = { ...baseRecipe, id: '2', createdAt: new Date(1) };
    saveRecipe(r1);
    saveRecipe(r2);
    const saved = getSavedRecipes();
    expect(saved).toHaveLength(2);
    expect(saved.map(r => r.id)).toEqual(['1', '2']);
    expect(saved[0].healthBenefits).toBe('stress-reducing');
  });

  it('removes a recipe by id', () => {
    const r1: Recipe = { ...baseRecipe, id: '1', createdAt: new Date(0) };
    const r2: Recipe = { ...baseRecipe, id: '2', createdAt: new Date(1) };
    saveRecipe(r1);
    saveRecipe(r2);

    removeRecipe('1');
    const saved = getSavedRecipes();
    expect(saved).toHaveLength(1);
    expect(saved[0].id).toBe('2');
  });

  it('clears all recipes', () => {
    const r1: Recipe = { ...baseRecipe, id: '1', createdAt: new Date(0) };
    saveRecipe(r1);
    expect(getSavedRecipes()).toHaveLength(1);
    clearAllRecipes();
    expect(getSavedRecipes()).toEqual([]);
  });

  it('handles corrupted JSON gracefully', () => {
    localStorage.setItem('saved_recipes', 'not-json');
    expect(getSavedRecipes()).toEqual([]);
  });

  it('handles legacy entries without healthBenefits', () => {
    const legacy: Omit<Recipe, 'createdAt'> & { createdAt: string } = {
      id: 'legacy',
      title: 'Legacy',
      ingredients: [],
      instructions: [],
      cookingTime: '',
      difficulty: 'Easy',
      userIngredients: [],
      createdAt: new Date(0).toISOString(),
      // no healthBenefits
    } as any;
    localStorage.setItem('saved_recipes', JSON.stringify([legacy]));
    const result = getSavedRecipes();
    expect(result[0].id).toBe('legacy');
    expect('healthBenefits' in result[0]).toBe(true);
  });
});
