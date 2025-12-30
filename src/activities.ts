/**
 * PBI Workflow Activities
 *
 * Activities for PBI workflow execution, including concurrency control
 * and PBI processing logic.
 */

/**
 * In-memory semaphore for concurrency control
 * In production, this should be backed by a distributed locking mechanism
 */
class ConcurrencySemaphore {
  private currentCount = 0;
  private readonly maxCount: number;
  private readonly waitQueue: Array<() => void> = [];

  constructor(maxCount: number) {
    this.maxCount = maxCount;
  }

  async acquire(): Promise<void> {
    if (this.currentCount < this.maxCount) {
      this.currentCount++;
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      this.waitQueue.push(resolve);
    });
  }

  release(): void {
    if (this.waitQueue.length > 0) {
      const resolve = this.waitQueue.shift();
      if (resolve) {
        resolve();
      }
    } else {
      this.currentCount = Math.max(0, this.currentCount - 1);
    }
  }

  getCurrentCount(): number {
    return this.currentCount;
  }
}

const semaphore = new ConcurrencySemaphore(2);

export async function acquireLock(workflowId: string): Promise<void> {
  console.log(`[${workflowId}] Acquiring concurrency slot...`);
  await semaphore.acquire();
  console.log(`[${workflowId}] Concurrency slot acquired. Active: ${semaphore.getCurrentCount()}`);
}

export async function releaseLock(workflowId: string): Promise<void> {
  console.log(`[${workflowId}] Releasing concurrency slot...`);
  semaphore.release();
  console.log(`[${workflowId}] Concurrency slot released. Active: ${semaphore.getCurrentCount()}`);
  return Promise.resolve();
}

export async function processPBI(
  pbiId: string,
  pbiName: string,
  parameters: Record<string, unknown>
): Promise<{ success: boolean; result: unknown }> {
  console.log(`[${pbiId}] Processing PBI: ${pbiName}`);
  console.log(`[${pbiId}] Parameters:`, parameters);

  // Simulate PBI processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(`[${pbiId}] PBI processing completed`);
  return {
    success: true,
    result: {
      pbiId,
      pbiName,
      processedAt: new Date().toISOString(),
    },
  };
}
