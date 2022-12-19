import { View, Text, StyleSheet, TextInput } from "react-native";

function Input({ label,inputConfig, isValid}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputText, isValid && styles.isValidText]}> {label} </Text>
      <TextInput style={[styles.inputStyle, isValid && styles.isInvalid]} {...inputConfig}/>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  inputStyle:{
    width: 350,
    height: 40,
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 7,
    backgroundColor: "#CDE7DC"
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  invalid:{
    backgroundColor: "#FEDCC8"
  },
  isValidText:{
    color: '#344D67'
  },
  isInvalid:{
    backgroundColor: '#62B6B7'
  }
});
export default Input;
