import { TONGYI_CONFIG } from "@/config/tongyi";

export class GenerateService {

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
            { role: 'system', content: TONGYI_CONFIG.SYSTEM_PROMPT }, 
            { role: "user", content: "请根据以下背景信息和上下文，为小说的第5章生成详细内容。确保情节连贯，并适当发展之前埋下的伏笔。\n\n# 上下文\n{\"characters\": [{\"name\": \"李华\", \"description\": \"年轻的医生，非常关心病人，总是尽力帮助他人\"}, {\"name\": \"张明\", \"description\": \"李华的同事，性格有些急躁\"}], \"plot_line\": {\"title\": \"医院中的紧急情况\", \"description\": \"故事围绕一家繁忙的城市医院展开，主角们面临各种紧急情况和挑战。\", \"related_chapters\": [1, 2, 3, 4, 5]}, \"event\": {\"title\": \"医院突然停电\", \"description\": \"在一次关键手术过程中，医院突然停电，导致手术中断，情况十分危急。\", \"impact_on_plot\": \"这一事件不仅影响了当前手术的成功率，还加剧了李华和张明之间的紧张关系。\", \"related_chapters\": [5]}, \"foreshadowings\": [{\"description\": \"李华和张明之间的矛盾将在后续章节中进一步发展，特别是在面对危机时的表现。\"}]}" }
        ],
        },
      }),
    });
  } catch (error) {
    
  }
 }
  
}

