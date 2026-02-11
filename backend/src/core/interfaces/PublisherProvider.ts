import { PublishProps } from '../types/PublishProps';

export abstract class PublisherProvider {
  //!publicação de namespaces
  abstract publishNamespace(props: PublishProps): Promise<string>;
}
