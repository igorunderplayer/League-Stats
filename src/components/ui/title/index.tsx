import React from 'react'
import { Text } from 'react-native-paper'
import { TextProps as RNTextProps } from 'react-native'

export interface TitleProps extends RNTextProps {}

const Title: React.FC<TitleProps> = ({ children, style, ...props }) => {
  return (
    <Text
      variant="headlineMedium"
      style={[{ alignSelf: 'flex-start', padding: 8, fontWeight: 'bold' }, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Title
