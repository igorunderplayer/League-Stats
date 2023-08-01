import React from 'react'
import { StyleSheet, View } from 'react-native'
import FreeChampionsRotation from '../components/FreeChampionsRotation'
import themes from '../themes'

export default function Home() {
  return (
    <View style={styles.container}>
      <FreeChampionsRotation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
