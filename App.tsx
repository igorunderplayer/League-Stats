import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { PreferencesProvider } from './src/hooks/usePreferences'
import { SummonerProvider } from './src/hooks/useSummoner'
import { Routes } from './src/routes'
import ddragon from './src/services/ddragon'
import themes from './src/themes'
import './src/i18n'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loading, setLoading] = useState(true)

  // Load static data from ddragon and set on cache
  const setupCache = useCallback(async () => {
    await ddragon.getOrFetchVersions()
    await ddragon.getOrFetchChampions()

    setLoading(false)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync()
    }
  }, [loading])

  useEffect(() => {
    setupCache()
  }, [setupCache])

  if (loading) return null

  return (
    <PreferencesProvider>
      <SummonerProvider>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: themes.dark.background }}
        >
          <Routes />
        </View>
      </SummonerProvider>
    </PreferencesProvider>
  )
}
