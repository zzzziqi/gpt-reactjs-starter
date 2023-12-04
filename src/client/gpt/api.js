import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const gptResponse = async (prompt) => {
  try {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'assistant', content: prompt.assistant },
        { role: 'user', content: prompt.user },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 3000,
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
