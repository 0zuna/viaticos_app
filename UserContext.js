import React,{useState,createContext} from 'react';

export const UserContext = createContext();
export const UserProvider = props => {
	const [user,setUser] = props.user;
	const [auth, setAuth] = props.auth;
	const [log, setLog] = props.log;
	const axi=props.axi
	return (
		<UserContext.Provider value={[user,setAuth,setLog,axi]}>
			{props.children}
		</UserContext.Provider>
	)
}
