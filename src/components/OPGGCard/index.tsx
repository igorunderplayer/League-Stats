import { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../colors'

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
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnClick}
    >
      <Image
        style={styles.logo}
        resizeMode='center'
        source={require('../../../assets/opgglogo.png')}
      />
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
    backgroundColor: colors.softRed,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    height: 28,
    width: 72,
    backgroundColor: '#8490',
  },
})

export default OPGGCard
