import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

type Props = {
  summonerIconId?: number
}

const SummonerIcon: React.FC<Props> = ({ summonerIconId = 0 }) => {
  return (
    <Image
      source={{
        uri: `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${summonerIconId}.png`
      }}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2
  }
})

export default SummonerIcon