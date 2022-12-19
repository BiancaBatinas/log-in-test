import axios from "axios";
import { Alert } from "react-native";

export async function autentificare(email,password){
    const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCg1ZbjxQQXWSuhGVLFp65a-wZirkf5UEc",
        {
          email: email,
          password: password,
          returnSecureToken: true //mereu e setat pe true
        },
        {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      );
      const token=response.data.idToken;
      return token;
}
export async function createUser(email, password) {
  //trimitem request catre firebase
  //post request
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCg1ZbjxQQXWSuhGVLFp65a-wZirkf5UEc",
    {
      email: email,
      password: password,
      returnSecureToken: true //mereu e setat pe true
    },
    {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  ) .catch((error) => {

        console.log(error.response.data);
    });
    const token=response.data.idToken;
      return token;
}
