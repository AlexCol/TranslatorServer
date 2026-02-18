export function normalizeStringList(response: unknown): string[] {
  if (Array.isArray(response)) {
    return response.filter((item): item is string => typeof item === 'string');
  }

  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    Array.isArray((response as { data?: unknown[] }).data)
  ) {
    return (response as { data: unknown[] }).data.filter((item): item is string => typeof item === 'string');
  }

  return [];
}
