import { logger } from '../logging/Logger';

export function writeWelcomeMessage() {
  logger.info(`I'm Jarvis, your personal AI assistant!`);
  logger.info('='.repeat(60));
  logger.info("Type 'exit' or 'quit' to stop");
  logger.info('='.repeat(60));
}

class Writer {
  welcomeMessage() {
    writeWelcomeMessage();
  }
}

export default Writer;
