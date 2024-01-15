import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogin:(email, password) => {localStorage.setItem('isLoggedIn', '1')},
    onLogout:() => { localStorage.clear();} 
});


export const AuthContextProvider = (props)=> {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(()=> {
        if(localStorage.getItem('isLoggedIn') === '1') setLoggedIn(true);
      },[])

    const logoutHandler = () =>{
        setLoggedIn(false);
    }
    const loginHandler = () =>{
        setLoggedIn(true);
    }
    return <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        onLogin:loginHandler,
        onLogout:logoutHandler
    }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;