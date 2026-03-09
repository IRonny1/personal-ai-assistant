import { SYSTEM_PROMPT } from '../../prompts/system.prompt';
import Writer from '../../utils/cli/Writer';

import { ChatOpenAI } from '@langchain/openai';
import { createAgent, ReactAgent } from 'langchain';

class ReActAgent {
  private readonly model: ChatOpenAI = new ChatOpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
    model: process.env.OPEN_AI_LLM_MODEL
  });
  private readonly agent: ReactAgent = createAgent({
    model: this.model.model,
    systemPrompt: SYSTEM_PROMPT
  });

  async processQuery(query: string): Promise<string> {
    try {
      const writer = new Writer();

      return await writer.processQueryWithStreaming(query, this.agent);
    } catch (error) {
      const errorMessage = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;

      process.stdout.write(errorMessage + '\n');

      return errorMessage;
    }
  }
}

export default ReActAgent;
