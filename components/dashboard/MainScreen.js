import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

MainScreen=(props)=>{

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		props.navigation.dispatch(navigateAction);
	}

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={styles.container}>
				<Text>VIATICOS APP</Text>
			</View>
		</ThemeProvider>
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
