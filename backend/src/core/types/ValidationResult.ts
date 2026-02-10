export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    completeness: number; // 0-100
    emptyKeys: number;
    invalidKeys: number;
  };
};
