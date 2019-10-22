import PropTypes from 'prop-types'
import React, { Component,useEffect, useContext } from 'react'
import styles from './SideMenu.style'
import { NavigationActions } from 'react-navigation'
import { ScrollView, Text, View,Button,TouchableOpacity,AsyncStorage } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import { UserContext } from '../../UserContext'
import { Divider, Avatar } from 'react-native-elements'
import img_icon from '../../assets/icon.png'

const SideMenu=(props) => {
	const [user,setAuth,setLog,axi]=useContext(UserContext)

	useEffect(()=>{
		console.log(user)
	},[])

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		props.navigation.dispatch(navigateAction)
	}

	exit=()=>{
		setAuth(false)
		axi.get('/api/auth/logout').then((response)=>{
			setLog(true)
		});
	}

	return (
		<View style={styles.container}>
			<View style={{alignItems: 'center',justifyContent:'center'}}>
				<Avatar size="medium" source={img_icon} avatarStyle={{backgroundColor:'rgba(255,255,255,1)'}}/>
				<Text h4>Viaticos App</Text>
			</View>
			<ScrollView>
				<View>
					<Text style={styles.sectionHeadingStyle}>
						Viajes
					</Text>
					<View>
						<Text style={styles.navItemStyle} onPress={navigateToScreen('NewViaje')}>
							Nuevo Viaje
						</Text>
					</View>
					<View>
						<Text style={styles.navItemStyle} onPress={navigateToScreen('ShowViajes')}>
							Mis Viajes
						</Text>
					</View>
				</View>
				<Divider />
			</ScrollView>
			<TouchableOpacity onPress={exit} style={styles.footerContainer}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Icon name="log-out" size={30} />
				<Text>Salir</Text>
			</View>
			</TouchableOpacity>
		</View>
	);
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

export default SideMenu;
