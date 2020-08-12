import { compose, withState } from 'recompose';

import SettingsScreen from './SettingsView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  SettingsScreen,
);
