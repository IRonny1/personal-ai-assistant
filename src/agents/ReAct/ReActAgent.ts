import { StreamWriter } from '../../utils/cli/StreamWriter';

import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { createAgent } from 'langchain';

class ReActAgent {
  private readonly parser: StringOutputParser;
  private llm: ChatOllama;
  private prompt: PromptTemplate;
  private agents: Map<string, any>;

  constructor(modelName: string = 'llama3') {
    this.llm = new ChatOllama({
      model: modelName,
      temperature: 0.7
    });

    this.prompt = PromptTemplate.fromTemplate('test prompt');
    this.parser = new StringOutputParser();
    this.agents = new Map<string, any>();
  }

  private getAgent(threadId: string) {
    if (this.agents.has(threadId)) {
      return this.agents.get(threadId)!;
    }

    const agent = createAgent({
      model: this.llm.model
    });

    this.agents.set(threadId, agent);

    return agent;
  }

  private async processQueryWithStreaming(query: string): Promise<string> {
    const writer = new StreamWriter();

    const chain = this.prompt.pipe(this.llm).pipe(this.parser);
    const stream = await chain.stream({ query });

    for await (const chunk of stream) {
      writer.write(chunk);
    }

    writer.finalize();

    return writer.getBuffer();
  }

  async processQuery(query: string): Promise<string> {
    try {
      return await this.processQueryWithStreaming(query);
    } catch (error) {
      const errorMessage = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;

      process.stdout.write(errorMessage + '\n');

      return errorMessage;
    }
  }
}

export default ReActAgent;
