import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import TabNavigator from './MainTabNavigator';
import { colors, fonts } from '../../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingLeft: 10,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  )
}

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: 'Speech Cadet',
    displayName: 'Start A Recording',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

]

export default StackNavigationData;
