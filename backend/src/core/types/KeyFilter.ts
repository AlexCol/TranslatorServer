export type KeyFilter = {
  pattern?: string; // glob pattern: "error.*", "page.home.*"
  hasValue?: boolean; // filtra por presença de valor
  language?: string;
  namespace?: string;
};
