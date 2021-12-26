import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'

export default function Total({ checkAchievements }) {
  const [total, setTotal] = useState(5)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    checkAchievements(total)
  }, [total]) // runs whenever total is changes

  const changeAmount = (amount) => {
    amount = amount.replace(/[^0-9]/g, '')
    setAmount(amount)
  }

  const addAmount = () => {
    if (parseInt(amount)) {
      setTotal(prevTotal => prevTotal + parseInt(amount))
    }
    setAmount("")
    setDescription("")
    Keyboard.dismiss()
  }

  return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <Pressable style={styles.reset} onPress={() => setTotal(0)}
                 children={({ pressed }) => (
                     <Text style={
                       { color: pressed ? 'lightgray' : 'darkslategray',
                         fontFamily: "Helvetica",
                         fontWeight: "400",
                         fontSize: 15
                       }}>
                       Reset
                     </Text>)}/>
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total Saved</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={changeAmount} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
        <Pressable style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? 'ivory' : 'darkslategray',
          },
        ]} onPress={addAmount}
                   children={({ pressed }) => (
                       <Text style={
                       { color: pressed ? 'darkslategray' : 'ivory',
                         fontFamily: "Helvetica",
                         fontWeight: "normal",
                         fontSize: 25
                       }}>
                         +
                       </Text>)}/>
      </View>
    </View>
    </TouchableWithoutFeedback>
        <View style={{flex:1, padding: 5, marginBottom:-100, width: '100%', alignItems: 'center'}}>
        <Text style={styles.title}>Recent Savings</Text>
        <ScrollView style={{ width: '100%'}} contentContainerStyle={{paddingBottom: 100}}>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>HIII</Text>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
          <Text style={styles.item}>$20 on Timmies Chicken Wrap</Text>
        </ScrollView>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: "scroll",
  },
  text: {
    color: "darkslategray",
    fontFamily: "Helvetica",
    fontWeight: "400",
    fontSize: 15,
  },
  totalContainer: {
    width: '50%',
    alignItems: 'stretch',
    justifyContent: 'center',
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#fff',
    marginTop: 60
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    padding: 8,
    color: 'ivory',
    backgroundColor: 'gray',
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "gray",
    borderRadius: 15,
    overflow: "hidden"
  },
  total: {
    color: 'ivory',
    fontFamily: 'Helvetica',
    backgroundColor: 'darkslategray',
    fontSize: 32,
    padding: 20,
    textAlign: "center",
    fontWeight: '500',
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "darkslategray",
    borderRadius: 15,
    overflow: "hidden"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    marginBottom: 0
  },
  input: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
    borderRadius: 5,
    fontFamily: "Helvetica",
    fontSize: 18,
    width: '40%'
  },
  button: {
    borderWidth: 3,
    borderColor: "darkslategray",
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
    color: "darkslategray",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 40,
    marginBottom: 10
  },
  item: {
    color: "darkslategray",
    fontFamily: "Helvetica",
    fontWeight: "400",
    padding: 10,
    borderWidth:1,
    borderColor: "lightgray",
    textAlign: "center"
  },
});
