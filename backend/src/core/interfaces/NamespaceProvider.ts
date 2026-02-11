export abstract class NamespaceProvider {
  //!sobre namespaces
  abstract listNamespaces(sistema: string, env: string, language: string): Promise<string[]>;
  abstract createNamespace(sistema: string, namespace: string): Promise<void>;
  abstract deleteNamespace(sistema: string, namespace: string): Promise<void>;
}
