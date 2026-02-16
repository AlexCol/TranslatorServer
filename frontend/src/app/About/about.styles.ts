const aboutStyles = {
  pageTC: `
    h-full
    w-full
    overflow-y-auto
    bg-background
    text-foreground
    p-4
    md:p-6
  `,
  heroTC: `
    rounded-xl
    border
    border-border
    bg-card
    p-5
    md:p-7
    mb-5
  `,
  titleTC: `
    text-2xl
    md:text-3xl
    font-semibold
    text-card-foreground
    mb-2
  `,
  subtitleTC: `
    text-sm
    md:text-base
    text-muted-foreground
    max-w-3xl
  `,
  gridTC: `
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-4
  `,
  cardTC: `
    rounded-xl
    border
    border-border
    bg-card
    p-4
    flex
    flex-col
    gap-2
  `,
  cardTitleTC: `
    text-base
    font-semibold
    text-card-foreground
  `,
  cardTextTC: `
    text-sm
    text-muted-foreground
    leading-relaxed
  `,
};

export { aboutStyles };
