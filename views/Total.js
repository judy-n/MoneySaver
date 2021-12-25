import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react'

export default function App() {
  const [total, setTotal] = useState(5)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const changeAmount = (amount) => {
    amount = amount.replace(/[^0-9]/g, '')
    setAmount(amount)
  }

  const addAmount = () => {
    setTotal(prevTotal => prevTotal + parseInt(amount))
    setAmount("")
    setDescription("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total Saved:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="amount" value={amount} onChangeText={changeAmount} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="description" value={description} onChangeText={setDescription} />
        <Pressable style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? 'ivory' : 'darkslategray',
            color: pressed ? 'ivory' : 'darkslategray'
          },
        ]} onPress={addAmount}>
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
    </View>
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
  text: {
    color: "ivory",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20
  },
  totalContainer: {
    width: '50%',
    alignItems: 'stretch',
    justifyContent: 'center',
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#fff'
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
    margin: 10
  },
  input: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
    borderRadius: 5,
    fontFamily: "Helvetica"
  },
  button: {
    borderWidth: 3,
    borderColor: "darkslategray",
    borderRadius: 5,
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
