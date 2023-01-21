import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSummoner } from '../hooks/summoner'
import InsertName from '../screens/InsertName'

export function Routes() {
  const { summoner } = useSummoner()

  return (
    <NavigationContainer>
      {!summoner ? <InsertName /> : <></>}
    </NavigationContainer>
  )
}