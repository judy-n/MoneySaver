import { StatusBar } from 'expo-status-bar';
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
              <Tab.Screen name="Home" component={Total} />
              <Tab.Screen name="Achievements" component={Achievements} />
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
