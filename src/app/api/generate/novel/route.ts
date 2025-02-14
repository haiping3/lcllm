import { NextResponse } from 'next/server';
import { aiService } from '@/services/aiService';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: '请提供创作提示' },
        { status: 400 }
      );
    }

    const content = await aiService.generateNovel(prompt);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Novel generation error:', error);
    return NextResponse.json(
      { error: '生成小说时出错，请稍后重试' },
      { status: 500 }
    );
  }
} 