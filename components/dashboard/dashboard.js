import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import SideMenu from './SideMenu'
import stackNav from './stackNav';

const Dashboard = createDrawerNavigator({
  Item1: {
      screen: stackNav,
    }
  },
 {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

export default createAppContainer(Dashboard);
