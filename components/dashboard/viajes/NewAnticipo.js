import React, { Component, useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../../UserContext';
import { NavigationActions } from 'react-navigation';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

const NewAnticipo = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [image, setImage]=useState(null)

	useEffect(()=>{
		getPermissionAsync()
	},[])

	getPermissionAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			alert('Es necesario el acceso a tu galeria!');
		}
	}

	const register=()=>{
		console.log(viaje)
		axi.post('/api/auth/anticipo',viaje)
		.then((response)=>{
			Alert.alert('Anticipo',`Anticipo registrado`)
			const navigateAction = NavigationActions.navigate({
				routeName: 'ShowViajes'
			});
			props.navigation.dispatch(navigateAction);
			setViajes(response.data)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}

	const _pickImage = async (tipo) => {
		if(tipo=='galeria')
			result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			base64: true,
		});
		if(tipo=='foto')
			result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			base64: true,
		});
		if (!result.cancelled) {
			setViaje({...viaje, imagen:result.base64})
			setImage(result.uri);
		}
	}

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input label="Anticipo" onChangeText={(t)=>setViaje({...viaje,NewAnticipo:t})} value={viaje.NewAnticipo} placeholder='Anticipo de su viaje' leftIcon={<Icon name='dollar' size={24}/>}/>
				<View style={{alignItems: 'center', justifyContent:'center', margin:30}}>
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<TouchableOpacity style={{width:70,padding:10,marginTop:20,backgroundColor:'black'}} onPress={()=>_pickImage('galeria')}>
							<Text style={{color:'white',textAlign:'center'}}>Galeria</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{width:70,padding:10,marginTop:20,backgroundColor:'black'}} onPress={()=>_pickImage('foto')}>
							<Text style={{color:'white',textAlign:'center'}}>Camara</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{marginTop:20}}>
					<Button onPress={register} title="Agregar Anticipo" type="solid"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewAnticipo;
