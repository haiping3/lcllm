import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { MODEL_CONFIG, ModelType } from "@/config/model";

class LangChainService {
  private model: ChatOpenAI;

  constructor() {
    const config = MODEL_CONFIG[MODEL_CONFIG.type];
    
    this.model = new ChatOpenAI({
      modelName: config.MODEL,
      openAIApiKey: config.API_KEY,
      temperature: config.TEMPERATURE,
      maxTokens: config.MAX_TOKENS,
      configuration: {
        baseURL: config.BASE_URL,
        defaultHeaders: {
          "Authorization": `Bearer ${config.API_KEY}`,
        },
      },
    });
  }

  private getSystemPrompt(type: 'novel' | 'story'): string {
    const modelType = MODEL_CONFIG.type;
    const prompts = {
      novel: {
        tongyi: `你是一个专业的小说创作者，擅长创作引人入胜、结构完整的短篇小说。
请根据用户的提示创作一个短篇小说，要求：
1. 情节完整，有起承转合
2. 描写生动，细节丰富
3. 人物形象鲜明
4. 故事主题明确`,
        deepseek: `作为一位专业的小说创作者，你需要根据用户提供的提示创作一个短篇小说。
创作要求：
1. 故事结构完整，包含清晰的开端、发展、高潮和结局
2. 通过细腻的描写展现场景和情感
3. 塑造有特点的人物形象
4. 主题鲜明，寓意深刻`,
      },
      story: {
        tongyi: `你是一个专业的故事创作者，擅长创作简短而有趣的故事。
请根据用户的提示创作一个短篇故事，要求：
1. 故事简洁，适合社交媒体分享
2. 主题鲜明，富有启发性
3. 情节紧凑，引人入胜
4. 结尾有亮点或意外`,
        deepseek: `作为一位专业的故事创作者，你需要创作一个简短而引人入胜的故事。
创作要求：
1. 篇幅简短，易于分享
2. 故事主题突出，具有启发性
3. 情节紧凑有趣
4. 结尾令人印象深刻`,
      },
    };

    return prompts[type][modelType];
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