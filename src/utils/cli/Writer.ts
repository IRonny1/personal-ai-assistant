import ReActAgent from '../../agents/ReAct/ReActAgent';
import { logger } from '../logging/Logger';

class Writer {
  welcomeMessage() {
    writeWelcomeMessage();
  }

  async processQueryWithStreaming(query: string, agent: ReActAgent['agent']): Promise<void> {
    for await (const [token] of await agent.stream(
      { messages: [{ role: 'user', content: query }] },
      { streamMode: 'messages' }
    )) {
      if (!token.contentBlocks) continue;
      const reasoning = token.contentBlocks.filter((b) => b.type === 'reasoning');
      const text = token.contentBlocks.filter((b) => b.type === 'text');

      if (reasoning.length) {
        logger.info(`[thinking] ${reasoning[0].reasoning}`);
      }

      if (text.length) {
        logger.info(text[0].text);
      }
    }
  }
}

function writeWelcomeMessage() {
  logger.info(`I'm Jarvis, your personal AI assistant!`);
  logger.info('='.repeat(60));
  logger.info("Type '/exit' or '/quit' to stop");
  logger.info('='.repeat(60));
}

export default Writer;
