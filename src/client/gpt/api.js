import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const gptResponse = async (prompt) => {
  try {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...prompt],
      model: 'gpt-3.5-turbo-16k',
      max_tokens: 6000,
    });

    return {
      response: completion.data.choices[0].message.content,
      tokenUsage: completion.data.usage,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export default gptResponse;
