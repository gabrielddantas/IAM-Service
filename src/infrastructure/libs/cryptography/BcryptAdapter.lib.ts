import { hash, compare } from "bcrypt";
import { HashManager } from "@/core/shared/gateway/HashManager.gateway";

export class BcryptAdapter implements HashManager {
  private readonly saltRounds: number = 12;

  async hash(plainText: string): Promise<string> {
    return await hash(plainText, this.saltRounds);
  }
  async compare(plainText: string, hash: string): Promise<boolean> {
    return await compare(plainText, hash);
  }
}
