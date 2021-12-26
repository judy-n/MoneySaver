import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Total from './views/Total'
import Achievements from './views/Achievements';

const Stack = createNativeStackNavigator()

function HomeScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
  );
}

function AchievementsScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Achievements</Text>
      </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [achievements, setAchievements] = useState([
    {
      icon: "coffee",
      text: "Save before 8 a.m.",
      completed: false,
      condition: (value) => (new Date()).getHours < 8 && (new Date()).getHours() >= 0
    },
    {
      icon: "star",
      text: "Save $500",
      completed: false,
      condition: (value) => value >= 500
    },
    {
      icon: "user-graduate",
      text: "Save $5000",
      completed: false,
      condition: (value) => value >= 5000
    },
    {
      icon: "user-tie",
      text: "Save $50000",
      completed: false,
      condition: (value) => value >= 50000
    },
  ])
  
  const checkAchievements = (total) => {
    achievements.forEach(ach => {
      const {icon, condition} = ach

      if (condition(total) && !isCompleted(icon)) {
        updateAchievement(icon)
      }
    })
  }

  const isCompleted = (iconName) => { // will return false if item not found also
    return !!achievements[achievements.findIndex(ach => ach.icon === iconName)].completed
  }

  const updateAchievement = (iconName, value=true) => {
    setAchievements(prevAchievements => {
      const index = prevAchievements.findIndex(ach => ach.icon === iconName)
      const newAchievements = [...prevAchievements]
      newAchievements[index] = {...newAchievements[index], completed: value}
      return newAchievements
    })
  }

  return (
      <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Home') {
                          iconName = focused
                              ? 'ios-home'
                              : 'ios-home-outline';
                      } else if (route.name === 'Achievements') {
                          iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
                      }

                      return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: 'darkslategray',
                  tabBarInactiveTintColor: 'lightgray',
              })}
          >
              <Tab.Screen name="Home" >
                {props => <Total {...props} checkAchievements={checkAchievements} />}
              </Tab.Screen>
              <Tab.Screen name="Achievements">
                {props => <Achievements {...props} achievements={achievements} />}
              </Tab.Screen>
          </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
