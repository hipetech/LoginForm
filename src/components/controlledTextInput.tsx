import React, { FC } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { TextInput } from '../ui/textInput.tsx';

type ControlledTextInputProps = {
  name: string;
  control:  Control<FieldValues> | undefined
  placeholder?: string;
  focusedPlaceholder?: string;
  secureTextEntry?: boolean;
  clearField?: () => void;
}

export const ControlledTextInput: FC<ControlledTextInputProps> = ({
  name,
  control,
  placeholder,
  focusedPlaceholder,
  secureTextEntry,
  clearField,
}) => {
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController({ name, control });
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      focusedPlaceholder={focusedPlaceholder}
      secureTextEntry={secureTextEntry}
      error={errors[name]?.message as string}
      onClearButtonPress={clearField}
    />
  );
};
