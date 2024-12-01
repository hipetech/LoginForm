import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button } from '../ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextInput } from '../components/controlledTextInput.tsx';
import { useMutation } from '@tanstack/react-query';
import { userLogin } from '../services/userLogin.ts';
import { ErrorBanner } from '../components/errorBanner.tsx';
import { formSchema } from '../schemas/formSchema.ts';

import type { User } from '../types/User.ts';
import type { LoginCredentials } from '../types/LoginCredentials.ts';

export const Login = () => {
  const { control, handleSubmit, watch, resetField, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  const clearField = (fieldName: string) => {
    resetField(fieldName);
    setValue(fieldName, '');
  };

  const { mutate, isPending, error } = useMutation<
    User,
    Error,
    LoginCredentials
  >({
    mutationFn: userLogin,
    onSuccess: user => {
      console.log(user);
    },
  });

  const [username, password] = watch(['username', 'password']);

  const handleFormSubmit = () => {
    Keyboard.dismiss();
    handleSubmit(data => mutate(data as LoginCredentials))();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <ControlledTextInput
            name="username"
            placeholder="Enter username"
            focusedPlaceholder="Username"
            control={control}
            clearField={() => clearField('username')}
          />
          <ControlledTextInput
            name="password"
            placeholder="Enter password"
            focusedPlaceholder="Password"
            secureTextEntry={true}
            control={control}
            clearField={() => clearField('password')}
          />
        </View>
        {error && <ErrorBanner errorMessage={error.message} />}
        <Button
          disabled={!(username || password) || isPending}
          onPress={handleFormSubmit}>
          Login
        </Button>
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
