
import { NextRequest, NextResponse } from 'next/server';
import { Recipe } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { ingredients, language = 'en' } = await request.json();
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length !== 3) {
      return NextResponse.json(
        { error: 'Please provide exactly 3 ingredients' },
        { status: 400 }
      );
    }

    const filteredIngredients = ingredients.filter(ing => ing && ing.trim() !== '');
    if (filteredIngredients.length !== 3) {
      return NextResponse.json(
        { error: 'All 3 ingredients must be provided' },
        { status: 400 }
      );
    }

    const isGerman = language === 'de';

    const prompt = isGerman
      ? `Generiere genau 4-5 einzigartige und kreative Rezepte mit diesen 3 Hauptzutaten: ${filteredIngredients.join(', ')}.

Berücksichtige dabei folgende Kriterien:
- Rezepte sollen entzündungsarm und jodbewusst sein (Hashimoto-freundlich).
- Rezepte sollen die Fruchtbarkeit fördern (z. B. durch Zink, Selen, Omega-3, Folsäure).
- Rezepte sollen stimmungsaufhellend und stressreduzierend wirken (z. B. Tryptophan, Magnesium, B-Vitamine, adaptogene Zutaten).
- Rezepte sollen antioxidativ, darmfreundlich und zellschützend sein.
- Rezepte sollen gallefreundlich sein (leicht verdaulich, nicht zu fettreich, keine extrem scharfen oder stark blähenden Zutaten).
- Rezepte sollen mit natürlichen, leicht erhältlichen Zutaten aus dem Alltag kochbar sein.
- Keine Tomaten, da diese nicht verträglich sind.

Für jedes Rezept stelle folgendes bereit:
- Einen kreativen und appetitlichen Titel
- Eine vollständige Zutatenliste (schließe die 3 Hauptzutaten plus zusätzliche ergänzende Zutaten ein)
- Schritt-für-Schritt Kochanweisungen (detailliert und klar)
- Geschätzte Kochzeit (z.B., "30 Minuten", "1 Stunde 15 Minuten")
- Schwierigkeitsgrad (Einfach, Mittel, oder Schwer)
- Eine kurze Beschreibung der "healthBenefits" (auf Englisch, 3-6 Begriffe, komma-getrennt), die die wichtigsten Gesundheitsvorteile zusammenfasst (z. B. stressreduzierend, fruchtbarkeitsfördernd, anti-entzündlich, anti-aging, darmfreundlich)

Bitte antworte im JSON-Format mit der folgenden Struktur:
{
  "recipes": [
    {
      "title": "Rezeptname",
      "ingredients": ["Zutat 1", "Zutat 2", "..."],
      "instructions": ["Schritt 1", "Schritt 2", "..."],
      "cookingTime": "Zeitschätzung",
      "difficulty": "Einfach/Mittel/Schwer",
      "healthBenefits": "stress-reducing, fertility-supporting, anti-inflammatory"
    }
  ]
}

Stelle sicher, dass jedes Rezept einzigartig, praktisch und köstlich ist. Die Rezepte sollten vielfältig in Kochmethoden und Geschmäckern sein. Antworte nur mit reinem JSON. Füge keine Codeblöcke, Markdown oder andere Formatierung hinzu.`
      : `Generate exactly 4-5 unique and creative recipes using these 3 main ingredients: ${filteredIngredients.join(', ')}.

Consider the following criteria:
- Recipes should be anti-inflammatory and iodine-conscious (Hashimoto-friendly).
- Recipes should support fertility (e.g., through zinc, selenium, omega-3, folic acid).
- Recipes should have a mood-lifting and stress-reducing effect (e.g., tryptophan, magnesium, B vitamins, adaptogenic ingredients).
- Recipes should be antioxidant, gut-friendly, and cell-protective.
- Recipes should be gallbladder-friendly (easily digestible, not too high in fat, no extremely spicy or strongly bloating ingredients).
- Recipes should be cookable with natural, easily available everyday ingredients.
- No tomatoes, as they are not well tolerated.

For each recipe, provide:
- A creative and appetizing title
- A complete ingredients list (include the 3 main ingredients plus additional complementary ingredients)
- Step-by-step cooking instructions (be detailed and clear)
- Estimated cooking time (e.g., "30 minutes", "1 hour 15 minutes")
- Difficulty level (Easy, Medium, or Hard)
- A brief "healthBenefits" description (in English, 3-6 terms, comma-separated) summarizing key benefits such as stress-reducing, fertility-supporting, anti-inflammatory, anti-aging, gut-friendly

Please respond in JSON format with the following structure:
{
  "recipes": [
    {
      "title": "Recipe name",
      "ingredients": ["ingredient 1", "ingredient 2", "..."],
      "instructions": ["step 1", "step 2", "..."],
      "cookingTime": "time estimate",
      "difficulty": "Easy/Medium/Hard",
      "healthBenefits": "stress-reducing, fertility-supporting, anti-inflammatory"
    }
  ]
}

Make sure each recipe is unique, practical, and delicious. The recipes should be diverse in cooking methods and flavors. Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: true,
        max_tokens: 4000,
        temperature: 0.8,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate recipes from LLM');
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = '';
        let partialRead = '';

        try {
          if (!reader) {
            throw new Error('No reader available');
          }
          
          while (true) {
            const result = await reader.read();
            if (result.done) break;

            partialRead += decoder.decode(result.value, { stream: true });
            let lines = partialRead.split('\n');
            partialRead = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  try {
                    const parsedResult = JSON.parse(buffer);
                    const recipes: Recipe[] = parsedResult.recipes?.map((recipe: any, index: number) => ({
                      id: `recipe-${Date.now()}-${index}`,
                      title: recipe.title || 'Untitled Recipe',
                      ingredients: recipe.ingredients || [],
                      instructions: recipe.instructions || [],
                      cookingTime: recipe.cookingTime || 'Time varies',
                      difficulty: recipe.difficulty || 'Easy',
                      healthBenefits: (
                        recipe.healthBenefits ||
                        recipe.health_benefits ||
                        recipe['health-benefits'] ||
                        recipe.benefits ||
                        recipe.gesundheitsvorteile ||
                        undefined
                      ),
                      userIngredients: filteredIngredients,
                      createdAt: new Date()
                    })) || [];

                    const finalData = JSON.stringify({
                      status: 'completed',
                      recipes: recipes
                    });
                    controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                  } catch (error) {
                    console.error('Failed to parse final JSON:', error);
                    const errorData = JSON.stringify({
                      status: 'error',
                      message: 'Failed to process generated recipes'
                    });
                    controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                  }
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  buffer += parsed.choices?.[0]?.delta?.content || '';
                  
                  const progressData = JSON.stringify({
                    status: 'processing',
                    message: 'Generating recipes...'
                  });
                  controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({
            status: 'error',
            message: 'Failed to generate recipes'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in recipe generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    );
  }
}
