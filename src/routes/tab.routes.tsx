import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile'
import TestScreen from '../screens/TestScreen'
import History from '../screens/History'

import { MaterialIcons } from '@expo/vector-icons'
import themes from '../themes'
import colors from '../colors'
import Home from '../screens/Home'
import { TouchableOpacity, Text } from 'react-native'
import { useSummoner } from '../hooks/summoner'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {

  const { resetSummoner } = useSummoner()

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
          height: 56
        },
        tabBarLabelStyle: {
          paddingBottom: 6
        },
        tabBarActiveTintColor: themes.dark.primary,
        headerRight: () => (
          <TouchableOpacity onPress={exitSummoner}>
            <Text style={{ color: '#fff' }}>Sair</Text>
          </TouchableOpacity>
        )
      }}
    >

      <Tab.Screen
        name='test'
        component={TestScreen}
      />

      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen
        name='History'
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="history" size={size} color={color} />
          }
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="person" size={size} color={color} />
          }
        }}
      />

    </Tab.Navigator>
  )
}