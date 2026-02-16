const containerTC = `
  flex
  flex-col
  min-h-screen
  bg-sidebar
  text-sidebar-foreground
  border-r
  border-sidebar-border
  transition-all
  duration-300
  ease-in-out
  sticky
  top-0
  left-0
  shadow-md
`;

const expandedTC = 'w-72';
const collapsedTC = 'w-20';

export const sidebarStyles = {
  // Container
  containerTC,
  expandedTC,
  collapsedTC,
};
