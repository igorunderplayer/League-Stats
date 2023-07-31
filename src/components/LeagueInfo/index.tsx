import { View, StyleSheet, Text, Image } from 'react-native'
import { LeagueEntry } from '../../@types/riot'
import colors from '../../colors'
import { LeagueQueueNames, LeagueTierNames } from '../../constants'

type Props = {
  league: LeagueEntry
}

const LeagueInfo: React.FC<Props> = ({ league }) => {
  const winrate = ((league.wins / (league.wins + league.losses)) * 100).toFixed(
    1,
  )

  console.log(league)

  return (
    <View style={styles.container}>
      <Image
        style={styles.leagueIcon}
        source={{
          uri: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${league.tier?.toLowerCase()}.png`,
        }}
      />
      <View style={styles.leagueInfo}>
        <Text style={styles.title}>
          {`${
            LeagueTierNames[league.tier as keyof typeof LeagueTierNames] ??
            league.tier
          } ${league.rank}`}
        </Text>

        <Text style={styles.text}>
          {LeagueQueueNames[
            league.queueType as keyof typeof LeagueQueueNames
          ] ?? league.queueType}
        </Text>

        <Text></Text>

        <Text style={styles.text}>Pontos de liga: {league.leaguePoints}</Text>

        <View style={styles.winrate}>
          <Text style={styles.text}>
            Vitórias:{' '}
            <Text style={{ color: colors.softCyan, fontWeight: 'bold' }}>
              {league.wins}
            </Text>
          </Text>
          <Text style={styles.text}>({winrate}%)</Text>
        </View>

        <Text style={styles.text}>
          Derrotas:{' '}
          <Text style={{ color: colors.softRed, fontWeight: 'bold' }}>
            {league.losses}
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    gap: 12,
  },
  leagueInfo: {
    flexDirection: 'column',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffff60',
  },
  leagueIcon: {
    width: 256,
    height: 256,
    marginVertical: -64,
    marginHorizontal: -72,
  },
  winrate: {
    flexDirection: 'row',
    gap: 12,
  },
})

export default LeagueInfo
