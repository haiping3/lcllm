import { MODEL_CONFIG } from '@/config/model';

interface TongyiResponse {
  output: {
    text: string;
  };
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

interface APIError extends Error {
  status?: number;
}

class AIService {
  private async makeRequest(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(`${MODEL_CONFIG.BASE_URL}/services/aigc/text-generation/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MODEL_CONFIG.API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_CONFIG.MODEL,
        input: {
          messages,
        },
        parameters: {
          temperature: MODEL_CONFIG.TEMPERATURE,
          max_tokens: MODEL_CONFIG.MAX_TOKENS,
        },
      }),
    });

    if (!response.ok) {
      const error: APIError = new Error('API request failed');
      error.status = response.status;
      throw error;
    }

    const data: TongyiResponse = await response.json();
    return data.output.text;
  }

  private getSystemPrompt(type: 'novel' | 'story'): string {
    const prompts = {
      novel: `你是一个专业的小说创作者，擅长创作引人入胜、结构完整的短篇小说。
请根据用户的提示创作一个短篇小说，要求：
1. 情节完整，有起承转合
2. 描写生动，细节丰富
3. 人物形象鲜明
4. 故事主题明确`,
      story: `你是一个专业的故事创作者，擅长创作简短而有趣的故事。
请根据用户的提示创作一个短篇故事，要求：
1. 故事简洁，适合社交媒体分享
2. 主题鲜明，富有启发性
3. 情节紧凑，引人入胜
4. 结尾有亮点或意外`,
    };

    return prompts[type];
  }

  private handleError(error: APIError): never {
    console.error("AI Service Error:", error);
    
    if (error?.status === 402) {
      throw new Error("API 调用次数已用完，请联系管理员");
    }

    if (error?.status === 401) {
      throw new Error("API 密钥无效，请检查配置");
    }

    if (error?.status === 429) {
      throw new Error("请求过于频繁，请稍后再试");
    }

    throw new Error("生成内容时出错，请稍后重试");
  }

  async generateNovel(prompt: string): Promise<string> {
    try {
      return await this.makeRequest([
        { role: 'system', content: this.getSystemPrompt('novel') },
        { role: 'user', content: prompt }
      ]);
    } catch (error) {
      throw this.handleError(error as APIError);
    }
  }

  async generateStory(prompt: string): Promise<string> {
    try {
      return await this.makeRequest([
        { role: 'system', content: this.getSystemPrompt('story') },
        { role: 'user', content: prompt }
      ]);
    } catch (error) {
      throw this.handleError(error as APIError);
    }
  }
}

// 创建单例实例
export const aiService = new AIService(); 