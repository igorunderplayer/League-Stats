import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import History from '../screens/History'
import Profile from '../screens/Profile'

import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity } from 'react-native'
import colors from '../colors'
import { useSummoner } from '../hooks/useSummoner'
import Home from '../screens/Home'
import themes from '../themes'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
  const { resetSummoner } = useSummoner()

  const { t } = useTranslation()

  function exitSummoner() {
    resetSummoner()
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: themes.dark.background,
        },
        tabBarStyle: {
          backgroundColor: themes.dark.background,
          height: 56,
        },
        tabBarLabelStyle: {
          paddingBottom: 6,
        },
        tabBarActiveTintColor: themes.dark.primary,
        headerRight: () => (
          <TouchableOpacity onPress={exitSummoner}>
            <Text style={{ color: '#fff' }}>Sair</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: t('screen.home.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='home'
                size={size}
                color={color}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name='History'
        component={History}
        options={{
          title: t('screen.history.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='history'
                size={size}
                color={color}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          title: t('screen.profile.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='person'
                size={size}
                color={color}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
