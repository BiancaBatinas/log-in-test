import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  
  const [authToken, setAuthToken] = useState();
  useEffect(()=>{
    async function fetchToken(){
    
    const storedToken = await AsyncStorage.getItem('token');
   if(storedToken)
   {
    setAuthToken(storedToken);
   }
  }
  fetchToken();
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }
  
  const value = {
    token: authToken,
    isAuthenticated: !!authToken ? true : false,
    authenticate: authenticate,
    logout: logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
