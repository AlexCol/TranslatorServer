export abstract class SystemProvider {
  //!sobre sistema
  abstract listSystems(): Promise<string[]>;
  abstract createSystem(sistema: string): Promise<void>;
  abstract deleteSystem(sistema: string): Promise<void>;
}
