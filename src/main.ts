import Reader from './utils/cli/Reader';
import Writer from './utils/cli/Writer';
import { logger } from './utils/logging/Logger';

import * as dotenv from 'dotenv';

dotenv.config();

const writer = new Writer();
const reader = new Reader();

async function main() {
  writer.welcomeMessage();

  while (true) {
    try {
      const userInput = await reader.askQuestion('\nYou: ');

      if (!userInput) {
        continue;
      }

      if (['/exit', '/quit'].includes(userInput.toLowerCase())) {
        logger.info('Goodbye! 👋');
        break;
      }
    } catch (e) {
      if (e instanceof Error) {
        logger.error('Error occurred: ', e);
      }
    }
  }
}

main().catch((err) => {
  logger.error(err);

  process.exit(1);
});
