export default function presentLanguage(language: string) {
  try {
    const canonical = Intl.getCanonicalLocales(language)[0];
    const dn = new Intl.DisplayNames([canonical], { type: 'language' });
    const languageName = dn.of(canonical) ?? canonical;
    return languageName.charAt(0).toUpperCase() + languageName.slice(1);
  } catch {
    return language;
  }
}
