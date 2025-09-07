
'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { RecipeCard } from '@/components/recipe-card';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/lib/types';
import { getSavedRecipes, clearAllRecipes } from '@/lib/storage';
import { exportRecipesToDoc } from '@/lib/doc-export';
import { motion } from 'framer-motion';
import { Download, Trash2, BookOpen, ChefHat } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language-context';

export default function SavedRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const loadRecipes = () => {
      try {
        const savedRecipes = getSavedRecipes();
        setRecipes(savedRecipes);
      } catch (error) {
        console.error('Failed to load recipes:', error);
        toast.error('Failed to load saved recipes');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const handleExport = () => {
    if (recipes.length === 0) {
      toast.error('No recipes to export');
      return;
    }
    try {
      exportRecipesToDoc(recipes);
      toast.success(t('recipesExported'));
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(t('failedToExport'));
    }
  };

  const handleClearAll = () => {
    if (recipes.length === 0) {
      toast.error('No recipes to clear');
      return;
    }
    
    const confirmMessage = language === 'de' 
      ? 'Sind Sie sicher, dass Sie alle gespeicherten Rezepte löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
      : 'Are you sure you want to delete all saved recipes? This action cannot be undone.';
    
    if (window.confirm(confirmMessage)) {
      clearAllRecipes();
      setRecipes([]);
      toast.success('All recipes cleared');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3"
          >
            <BookOpen className="h-10 w-10 text-orange-500" />
            {t('savedRecipesTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Your personal collection of delicious recipes
          </motion.p>
        </div>

        {recipes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={handleExport}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {t('exportToDOC')}
              </Button>
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecipeCard recipe={recipe} showSaveButton={false} isSaved={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('noSavedRecipes')}
            </h3>
            <p className="text-gray-500 mb-6">
              {t('noSavedRecipesDescription')}
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              {t('generateRecipesButton')}
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
