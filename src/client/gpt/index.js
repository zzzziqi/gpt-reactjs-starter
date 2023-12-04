import gptResponse from './api';
import { recipePrompt } from './promptEngine';
import { sanitize } from './promptHelper';

const promptMap = {
  RECIPE: recipePrompt,
};

const gptResponseBuilder = async (promptKey, promptOptions) => {
  const promptFunction = promptMap[promptKey];
  const prompt = await promptFunction(promptOptions);

  const response = await gptResponse(prompt);
  const sanitizedResponse = sanitize(response);
  const parsedResponse = JSON.parse(sanitizedResponse);
  console.log(parsedResponse, 'parsedResponse');

  return parsedResponse;
};

export default gptResponseBuilder;
