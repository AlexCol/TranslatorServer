export const tsButtonStyles = {
  customTC(variant: string) {
    const customTC = `
      cursor-pointer
      active:scale-97
      disabled:cursor-not-allowed
      disabled:opacity-50
      ring-1
      hover:bg-white
      hover: text-${variant}`;
    return customTC;
  },
};
