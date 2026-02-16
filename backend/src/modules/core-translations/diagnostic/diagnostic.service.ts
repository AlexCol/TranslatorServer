import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';
import { LanguageService } from '../language/language.service';
import { NamespaceService } from '../namespace/namespace.service';
import { SystemService } from '../system/system.service';
import { TranslationsService } from '../translations/translations.service';
import { DiagnosticOverview } from './types/DiagnosticOverview';
import { EnvironmentDiagnostic } from './types/EnvironmentDiagnostic';
import { LanguageDiagnostic } from './types/LanguageDiagnostic';
import { NamespaceDiagnostic } from './types/NamespaceDiagnostic';
import { SystemDiagnostic } from './types/SystemDiagnostic';

@Injectable()
export class DiagnosticService {
  constructor(
    private readonly systemsService: SystemService,
    private readonly environmentsService: EnvironmentService,
    private readonly languagesService: LanguageService,
    private readonly namespacesService: NamespaceService,
    private readonly translationsService: TranslationsService,
  ) {}

  async getOverview(): Promise<DiagnosticOverview> {
    const systems = await this.systemsService.listSystems();
    systems.sort((a, b) => a.localeCompare(b));

    const resultSystems: SystemDiagnostic[] = [];

    let environmentCount = 0;
    let languageCount = 0;
    let namespaceCount = 0;

    for (const system of systems) {
      const environments = await this.environmentsService.listEnvironments(system);
      environments.sort((a, b) => a.localeCompare(b));

      const environmentNodes: EnvironmentDiagnostic[] = [];

      for (const environment of environments) {
        environmentCount += 1;

        const languages = await this.languagesService.listLanguages(system, environment);
        languages.sort((a, b) => a.localeCompare(b));

        if (languages.length === 0) {
          environmentNodes.push({
            environment,
            baseLanguage: null,
            totalTerms: 0,
            translatedTerms: 0,
            missingTerms: 0,
            translatedPercentage: 0,
            languages: [],
          });
          continue;
        }

        const baseLanguageFromProvider = await this.languagesService.getBaseLanguage(system, environment);
        const baseLanguage = baseLanguageFromProvider ?? undefined;
        if (!baseLanguage) {
          environmentNodes.push({
            environment,
            baseLanguage: null,
            totalTerms: 0,
            translatedTerms: 0,
            missingTerms: 0,
            translatedPercentage: 0,
            languages: languages.map((language) => ({
              language,
              isBase: false,
              totalTerms: 0,
              translatedTerms: 0,
              missingTerms: 0,
              translatedPercentage: 0,
              namespaces: [],
            })),
          });
          continue;
        }

        const baseNamespaces = await this.namespacesService.listNamespaces(system, environment, baseLanguage);
        baseNamespaces.sort((a, b) => a.localeCompare(b));

        const baseNamespaceStatus = new Map<string, { total: number }>();
        for (const namespace of baseNamespaces) {
          const status = await this.translationsService.getTranslationStatus({
            system,
            environment,
            language: baseLanguage,
            namespace,
          });
          baseNamespaceStatus.set(namespace, { total: status.total });
        }

        const languageNodes: LanguageDiagnostic[] = [];
        for (const language of languages) {
          languageCount += 1;

          const availableNamespaces = new Set(
            await this.namespacesService.listNamespaces(system, environment, language),
          );

          const namespaceNodes: NamespaceDiagnostic[] = [];
          for (const namespace of baseNamespaces) {
            namespaceCount += 1;
            if (!availableNamespaces.has(namespace)) {
              const baseTotal = baseNamespaceStatus.get(namespace)?.total ?? 0;
              namespaceNodes.push({
                namespace,
                totalTerms: baseTotal,
                translatedTerms: 0,
                missingTerms: baseTotal,
                translatedPercentage: 0,
              });
              continue;
            }

            const status = await this.translationsService.getTranslationStatus({
              system,
              environment,
              language,
              namespace,
            });

            namespaceNodes.push({
              namespace: status.namespace,
              totalTerms: status.total,
              translatedTerms: status.translated,
              missingTerms: status.missing,
              translatedPercentage: status.percentage,
            });
          }

          languageNodes.push(this.sumLanguage(language, language === baseLanguage, namespaceNodes));
        }

        environmentNodes.push(this.sumEnvironment(environment, baseLanguage, languageNodes));
      }

      resultSystems.push(this.sumSystem(system, environmentNodes));
    }

    const totals = this.sumTotals(resultSystems, environmentCount, languageCount, namespaceCount);

    return {
      totals,
      systems: resultSystems,
    };
  }

