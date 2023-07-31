import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSummoner } from '../hooks/summoner'
import TabRoutes from './tab.routes'
import Welcome from '../screens/Welcome'

export function Routes() {
  const { summoner } = useSummoner()

  return (
    <NavigationContainer>
      {!summoner ? <Welcome /> : <TabRoutes />}
    </NavigationContainer>
  )
}
