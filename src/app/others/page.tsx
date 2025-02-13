import BackButton from '@/components/BackButton';

export default function OthersPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111] text-gray-800 dark:text-gray-200">
      <BackButton />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-teal-600 
                        dark:from-green-400 dark:to-teal-400 inline-block text-transparent bg-clip-text">
            更多功能
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-[15px]">
            我们正在开发更多 AI 创作功能
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 
                      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] 
                      text-center">
          <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
            <span className="text-6xl">✨</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 
                       dark:from-purple-400 dark:to-pink-400 inline-block text-transparent bg-clip-text">
            即将推出
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-[15px] leading-relaxed">
            我们正在开发更多激动人心的 AI 创作功能，包括：
            <br /><br />
            🎭 剧本创作<br />
            📝 文案优化<br />
            🎨 诗歌生成<br />
            <br />
            敬请期待！
          </p>
        </div>
      </main>
    </div>
  );
} 