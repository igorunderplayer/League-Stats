import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useSummoner } from '../hooks/useSummoner'
import Welcome from '../screens/Welcome'
import TabRoutes from './tab.routes'

export function Routes() {
  const { summoner } = useSummoner()

  return (
    <NavigationContainer>
      {!summoner ? <Welcome /> : <TabRoutes />}
    </NavigationContainer>
  )
}
