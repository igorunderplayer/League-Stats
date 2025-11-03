import React from 'react'
import { Text } from 'react-native-paper'
import { TextProps as RNTextProps } from 'react-native'

export interface TitleProps extends RNTextProps {
  variant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall'
}

const Title: React.FC<TitleProps> = ({ children, style, variant = 'headlineMedium', ...props }) => {
  return (
    <Text
      variant={variant}
      style={[{ fontWeight: 'bold' }, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Title
