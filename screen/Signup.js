import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "../components/Button";
import Input from "../components/Input";
import { useContext, useState } from "react";
import { createUser } from "../util/auth";
import LoadingOverlay from "./LoadingOverlay";
import { AuthContext } from "../store/auth_context";

function Signup({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
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
    const token = await createUser(email, password);
    authCtx.authenticate(token);
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
      case "confirmemail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "confirmpassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    let email = enteredEmail.trim();
    let password = enteredPassword.trim();
    let confirmEmail = enteredConfirmEmail.trim();
    let confirmPassword = enteredConfirmPassword.trim();

    let emailIsValid = email.includes("@");
    let passwordIsValid = password.length > 6;
    let confirmemailisValid = email === confirmEmail;
    let confirmpassword = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !confirmemailisValid ||
      !confirmpassword
    ) {
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !confirmemailisValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !confirmpassword,
      });
      return;
    } else {
      setEnteredEmail("");
      setEnteredPassword("");
      setEnteredConfirmEmail("");
      setEnteredConfirmPassword("");
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
      <View style={styles.imgContainer}></View>
      <Animatable.View animation="fadeInUpBig" style={styles.loginContainer}>
        <View style={styles.textStyle}>
          <Text style={styles.text}>Sign up</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
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
              label="Confirm Email"
              inputConfig={{
                keyboardType: "email-address",
                autoCapitalize: "none",
                onChangeText: updateInputHandler.bind(this, "confirmemail"),
                value: enteredConfirmEmail,
              }}
              isValid={credentialsInvalid.confirmEmail}
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
            <Input
              label="Confirm password"
              inputConfig={{
                keyboardType: "default",
                autoCapitalize: "none",
                onChangeText: updateInputHandler.bind(this, "confirmpassword"),
                value: enteredConfirmPassword,
                secureTextEntry: true,
              }}
              isValid={credentialsInvalid.confirmPassword}
            />
          </View>
          <View style={styles.create}>
            <Text style={styles.text1}>Already have an account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
                setCredentialsInvalid({
                  email: false,
                  confirmEmail: false,
                  password: false,
                  confirmPassword: false,
                });
              }}
            >
              <Text style={styles.text2}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.alignCenter}>
            <Button onPress={submitHandler}>Sign up</Button>
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    height: 660,
    width: "100%",
    marginTop: 100,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: "absolute",
  },
  login: {
    backgroundColor: "#4F8A98",
    width: "100%",
    position: "absolute",
    height: '100%'
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
    marginLeft: 35,
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
  alignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Signup;
