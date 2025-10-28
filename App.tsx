import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { PaperProvider, MD3DarkTheme } from 'react-native-paper'
import { SummonerProvider } from './src/hooks/useSummoner'
import { Routes } from './src/routes'

// Load i18n
import './src/i18n'
import themes from './src/themes'
import { PreferencesProvider, usePreferences } from './src/hooks/usePreferences'
import ddragon from './src/services/ddragon'

SplashScreen.preventAutoHideAsync()

function AppContent() {
  const [loading, setLoading] = useState(true)
  const { primaryColor } = usePreferences()

  useEffect(() => {
    setupCache()
  }, [])

  // Load static data from ddragon and set on cache
  async function setupCache() {
    await ddragon.getOrFetchVersions()
    await ddragon.getOrFetchChampions()

    setLoading(false)
  }

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync()
    }
  }, [loading])

  if (loading) return null

  // Create Material You dark theme based on the app's theme and user preferences
  const paperTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: primaryColor,
      background: themes.dark.background,
      surface: themes.dark.surface,
      onPrimary: themes.dark.text,
      onBackground: themes.dark.text,
      onSurface: themes.dark.text,
    },
  }

  return (
    <PaperProvider theme={paperTheme}>
      <SummonerProvider>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: themes.dark.background }}
        >
          <Routes />
          <StatusBar style='auto' />
        </View>
      </SummonerProvider>
    </PaperProvider>
  )
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  )
}
