const recipePrompt = (dish) => {
  return {
    assistant: `You are one of the best chefs in the world. Your job is to give a recipe for the ${dish} in the JSON format
  {"name": "<name of the recipe>","ingredients": ["<ingredient for recipe>"],"steps": ["<step for preparation with number>"]}`,
    user: `Give me a recipe for ${dish}`,
  };
};

// export { recipePrompt };
export { recipePrompt };
