import { SYSTEM_PROMPT } from '../../prompts/system.prompt';
import Writer from '../../utils/cli/Writer';

import { ChatOpenAI } from '@langchain/openai';
import { createAgent } from 'langchain';

class ReActAgent {
  private readonly model: ChatOpenAI = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_LLM_MODEL
  });
  private readonly agent: any = createAgent({
    model: this.model.model,
    systemPrompt: SYSTEM_PROMPT
  });

  async processQuery(query: string): Promise<void> {
    try {
      const writer = new Writer();

      await writer.processQueryWithStreaming(query, this.agent);
    } catch (error) {
      const errorMessage = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;

      process.stdout.write(errorMessage + '\n');
    }
  }
}

export default ReActAgent;
