
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  userIngredients: string[];
  createdAt: Date;
}

export interface GenerateRecipeRequest {
  ingredients: string[];
}

export interface StreamResponse {
  status: 'processing' | 'completed' | 'error';
  message?: string;
  recipes?: Recipe[];
}
