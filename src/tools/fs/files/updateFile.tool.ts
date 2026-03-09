import { tool } from '@langchain/core/tools';
import * as fs from 'fs';
import { z } from 'zod';

const UpdateFileSchema = z.object({
  fileName: z.string().describe('Name of the file to update'),
  textToAdd: z.string().describe('The text to append to the end of the file')
});

export const updateFileTool = tool(
  async ({ fileName, textToAdd }: z.infer<typeof UpdateFileSchema>) => {
    try {
      if (!fs.existsSync(fileName)) {
        return `[update_file_tool] Error: File ${fileName} does not exist. Use create_file first.`;
      }

      fs.appendFileSync(fileName, `\n${textToAdd}`);

      return `[update_file_tool] Successfully updated ${fileName}`;
    } catch (error: any) {
      return `[update_file_tool] Error updating file: ${error.message}`;
    }
  },
  {
    name: 'update_file',
    description: 'Appends text to the end of an existing file.',
    schema: UpdateFileSchema as any
  }
);
