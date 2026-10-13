import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function DetalheScreen({ route }) {
  const pessoa = route.params.item;
  const [creditos, setCreditos] = useState([]);

  useEffect(() => {
    async function buscarCreditos() {
      try {
        const resposta = await fetch(`https://api.tvmaze.com/people/${pessoa.id}?embed=castcredits`);
        const json = await resposta.json();
        setCreditos(json._embedded.castcredits);
      } catch (e) {
        console.log(e);
      }
    }
    buscarCreditos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.fotoBox}>
          {pessoa.image && <Image source={{ uri: pessoa.image.medium }} style={styles.foto} />}
        </View>
        <Text style={styles.nome}>{pessoa.name}</Text>
        <Text style={styles.info}>País: {pessoa.country?.name}</Text>
        <Text style={styles.info}>Nascimento: {pessoa.birthday}</Text>
      </View>

      <Text style={styles.subtitulo}>Séries</Text>
      <View style={styles.lista}>
        <FlatList
          data={creditos}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => <Text style={styles.show}>{item._links.show.name}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  cabecalho: { alignItems: 'center' },
  fotoBox: { width: 140, height: 195, backgroundColor: '#ddd', borderRadius: 12, overflow: 'hidden' },
  foto: { width: '100%', height: '100%' },
  nome: { fontSize: 24, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  info: { fontSize: 16, color: '#555', marginTop: 4 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  lista: { flex: 1 },
  show: { fontSize: 17, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  erro: { fontSize: 17, color: '#b00020' },
});
