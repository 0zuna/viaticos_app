import React, {Component, useState, useContext, useEffect} from 'react';
import { ImageBackground,TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import img_icon from '../../../assets/2.png';

ShowViaje = () => {

	const [user,setAuth,setLog,axi]=useContext(UserContext);
	const [viajes, setViajes]=useState([])
	const [viaje, setViaje]=useState({gastos:[]})
	const [gasto, setGasto]=useState({})
	const [loader,setLoader]=useState(true)
	const [modalViaje,setModalViaje]=useState(false)
	const [modalGasto,setModalGasto]=useState(false)


	useEffect(()=>{
		axi.get('/api/auth/viaje')
		.then((response)=>{
			setViajes(response.data)
			console.log(viajes)
			setLoader(false)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	},[])
	const ver=viaje=>{
		setViaje(viaje)
		setModalViaje(true)
		console.log(viaje)
	}
	const _gasto=viaje=>{
		setGasto({...gasto,viaje_id:viaje.id})
		setModalGasto(true)
	}
	const gastoPush=()=>{
		console.log(gasto)
		axi.post('/api/auth/gasto',gasto)
		.then((response)=>{
			setGasto({})
			setModalGasto(false)
			Alert.alert("Gasto","Gasto cargado a su viaje\ndisponible: $"+response.data.disponible)
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
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
						<Icon size={40} name='arrow-circle-left' type='font-awesome' color='black' onPress={() => setModalViaje(false)} />
						<View style={{alignItems: 'center', justifyContent:'center'}}>
							<Text h4>Viaje</Text>
						</View>
						<Input label="Motivo" value={viaje.motivo} leftIcon={<Icon name='plane' type="font-awesome" size={24}/>}/>
						<Input label="Anticipo" value={viaje.anticipo} leftIcon={<Icon name='dollar' size={24}/>}/>
						<Input label="Fecha Inicio" value={viaje.inicio} leftIcon={<Icon name='calendar' size={24}/>}/>
						<Input label="Fecha Fin" value={viaje.fin} leftIcon={<Icon name='calendar' size={24}/>}/>
					</View>
					<ScrollView>
						{viaje.gastos.map((gasto,k)=>
							<Card key={k} title={gasto.motivo} image={{uri:'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/03/cafe.jpg'}}>
									<View>
										<Text style={{marginBottom: 10}}>
											costo: {gasto.costo}
										</Text>
									</View>
							</Card>
							
						)}
					</ScrollView>
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
						<Input label="Motivo" onChangeText={(t)=>setGasto({...gasto,motivo:t})} value={gasto.motivo} leftIcon={<Icon name='cart-arrow-down' type="font-awesome" size={24}/>}/>
						<Input label="Costo" onChangeText={(t)=>setGasto({...gasto,costo:t})} value={gasto.costo} leftIcon={<Icon name='dollar' size={24}/>}/>
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
							<Text style={{marginBottom: 10,color:'green',fontWeight: 'bold'}}>
								${viaje.anticipo}
							</Text>
						</View>
					</View>
					<View style={{flexDirection:'row', alignItems: 'center'}}>
					<Button
						icon={<Icon name='dollar' color='#ffffff' />}
						buttonStyle={{borderRadius: 0, margin:20}}
						title='Agregar Gasto'
						onPress={()=>_gasto(viaje)}
					/>
					<Button
						icon={<Icon name='eye' color='#ffffff' />}
						buttonStyle={{borderRadius: 0, margin:20}}
						title='Ver'
						onPress={()=>ver(viaje)}
					/>
					</View>
				</Card>
				
			)}
			</View>
		</ScrollView>
		</ThemeProvider>
	);
}

export default ShowViaje;
