import HomeScreen from '../home/HomeViewContainer';
import SettingsScreen from '../settings/SettingsViewContainer';
const iconHome = require('../../../assets/images/tabbar/rec.png');
const iconSettings = require('../../../assets/images/drawer/settings_dark.png');


const tabNavigationData = [
  {
    name: 'Record',
    displayName: 'Start A Recording',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Settings',
    displayName: 'Settings',
    component: SettingsScreen,
    icon: iconSettings,
  },
];

export default tabNavigationData;
