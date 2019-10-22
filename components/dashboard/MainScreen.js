import React, {Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import back from '../../assets/background.png'

MainScreen=(props)=>{

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		props.navigation.dispatch(navigateAction);
	}

	return (
		<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
			<Image resizeMode='cover' style={{width:300,height: 300}} source={back} />
		</View>
	)
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default MainScreen;
