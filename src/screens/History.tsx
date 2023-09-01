import { useNavigation } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { Match } from '../@types/riot'
import colors from '../colors'
import MatchInfoCard from '../components/items/MatchInfo'
import { useSummoner } from '../hooks/summoner'
import riot from '../services/riot'
import themes from '../themes'
import MatchInfo from './MatchInfo'

const COUNT = 10

export type HistoryStackParamList = {
  historyDefault: undefined
  matchInfo: {
    matchId: string
  }
}

const Stack = createNativeStackNavigator<HistoryStackParamList>()

type historyScreenProp = NativeStackNavigationProp<
  HistoryStackParamList,
  'historyDefault'
>

export default function HistoryRouter() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='historyDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='historyDefault'
          component={History}
        />

        <Stack.Screen
          name='matchInfo'
          component={MatchInfo}
        />
      </Stack.Navigator>
    </View>
  )
}

function History() {
  const navigation = useNavigation<historyScreenProp>()
  const { region, summoner } = useSummoner()
  const [matches, setMatches] = useState<Match[]>([])

  const [loading, setLoading] = useState(true)

  const handleOnClickMatch = useCallback((match: Match) => {
    navigation.navigate('matchInfo', {
      matchId: match.metadata.matchId,
    })
  }, [])

  useEffect(() => {
    loadMathes()
  }, [])

  async function loadMathes() {
    if (!region || !summoner) return
    setLoading(true)

    try {
      const ids = await riot.getMatchesByPuuid(summoner.puuid, { count: COUNT })

      for await (const matchId of ids) {
        const match = await riot.getMatchById(matchId)
        setMatches((prev) => [...prev, match])
      }
    } finally {
      setLoading(false)
    }
  }

  async function loadMoreMatches() {
    if (!region || !summoner || loading) return

    setLoading(true)

    try {
      const ids = await riot.getMatchesByPuuid(summoner.puuid, {
        count: COUNT,
        start: matches.length,
      })

      for await (const matchId of ids) {
        const match = await riot.getMatchById(matchId)
        setMatches((prev) => [...prev, match])
      }
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
        renderItem={({ item }) => (
          <MatchInfoCard
            match={item}
            onClick={handleOnClickMatch}
          />
        )}
        onEndReached={loadMoreMatches}
        ListFooterComponent={
          <View style={{ height: 12 }}>
            {loading ? <ActivityIndicator color={colors.softViolet} /> : null}
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchList: {
    width: '100%',
  },
  matchListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
})
