import React, {Component, useState, useContext, useEffect} from 'react';
import { TouchableOpacity, ImageBackground, Picker, Image, Text, View, StyleSheet, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import { NavigationActions } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

NewGasto = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [gasto, setGasto]=useState({})
	const [hi,setHi]=useState({})
	const [image, setImage]=useState(null)

	useEffect(()=>{
		getPermissionAsync()
	},[])

	gastoPush=()=>{
		axi.post('/api/auth/gasto',{...gasto,viaje_id:viaje.id})
		.then((response)=>{
			setGasto({})
			setViajes(response.data.viajes);
			setImage(null)
			Alert.alert("Gasto","Gasto cargado a su viaje\ndisponible: $"+response.data.disponible)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}
	getPermissionAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			alert('Es necesario el acceso a tu galeria!');
		}
	}

	_pickImage = async (tipo) => {
		//ImagePicker.launchCameraAsync
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
			setGasto({...gasto,imagen:result.base64})
			setImage(result.uri);
		}
	}
	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<ImageBackground source={require('../../../assets/1.png')} style={{width: '100%', height: '100%'}}>
				<View style={{flex:1,marginTop: 22,backgroundColor: 'rgba(255,255,255,.8)'}}>
					<View>
						<Picker selectedValue={gasto.motivo} style={{width: 100+'%'}} onValueChange={(v, k) =>
							setGasto({...gasto,motivo: v})
						}>
							<Picker.Item label="Seleccionar Motivo" value="0" />
							<Picker.Item label="Transporte" value="Transporte" />
							<Picker.Item label="Hospedaje" value="Hospedaje" />
							<Picker.Item label="Comida" value="Comida" />
							<Picker.Item label="Otros" value="Otros" />
						</Picker>
						{gasto.motivo=='Otros' &&
						<Input label="Especifique su gasto" onChangeText={(t)=>setGasto({...gasto,especificacion:t})} value={gasto.especificacion} leftIcon={<Icon name='shopping-cart' size={24}/>}/>
						}
						<Input label="Costo" onChangeText={(t)=>setGasto({...gasto,costo:t})} value={gasto.costo} leftIcon={<Icon name='dollar' size={24}/>}/>
						<View style={{alignItems: 'center', justifyContent:'center'}}>
							<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<TouchableOpacity style={{width:70,padding:10,marginTop:20,backgroundColor:'black'}}onPress={()=>_pickImage('galeria')}>
									<Text style={{color:'white',textAlign:'center'}}>Galeria</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{width:70,padding:10,marginTop:20,backgroundColor:'black'}}onPress={()=>_pickImage('foto')}>
									<Text style={{color:'white',textAlign:'center'}}>Camara</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{alignItems: 'center', justifyContent:'center'}}>
							<TouchableOpacity style={{width:70+'%',height:50,padding:10,marginTop:20,backgroundColor:'black'}} onPress={gastoPush}>
								<Text style={{color:'white',fontSize: 20,textAlign:'center'}}>Agregar Gasto</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ImageBackground>
		</ThemeProvider>
	);
}

export default NewGasto;
