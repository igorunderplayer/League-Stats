import React from 'react'
import { Text, View } from 'react-native'
import colors from '../../../colors'
import { styles } from './styles'

interface Props {
  win: boolean
}

const VictoryDefeatIcon: React.FC<Props> = ({ win }) => {
  return (
    <View style={[styles.container, styles.name]}>
      <Text
        style={{
          fontWeight: win ? 'bold' : 'normal',
          fontSize: 18,
          color: win ? colors.softCyan : '#ffffff70',
        }}
      >
        {' '}
        V{' '}
      </Text>

      <Text style={styles.separator}>/</Text>

      <Text
        style={{
          fontWeight: !win ? 'bold' : 'normal',
          fontSize: 18,
          color: !win ? colors.softRed : '#ffffff70',
        }}
      >
        {' '}
        D{' '}
      </Text>
    </View>
  )
}

export default VictoryDefeatIcon
