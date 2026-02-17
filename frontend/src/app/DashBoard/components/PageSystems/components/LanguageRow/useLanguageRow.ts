import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LanguageRowProps } from '.';

export function useLanguageRow(props: LanguageRowProps) {
  const { language, systemName, environmentName } = props;

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const actualPercentage =
    language.totalTerms > 0 ? Math.round((language.translatedTerms / language.totalTerms) * 100) : 0;

  const handleNamespaceClick = (namespace: string) => {
    void navigate(`/traducoes/${systemName}/${environmentName}/${language.language}/${namespace}`);
  };

  return {
    expanded,
    setExpanded,
    actualPercentage,
    handleNamespaceClick,
  };
}
