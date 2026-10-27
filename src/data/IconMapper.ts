import type { SvgIconComponent } from '@mui/icons-material';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Build from '@mui/icons-material/Build';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import Explore from '@mui/icons-material/Explore';
import FormatPaint from '@mui/icons-material/FormatPaint';
import HelpOutline from '@mui/icons-material/HelpOutlineOutlined';
import InsertInvitation from '@mui/icons-material/InsertInvitation';
import LocalGroceryStore from '@mui/icons-material/LocalGroceryStore';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Search from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import WbCloudy from '@mui/icons-material/WbCloudy';

const iconMap: Record<string, SvgIconComponent> = {
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

export const mapLinkToIcon = (linkTitle: string): SvgIconComponent =>
  iconMap[linkTitle] ?? HelpOutline;
