import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
} from 'react-native';
import { Font } from '../styles/font.ts';
import CloseIcon from '../../assets/icons/close.svg';

type TextInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  focusedPlaceholder?: string;
  onChangeText?: (text: string) => void;
  error?: string;
} & RNTextInputProps;

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

export const TextInput: React.FC<TextInputProps> = ({
  containerStyle,
  placeholder = '',
  focusedPlaceholder,
  onChangeText,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const [placeholderValue, setPlaceholderValue] = useState(placeholder);

  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    animatedLabel(1);
    setTimeout(() => setIsFocused(true), 100);
    if (focusedPlaceholder) {
      setPlaceholderValue(focusedPlaceholder);
    }
  };

  const handleBlur = () => {
    animatedLabel(0);
    setTimeout(() => {
      setIsFocused(false);
      if (focusedPlaceholder) {
        setPlaceholderValue(placeholder);
      }
    }, 100);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    onChangeText?.(value);
    animatedLabel(value ? 1 : isFocused ? 1 : 0);
  };

  const labelStyle = {
    left: 16,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 6],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: error ? ['#FF0004', '#FF0004'] : ['#879399', '#338BFF'],
    }),
  };

  const inputStyle = {
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    marginTop: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 16],
    }),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.innerContainer,
          isFocused && styles.focusedInnerContainerStyle,
          error && styles.innerContainerError,
        ]}>
        {(isFocused || !text.length) && (
          <Animated.Text style={[styles.label, labelStyle]}>
            {placeholderValue}
          </Animated.Text>
        )}
        <View style={styles.inputContainer}>
          <AnimatedTextInput
            {...props}
            selectionColor="#338BFF"
            style={[styles.input, inputStyle]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text}
            textAlignVertical="center"
          />
          {!isFocused && text.length > 0 && (
            <TouchableHighlight
              onPress={() => setText('')}
              style={styles.clearButton}
              underlayColor="#f9f9f9">
              <CloseIcon />
            </TouchableHighlight>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: '#D8E2E6',
    borderRadius: 8,
    height: 53,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerContainerError: {
    borderColor: '#FF0004',
  },
  focusedInnerContainerStyle: {
    borderColor: '#338BFF',
  },
  label: {
    position: 'absolute',
    fontFamily: Font.regular,
  },
  labelError: {
    color: '#FF0004',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 12,
    height: 53,
    marginTop: 16,
    paddingLeft: 16,
    fontFamily: Font.regular,
    color: '#16191A',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#FF0004',
    fontFamily: Font.regular,
  },
  clearButton: {
    marginRight: 16,
  },
});
