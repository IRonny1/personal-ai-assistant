import ReActAgent from '../../agents/ReAct/ReActAgent';
import { logger } from '../logging/Logger';

class Writer {
  welcomeMessage() {
    writeWelcomeMessage();
  }

  async processQueryWithStreaming(query: string, agent: ReActAgent['agent']): Promise<void> {
    let lastWasReasoning = false;

    for await (const [token] of await agent.stream(
      { messages: [{ role: 'user', content: query }] },
      { streamMode: 'messages' }
    )) {
      if (!token.contentBlocks) continue;

      const reasoningBlocks = token.contentBlocks.filter((b: any) => b.type === 'reasoning');
      const textBlocks = token.contentBlocks.filter((b: any) => b.type === 'text');

      if (reasoningBlocks.length) {
        if (!lastWasReasoning) {
          process.stdout.write('\n\x1b[2m[thinking]: ');
          lastWasReasoning = true;
        }
        process.stdout.write(reasoningBlocks[0].reasoning);
      }

      if (textBlocks.length) {
        if (lastWasReasoning) {
          process.stdout.write('\x1b[0m\n\n');
          lastWasReasoning = false;
        }
        process.stdout.write(textBlocks[0].text);
      }
    }

    process.stdout.write('\n');
  }
}

function writeWelcomeMessage() {
  logger.info(`I'm Jarvis, your personal AI assistant!`);
  logger.info('='.repeat(60));
  logger.info("Type '/exit' or '/quit' to stop");
  logger.info('='.repeat(60));
}

export default Writer;
