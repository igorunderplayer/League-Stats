import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSummoner } from '../hooks/summoner'
import InsertName from '../screens/InsertName'
import TabRoutes from './tab.routes'

export function Routes() {
  const { summoner } = useSummoner()

  return (
    <NavigationContainer>
      {!summoner ? <InsertName /> : <TabRoutes />}
    </NavigationContainer>
  )
}