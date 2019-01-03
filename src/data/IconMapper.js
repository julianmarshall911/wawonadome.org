'use es6';

import {
  Settings,
  HelpOutline,
  InsertInvitation,
  Explore,
  WbCloudy,
  LocalGroceryStore,
  LockOpen,
  Lock,
  DeleteSweep,
  Build,
  FormatPaint,
  AttachMoney,
  Search,
} from '@material-ui/icons';

const iconMap = {
  'Admin Page': Settings,
  Calendar: InsertInvitation,
  Map: Explore,
  Weather: WbCloudy,
  'Shopping List': LocalGroceryStore,
  'Cabin Opening': LockOpen,
  'Cabin Closing': Lock,
  Chores: DeleteSweep,
  Projects: Build,
  'Major Projects': FormatPaint,
  Finance: AttachMoney,
  'Lost & Found': Search,
};

export const mapLinkToIcon = linkTitle => iconMap[linkTitle] || HelpOutline;
