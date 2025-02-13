import { TONGYI_CONFIG } from '@/config/tongyi';

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

export class TongyiService {
  private static async makeRequest(prompt: string) {
    try {
      const response = await fetch(TONGYI_CONFIG.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TONGYI_CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          model: TONGYI_CONFIG.MODEL,
          input: {
            messages: [
              {
                role: 'system',
                content: '你是一个专业的创意写手，善于创作引人入胜的故事。',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data: TongyiResponse = await response.json();
      return data.output.text;
    } catch (error) {
      console.error('Tongyi API Error:', error);
      throw new Error('生成内容时出错，请稍后重试');
    }
  }

  static async generateNovel(prompt: string): Promise<string> {
    const enhancedPrompt = `请根据以下提示创作一个短篇小说，要求情节完整，描写生动：\n${prompt}`;
    return this.makeRequest(enhancedPrompt);
  }

  static async generateStory(prompt: string): Promise<string> {
    const enhancedPrompt = `请根据以下提示创作一个简短的故事，要求主题鲜明，适合社交媒体分享：\n${prompt}`;
    return this.makeRequest(enhancedPrompt);
  }
} 