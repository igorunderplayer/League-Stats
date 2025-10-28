import React, { useCallback } from 'react'
import { Image, Linking, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import colors from '../../../colors'

type Props = {
  region?: string
  name?: string
}

const OPGGCard: React.FC<Props> = ({ region = '', name = '' }) => {
  const url = `https://www.op.gg/summoners/${region}/${name}`

  const handleOnClick = useCallback(() => {
    Linking.openURL(url)
  }, [])

  return (
    <Button
      mode="contained"
      onPress={handleOnClick}
      buttonColor={colors.softRed}
      icon={() => (
        <Image
          style={styles.logo}
          resizeMode='center'
          source={require('../../../assets/opgglogo.png')}
        />
      )}
      contentStyle={{ height: 48 }}
      style={{ borderRadius: 12 }}
    >
      {' '}
    </Button>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 28,
    width: 72,
    backgroundColor: '#8490',
  },
})

export default OPGGCard