  /******************************************************/
  /* Metodos privados                                   */
  /******************************************************/
  private sumLanguage(language: string, isBase: boolean, namespaces: NamespaceDiagnostic[]): LanguageDiagnostic {
    const totalTerms = namespaces.reduce((sum, item) => sum + item.totalTerms, 0);
    const translatedTerms = namespaces.reduce((sum, item) => sum + item.translatedTerms, 0);
    const missingTerms = namespaces.reduce((sum, item) => sum + item.missingTerms, 0);
    const translatedPercentage = isBase || totalTerms === 0 ? 0 : Math.round((translatedTerms / totalTerms) * 100);

    return {
      language,
      isBase,
      totalTerms,
      translatedTerms,
      missingTerms,
      translatedPercentage,
      namespaces,
    };
  }

  private sumEnvironment(
    environment: string,
    baseLanguage: string | null,
    languages: LanguageDiagnostic[],
  ): EnvironmentDiagnostic {
    const totalTerms = languages.reduce((sum, item) => sum + item.totalTerms, 0);
    const translatedTerms = languages.reduce((sum, item) => sum + item.translatedTerms, 0);
    const missingTerms = languages.reduce((sum, item) => sum + item.missingTerms, 0);
    const nonBaseStats = this.getNonBaseLanguageStats(languages);
    const translatedPercentage =
      nonBaseStats.totalTerms > 0 ? Math.round((nonBaseStats.translatedTerms / nonBaseStats.totalTerms) * 100) : 0;

    return {
      environment,
      baseLanguage,
      totalTerms,
      translatedTerms,
      missingTerms,
      translatedPercentage,
      languages,
    };
  }

  private sumSystem(system: string, environments: EnvironmentDiagnostic[]): SystemDiagnostic {
    const totalTerms = environments.reduce((sum, item) => sum + item.totalTerms, 0);
    const translatedTerms = environments.reduce((sum, item) => sum + item.translatedTerms, 0);
    const missingTerms = environments.reduce((sum, item) => sum + item.missingTerms, 0);
    const nonBaseStats = environments.reduce(
      (acc, environment) => {
        const envStats = this.getNonBaseLanguageStats(environment.languages);
        acc.totalTerms += envStats.totalTerms;
        acc.translatedTerms += envStats.translatedTerms;
        return acc;
      },
      { totalTerms: 0, translatedTerms: 0 },
    );
    const translatedPercentage =
      nonBaseStats.totalTerms > 0 ? Math.round((nonBaseStats.translatedTerms / nonBaseStats.totalTerms) * 100) : 0;

    return {
      system,
      totalTerms,
      translatedTerms,
      missingTerms,
      translatedPercentage,
      environments,
    };
  }

  private sumTotals(systems: SystemDiagnostic[], environments: number, languages: number, namespaces: number) {
    const totalTerms = systems.reduce((sum, item) => sum + item.totalTerms, 0);
    const translatedTerms = systems.reduce((sum, item) => sum + item.translatedTerms, 0);
    const missingTerms = systems.reduce((sum, item) => sum + item.missingTerms, 0);
    const nonBaseStats = systems.reduce(
      (acc, system) => {
        for (const environment of system.environments) {
          const envStats = this.getNonBaseLanguageStats(environment.languages);
          acc.totalTerms += envStats.totalTerms;
          acc.translatedTerms += envStats.translatedTerms;
        }
        return acc;
      },
      { totalTerms: 0, translatedTerms: 0 },
    );
    const translatedPercentage =
      nonBaseStats.totalTerms > 0 ? Math.round((nonBaseStats.translatedTerms / nonBaseStats.totalTerms) * 100) : 0;

    return {
      systems: systems.length,
      environments,
      languages,
      namespaces,
      totalTerms,
      translatedTerms,
      missingTerms,
      translatedPercentage,
    };
  }

  private getNonBaseLanguageStats(languages: LanguageDiagnostic[]) {
    const nonBaseLanguages = languages.filter((language) => !language.isBase);
    const totalTerms = nonBaseLanguages.reduce((sum, item) => sum + item.totalTerms, 0);
    const translatedTerms = nonBaseLanguages.reduce((sum, item) => sum + item.translatedTerms, 0);
    return { totalTerms, translatedTerms };
  }
}
