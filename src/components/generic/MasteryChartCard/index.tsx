import React, { useCallback } from 'react'
import {
  Image,
  Linking,
  StyleSheet,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'

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
    <Button
      mode="contained"
      onPress={handleOnClick}
      buttonColor={colors.softOrange}
      icon={() => (
        <Image
          resizeMode='center'
          style={styles.logo}
          source={require('../../../assets/masterychartlogo.png')}
        />
      )}
      contentStyle={{ height: 48 }}
      style={{ borderRadius: 12 }}
    >
      Mastery Chart
    </Button>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 28,
    width: 28,
  },
})

export default MasteryChartCard
