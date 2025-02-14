import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { MODEL_CONFIG } from "@/config/model";

class LangChainService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: MODEL_CONFIG.MODEL,
      openAIApiKey: MODEL_CONFIG.API_KEY,
      temperature: MODEL_CONFIG.TEMPERATURE,
      maxTokens: MODEL_CONFIG.MAX_TOKENS,
      configuration: {
        baseURL: MODEL_CONFIG.BASE_URL,
      },
    });
  }

  private getSystemPrompt(type: 'novel' | 'story'): string {
    const prompts = {
      novel: `作为一位专业的小说创作者，你需要根据用户提供的提示创作一个短篇小说。
创作要求：
1. 故事结构完整，包含清晰的开端、发展、高潮和结局
2. 通过细腻的描写展现场景和情感
3. 塑造有特点的人物形象
4. 主题鲜明，寓意深刻`,
      story: `作为一位专业的故事创作者，你需要创作一个简短而引人入胜的故事。
创作要求：
1. 篇幅简短，易于分享
2. 故事主题突出，具有启发性
3. 情节紧凑有趣
4. 结尾令人印象深刻`,
    };

    return prompts[type];
  }

  async generateNovel(prompt: string): Promise<string> {
    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getSystemPrompt('novel')),
        new HumanMessage(prompt),
      ]);

      return response.content as string;
    } catch (error) {
      console.error("Novel generation error:", error);
      throw new Error("生成小说时出错，请稍后重试");
    }
  }

  async generateStory(prompt: string): Promise<string> {
    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getSystemPrompt('story')),
        new HumanMessage(prompt),
      ]);

      return response.content as string;
    } catch (error) {
      console.error("Story generation error:", error);
      throw new Error("生成故事时出错，请稍后重试");
    }
  }
}

// 创建单例实例
export const langchainService = new LangChainService(); 