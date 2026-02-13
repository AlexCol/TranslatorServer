const headerTailwindClass = `
  h-14
  flex
  items-center
  justify-between
  px-4
  border-b
  border-border
`;

const menuItensTailwindClass = `
  flex-1  
  h-full
  w-full
  flex
  justify-end
  items-center
`;

const logoLinkTailwindClass = `
`;

const linkTailwindClass = `
  m-4
  hover:text-primary
  cursor-pointer
`;

const logoutIconTailwindClass = `
  text-xl
  hover:scale-110
  transition-transform duration-500
`;

export const headerStyles = {
  header: headerTailwindClass,
  menuItens: menuItensTailwindClass,
  logoLink: logoLinkTailwindClass,
  link: linkTailwindClass,
  logoutIcon: logoutIconTailwindClass,
};
