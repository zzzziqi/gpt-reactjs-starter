import { create } from 'zustand';

const initialTokenUsage = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };

const useTokenUsage = create((set) => {
  return {
    tokenUsage: initialTokenUsage,
    updateTokenUsage: (tokenUsage) => {
      set({ tokenUsage });
    },
    resetTokenUsage: () => set(initialTokenUsage),
  };
});

export default useTokenUsage;
