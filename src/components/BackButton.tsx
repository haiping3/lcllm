'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                hover:text-gray-900 dark:hover:text-gray-200 transition-colors
                absolute top-6 left-6"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      <span className="text-[15px]">返回</span>
    </button>
  );
} 