import React from 'react'
import { View, ViewProps } from 'react-native'
import styles from './styles'

export interface CardProps extends ViewProps {}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <View
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </View>
  )
}

export default Card
