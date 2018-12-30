'use es6';

import { Settings, HelpOutline } from '@material-ui/icons';

const iconMap = {
  'Admin Page': Settings,
};

export const mapLinkToIcon = linkTitle => iconMap[linkTitle] || HelpOutline;
