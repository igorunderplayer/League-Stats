import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { SummonerProvider } from './src/hooks/useSummoner'
import { Routes } from './src/routes'
import riot from './src/services/riot'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setupCache()
  }, [])

  // Load static data from ddragon and set on cache
  async function setupCache() {
    await riot.ddragon.getOrFetchVersions()
    await riot.ddragon.getOrFetchChampions()

    setLoading(false)
  }

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync()
    }
  }, [loading])

  if (loading) return null

  return (
    <SummonerProvider>
      <View
        onLayout={onLayoutRootView}
        style={{ flex: 1 }}
      >
        <Routes />
        <StatusBar style='auto' />
      </View>
    </SummonerProvider>
  )
}
