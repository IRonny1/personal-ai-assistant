import { SYSTEM_PROMPT } from '../../prompts/system.prompt';
import { createFileTool } from '../../tools/fs/files/createFile.tool';
import { deleteFileTool } from '../../tools/fs/files/deleteFile.tool';
import { readFileTool } from '../../tools/fs/files/readFile.tool';
import { updateFileTool } from '../../tools/fs/files/updateFile.tool';
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
    systemPrompt: SYSTEM_PROMPT,
    tools: [createFileTool, readFileTool, updateFileTool, deleteFileTool]
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
