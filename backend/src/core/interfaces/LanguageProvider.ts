export abstract class LanguageProvider {
  //!sobre idiomas
  abstract listLanguages(sistema: string, env: string): Promise<string[]>;
  abstract createLanguage(sistema: string, language: string): Promise<void>; //sempre criar no ambiente de 'dev'
  abstract deleteLanguage(sistema: string, language: string): Promise<void>; //sempre remover no ambiente de 'dev'

  abstract getBaseLanguage(sistema: string, env: string): Promise<string | null>;
  abstract demoteBaseLanguage(sistema: string, language: string): Promise<void>;
  abstract promoteToBaseLanguage(sistema: string, language: string): Promise<void>;
}
