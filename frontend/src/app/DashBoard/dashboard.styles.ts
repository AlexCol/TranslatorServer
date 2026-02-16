const dashboardStyles = {
  pageTC: `
    h-full
    w-full
    overflow-y-auto
    bg-background
    text-foreground
    p-4
    md:p-6
  `,
  headerTC: `
    flex
    flex-col
    gap-2
    mb-6
  `,
  titleTC: `
    text-2xl
    md:text-3xl
    font-semibold
    text-foreground
  `,
  subtitleTC: `
    text-sm
    text-muted-foreground
  `,
  toolbarTC: `
    flex
    flex-wrap
    items-center
    gap-2
    mb-4
  `,
  crumbButtonTC: `
    text-xs
    h-8
  `,
  summaryGridTC: `
    grid
    grid-cols-2
    md:grid-cols-4
    gap-3
    mb-6
  `,
  statCardTC: `
    rounded-lg
    border
    border-border
    bg-card
    p-3
    flex
    flex-col
    gap-1
  `,
  statLabelTC: `
    text-xs
    uppercase
    tracking-wide
    text-muted-foreground
  `,
  statValueTC: `
    text-lg
    font-semibold
    text-card-foreground
  `,
  cardsGridTC: `
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-4
  `,
  cardButtonTC: `
    w-full
    h-full
    text-center
    rounded-xl
    border
    border-border
    bg-card
    text-card-foreground
    p10
    transition-all
    hover:border-primary/60
    hover:shadow-md
  `,
  cardTitleRowTC: `
    flex
    items-center
    justify-center
    gap-2
  `,
  cardTitleTC: `
    text-base
    font-semibold
    wrap-break-word
  `,
  badgeTC: `
    text-[10px]
    px-2
    py-0.5
    rounded-full
    border
    border-accent
    bg-accent/15
    text-secondary
    shrink-0
  `,
  cardMetaTC: `
    mt-3
    text-xs
    flex
    justify-center
    gap-3
    flex-wrap
  `,
  progressWrapTC: `
    mt-3
    flex
    items-center
    justify-center
    gap-2
  `,
  progressTrackTC: `
    h-2
    flex-1
    rounded-full
    bg-muted
    overflow-hidden
  `,
  progressFillTC: `
    h-full
    bg-primary
    transition-all
  `,
  progressFillLowTC: `
    bg-destructive
  `,
  progressFillMediumTC: `
    bg-yellow-500
  `,
  progressFillHighTC: `
    bg-green-600
  `,
  progressTextTC: `
    text-xs
    font-medium
    text-foreground
    w-10
    text-right
  `,
  progressTextLowTC: `
    text-destructive
  `,
  progressTextMediumTC: `
    text-yellow-500
  `,
  progressTextHighTC: `
    text-green-600
  `,
  emptyTC: `
    rounded-lg
    border
    border-border
    bg-card
    p-8
    text-center
    text-muted-foreground
  `,
  errorTC: `
    rounded-lg
    border
    border-destructive/40
    bg-destructive/10
    text-destructive
    p-4
    flex
    items-center
    justify-between
    gap-4
  `,
  modalCardTC: `
    rounded-xl
    border
    border-border
    bg-card
    text-card-foreground
    p-5
    shadow-lg
  `,
  modalTitleTC: `
    text-lg
    font-semibold
    mb-3
  `,
  modalMetaTC: `
    text-sm
    text-muted-foreground
    mb-1
  `,
  modalActionsTC: `
    mt-5
    flex
    justify-end
  `,
};

export { dashboardStyles };
