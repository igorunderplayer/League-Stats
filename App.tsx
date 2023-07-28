import { useEffect } from 'react'
import { SummonerProvider } from './src/hooks/summoner'
import { Routes } from './src/routes'

import { StatusBar } from 'expo-status-bar'
import riot from './src/services/riot'

export default function App() {

  useEffect(() => {
    riot.ddragon.getOrFetchVersions()
  }, [])

  return (
    <SummonerProvider>
      <Routes />
      <StatusBar style='auto' />
    </SummonerProvider>
  )  
}
