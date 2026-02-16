// Container do item do menu
const menuItemTC = `
  flex
  items-center
  gap-3
  px-4
  py-3
  rounded-2xl
  cursor-pointer
  group
  relative
  overflow-visible
`;

const menuItemActiveTC = `
  bg-primary
  text-white
  font-semibold
  shadow-lg
  shadow-primary/20
`;

const menuItemInactiveTC = `
  hover:bg-background
  hover:text-primary
  hover:shadow-md
`;

const menuItemCollapsedTC = `
  justify-center
  px-3
`;

// Link dentro do item
const menuLinkTC = `
  flex
  items-center
  gap-3
  flex-1
  min-w-0
  relative
  z-10
  overflow-visible
`;

// Container do label (quando não é link)
const menuLabelContainerTC = `
  flex
  items-center
  gap-3
  flex-1
  min-w-0
  relative
  overflow-visible
`;

// Container do ícone
const iconContainerTC = `
  relative
`;

// Ícone do menu
const menuIconTC = `
  shrink-0
  transition-transform
  duration-200
  group-hover:scale-110
`;

// Bolinha indicadora de filho ativo
const activeChildDotTC = `
  absolute
  -right-1
  -bottom-1
  w-2
  h-2
  bg-primary
  rounded-full
  animate-pulse
`;

// Label do menu - Com transição para fade in/out
const menuLabelTC = `
  whitespace-nowrap
  text-sm
  font-medium
  transition-[opacity,width,margin]
  duration-300
  ease-in-out
  opacity-100
  max-w-50
  ml-0
  overflow-hidden
  text-ellipsis
`;

// Botão de toggle (chevron)
const toggleButtonTC = `
  flex
  items-center
  justify-center
  ml-auto
  rounded-xl
  transition-all
  duration-200
  hover:scale-110
  active:scale-95
  opacity-100
`;

// Toggle button quando colapsado
const toggleButtonCollapsedTC = `
  absolute
  top-1
  right-1
  hover:bg-transparent

`;

// Container do chevron
const chevronContainerTC = `
  transition-transform
`;

const chevronContainerOpenTC = `
  rotate-180
`;

// Ícone do chevron aberto
const chevronOpenTC = `
  text-primary
`;

// Ícone do chevron fechado
const chevronClosedTC = `
`;

// Container dos filhos com transição de altura
const childrenContainerTC = `
  transition-[max-height,opacity]
  duration-300
  ease-in-out
`;

// Container expandido
const childrenContainerOpenTC = `
  max-h-500
  opacity-100
`;

// Container fechado
const childrenContainerClosedTC = `
  max-h-0
  opacity-0
  pointer-events-none
  overflow-hidden
`;

// Lista de filhos
const childrenListTC = `
  mt-1
  space-y-1
  transform
  transition-transform
  duration-300
  ease-in-out
`;

// Lista quando está abrindo
const childrenListOpenTC = `
  translate-y-0
`;

// Lista quando está fechando
const childrenListClosedTC = `
  -translate-y-2
`;

export const menuItemStyles = {
  // Item do menu
  menuItemTC,
  menuItemActiveTC,
  menuItemInactiveTC,
  menuItemCollapsedTC,

  // Link e containers
  menuLinkTC,
  menuLabelContainerTC,
  iconContainerTC,

  // Ícone e label
  menuIconTC,
  menuLabelTC,
  activeChildDotTC,

  // Toggle button
  toggleButtonTC,
  toggleButtonCollapsedTC,
  chevronContainerTC,
  chevronContainerOpenTC,
  chevronOpenTC,
  chevronClosedTC,

  // Filhos
  childrenContainerTC,
  childrenContainerOpenTC,
  childrenContainerClosedTC,
  childrenListTC,
  childrenListOpenTC,
  childrenListClosedTC,
};
