import React, { useLayoutEffect, useEffect, useState, useContext} from 'react';
import {AsyncStorage, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Login from './components/login';
import Dashboard from './components/dashboard/dashboard';
import axi from './bootstrap';
import {UserProvider} from './UserContext';

const App=()=>{
	const [auth, setAuth] = useState(false);
	const [log, setLog] = useState(false);
	const [user, setUser] = useState({})
	useEffect(()=>{
	async function fetchData() {
		const AUTH_TOKEN = await AsyncStorage.getItem('secure_token');
		axi.defaults.headers.common['Authorization'] = 'Bearer '+AUTH_TOKEN;
		axi.get('/api/auth/user').then(response=>{
			setUser(response.data)
			setAuth(true)
		}).catch(e=>{
			console.log(e.response.data)
			setLog(true)
		})
	}
	fetchData()
	},[])
	if(auth)return <UserProvider axi={axi} auth={[auth,setAuth]} log={[log,setLog]} user={[user,setUser]}><Dashboard /></UserProvider>
	if(log)return <Login axi={axi} auth={setAuth}/>

	return (
		<View style={{flex: 1,justifyContent: 'center'}}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App
