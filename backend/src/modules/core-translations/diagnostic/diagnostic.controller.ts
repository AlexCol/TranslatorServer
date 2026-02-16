import { Controller, Get } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { ApiDoc } from '@/decorators/api-doc/api-doc';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @ApiDoc({
    summary: 'Get translation diagnostic overview',
    description:
      'Returns a hierarchical overview of translation status by system, environment, language, and namespace with total terms and translated percentage at each level.',
    response: {
      type: 'object',
      example: {
        totals: {
          systems: 1,
          environments: 2,
          languages: 4,
          namespaces: 20,
          totalTerms: 500,
          translatedTerms: 430,
          missingTerms: 70,
          translatedPercentage: 86,
        },
        systems: [],
      },
    },
  })
  @Get('overview')
  async getOverview() {
    return await this.diagnosticService.getOverview();
  }
}
