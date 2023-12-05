import gptResponse from './api';
import { ingredientsPrompt, recipePrompt } from './promptEngine';
import { sanitize } from './promptHelper';

const promptMap = {
  RECIPE: recipePrompt,
  INGREDIENTS: ingredientsPrompt,
};

const gptResponseBuilder = async (promptKey, promptOptions, responseType) => {
  const promptFunction = promptMap[promptKey];
  const prompt = await promptFunction(promptOptions);

  const { response, tokenUsage } = await gptResponse(prompt);
  const sanitizedResponse = sanitize(response, responseType);

  const parsedResponse = JSON.parse(sanitizedResponse);

  return { response: parsedResponse, tokenUsage };
};
export default gptResponseBuilder;
