import React, {Component, useState, useContext, useEffect} from 'react';
import { Picker, Image, ImageBackground,TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { ThemeProvider, Input, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import img_icon from '../../../assets/2.png';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';


ShowViaje = (props) => {

	const [user,setAuth,setLog,axi,viajes,setViajes,viaje,setViaje]=useContext(UserContext);
	const [modalViaje,setModalViaje]=useState(false)

	const _finalizarViaje = () => {
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
	
	const _updateDate = (date) => {
		axi.put(`/api/auth/extendDate/${viaje.id}`,{...viaje,fin:date})
		.then((response)=>{
			Alert.alert("Update","Fecha actualizada")
			console.log(response.data)
			v=viajes.map((v)=>{
				if(v.id==viaje.id){
					v.fin=date
				}
				return v
			})
			setViajes(v)
		})
		.catch(r=>alert(r))
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
						<Text>Fecha Inicio</Text>
						<DatePicker
							style={{width: 100+'%'}}
							date={viaje.inicio}
							mode="date"
							placeholder="Fecha Fin"
							format="YYYY-MM-DD"
							minDate="2019-07-02"
							maxDate="2020-07-02"
							confirmBtnText="Confirmar"
							cancelBtnText="Cancelar"
							customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
							disabled
						/>
						<Text>Fecha Fin</Text>
						<DatePicker
							style={{width: 100+'%'}}
							date={viaje.fin}
							mode="date"
							placeholder="Fecha Fin"
							format="YYYY-MM-DD"
							minDate="2019-07-02"
							maxDate="2020-07-02"
							confirmBtnText="Confirmar"
							cancelBtnText="Cancelar"
							customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
							onDateChange={(date) => {_updateDate(date)}}
						/>
					</View>
					<View style={{height:250}}>
					<ScrollView>
						{viaje.gastos.map((gasto,k)=>
							<Card key={k} title={gasto.motivo} image={{uri:`${axi.defaults.baseURL}/img/${user.id}/viajes/${viaje.id}/gastos/${gasto.id}.jpg`}}>
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
