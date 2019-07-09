import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, StyleSheet, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axi from '../bootstrap';
import {AsyncStorage} from 'react-native';

const Register=props=>{
	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [data, setData] = useState({})
	//useEffect(()=>{console.log(email)});
	const  registradora = () => {
		axi.post('/api/auth/signup',data)
		.then(async response=> {
			console.log(response.data);
			Alert.alert('Usuario creado con exito','ingrese sus datos para iniciar sesion')
			props.setRegister(false)
		}).catch(e=>{
			console.log(e.response.data)
			Alert.alert('Error','No se pudo dar de alta el usuario,\nverifique sus datos y vuelva a intentarlo')
		})
	}

	return (
		<ImageBackground source={require('../assets/1.png')} style={{width: '100%', height: '100%'}}>
			<View style={styles.container}>
			<Icon size={40} name='arrow-circle-left' type='font-awesome' color='black' onPress={() => props.setRegister(false)} />
				<Input label="Nombre Colaborador" onChangeText={(d)=>setData({...data,colaborador:d})} value={data.colaborador} placeholder='Nombre del Colaborador' leftIcon={<Icon name='user' size={24}/>}/>
				<Input label="Correo" onChangeText={(d)=>setData({...data,email:d})} value={data.email} placeholder='Correo electronico' leftIcon={<Icon name='envelope' size={24}/>}/>
				<Input label="Telefono" onChangeText={(d)=>setData({...data,telefono:d})} value={data.telefono} placeholder='Numero Telefonico' leftIcon={<Icon name='phone' size={24}/>}/>
				<Text style={{marginTop:10, fontWeight: 'bold',color:'grey', fontSize:17, position:'relative', left:10}}>Departamento</Text>
				<Picker selectedValue={data.departamento} style={{width: 100+'%'}} onValueChange={(v, k) =>
					setData({...data,departamento: v})
				}>
					<Picker.Item label="Seleccionar departamento" value="0" />
					<Picker.Item label="ADMINISTRACIÓN" value="ADMINISTRACIÓN" />
					<Picker.Item label="OPERACIÓN" value="OPERACIÓN" />
					<Picker.Item label="COMERCIAL" value="COMERCIAL" />
					<Picker.Item label="FINANZAS" value="FINANZAS" />
					<Picker.Item label="OBRAS Y PROYECTOS" value="OBRAS Y PROYECTOS" />
					<Picker.Item label="DIRECCION DE TRAFICO" value="DIRECCION DE TRAFICO" />
				</Picker>
				<Input label="Contraseña" secureTextEntry={true}
					onChangeText={(d)=>setData({...data,password:d})}
					value={data.password}
			  		placeholder='Contraseña'
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
				/>
				<Input label="Confirmacion" secureTextEntry={true}
					onChangeText={(d)=>setData({...data,password_confirmation:d})}
					value={data.password_confirmation}
			  		placeholder='Vuelva a escribir su Contraseña'
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
				/>
				<View style={{alignItems: 'center'}}>
				<TouchableOpacity style={styles.btnLog} onPress={registradora}>
					<Text style={{color:'white',fontSize: 20,textAlign:'center'}}>REGISTRARSE</Text>
				</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,.8)',
		//alignItems: 'center',
		justifyContent: 'center',
	},
	log: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input:{
		margin:5,
		width:70+'%',
		height:45,
		borderRadius:25,
		fontSize:16,
		paddingLeft:45,
		backgroundColor:'rgba(0,0,0,.35)',
		color:'rgba(255,255,255,.7)',
		marginHorizontal:25
	},
	btnLog:{
		width:70+'%',
		height:50,
		//borderRadius:25,
		//fontSize:18,
		backgroundColor:'#646B63',
		//opacity: .9,
		//textAlign:'center',
		padding:10,
		marginTop:20,
	}
});
export default Register
