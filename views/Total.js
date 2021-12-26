import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Keyboard, TouchableWithoutFeedback, ScrollView, Image, ImageBackground } from 'react-native';
import { useState, useEffect, useRef } from 'react'
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

export default function Total({ checkAchievements, theme, resetAchievements }) {
  const [total, setTotal] = useState(0)
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
    if (total > 0) {
      checkAchievements(total)
    }
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

  const currency = () => {
    if (theme === "default") {
      return "$"
    } else if (theme === "pixel") {
      return <Image source={require('../assets/pixelmoney.gif')} style={styles.currency} />
    } else if (theme === "bitcoin") {
      return <Image source={require('../assets/bitcoin.png')} style={styles.currency} />
    } else if (theme === "rich") {
      return <Image source={require('../assets/gold.png')} style={styles.currency} />
    } else if (theme === "animalCrossing") {
      return <Image source={require('../assets/animalcrossing.jpg')} style={styles.currency} />
    } else {
      console.log('t', theme)
    }
  }

  const background = () => {
    if (theme === "default") {
      return null
    } else if (theme === "pixel") {
      return require('../assets/pixelback.png')
    } else if (theme === "bitcoin") {
      return require('../assets/bitcoinback.jpg')
    } else if (theme === "rich") {
      return require('../assets/richback.jpg')
    } else if (theme === "animalCrossing") {
      return require('../assets/animalcrossingback.jpg')
    }
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
        <ImageBackground source={background()} resizeMode='cover' style={{width: '100%', height: '100%', backgroundColor: '#8AAF8E'}}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Pressable style={styles.reset} onPress={() => {
                setTotal(0)
                setRecents([])
                resetAchievements()
                AsyncStorage.setItem('msave_Recents', JSON.stringify({recents: []}))
                AsyncStorage.setItem('msave_Total', `0`)
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
                <Text style={styles.total}>{currency()} {total}</Text>
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
                recents.slice(0).reverse().map((el, index) => {
                  return (
                      <Text style={styles.item} key={index}>${el.amount} <Text style={styles.text}>on</Text> {el.desc}</Text>
                  )
                })}
            </ScrollView>
          </View>
        </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)', // was #8AAF8E
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
    backgroundColor: 'rgba(0,0,0,0)',// was '#8AAF8E',
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
    maxWidth: '100%',
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
  },
  currecy: {
    display: 'flex',
    height: null,
    width: null,
    resizeMode: 'contain',
  }
});
