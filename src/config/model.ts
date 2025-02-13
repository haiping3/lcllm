export type ModelType = 'tongyi' | 'deepseek';

export const MODEL_CONFIG = {
  type: (process.env.AI_MODEL_TYPE || 'tongyi') as ModelType,
  tongyi: {
    API_KEY: process.env.TONGYI_API_KEY || '',
    BASE_URL: 'https://dashscope.aliyuncs.com/api/v1',
    MODEL: 'qwen-turbo',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2000,
  },
  deepseek: {
    API_KEY: process.env.DEEPSEEK_API_KEY || '',
    BASE_URL: 'https://api.deepseek.com/v1',
    MODEL: 'deepseek-chat',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2000,
  },
}; 