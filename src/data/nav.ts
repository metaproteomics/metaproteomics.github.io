/**
 * Site navigation configuration.
 * Edit this file to add, remove, or rename navigation items.
 */

export interface NavItem {
  /** Display label shown in the navbar */
  title: string;
  /** URL path this item links to */
  path: string;
  /** Optional dropdown children */
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { title: "Groups", path: "/groups" },
  { title: "CAMPI", path: "/campi" },
  { title: "Education", path: "/education" },
  { title: "Symposia", path: "/symposia" },
  { title: "About us", path: "/about" },
  { title: "News", path: "/news" },
];
