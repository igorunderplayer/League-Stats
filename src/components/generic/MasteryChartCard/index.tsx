import React, { useCallback } from 'react'
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../../colors'

type Props = {
  region?: string
  name?: string
}

const MasteryChartCard: React.FC<Props> = ({ region = '', name = '' }) => {
  const url = `https://masterychart.com/profile/${region}/${name}`

  const handleOnClick = useCallback(() => {
    Linking.openURL(url)
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnClick}
    >
      <Image
        resizeMode='center'
        style={styles.logo}
        source={require('../../../assets/masterychartlogo.png')}
      />

      <Text style={styles.text}>Mastery Chart</Text>

      <MaterialIcons
        name='chevron-right'
        size={28}
        color='#fff'
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.softOrange,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    height: 28,
    width: 28,
  },
})

export default MasteryChartCard
