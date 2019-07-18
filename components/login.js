import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axi from '../bootstrap';
import {AsyncStorage} from 'react-native';
import Register from './register';

const Login=props=>{
	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [register, setRegister] = useState(false);
	//useEffect(()=>{console.log(email)});
	const  logan = () => {
		console.log(email)
		console.log(pass)
		axi.post('/api/auth/login',{"email":email,"password":pass,})
		.then(async response=> {
			console.log(response.data);
			props.user(response.data.user)
			Alert.alert('Esta sesion expira el '+response.data.expires_at)
			await AsyncStorage.setItem('secure_token',response.data.access_token);
			props.axi.defaults.headers.common['Authorization'] = 'Bearer '+response.data.access_token;
			props.auth(true)
		}).catch(e=>{
			console.log(e.response.data)
			Alert.alert('Las credenciales no coinciden con nuestras bases de datos')
		})
	}
	if(register) return <Register setRegister={setRegister}/>

	return (
		<ImageBackground source={require('../assets/1.png')} style={{width: '100%', height: '100%'}}>
			<View style={styles.log}>
				<Text style={{color:'white',fontSize: 20}}>Login</Text>
				<TextInput onChangeText={(t)=>setEmail(t)} value={email} style={styles.input} placeholder={'Correo'} placeholderTextColor='rgba(255,255,255,.7)'/>
				<TextInput onChangeText={(t)=>setPass(t)} value={pass} style={styles.input} placeholder={'Contraseña'} placeholderTextColor='rgba(255,255,255,.7)' secureTextEntry={true}/>
				<TouchableOpacity style={styles.btnLog} onPress={logan}>
					<Text style={{color:'grey',fontSize: 20,textAlign:'center'}}>Entrar</Text>
				</TouchableOpacity>
				<Text style={{color: 'white',fontSize:18}} onPress={()=>setRegister(true)}>Registrarse?</Text>

			</View>
		</ImageBackground>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
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
		backgroundColor:'white',
		opacity: .9,
		//textAlign:'center',
		padding:10,
		marginTop:20
	}
});
export default Login
