import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
//viaje
import NewViaje from "./viajes/NewViaje";
import ShowViaje from "./viajes/ShowViaje";
import NewAnticipo from "./viajes/NewAnticipo";
import NewGasto from "./viajes/NewGasto";

const stackNav = createStackNavigator({
	Main : {
		screen: MainScreen,
		navigationOptions: ({navigation}) => ({
			title: "Viaticos App",
			headerLeft:(
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<View style={{paddingLeft: 15}}>
						<IOSIcon name="ios-menu" size={30} />
					</View>
				</TouchableOpacity>
			),
		})
	},
	NewViaje: {
		screen: NewViaje,
		navigationOptions: ({navigation}) => ({title: "Nuevo Viaje"})
	},
	ShowViaje: {
		screen: ShowViaje,
		navigationOptions: ({navigation}) => ({title: "Mis Viajes"})
	},
	NewAnticipo: {
		screen:NewAnticipo,
		navigationOptions: ({navigation}) => ({title: "Anticipo"})
	},
	NewGasto: {
		screen:NewGasto,
		navigationOptions: ({navigation}) => ({title: "Nuevo Gasto"})
	},
});

export default stackNav;
