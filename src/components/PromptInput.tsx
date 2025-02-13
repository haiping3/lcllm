import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function PromptInput({ onSubmit, placeholder, isLoading = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/50
                   focus:border-blue-500 transition-all duration-200 resize-none
                   text-[15px] leading-relaxed"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                   rounded-full hover:from-blue-600 hover:to-blue-700
                   disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed 
                   transition-all duration-200 font-medium text-[15px]
                   flex items-center justify-center shadow-sm"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              生成中...
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </span>
          ) : (
            '开始创作'
          )}
        </button>
      </div>
    </form>
  );
} 