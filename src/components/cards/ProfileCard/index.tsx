import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'
import SummonerIcon from '../../generic/SummonerIcon'

const ProfileCard: React.FC = () => {
  const { summoner, riotAccount } = useSummoner()

  return (
    <View style={styles.container}>
      <SummonerIcon iconId={summoner?.profileIconId} />

      <View style={styles.textInfo}>
        <Text style={styles.name}>
          {riotAccount?.gameName}#{riotAccount?.tagLine}
        </Text>
        <Text style={styles.level}>Nível {summoner?.summonerLevel}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
  },
  textInfo: {
    flexDirection: 'column',
    padding: 12,
  },
  name: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  level: {
    color: '#ffffff60',
  },
})

export default ProfileCard
