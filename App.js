import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home.js";
import Add from "./screen/Add";
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
const CustomTabButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 36,
          backgroundColor: "#E63B60",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
//se foloseste doar cand user-ul este autentificat deja
function AutentificatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4F8A98" },
        headerTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 4,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <BottomStack.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/216242_home_icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    color: "red",
                    tintColor: focused ? "#E63B60" : "#8F8F8F",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E63B60" : "#8F8F8F",
                    fontSize: 12,
                  }}
                >
                  HOME
                </Text>
              </View>
            );
          },
        }}
      />
      <BottomStack.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require("./assets/134224_add_plus_new_icon.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "white",
                }}
              />
            );
          },
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <BottomStack.Screen
        name="Notif"
        component={Notif}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/2203538_alarm_bell_notification_ring_icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    color: "red",
                    tintColor: focused ? "#E63B60" : "#8F8F8F",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E63B60" : "#8F8F8F",
                    fontSize: 12,
                  }}
                >
                  NOTIFICARI
                </Text>
              </View>
            );
          },
        }}
      />
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
