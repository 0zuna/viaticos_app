import React, {Component, useState, useContext, useEffect} from 'react';
import { Picker, Image, ImageBackground,TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import img_icon from '../../../assets/2.png';
import { NavigationActions } from 'react-navigation';


ShowViaje = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [loader,setLoader]=useState(true)
	const [modalViaje,setModalViaje]=useState(false)


	useEffect(()=>{
		axi.get('/api/auth/viaje')
		.then((response)=>{
			setViajes(response.data)
			setLoader(false)
		})
		.catch((response)=>{
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	},[])
	const ver=viaje=>{
		setViaje(viaje)
		setModalViaje(true)
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
	_newGasto=(viaje)=>{
		setViaje(viaje)
		const navigateAction = NavigationActions.navigate({
			routeName: 'NewGasto'
		});
		props.navigation.dispatch(navigateAction);
	}
	_showViaje=(viaje)=>{
		setViaje(viaje)
		console.log(viaje)
		const navigateAction = NavigationActions.navigate({
			routeName: 'ShowViaje'
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
							<Text style={parseInt(viaje.disponible)<=0?styles.rojo:parseInt(viaje.disponible.match(/(\d+)/g).join(''))<=(parseInt(viaje.anticipo.match(/(\d+)/g).join(''))/2)?styles.amarillo:styles.verde}>
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
						onPress={()=>_newGasto(viaje)}
						iconRight={true}
					/></View>}
					<Button
						icon={<Icon name='eye' color='#ffffff' />}
						buttonStyle={{borderRadius: 0}}
						title='Ver  '
						onPress={()=>_showViaje(viaje)}
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
