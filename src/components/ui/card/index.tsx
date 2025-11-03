import React from 'react'
import { Card as PaperCard } from 'react-native-paper'
import { ViewProps } from 'react-native'

export interface CardProps extends ViewProps {}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <PaperCard
      style={style}
      mode="contained"
      {...props}
    >
      <PaperCard.Content>
        {children}
      </PaperCard.Content>
    </PaperCard>
  )
}

export default Card
