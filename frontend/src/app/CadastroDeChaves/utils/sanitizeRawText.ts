export function sanitizeRawText(rawText: string): string {
  const normalizedBreaks = rawText.replace(/\r\n?/g, '\n');
  const withoutTabs = normalizedBreaks.replace(/\t+/g, ' ');

  const lines = withoutTabs
    .split('\n')
    .map((line) => line.replace(/\s+$/g, '').trimStart())
    .filter((line) => line.trim().length > 0);

  return lines.join('\n');
}
