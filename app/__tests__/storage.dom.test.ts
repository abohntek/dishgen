import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { saveRecipe, getSavedRecipes, removeRecipe, clearAllRecipes } from '@/lib/storage'
import { type Recipe } from '@/lib/types'

// Mark this file to run in jsdom so localStorage is available
// @vitest-environment jsdom

describe('storage (localStorage)', () => {
  const key = 'saved_recipes'

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const makeRecipe = (id: string): Recipe => ({
    id,
    title: `Recipe ${id}`,
    ingredients: ['a', 'b'],
    instructions: ['step1'],
    cookingTime: '10m',
    difficulty: 'Easy',
    userIngredients: ['a', 'b', 'c'],
    createdAt: new Date(),
  })

  it('saves and fetches recipes', () => {
    const r1 = makeRecipe('1')
    const r2 = makeRecipe('2')

    saveRecipe(r1)
    saveRecipe(r2)

    const saved = getSavedRecipes()
    expect(saved.length).toBe(2)
    expect(saved[0].id).toBe('1')
    expect(saved[1].id).toBe('2')
  })

  it('removes a recipe by id', () => {
    const r1 = makeRecipe('1')
    const r2 = makeRecipe('2')
    saveRecipe(r1)
    saveRecipe(r2)
    removeRecipe('1')

    const saved = getSavedRecipes()
    expect(saved.length).toBe(1)
    expect(saved[0].id).toBe('2')
  })

  it('clears all recipes', () => {
    saveRecipe(makeRecipe('1'))
    saveRecipe(makeRecipe('2'))
    clearAllRecipes()
    expect(getSavedRecipes()).toEqual([])
    expect(localStorage.getItem(key)).toBeNull()
  })
})
