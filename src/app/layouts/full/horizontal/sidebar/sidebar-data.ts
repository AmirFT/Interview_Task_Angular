import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboards',
    iconName: 'home',
    route: 'dashboard',
    children: [
      {
        displayName: 'Dashboard',
        iconName: 'point',
        route: 'panel/home/dashboard',
      },
    ],
  },
];
