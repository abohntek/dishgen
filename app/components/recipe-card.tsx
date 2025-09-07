
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Clock, ChefHat, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { saveRecipe } from '@/lib/storage';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

interface RecipeCardProps {
  recipe: Recipe;
  showSaveButton?: boolean;
  isSaved?: boolean;
}

export function RecipeCard({ recipe, showSaveButton = true, isSaved = false }: RecipeCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const { t } = useLanguage();

  const handleCopy = async () => {
    try {
      const recipeText = `${recipe.title}

${t('difficulty')}: ${recipe.difficulty}
${t('cookingTime')}: ${recipe.cookingTime}

${t('ingredients')}:
${recipe.ingredients?.map(ing => `• ${ing}`).join('\n') || ''}

${t('instructions')}:
${recipe.instructions?.map((inst, i) => `${i + 1}. ${inst}`).join('\n') || ''}`;

      await navigator.clipboard.writeText(recipeText);
      toast.success(t('recipeCopied'));
    } catch (error) {
      console.error('Failed to copy recipe:', error);
      toast.error(t('failedToCopy'));
    }
  };

  const handleSave = () => {
    try {
      if (!saved) {
        const recipeToSave = {
          ...recipe,
          id: recipe.id || `recipe-${Date.now()}-${Math.random()}`,
          createdAt: recipe.createdAt || new Date()
        };
        saveRecipe(recipeToSave);
        setSaved(true);
        toast.success(t('recipeSaved'));
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      toast.error(t('failedToSave'));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const normalizedDifficulty = difficulty?.toLowerCase();
    if (normalizedDifficulty === 'easy' || normalizedDifficulty === 'einfach') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (normalizedDifficulty === 'medium' || normalizedDifficulty === 'mittel') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (normalizedDifficulty === 'hard' || normalizedDifficulty === 'schwer') {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 bg-white border-orange-100">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
            {recipe.title || t('untitledRecipe')}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={cn("text-xs font-medium", getDifficultyColor(recipe.difficulty || t('easy')))}>
              {recipe.difficulty || t('easy')}
            </Badge>
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 text-gray-600">
          <Clock className="h-4 w-4" />
          {recipe.cookingTime || t('timeVaries')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            {t('ingredients')}
          </h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {recipe.ingredients?.length ? recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>{ingredient}</span>
              </li>
            )) : (
              <li className="text-gray-500 italic">{t('noIngredients')}</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{t('instructions')}</h4>
          <ol className="space-y-2 text-sm text-gray-700">
            {recipe.instructions?.length ? recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="flex-1">{instruction}</span>
              </li>
            )) : (
              <li className="text-gray-500 italic">{t('noInstructions')}</li>
            )}
          </ol>
        </div>

        <div className="flex gap-2 pt-4 border-t border-orange-100">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Copy className="h-4 w-4 mr-2" />
            {t('copy')}
          </Button>
          
          {showSaveButton && (
            <Button
              onClick={handleSave}
              variant={saved ? "secondary" : "default"}
              size="sm"
              disabled={saved}
              className={cn(
                "flex-1",
                saved 
                  ? "bg-green-100 text-green-800 hover:bg-green-100" 
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              )}
            >
              {saved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                  {t('saved')}
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  {t('save')}
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
