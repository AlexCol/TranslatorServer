import { sanitizeRawText } from './sanitizeRawText';

export function parseKeyLines(rawText: string): { keys: string[]; error?: string } {
  const sanitized = sanitizeRawText(rawText);
  const lines = sanitized.split('\n').filter(Boolean);

  if (lines.length === 0) {
    return { keys: [], error: 'Informe ao menos uma chave.' };
  }

  for (const line of lines) {
    if (line.includes(';')) {
      return { keys: [], error: 'Para cadastrar chaves, não use ";" nas linhas.' };
    }
  }

  return { keys: lines };
}
