import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import {  useContext, useState } from "react";
import { autentificare } from "../util/auth";
import LoadingOverlay from "./LoadingOverlay";
import { AuthContext } from "../store/auth_context";

function Login({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler(email, password) {
    setIsAuth(true);
    try {
      const token = await autentificare(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials ir try again later!"
      );
    }

    setIsAuth(false);
  }
  function updateInputHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    let email = enteredEmail.trim();
    let password = enteredPassword.trim();
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: false,
        password: !passwordIsValid,
        confirmPassword: false,
      });
      return;
    } else {
      setEnteredEmail("");
      setEnteredPassword("");
      setCredentialsInvalid({
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
      });
    }
    signupHandler(email, password);
  }

  if (isAuth) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return (
    <View style={styles.login}>
      <View style={styles.imgContainer}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/Pngtreebusiness_concept_growth_and_career_7258924.png")}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.textStyle}>
          <Text style={styles.text}>Log in</Text>
        </View>
        <View style={styles.inputStyle}>
          <Input
            label="Email"
            inputConfig={{
              keyboardType: "email-address",
              autoCapitalize: "none",
              onChangeText: updateInputHandler.bind(this, "email"),
              value: enteredEmail,
            }}
            isValid={credentialsInvalid.email}
          />
          <Input
            label="Password"
            inputConfig={{
              keyboardType: "default",
              autoCapitalize: "none",
              onChangeText: updateInputHandler.bind(this, "password"),
              value: enteredPassword,
              secureTextEntry: true,
            }}
            isValid={credentialsInvalid.password}
          />
        </View>
        <View style={styles.create}>
          <Text style={styles.text1}> Create an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Signup");
              setCredentialsInvalid({
                email: false,
                confirmEmail: false,
                password: false,
                confirmPassword: false,
              });
            }}
          >
            <Text style={styles.text2}>SignUp</Text>
          </Pressable>
        </View>
        <View>
          <Button onPress={submitHandler}>Log in</Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    height: 560,
    width: "100%",
    marginTop: 250,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: "absolute",
  },
  login: {
    backgroundColor: "#4F8A98",
    width: "100%",
    position: "absolute",
  },
  inputStyle: {
    marginTop: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 26,
    marginTop: 40,
  },
  create: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 50,
  },
  text1: {
    fontSize: 15,
  },
  text2: {
    fontSize: 18,
    color: "#4F8A98",
  },
  imgContainer: {
    height: 300,
    width: 410,
  },
  img: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
});
export default Login;
