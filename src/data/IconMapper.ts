import type { IconName } from '../components/iconPaths';

const iconMap: Record<string, IconName> = {
  'Admin Page': 'settings',
  Calendar: 'calendar',
  Map: 'map',
  Weather: 'weather',
  'Shopping List': 'shopping',
  'Cabin Opening': 'unlock',
  'Cabin Closing': 'lock',
  Chores: 'chores',
  Projects: 'build',
  'Major Projects': 'paint',
  Finance: 'money',
  'Lost & Found': 'search',
};

export const linkIcon = (linkTitle: string): IconName =>
  iconMap[linkTitle] ?? 'help';
