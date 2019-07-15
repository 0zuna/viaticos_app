import React, {Component, useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import { NavigationActions } from 'react-navigation';

NewAnticipo = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);


	const register=()=>{
		console.log(viaje)
		axi.post('/api/auth/anticipo',viaje)
		.then((response)=>{
			Alert.alert('Anticipo',`Anticipo registrado`)
			const navigateAction = NavigationActions.navigate({
				routeName: 'ShowViaje'
			});
			props.navigation.dispatch(navigateAction);
			setViajes(response.data)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input label="Anticipo" onChangeText={(t)=>setViaje({...viaje,NewAnticipo:t})} value={viaje.NewAnticipo} placeholder='Anticipo de su viaje' leftIcon={<Icon name='dollar' size={24}/>}/>
				<View style={{padding:20}}>
			</View>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Agregar Anticipo" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewAnticipo;
