const languageRowStyles = {
  containerTC: `border-l border-border/70 ml-1`,

  buttonTC: `w-full h-auto justify-start rounded-none border-0 hover:border-transparent shadow-none flex items-center gap-3 pl-4 pr-3 py-2.5 hover:bg-muted/30 transition-colors duration-150 text-left group`,

  iconTC: `text-muted-foreground shrink-0`,

  languageTC: `font-mono text-sm text-foreground w-14 shrink-0`,
  baseTC: `text-[10px] uppercase tracking-wider font-medium text-primary bg-primary/10 border border-primary/20 rounded mx-2 px-1.5 py-0.5 shrink-0`,

  percentageTC: `flex-1 max-w-48 ml-auto mr-3`,
  actualPercentageTC: `text-xs tabular-nums text-foreground w-9 text-right shrink-0`,
  totalTC: `text-[11px] text-muted-foreground tabular-nums shrink-0`,
  expandMotionTC: `overflow-hidden`,
  expandContentTC: `pl-10 pr-3 pb-2 space-y-0.5`,
  namespaceRowTC: `flex items-center gap-3 py-1.5 px-2 rounded`,
  namespaceDotTC: `w-1 h-1 rounded-full bg-border shrink-0`,
  namespaceNameTC: `font-mono text-xs text-muted-foreground min-w-25 cursor-pointer`,
  namespaceProgressTC: `flex-1 max-w-45`,
  namespaceTotalTC: `text-[11px] tabular-nums text-muted-foreground shrink-0`,
};
export default languageRowStyles;
