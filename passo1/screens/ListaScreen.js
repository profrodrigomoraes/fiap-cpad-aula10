import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function ListaScreen({ navigation }) {
  const [pessoas, setPessoas] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    async function buscarPessoas() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/people');
        const json = await resposta.json();
        setPessoas(json);
      } catch (e) {
        console.log(e);
      } finally{
        setCarregando(false);
      }
    }
    buscarPessoas();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pessoas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detalhe', { item })}
          >
            <View style={styles.fotoBox}>
              {item.image && <Image source={{ uri: item.image.medium }} style={styles.foto} />}
            </View>
            <View style={styles.info}>
              <Text style={styles.nome}>{item.name}</Text>
              <Text style={styles.pais}>{item.country?.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erro: { fontSize: 18, color: '#b00020', textAlign: 'center' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
  },
  fotoBox: { width: 70, height: 100, backgroundColor: '#ddd', borderRadius: 8, overflow: 'hidden' },
  foto: { width: '100%', height: '100%' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  nome: { fontSize: 17, fontWeight: 'bold' },
  pais: { fontSize: 15, color: '#555', marginTop: 4 },
});
