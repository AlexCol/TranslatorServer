const traducoesStyles = {
  pageTC: `m-10 space-y-5`,

  heroCardTC: `relative overflow-hidden rounded-xl border border-border/80 bg-card p-5 shadow-sm`,
  heroGlowTC: `absolute inset-0 bg-linear-to-r from-primary/8 via-transparent to-primary/5 pointer-events-none`,
  heroContentTC: `relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between`,
  heroTitleWrapTC: `space-y-1`,
  heroTitleTC: `text-lg font-semibold tracking-tight`,
  badgesRowTC: `flex flex-wrap items-center gap-2 text-xs`,
  badgeTC: `rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono`,

  actionButtonsTC: `flex flex-wrap gap-2`,
  actionButtonTC: `h-8 px-3 text-xs`,
  mutationHintTC: `mt-2 text-amber-600`,

  filtersCardTC: `rounded-xl border border-border/80 bg-card p-3 shadow-sm`,
  filtersRowTC: `flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`,
  searchWrapTC: `relative w-full lg:max-w-lg`,
  searchIconTC: `absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground`,
  searchInputTC: `pl-9 h-9 bg-background`,
  statsRowTC: `flex flex-wrap gap-2`,
  statPillTC: `inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground`,
  statPillHighlightTC: `inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary`,
  statLabelTC: `text-[11px] uppercase tracking-wide`,
  statValueTC: `font-semibold tabular-nums`,

  tableCardTC: `overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm`,
  tableTC: `table-fixed`,
  tableHeaderTC: `sticky top-0 z-10 bg-primary/10 backdrop-blur border-b border-primary/20`,
  headerRowTC: `hover:bg-transparent`,
  headKeyTC: `w-[28%] px-3`,
  headFallbackTC: `w-[36%] px-3`,
  headLanguageTC: `w-[36%] px-3`,
  sortButtonTC: `h-8 px-2 text-xs font-medium text-muted-foreground`,
  sortButtonActiveTC: `h-8 px-2 text-xs font-medium text-foreground`,

  bodyRowTC: `align-top odd:bg-background even:bg-muted/15 hover:bg-transparent`,
  cellTC: `px-3 py-2.5 align-top`,
  keyTextTC: `font-mono text-[12px] leading-5 break-all text-foreground`,
  fallbackTextTC: `text-[12px] leading-5 whitespace-pre-wrap break-words text-muted-foreground`,
  inputWrapTC: `space-y-1`,
  inputDefaultTC: `bg-background`,
  inputChangedTC: `border-primary ring-1 ring-primary/20 bg-primary/5`,
  changedTextTC: `text-primary`,

  emptyCellTC: `py-10 text-center`,
  emptyWrapTC: `flex flex-col items-center gap-2 text-muted-foreground`,

  paginationCardTC: `rounded-xl border border-border/80 bg-card px-3 py-2.5 shadow-sm`,
  paginationRowTC: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`,
  paginationInfoTC: `text-muted-foreground`,
  paginationControlsTC: `flex flex-wrap items-center gap-2`,
  pageIndicatorTC: `min-w-16 rounded-md border border-border bg-muted px-2 py-1 text-center text-xs tabular-nums`,
  pageSizeWrapTC: `flex items-center gap-2 mr-1`,
  pageSizeLabelTC: `text-muted-foreground`,
  pageSizeSelectTC: `h-8 w-20 text-xs bg-background`,

  modalContentTC: `rounded-xl border border-border bg-card p-5 shadow-lg space-y-4`,
  modalTitleWrapTC: `space-y-1`,
  modalContextTC: `rounded-md border border-border bg-muted/50 px-3 py-2`,
  modalActionsTC: `flex justify-end gap-2`,
};

export default traducoesStyles;
