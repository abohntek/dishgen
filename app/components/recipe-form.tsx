
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language-context';

interface RecipeFormProps {
  onRecipesGenerated: (recipes: any[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function RecipeForm({ onRecipesGenerated, isLoading, setIsLoading }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [progress, setProgress] = useState(0);
  const { t, language } = useLanguage();

  const handleInputChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filledIngredients = ingredients.filter(ing => ing.trim() !== '');
    if (filledIngredients.length !== 3) {
      toast.error(t('exactlyThreeIngredients'));
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: filledIngredients,
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipes');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let partialRead = '';

      if (!reader) {
        throw new Error('No response stream available');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partialRead += decoder.decode(value, { stream: true });
        let lines = partialRead.split('\n');
        partialRead = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.status === 'processing') {
                setProgress(prev => Math.min(prev + 10, 90));
              } else if (parsed.status === 'completed') {
                setProgress(100);
                onRecipesGenerated(parsed.recipes || []);
                toast.success(t('recipesGenerated'));
                return;
              } else if (parsed.status === 'error') {
                throw new Error(parsed.message || 'Generation failed');
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating recipes:', error);
      toast.error(t('failedToGenerate'));
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <ChefHat className="h-6 w-6 text-orange-500" />
          {t('generateRecipesTitle')}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t('generateRecipesDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`ingredient-${index}`} className="text-sm font-medium text-gray-700">
                  {t('ingredient')} {index + 1}
                </Label>
                <Input
                  id={`ingredient-${index}`}
                  value={ingredient}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`${t('enterIngredient')} ${index + 1}...`}
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="space-y-2">
              <div className="w-full bg-orange-100 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                {t('generateRecipesProgress')} {progress}%
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('generatingRecipes')}
              </>
            ) : (
              <>
                <ChefHat className="h-4 w-4 mr-2" />
                {t('generateRecipesButton')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
