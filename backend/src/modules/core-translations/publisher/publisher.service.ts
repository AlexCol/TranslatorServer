import { Injectable } from '@nestjs/common';
import { PublishDto } from './dto/publish.dto';
import { PublisherProvider } from '@/core/interfaces/PublisherProvider';
import { PublishProps } from '@/core/types/PublishProps';

@Injectable()
export class PublisherService {
  constructor(private readonly provider: PublisherProvider) {}

  async publishNamespace(dto: PublishDto): Promise<string> {
    const publishProps = {
      system: dto.system,
      language: dto.language,
      namespace: dto.namespace,
      from: dto.from,
      to: dto.to,
    } satisfies PublishProps;

    return await this.provider.publishNamespace(publishProps);
  }
}
