'use client';

import { useState, useEffect } from 'react';

interface TextReaderProps {
  text: string;
}

export default function TextReader({ text }: TextReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = 'zh-CN';
    newUtterance.onend = () => setIsPlaying(false);
    setUtterance(newUtterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  const togglePlay = () => {
    if (!utterance) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                dark:hover:bg-gray-600 transition-colors text-[14px]"
    >
      {isPlaying ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
          暂停朗读
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
          开始朗读
        </>
      )}
    </button>
  );
} 