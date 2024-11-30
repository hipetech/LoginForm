import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from '../ui/textInput.tsx';
import { Button } from '../ui/button.tsx';

export const Login = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter username"
            focusedPlaceholder="Username"
          />
          <TextInput
            placeholder="Enter password"
            focusedPlaceholder="Password"
            secureTextEntry={true}
          />
        </View>
        <Button>Login</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
});
