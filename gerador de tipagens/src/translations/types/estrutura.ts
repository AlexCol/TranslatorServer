/* eslint-disable */
// ⚠️ Arquivo gerado automaticamente
// NÃO EDITE MANUALMENTE

export type Langs = 'en' | 'en-US' | 'es' | 'es-AR' | 'pt-BR';
export const LangsList: Langs[] = ['en', 'en-US', 'es', 'es-AR', 'pt-BR'];

export type Namespace = 'Common' | 'Contabilidade' | 'Contratos' | 'Faturamento' | 'TI';
export const NamespacesList: Namespace[] = ['Common', 'Contabilidade', 'Contratos', 'Faturamento', 'TI'];

export interface Translation {
  Common: typeof import('./../jsons/Common.json');
  Contabilidade: typeof import('./../jsons/Contabilidade.json');
  Contratos: typeof import('./../jsons/Contratos.json');
  Faturamento: typeof import('./../jsons/Faturamento.json');
  TI: typeof import('./../jsons/TI.json');
}
