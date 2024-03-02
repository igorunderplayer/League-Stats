import { useNavigation } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { Match } from '../@types/riot'
import colors from '../colors'
import MatchInfoCard from '../components/items/MatchInfo'
import { useSummoner } from '../hooks/useSummoner'
import useSummonerMatches from '../hooks/useSummonerMatches'
import themes from '../themes'
import MatchInfo from './MatchInfo'

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
  const { summoner } = useSummoner()
  const { matches, loading, loadMatches } = useSummonerMatches(summoner)

  const handleOnClickMatch = useCallback((match: Match) => {
    navigation.navigate('matchInfo', {
      matchId: match.metadata.matchId,
    })
  }, [])

  useEffect(() => {
    loadMatches()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.matchList}
        contentContainerStyle={styles.matchListContainer}
        keyExtractor={(item) => item.metadata.matchId}
        data={matches}
        renderItem={({ item }: { item: Match }) => (
          <MatchInfoCard
            match={item}
            onClick={handleOnClickMatch}
          />
        )}
        onEndReached={loadMatches}
        ListFooterComponent={
          <View style={{ height: 32 }}>
            {loading ? (
              <ActivityIndicator
                size={32}
                color={colors.softViolet}
              />
            ) : null}
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
    padding: 8,
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
