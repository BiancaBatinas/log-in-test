import { View, Pressable, StyleSheet, Text } from "react-native";

function Button({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 2,
    backgroundColor: "#4F8A98",
    width: 100,
    height: 40,
  },
  pressed: { opacity: 0.6 },
});
export default Button;
