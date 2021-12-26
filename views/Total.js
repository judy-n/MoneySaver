import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic
} from '@expo-google-fonts/dm-sans'

export default function Total({ checkAchievements }) {
  const [total, setTotal] = useState(5)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [recents, setRecents] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('msave_Total')
        .then(result => {
          if (result && parseInt(result)) {
            setTotal(parseInt(result))
          }
        })
        .catch(e => console.error('error', e))
    AsyncStorage.getItem('msave_Recents')
        .then(result => {
          if (result) {
            const {recents} = JSON.parse(result)
            setRecents(recents)
          }
        })
        .catch(e => console.error('error', e))
  }, [])

  useEffect(() => {
    checkAchievements(total)
  }, [total]) // runs whenever total is changes

  useEffect(() => {
    AsyncStorage.setItem('msave_Recents', JSON.stringify({recents}))
  }, [recents])

  const changeAmount = (amount) => {
    amount = amount.replace(/[^0-9]/g, '')
    setAmount(amount)
  }


  const addAmount = () => {
    if (parseInt(amount)) {
      setTotal(prevTotal => prevTotal + parseInt(amount))
      let el = {
        amount: amount,
        desc: description
      }
      setRecents(prev => [...prev, el])
    }
    setAmount("")
    setDescription("")
    Keyboard.dismiss()
  }

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Pressable style={styles.reset} onPress={() => {
                setTotal(0)
                setRecents([])
              } }
                         children={({pressed}) => (
                             <Text style={
                               {
                                 color: pressed ? 'white' : '#4A844F',
                                 fontFamily: "DMSans_400Regular",
                                 fontSize: 15
                               }}>
                               Reset
                             </Text>)}/>
              <View style={styles.totalContainer}>
                <Text style={styles.label}>Total Saved</Text>
                <Text style={styles.total}>$ {total}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.bottomPart}>
            <View style={styles.form}>
              <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={changeAmount}
                         keyboardType="numeric"/>
              <TextInput style={styles.input} placeholder="Description" value={description}
                         onChangeText={setDescription}/>
              <Pressable style={({pressed}) => [
                styles.button,
                {
                  backgroundColor: pressed ? 'white' : '#8AAF8E',
                },
              ]} onPress={addAmount}
                         children={({pressed}) => (
                             <Text style={
                               {
                                 color: pressed ? '#8AAF8E' : 'white',
                                 fontFamily: "DMSans_400Regular",
                                 fontWeight: "normal",
                                 fontSize: 25
                               }}>
                               +
                             </Text>)}/>
            </View>
            <Text style={styles.title}>Recent Savings</Text>
            <ScrollView style={{width: '100%'}} contentContainerStyle={{paddingBottom: 10}}>
              {
                recents.slice(0).reverse().map((el) => {
                  return (
                      <Text style={styles.item}>${el.amount} <Text style={styles.text}>on</Text> {el.desc}</Text>
                  )
                })}
            </ScrollView>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AAF8E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: "scroll",
  },
  text: {
    color: "#4A844F",
    fontFamily: "DMSans_400Regular",
    fontWeight: "400",
    fontSize: 15,
  },
  totalContainer: {
    maxWidth: '80%',
    alignItems: 'stretch',
    justifyContent: 'center',
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#8AAF8E',
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    padding: 8,
    color: 'white',
    fontFamily: 'DMSans_400Regular',
  },
  total: {
    color: '#8AAF8E',
    fontFamily: 'DMSans_400Regular',
    backgroundColor: 'white',
    fontSize: 60,
    padding: 10,
    textAlign: "center",
    fontWeight: '500',
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    minWidth: '60%',
    maxWidth: '80%',
  },
  form: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 0,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  input: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
    borderRadius: 5,
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    width: '40%'
  },
  button: {
    borderWidth: 3,
    borderColor: "#8AAF8E",
    borderRadius: 5,
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reset:{
    marginTop: 20,
  },
  title: {
    color: "lightgray",
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    marginTop: 40,
    marginBottom: 10
  },
  item: {
    color: "#8AAF8E",
    fontFamily: "DMSans_700Bold",
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    borderWidth:1,
    borderColor: "lightgray",
    textAlign: "center"
  },
  bottomPart: {
    flex: 1, padding: 5, marginBottom: 0, width: '100%', alignItems: 'center', marginTop: 0,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20
  }
});
