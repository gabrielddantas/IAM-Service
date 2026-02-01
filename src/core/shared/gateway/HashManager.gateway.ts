export interface HashManager {
  hash(plainText: string): Promise<string>;
  compare(hashText: string, plainText: string): Promise<boolean>;
}
