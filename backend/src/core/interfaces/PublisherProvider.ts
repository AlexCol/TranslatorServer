export abstract class PublisherProvider {
  //!publicação de namespaces
  abstract publishNamespace(sistema: string, namespace: string, from: string, to: string): Promise<string>;
}
