import { tool } from '@langchain/core/tools';
import * as fs from 'fs';
import { z } from 'zod';

const ReadFileSchema = z.object({
  fileName: z.string().describe('The name of the file to read, including extension (e.g., "notes.txt")')
});

export const readFileTool = tool(
  async ({ fileName }: z.infer<typeof ReadFileSchema>) => {
    try {
      if (!fs.existsSync(fileName)) {
        return `[read_file_tool] Error: File '${fileName}' not found. Check the filename and try again.`;
      }

      const content = fs.readFileSync(fileName, 'utf-8');

      if (content.length === 0) {
        return `[read_file_tool] File '${fileName}' is empty.`;
      }

      return `[read_file_tool] Content of ${fileName}:\n\n${content}`;
    } catch (error: any) {
      return `[read_file_tool] Error reading file: ${error.message}`;
    }
  },
  {
    name: 'read_file',
    description: 'Reads and returns the content of an existing file.',
    schema: ReadFileSchema as any
  }
);
