const recipePrompt = (dish) => {
  return [
    {
      role: 'assistant',
      content: `You are one of the best chefs in the world. Your job is to give a recipe for the ingredients: ${dish.ingredients} and the type of cook: ${dish.foodType} in the JSON format {"name": "<name of the recipe>","ingredients": ["<ingredient for recipe>"],"steps": ["<step for preparation with number>"]}`,
    },
    {
      role: 'user',
      content: `Give me a recipe`,
    },
  ];
};
const ingredientsPrompt = (ingredients) => {
  return [
    {
      role: 'assistant',
      content: `You are one of the best chefs in the world. Your job is to give me some suggestions about the types of dishes I can cook in the JSON format '[{"type": "<type of the food>","ingredients": ["<additional ingredient for the type>"]}]'`,
    },
    {
      role: 'user',
      content: `The ingredients are carrot; pepper; corn; pork; onion;`,
    },
    {
      role: 'assistant',
      content:
        '[{"type": "Stir-Fried","ingredients": ["carrot","pepper","pork"]},{"type": "Soup","ingredients": ["corn","pork"]}]',
    },
    {
      role: 'user',
      content: `The ingredients are ${ingredients}`,
    },
  ];
};

// export { recipePrompt };
export { recipePrompt, ingredientsPrompt };
