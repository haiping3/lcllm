export const TONGYI_CONFIG = {
  API_KEY: process.env.TONGYI_API_KEY || '',
  BASE_URL: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  MODEL: 'qwen-turbo', // 或者使用 'qwen-plus' 等其他模型
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2000,
}; 