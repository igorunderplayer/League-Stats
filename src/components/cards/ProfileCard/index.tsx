import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'
import SummonerIcon from '../../generic/SummonerIcon'
import Card from '../../ui/card'

const ProfileCard: React.FC = () => {
  const { summoner, riotAccount } = useSummoner()

  return (
    <Card style={styles.container}>
      <SummonerIcon iconId={summoner?.profileIconId} />

      <View style={styles.textInfo}>
        <Text style={styles.name}>
          {riotAccount?.gameName}#{riotAccount?.tagLine}
        </Text>
        <Text style={styles.level}>Level {summoner?.summonerLevel}</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
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
