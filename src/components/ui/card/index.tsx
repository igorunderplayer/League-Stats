import React from 'react'
import { Surface } from 'react-native-paper'
import { ViewProps } from 'react-native'

export interface CardProps extends ViewProps {}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <Surface
      style={[{ padding: 12, borderRadius: 12 }, style]}
      elevation={0}
      {...props}
    >
      {children}
    </Surface>
  )
}

export default Card
