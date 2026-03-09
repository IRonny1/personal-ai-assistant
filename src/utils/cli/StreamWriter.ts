export class StreamWriter {
  private buffer: string = '';
  private hasStarted: boolean = false;

  write(chunk: string): void {
    if (!this.hasStarted && chunk.trim()) {
      this.hasStarted = true;
    }
    process.stdout.write(chunk);
    this.buffer += chunk;
  }

  finalize(): void {
    if (this.hasStarted && !this.buffer.endsWith('\n')) {
      process.stdout.write('\n');
    }
  }

  getBuffer(): string {
    return this.buffer;
  }
}
