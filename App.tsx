import * as Updates from 'expo-updates'

import { useEffect } from 'react'

import { SummonerProvider } from './src/hooks/summoner'
import { Routes } from './src/routes'

import { StatusBar } from 'expo-status-bar'

export default function App() {
  useEffect(() => {
    return Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert('An update is available. Restart the app to continue')
        Updates.reloadAsync()
      }
    })
  }, [])


  return (
    <SummonerProvider>
      <Routes />
      <StatusBar style='inverted' />
    </SummonerProvider>
  )
}
