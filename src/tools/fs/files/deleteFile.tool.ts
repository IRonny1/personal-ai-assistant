import { tool } from '@langchain/core/tools';
import * as fs from 'fs';
import { z } from 'zod';

const DeleteFileSchema = z.object({
  fileName: z.string().describe('The name of the file to delete, including extension')
});

export const deleteFileTool = tool(
  async ({ fileName }: z.infer<typeof DeleteFileSchema>) => {
    try {
      if (!fs.existsSync(fileName)) {
        return `[delete_file_tool] Error: Cannot delete '${fileName}' because it does not exist.`;
      }

      const stats = fs.statSync(fileName);

      if (stats.isDirectory()) {
        return `[delete_file_tool] Error: '${fileName}' is a directory, not a file. Use a directory-specific tool to remove folders.`;
      }

      fs.unlinkSync(fileName);

      return `[delete_file_tool] Successfully deleted file: ${fileName}`;
    } catch (error: any) {
      return `[delete_file_tool] Error deleting file: ${error.message}`;
    }
  },
  {
    name: 'delete_file',
    description: 'Permanently deletes a specified file from the file system.',
    schema: DeleteFileSchema as any
  }
);
