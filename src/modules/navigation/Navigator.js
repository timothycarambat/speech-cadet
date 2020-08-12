import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
const iconHome = require('../../../assets/images/drawer/rec_light.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');

const drawerData = [
  {
    name: 'Home',
    displayName: 'Start A Recording',
    icon: iconHome,
  },
  {
    name: 'Settings',
    displayName: 'Settings',
    icon: iconSettings,
  },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{padding: 0}}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/images/icon.png')}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.userName}>Speech Cadet</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx+1}`}
          label={() => (
            <View
              style={styles.menuLabelFlex}>
              <Image
                style={{ width: 20, height: 20}}
                source={item.icon}
              />
              <Text style={styles.menuTitle}>{item.displayName}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#3C38B1',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
