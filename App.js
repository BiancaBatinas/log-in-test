import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home.js";
import Notif from "./screen/Notif.js";
import Signup from "./screen/Signup.js";
import Login from "./screen/Login.js";
import AuthProvider, { AuthContext } from "./store/auth_context.js";
import { useContext, useState } from "react";
import IconButton from "./components/IconButton.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

//se foloseste pentru autentifiarea utilizatorului
//este primul deschis deoarece un utilizator nou trebuie sa se
//inscrie
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4F8A98",
          headerTintColor: "#CED7DC",
        },
        headerTitle: "",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

//se foloseste doar cand user-ul este autentificat deja
function AutentificatedStack() {
  const authCtx=useContext(AuthContext);
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4F8A98" },
        headerTintColor: "white",
      }}
    >
      <BottomStack.Screen name="home" component={Home} options={{
        headerRight: ({tintColor})=> <IconButton icon="exit" size={24}
        color={tintColor} onPress={authCtx.logout}/>
      }}/>
      <BottomStack.Screen name="Notif" component={Notif} />
    </BottomStack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && <AutentificatedStack />}
      {!authCtx.isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  //nu se foloseste aici pt ca-l seteaza global ca false
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
