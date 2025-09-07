
export const translations = {
  en: {
    // Navigation
    appTitle: 'Recipe Generator',
    generate: 'Generate',
    savedRecipes: 'Saved Recipes',
    
    // Main page
    mainTitle: 'Create Amazing Recipes',
    mainSubtitle: 'Transform your favorite ingredients into delicious recipes with our AI-powered recipe generator',
    
    // Recipe form
    generateRecipesTitle: 'Generate Your Recipes',
    generateRecipesDescription: 'Enter exactly 3 ingredients and we\'ll create amazing recipes for you',
    ingredient: 'Ingredient',
    enterIngredient: 'Enter ingredient',
    generateRecipesButton: 'Generate Recipes',
    generatingRecipes: 'Generating Recipes...',
    generateRecipesProgress: 'Generating delicious recipes...',
    
    // Recipe results
    generatedRecipesTitle: 'Your Generated Recipes',
    generatedRecipesSubtitle: 'delicious recipes created just for you',
    
    // Recipe card
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    copy: 'Copy',
    save: 'Save',
    saved: 'Saved',
    difficulty: 'Difficulty',
    cookingTime: 'Cooking Time',
    timeVaries: 'Time varies',
    untitledRecipe: 'Untitled Recipe',
    noIngredients: 'No ingredients listed',
    noInstructions: 'No instructions provided',
    
    // Difficulty levels
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Toast messages
    recipeCopied: 'Recipe copied to clipboard!',
    recipeSaved: 'Recipe saved successfully!',
    recipesGenerated: 'Recipes generated successfully!',
    exactlyThreeIngredients: 'Please enter exactly 3 ingredients',
    failedToGenerate: 'Failed to generate recipes. Please try again.',
    failedToCopy: 'Failed to copy recipe',
    failedToSave: 'Failed to save recipe',
    
    // Saved recipes page
    savedRecipesTitle: 'Your Saved Recipes',
    noSavedRecipes: 'No saved recipes yet',
    noSavedRecipesDescription: 'Start generating and saving recipes to see them here.',
    exportToDOC: 'Export to DOC',
    recipesExported: 'Recipes exported successfully!',
    failedToExport: 'Failed to export recipes',
    
    // Metadata
    metaTitle: 'Recipe Generator - Create Delicious Recipes',
    metaDescription: 'Generate unique recipes using your favorite ingredients with AI assistance'
  },
  de: {
    // Navigation
    appTitle: 'Rezept Generator',
    generate: 'Generieren',
    savedRecipes: 'Gespeicherte Rezepte',
    
    // Main page
    mainTitle: 'Erstelle Fantastische Rezepte',
    mainSubtitle: 'Verwandle deine Lieblingszutaten in köstliche Rezepte mit unserem KI-gestützten Rezeptgenerator',
    
    // Recipe form
    generateRecipesTitle: 'Generiere Deine Rezepte',
    generateRecipesDescription: 'Gib genau 3 Zutaten ein und wir erstellen fantastische Rezepte für dich',
    ingredient: 'Zutat',
    enterIngredient: 'Zutat eingeben',
    generateRecipesButton: 'Rezepte Generieren',
    generatingRecipes: 'Generiere Rezepte...',
    generateRecipesProgress: 'Generiere köstliche Rezepte...',
    
    // Recipe results
    generatedRecipesTitle: 'Deine Generierten Rezepte',
    generatedRecipesSubtitle: 'köstliche Rezepte, die nur für dich erstellt wurden',
    
    // Recipe card
    ingredients: 'Zutaten',
    instructions: 'Anweisungen',
    copy: 'Kopieren',
    save: 'Speichern',
    saved: 'Gespeichert',
    difficulty: 'Schwierigkeit',
    cookingTime: 'Kochzeit',
    timeVaries: 'Zeit variiert',
    untitledRecipe: 'Unbenanntes Rezept',
    noIngredients: 'Keine Zutaten aufgelistet',
    noInstructions: 'Keine Anweisungen bereitgestellt',
    
    // Difficulty levels
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer',
    
    // Toast messages
    recipeCopied: 'Rezept in die Zwischenablage kopiert!',
    recipeSaved: 'Rezept erfolgreich gespeichert!',
    recipesGenerated: 'Rezepte erfolgreich generiert!',
    exactlyThreeIngredients: 'Bitte gib genau 3 Zutaten ein',
    failedToGenerate: 'Rezepte konnten nicht generiert werden. Bitte versuche es erneut.',
    failedToCopy: 'Rezept konnte nicht kopiert werden',
    failedToSave: 'Rezept konnte nicht gespeichert werden',
    
    // Saved recipes page
    savedRecipesTitle: 'Deine Gespeicherten Rezepte',
    noSavedRecipes: 'Noch keine gespeicherten Rezepte',
    noSavedRecipesDescription: 'Beginne Rezepte zu generieren und zu speichern, um sie hier zu sehen.',
    exportToDOC: 'Als DOC exportieren',
    recipesExported: 'Rezepte erfolgreich exportiert!',
    failedToExport: 'Rezepte konnten nicht exportiert werden',
    
    // Metadata
    metaTitle: 'Rezept Generator - Erstelle Köstliche Rezepte',
    metaDescription: 'Generiere einzigartige Rezepte mit deinen Lieblingszutaten mithilfe von KI'
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
