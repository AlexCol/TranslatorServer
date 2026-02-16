const loginStyles = {
  pageTC: `
    relative
    isolate
    min-h-screen
    w-full
    overflow-hidden
    bg-background
    px-4
    py-8
    flex
    items-center
    justify-center
    sm:px-6
  `,

  decorOrbOneTC: `
    absolute
    -top-28
    -left-16
    h-72
    w-72
    rounded-full
    bg-primary/25
    blur-3xl
  `,

  decorOrbTwoTC: `
    absolute
    -right-20
    -bottom-24
    h-80
    w-80
    rounded-full
    bg-accent/25
    blur-3xl
  `,

  cardTC: `
    relative
    z-10
    w-full
    max-w-lg
    bg-card/85
    border
    border-border
    rounded-2xl
    shadow-2xl
    backdrop-blur
    p-6
    flex
    flex-col
    gap-7
    sm:p-8
  `,

  logoWrapTC: `
    w-full
    flex
    items-center
    justify-center
  `,

  logoTC: `
    h-60
    w-auto
    object-contain
    select-none
  `,

  brandSectionTC: `
    flex
    flex-col
    gap-2
  `,

  brandBadgeTC: `
    w-fit
    rounded-full
    border
    border-primary/50
    bg-primary/15
    px-3
    py-1
    text-xs
    font-medium
    uppercase
    tracking-[0.12em]
    text-primary
  `,

  titleTC: `
    text-3xl
    font-semibold
    leading-tight
    text-card-foreground
  `,

  subtitleTC: `
    text-sm
    text-muted-foreground
  `,

  formTC: `
    flex
    flex-col
    gap-4
  `,

  fieldTC: `
    flex
    flex-col
    gap-2
  `,

  fieldLabelTC: `
    text-sm
    font-medium
    text-foreground
  `,

  inputTC: `
    w-full
    border-input
    bg-background
    text-foreground
    placeholder:text-muted-foreground
    focus-visible:border-ring
    focus-visible:ring-ring/40
  `,

  submitButtonTC: `
    w-full
    mt-2
    h-10
    font-semibold
  `,

  hiddenHoneyTC: `
    hidden
  `,
};

export { loginStyles };
