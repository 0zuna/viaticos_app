import React, {Component, useState, useContext, useEffect} from 'react';
import { Picker, Image, ImageBackground,TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import img_icon from '../../../assets/2.png';
import { NavigationActions } from 'react-navigation';


ShowViaje = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [modalViaje,setModalViaje]=useState(false)

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

	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
				<View style={{marginTop: 22}}>
					<View>
						<View style={{flexDirection: 'row'}}>
							{viaje.status=='En Curso'&&
							<TouchableOpacity style={{marginLeft: 'auto',padding:10,backgroundColor:'black'}}onPress={_finalizarViaje}>
								<Text style={{color:'white',textAlign:'center'}}>Finalizar Viaje</Text>
							</TouchableOpacity>
							}
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
		</ThemeProvider>
	);
}

export default ShowViaje;
