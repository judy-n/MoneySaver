import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Total from './views/Total'
import Achievements from './views/Achievements';
import NavMenu from './components/NavMenu'

const Stack = createNativeStackNavigator()

const defaultAchievements = [
  {
    icon: "star",
    text: "Save $500",
    subtitle: "Unlocks 'Pixel' theme",
    completed: false,
    color: "#8AAF8E",
    condition: (value) => value >= 500,
    theme: "pixel"
  },
  {
    icon: "user-graduate",
    text: "Save $5000",
    subtitle: "Unlocks 'Bitcoin' theme",
    completed: false,
    color: "#8AAF8E",
    condition: (value) => value >= 5000,
    theme: "bitcoin"
  },
  {
    icon: "user-tie",
    text: "Save $50000",
    subtitle: "Unlocks 'Rich' theme",
    completed: false,
    color: "#8AAF8E",
    condition: (value) => value >= 50000,
    theme: "rich"
  },
  {
    icon: "coffee",
    text: "Save before 8 a.m.",
    subtitle: "Unlocks 'Animal Crossing' theme",
    completed: false,
    color: "brown",
    condition: (value) => (new Date()).getHours() < 8 && (new Date()).getHours() >= 0,
    theme: "animalCrossing"
  },
]

const Tab = createBottomTabNavigator();

export default function App() {
  const [achievements, setAchievements] = useState(defaultAchievements)
  const [theme, setTheme] = useState("default")
  const [themes, setThemes] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('msave_Completed')
      .then(result => {
        const completed = JSON.parse(result)
        const newAchievements = []
        for (let ach of achievements) {
          newAchievements.push({
            ...ach,
            completed: !!completed[ach.icon]
          })
        }
        setAchievements(newAchievements)
      })
      .catch(e => console.error('error', e))
  }, [])

  useEffect(() => {
    setThemes(achievements.filter(ach => ach.completed).map(ach => ach.theme))
  }, [achievements])

  const checkAchievements = (total) => {
    if (total <= 0) {
      return
    }
    AsyncStorage.setItem('msave_Total', `${total}`)
    let updated = []
    achievements.forEach(ach => {
      const {icon, condition} = ach

      if (condition(total) && !isCompleted(icon)) {
        updateAchievement(icon)
        updated.push(icon)
      }
    })
    if (updated.length > 0) {
      // maps icon to completed status
      const completed = achievements.reduce((acc, curr) => ({...acc, [curr.icon]: curr.completed || updated.includes(curr.icon)}), {})
      AsyncStorage.setItem('msave_Completed', JSON.stringify(completed))
    }
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

  const resetAchievements = () => {
    setAchievements(defaultAchievements)
    const completed = defaultAchievements.reduce((acc, curr) => ({...acc, [curr.icon]: curr.completed}), {})
    AsyncStorage.setItem('msave_Completed', JSON.stringify(completed))
  }

  return (
    <Provider>
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
                  tabBarActiveTintColor: '#4A844F',
                  tabBarInactiveTintColor: 'lightgray',
              })}
          >
              <Tab.Screen
                name="Home"
                options={{
                  headerRight: props => <NavMenu {...props} setTheme={setTheme} themes={themes} />,
                  headerStyle: {shadowColor: 'black', shadowRadius: 20, shadowOffset: {width: 2, height: 2}, shadowOpacity: 0}
                }}
              >
                {props => <Total {...props} checkAchievements={checkAchievements} theme={theme} resetAchievements={resetAchievements} />}
              </Tab.Screen>
              <Tab.Screen name="Achievements" options={{headerTitle: props => <Text></Text>}}>
                {props => <Achievements {...props} achievements={achievements} />}
              </Tab.Screen>
          </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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
