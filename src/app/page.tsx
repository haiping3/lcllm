import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111] text-gray-800 dark:text-gray-200">
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">AI 创作助手</h1>
          <p className="text-gray-600 dark:text-gray-400">使用通义模型，激发你的创作灵感</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 小说生成 */}
          <Link href="/novel" className="group">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">小说生成</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                创作引人入胜的故事情节，生成独特的小说内容
              </p>
            </div>
          </Link>

          {/* 故事生成 */}
          <Link href="/story" className="group">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">故事生成</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                生成短篇故事，适合社交媒体分享和快速创作
              </p>
            </div>
          </Link>

          {/* Others */}
          <Link href="/others" className="group">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">更多功能</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                探索更多 AI 辅助创作功能，持续更新中
              </p>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>由 LangChain.js + Tongyi 模型提供支持</p>
        </div>
      </main>
    </div>
  );
}
