import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { MenuItemDetails } from './types/types';
import { useAuthContext } from '@/contexts/Auth/AuthContext';

export default function useSidebar() {
  const { userData } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [menuTree, setMenuTree] = useState<MenuItemDetails[]>([]);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [openMenusBeforeCollapse, setOpenMenusBeforeCollapse] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  const sortMenus = useCallback((menus: MenuItemDetails[]): MenuItemDetails[] => {
    return menus
      .slice()
      .sort((a, b) => Number(a.ordem) - Number(b.ordem))
      .map((menu) => ({
        ...menu,
        children: sortMenus(menu.children || []),
      }));
  }, []);

  const toggleMenu = useCallback((id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const menus = useMemo(() => sortMenus(menuTree), [menuTree, sortMenus]);
  const isMenuItemOpenChecker = useCallback((id: string) => !!openMenus[id], [openMenus]);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      if (!prev) {
        setOpenMenusBeforeCollapse(openMenus);
        setOpenMenus({});
      } else {
        setOpenMenus(openMenusBeforeCollapse);
      }
      return !prev;
    });
  }, [openMenus, openMenusBeforeCollapse]);

  function fetchMenuTree() {
    const data: MenuItemDetails[] = [
      {
        id: '1',
        label: 'Traduções',
        ordem: 1,
        children: [
          { id: '1-1', label: 'Dashboard', ordem: 1, children: [], href: '/', icon: 'LayoutDashboard' },
          { id: '1-2', label: 'Cadastro', ordem: 2, children: [], href: '/cadastro', icon: 'Pen' },
        ],
        href: '',
        icon: 'BookType',
      },
      { id: '2', label: 'Sobre', ordem: 2, children: [], href: '/about', icon: 'Search' },
    ] satisfies MenuItemDetails[];
    setMenuTree(data);
  }

  useEffect(() => {
    if (!userData) return;
    fetchMenuTree();
  }, [userData]);

  return {
    menus,
    isMenuItemOpenChecker,
    toggleMenu,
    isCollapsed,
    toggleSidebar,
    pathname,
  };
}

export type useSidebarType = ReturnType<typeof useSidebar>;
