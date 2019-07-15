import React, {Component, useState, useContext, useEffect} from 'react';
import { Picker, Image, ImageBackground,TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import img_icon from '../../../assets/2.png';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


ShowViaje = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [gasto, setGasto]=useState({})
	const [loader,setLoader]=useState(true)
	const [modalViaje,setModalViaje]=useState(false)
	const [modalGasto,setModalGasto]=useState(false)
	const [image, setImage]=useState(null)


	useEffect(()=>{
		axi.get('/api/auth/viaje')
		.then((response)=>{
			setViajes(response.data)
			setLoader(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
		getPermissionAsync()
	},[])
	const ver=viaje=>{
		setViaje(viaje)
		setModalViaje(true)
	}
	const _gasto=viaje=>{
		setGasto({...gasto,viaje_id:viaje.id})
		setModalGasto(true)
	}
	const gastoPush=()=>{
		axi.post('/api/auth/gasto',gasto)
		.then((response)=>{
			setGasto({})
			setModalGasto(false)
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
	_finalizarViaje = () => {
		console.log(viaje)
		axi.put(`/api/auth/finalizarviaje/${viaje.id}`,viaje)
		.then((response)=>{
			Alert.alert("Viaje","Viaje finalizado")
			console.log(response.data)
			v=viajes.map((v)=>{
				if(v.id==viaje.id){
					v.status='Finalizado'
				}
				return v
			})
			setViajes(v)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}
	_anticipo=(viaje) => {
		setViaje(viaje)
		const navigateAction = NavigationActions.navigate({
			routeName: 'NewAnticipo'
		});
		props.navigation.dispatch(navigateAction);
        }
	if(loader)
		return (
			<View style={{flex: 1,justifyContent: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<Modal animationType="slide" transparent={false} visible={modalViaje} onRequestClose={()=>setModalViaje(false)}>
				<View style={{marginTop: 22}}>
					<View>
						<View style={{flexDirection: 'row'}}>
							<Icon size={40} name='arrow-circle-left' type='font-awesome' color='black' onPress={() => setModalViaje(false)} />
							{viaje.status=='En Curso'&&
							<TouchableOpacity style={{marginLeft: 'auto',padding:10,backgroundColor:'black'}}onPress={_finalizarViaje}>
								<Text style={{color:'white',textAlign:'center'}}>Finalizar Viaje</Text>
							</TouchableOpacity>
							}
						</View>
						<View style={{alignItems: 'center', justifyContent:'center'}}>
							<Text h4>Viaje</Text>
						</View>
						<Input label="Motivo" value={viaje.motivo} leftIcon={<Icon name='plane' type="font-awesome" size={24}/>}/>
						<Input label="Anticipo" value={viaje.anticipo} leftIcon={<Icon name='dollar' size={24}/>}/>
						<Input label="Fecha Inicio" value={viaje.inicio} leftIcon={<Icon name='calendar' size={24}/>}/>
						<Input label="Fecha Fin" value={viaje.fin} leftIcon={<Icon name='calendar' size={24}/>}/>
					</View>
					<View style={{height:250}}>
					<ScrollView>
						{viaje.gastos.map((gasto,k)=>
							<Card key={k} title={gasto.motivo} image={{uri:`${axi.defaults.baseURL}/img/${user.id}/${viaje.id}/${gasto.id}.png`}}>
								<View style={{flexDirection: 'row', alignItems: 'center'}}>
										<Text style={{marginBottom: 10}}>
											costo: ${gasto.costo}
										</Text>
										<Text style={{marginBottom: 10, marginLeft:10}}>
											fecha: {gasto.created_at}
										</Text>
									</View>
							</Card>
							
						)}
					</ScrollView>
					</View>
					</View>
			</Modal>
			<Modal animationType="slide" transparent={false} visible={modalGasto} onRequestClose={()=>setModalGasto(false)}>
			<ImageBackground source={require('../../../assets/1.png')} style={{width: '100%', height: '100%'}}>
				<View style={{flex:1,marginTop: 22,backgroundColor: 'rgba(255,255,255,.8)'}}>
					<View>
						<Icon size={40} name='arrow-circle-left' type='font-awesome' color='black' onPress={() => setModalGasto(false)} />
						<View style={{alignItems: 'center', justifyContent:'center'}}>
							<Text h4>Gasto</Text>
						</View>
						{/*<Input label="Motivo" onChangeText={(t)=>setGasto({...gasto,motivo:t})} value={gasto.motivo} leftIcon={<Icon name='cart-arrow-down' type="font-awesome" size={24}/>}/>
						*/}
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
							<TouchableOpacity style={{width:70+'%',height:50,padding:10,marginTop:20,backgroundColor:'black'}}onPress={gastoPush}>
								<Text style={{color:'white',fontSize: 20,textAlign:'center'}}>Agregar Gasto</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ImageBackground>
			</Modal>
		<ScrollView>
			<View style={{padding:20}}>
			{viajes.map((viaje,k)=>
				<Card key={k} title={viaje.motivo}>
					<View style={{flexDirection:'row'}}>
						<View>
							<Text style={{marginBottom: 10}}>
								Inicio del viaje: {viaje.inicio}
							</Text>
							<Text style={{marginBottom: 10}}>
								Fin del viaje: {viaje.fin}
							</Text>
							<Text style={{marginBottom: 10}}>
								Anticipo: ${viaje.anticipo}
							</Text>
						</View>
						<View style={{marginLeft:20}}>
							<Text>
								Disponible:
							</Text>
							<Text style={parseInt(viaje.disponible)<=0?styles.rojo:parseInt(viaje.disponible)<=(parseInt(viaje.anticipo)/2)?styles.amarillo:styles.verde}>
								${viaje.disponible}
							</Text>
						</View>
					</View>
					<View style={{flexDirection:'row', alignItems: 'center'}}>
					{viaje.status=='En Curso'&&
					<View style={{flexDirection:'row', alignItems: 'center'}}><Button
						icon={<Icon name='dollar' color='#ffffff' />}
						buttonStyle={{borderRadius: 0}}
						title='Anticipo '
						onPress={()=>_anticipo(viaje)}
						iconRight={true}
					/>
					<Button
						icon={<Icon name='dollar' color='#ffffff' />}
						buttonStyle={{borderRadius: 0}}
						title='Gasto '
						onPress={()=>_gasto(viaje)}
						iconRight={true}
					/></View>}
					<Button
						icon={<Icon name='eye' color='#ffffff' />}
						buttonStyle={{borderRadius: 0}}
						title='Ver  '
						onPress={()=>ver(viaje)}
						iconRight={true}
					/>
					</View>
				</Card>
				
			)}
			</View>
		</ScrollView>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
  verde: {
    marginBottom: 10,
    fontWeight: 'bold', 
    color:'green'
  },
  amarillo: {
    marginBottom: 10,
    fontWeight: 'bold', 
    color:'#FCAF3E'
  },
  rojo: {
    marginBottom: 10,
    fontWeight: 'bold', 
    color:'red'
  },
});
export default ShowViaje;
