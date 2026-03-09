import { tool } from '@langchain/core/tools';
import * as fs from 'node:fs';
import { z } from 'zod';

const CreateFileSchema = z.object({
  fileName: z.string().describe('The name of the file to create, including extension'),
  content: z.string().describe('The content to write into the file')
});

async function createFileHandler({ fileName, content }: { fileName: string; content: string }) {
  fs.writeFileSync(fileName, content, { flag: 'wx' });

  return '[create_file_tool] File successfully created\n';
}

export const createFileTool = tool(createFileHandler, {
  name: 'create_file',
  description: 'Creates a file with the specified name and content.',
  schema: CreateFileSchema as any
});
