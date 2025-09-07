
'use client';

import { Recipe } from './types';

const STORAGE_KEY = 'saved_recipes';

export const saveRecipe = (recipe: Recipe): void => {
  try {
    const savedRecipes = getSavedRecipes();
    const updatedRecipes = [...savedRecipes, recipe];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
  } catch (error) {
    console.error('Failed to save recipe:', error);
  }
};

export const getSavedRecipes = (): Recipe[] => {
  try {
    const savedRecipes = localStorage.getItem(STORAGE_KEY);
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  } catch (error) {
    console.error('Failed to load saved recipes:', error);
    return [];
  }
};

export const removeRecipe = (recipeId: string): void => {
  try {
    const savedRecipes = getSavedRecipes();
    const filteredRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes));
  } catch (error) {
    console.error('Failed to remove recipe:', error);
  }
};

export const clearAllRecipes = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear recipes:', error);
  }
};
