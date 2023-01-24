import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import MatchInfoCard from '../components/MatchInfo'
import { useSummoner } from '../hooks/summoner'
import Riot from '../services/riot'
import themes from '../themes'

export default function History() {
  const { region, summoner } = useSummoner()
  const [matches, setMatches] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!region || !summoner) return

    try {
      const riot = new Riot(region)
      riot.getMatchesByPuuid(summoner.puuid, { count: 10 })
        .then(async (data) => {
          const matches = await Promise.all(data.map(async matchId => {
            const match = await riot.getMatchById(matchId)
            return match
          }))

          setMatches(matches)
        })
    } finally {
      setLoading(false)
    }
  }, [])

  async function loadMoreMatches() {
    if (!region || !summoner || loading) return

    setLoading(true)

    try {
      const riot = new Riot(region)
      const more = await riot.getMatchesByPuuid(summoner.puuid, {
        count: 10,
        start: matches.length
      }).then(async (data) => {
        return await Promise.all(data.map(async matchId => {
          const match = await riot.getMatchById(matchId)
          return match
        }))
      })

      setMatches(val => [...val, ...more])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.matchList}
        contentContainerStyle={styles.matchListContainer}
        keyExtractor={(item) => item.metadata.matchId}
        data={matches}
        renderItem={({ item }) => <MatchInfoCard match={item} />}
        onEndReached={loadMoreMatches}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchList: {
    width: '100%'
  },
  matchListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
