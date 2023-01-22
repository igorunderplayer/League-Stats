import { SummonerProvider } from './src/hooks/summoner'
import { Routes } from './src/routes'

import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <SummonerProvider>
      <Routes />
      <StatusBar style='inverted' />
    </SummonerProvider>
  )
}
