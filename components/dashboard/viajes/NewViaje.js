import React, {Component, useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../UserContext';
import DatePicker from 'react-native-datepicker';

NewViaje = () => {

	const [user,setAuth,setLog,axi,viajes,setViajes]=useContext(UserContext);
	const [viaje, setViaje]=useState({})


	const register=()=>{
		axi.post('/api/auth/viaje',viaje)
		.then((response)=>{
			Alert.alert('Viaje',`Viaje registrado`)
			setViaje({})
		})
		.catch((response)=>{
			console.log(response)
			Alert.alert("Error","Se ha producido un error porfavor verifique sus datos y vuelva a intentarlo")
		})
	}


	return (
		<ThemeProvider theme={{ colors: {primary: 'black'}}}>
			<View style={{padding:20}}>
				<Input label="Motivo" onChangeText={(t)=>setViaje({...viaje,motivo:t})} value={viaje.motivo} placeholder='Motivo de su viaje' leftIcon={<Icon name='plane' type="font-awesome" size={24}/>}/>
				<Input label="Anticipo" onChangeText={(t)=>setViaje({...viaje,anticipo:t})} value={viaje.anticipo} placeholder='Anticipo de su viaje' leftIcon={<Icon name='dollar' size={24}/>}/>
				<View style={{padding:20}}>
				<Text>Fecha Inicio</Text>
				<DatePicker
					style={{width: 100+'%'}}
					date={viaje.inicio}
					mode="date"
					placeholder="seleccionar fecha inicio"
					format="YYYY-MM-DD"
					minDate="2019-07-02"
					maxDate="2020-07-02"
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
					onDateChange={(date) => {setViaje({...viaje,inicio:date})}}
				/>
				<Text>Fecha Fin</Text>
				<DatePicker
					style={{width: 100+'%'}}
					date={viaje.fin}
					mode="date"
					placeholder="seleccionar fecha fin"
					format="YYYY-MM-DD"
					minDate="2019-07-02"
					maxDate="2020-07-02"
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0}}}
					onDateChange={(date) => {setViaje({...viaje,fin:date})}}
				/>
			</View>
				<View style={{marginTop:20}}>
				<Button onPress={register} title="Registrar Viaje" type="clear"/>
				</View>
			</View>
		</ThemeProvider>
	);
}

export default NewViaje;
