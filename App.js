import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
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
        <Text style={styles.total}>{total}</Text>
      </View>
      <View style={styles.form}>
        <TextInput placeholder="amount" value={amount} onChangeText={changeAmount} keyboardType="numeric" />
        <TextInput placeholder="description" value={description} onChangeText={setDescription} />
        <Button title="+" onPress={addAmount} />
      </View>
      <StatusBar style="auto" />
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
  totalContainer: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    width: '100%',
    fontWeight: '500',
    padding: 8,
    color: 'ivory',
    backgroundColor: 'gray',
  },
  total: {
    color: 'ivory',
    fontFamily: 'monospace',
    backgroundColor: 'darkslategray',
    fontSize: 32,
    padding: 8,
  },
});
