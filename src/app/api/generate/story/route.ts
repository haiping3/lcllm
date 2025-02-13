import { NextResponse } from 'next/server';
import { langchainService } from '@/services/langchainService';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: '请提供创作提示' },
        { status: 400 }
      );
    }

    const content = await langchainService.generateStory(prompt);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Story generation error:', error);
    return NextResponse.json(
      { error: '生成故事时出错，请稍后重试' },
      { status: 500 }
    );
  }
} 