
'use client';

import { Recipe } from './types';

export const exportRecipesToDoc = (recipes: Recipe[]): void => {
  try {
    if (!recipes || recipes.length === 0) {
      alert('No recipes to export');
      return;
    }

    let docContent = `My Recipe Collection\n\nGenerated on ${new Date().toLocaleDateString()}\n\n`;
    
    recipes.forEach((recipe, index) => {
      docContent += `${index + 1}. ${recipe.title}\n`;
      docContent += `Difficulty: ${recipe.difficulty}\n`;
      docContent += `Cooking Time: ${recipe.cookingTime}\n`;
      if (recipe.healthBenefits) {
        docContent += `Health Benefits: ${recipe.healthBenefits}\n`;
      }
      docContent += `\n`;

      docContent += `Ingredients:\n`;
      recipe.ingredients?.forEach(ingredient => {
        docContent += `• ${ingredient}\n`;
      });
      docContent += '\n';

      docContent += `Instructions:\n`;
      recipe.instructions?.forEach((instruction, i) => {
        docContent += `${i + 1}. ${instruction}\n`;
      });
      docContent += '\n';
      docContent += '---\n\n';
    });

    // Create a Blob with the content
    const blob = new Blob([docContent], { 
      type: 'application/msword'
    });

    // Create download link
    const url = (typeof URL !== 'undefined' && 'createObjectURL' in URL) ? URL.createObjectURL(blob) : '';
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-recipes-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (url && 'revokeObjectURL' in URL) {
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Failed to export recipes:', error);
    alert('Failed to export recipes. Please try again.');
  }
};
