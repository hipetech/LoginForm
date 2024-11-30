import React, { FC } from 'react';
import {
  TouchableHighlightProps,
  TouchableHighlight,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Variant = 'default' | 'secondary';

type Coordinates = {x: number; y: number};

type ButtonVariantStyle = {
  styles: {
    button?: ViewStyle;
    disabledButton?: ViewStyle;
    text?: TextStyle;
    gradientContainer?: ViewStyle;
  };
  pressableConfig?: {
    underlayColor: string;
  };
  gradientConfig?: {
    colors: string[];
    start?: Coordinates;
    end?: Coordinates;
    locations?: number[];
  };
};

type ButtonProps = {
  variant?: Variant;
} & TouchableHighlightProps;

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  disabled,
  ...rest
}) => {
  const { styles, gradientConfig, pressableConfig } = buttonVariants[variant];
  const { button, disabledButton, text, gradientContainer } = styles;

  const buttonContent = <Text style={[stylesBase.text, text]}>{children}</Text>;

  return (
    <TouchableHighlight
      disabled={disabled}
      {...pressableConfig}
      {...rest}
      style={[stylesBase.button, button, disabled && disabledButton]}>
      {gradientConfig ? (
        <LinearGradient
          style={[stylesBase.gradient, gradientContainer]}
          {...gradientConfig}>
          {buttonContent}
        </LinearGradient>
      ) : (
        buttonContent
      )}
    </TouchableHighlight>
  );
};

const stylesBase = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

const defaultStyles: ButtonVariantStyle = {
  styles: {
    button: {
      borderRadius: 80,
      // iOS Shadow
      shadowColor: '#338BFF',
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,

      // Android Shadow
      elevation: 4,
    },
    disabledButton: {
      opacity: 0.3,
    },
    text: {
      color: '#fff',
    },
    gradientContainer: {
      borderRadius: 80,
    },
  },
  pressableConfig: {
    underlayColor: '#fff',
  },
  gradientConfig: {
    colors: ['#51C7FE', '#338BFF'],
    start: { x: 0.69, y: 0 },
    end: { x: 0.1, y: 1 },
    locations: [0.0757, 0.9243],
  },
};

const secondaryStyles: ButtonVariantStyle = {
  styles: {
    button: {
      borderRadius: 80,
      backgroundColor: '#fff',
    },
    text: {
      color: '#000',
    },
    gradientContainer: {
      borderRadius: 80,
    },
  },
  pressableConfig: {
    underlayColor: '#f9f9f9',
  },
};

const buttonVariants: Record<Variant, ButtonVariantStyle> = {
  default: defaultStyles,
  secondary: secondaryStyles,
};
