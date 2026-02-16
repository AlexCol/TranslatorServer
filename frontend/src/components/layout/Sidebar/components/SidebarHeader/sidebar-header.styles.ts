const headerTC = `
  flex
  items-center
  justify-between
  h-14
  px-5
  py-5
  border-b
  border-sidebar-border
  bg-sidebar
  transition-all
  duration-300
`;

const titleTC = `
  text-xl
  font-bold
  text-primary
  tracking-tight
  animate-in 
  fade-in 
  slide-in-from-left 
  duration-300
  overflow-hidden 
  text-ellipsis 
  whitespace-nowrap
`;

const toggleButtonTC = `
  hover:text-sidebar-primary
`;

export const sidebarHeaderStyles = {
  headerTC,
  titleTC,
  toggleButtonTC,
};
