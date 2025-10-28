import React, { useCallback } from 'react'
import { Image, Linking, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import colors from '../../../colors'

type Props = {
  region?: string
  name?: string
}

const LeagueOfGraphsCard: React.FC<Props> = ({ region = '', name = '' }) => {
  const url = `https://www.leagueofgraphs.com/pt/summoner/${region}/${name}`

  const handleOnClick = useCallback(() => {
    Linking.openURL(url)
  }, [])

  return (
    <Button
      mode="contained"
      onPress={handleOnClick}
      buttonColor={colors.softBlue}
      icon={() => (
        <Image
          resizeMode='center'
          style={styles.logo}
          source={require('../../../assets/leagueofgraphslogo.png')}
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
    width: 64,
  },
})

export default LeagueOfGraphsCard
