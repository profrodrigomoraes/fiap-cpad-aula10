import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const pessoas = [
  {
    id: 1,
    name: 'Mike Vogel',
    country: { name: 'United States' },
    birthday: '1979-07-17',
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg',
    },
  },
  {
    id: 2,
    name: 'Rachelle Lefevre',
    country: { name: 'Canada' },
    birthday: '1979-02-01',
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/82/207417.jpg',
    },
  },
];

export default function ListaScreen({ navigation }) {
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
