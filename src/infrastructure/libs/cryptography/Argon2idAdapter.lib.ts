import { HashManager } from "@/core/shared/gateway/HashManager.gateway";
import { argon2id, verify, hash } from "argon2";

export class Argon2idAdapter implements HashManager {
  private readonly PARALLELISM = 1;
  private readonly PASSES = 3;
  private readonly MEMORY_SIZE = 2 ** 16;
  private readonly TAG_LENGTH = 32;

  public async hash(plainText: string): Promise<string> {
    try {
      return await hash(plainText, {
        type: argon2id,
        parallelism: this.PARALLELISM,
        timeCost: this.PASSES,
        memoryCost: this.MEMORY_SIZE,
        hashLength: this.TAG_LENGTH,
      });
    } catch (error) {
      throw error;
    }
  }

  public async compare(
    hashedText: string,
    plainText: string,
  ): Promise<boolean> {
    try {
      return await verify(hashedText, plainText);
    } catch (err) {
      return false;
    }
  }
}
