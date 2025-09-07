
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  userIngredients: string[];
  createdAt: Date;
  // Optional brief description of the health benefits for this recipe
  healthBenefits?: string;
}

export interface GenerateRecipeRequest {
  ingredients: string[];
}

export interface StreamResponse {
  status: 'processing' | 'completed' | 'error';
  message?: string;
  recipes?: Recipe[];
}
