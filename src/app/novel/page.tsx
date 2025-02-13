'use client';

import { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import BackButton from '@/components/BackButton';
import TextReader from '@/components/TextReader';

export default function NovelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNovel = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate/novel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      setGeneratedContent(data.content);
    } catch (error) {
      console.error('生成失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111] text-gray-800 dark:text-gray-200">
      <BackButton />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 
                        dark:from-blue-400 dark:to-blue-600 inline-block text-transparent bg-clip-text">
            AI 小说生成
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-[15px]">
            描述你想要的小说场景、人物或情节，AI 将为你创作独特的故事
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <PromptInput
            onSubmit={handleGenerateNovel}
            placeholder="例如：写一个发生在未来城市的科幻故事，主角是一位年轻的程序员..."
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {generatedContent && !error && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">创作结果</h2>
                <TextReader text={generatedContent} />
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl 
                            whitespace-pre-wrap text-[15px] leading-relaxed
                            border border-gray-100 dark:border-gray-700">
                {generatedContent}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 