import type { ParsedTranslation } from '../types/ParsedTranslation';
import { sanitizeRawText } from './sanitizeRawText';

export function parseTranslationLines(rawText: string): { keys: ParsedTranslation[]; error?: string } {
  const sanitized = sanitizeRawText(rawText);
  const lines = sanitized.split('\n').filter(Boolean);

  if (lines.length === 0) {
    return { keys: [], error: 'Informe ao menos uma linha no formato chave;valor.' };
  }

  const parsed: ParsedTranslation[] = [];

  for (const line of lines) {
    const separatorCount = (line.match(/;/g) || []).length;
    if (separatorCount !== 1) {
      return {
        keys: [],
        error: `A linha "${line}" precisa conter exatamente um ";" (chave;valor).`,
      };
    }

    const [rawKey, rawValue] = line.split(';');
    const key = rawKey.trim();
    const value = rawValue.trim();

    if (!key || !value) {
      return {
        keys: [],
        error: `A linha "${line}" precisa ter chave e valor preenchidos.`,
      };
    }

    parsed.push({ key, value });
  }

  return { keys: parsed };
}
