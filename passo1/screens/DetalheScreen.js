import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetalheScreen({ route }) {
  const pessoa = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.fotoBox}>
        {pessoa.image && <Image source={{ uri: pessoa.image.medium }} style={styles.foto} />}
      </View>
      <Text style={styles.nome}>{pessoa.name}</Text>
      <Text style={styles.info}>País: {pessoa.country?.name}</Text>
      <Text style={styles.info}>Nascimento: {pessoa.birthday}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2' },
  fotoBox: { width: 180, height: 250, backgroundColor: '#ddd', borderRadius: 12, overflow: 'hidden' },
  foto: { width: '100%', height: '100%' },
  nome: { fontSize: 24, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
  info: { fontSize: 16, color: '#555', marginTop: 6 },
});
