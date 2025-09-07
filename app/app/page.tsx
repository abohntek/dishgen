
'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { RecipeForm } from '@/components/recipe-form';
import { RecipeCard } from '@/components/recipe-card';
import { Recipe } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleRecipesGenerated = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('mainTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('mainSubtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <RecipeForm
            onRecipesGenerated={handleRecipesGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </motion.div>

        <AnimatePresence>
          {recipes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('generatedRecipesTitle')}
                </h2>
                <p className="text-gray-600">
                  {recipes.length} {t('generatedRecipesSubtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
