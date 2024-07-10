// Importando as dependências necessárias do React e React Native
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Importando a conexão com o Firestore e métodos específicos
import { db } from './src/firebaseConnection';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function fire() {
  const [nome, setNome] = useState("Carregando..."); // Estado inicial com valor "Carregando..."

  // useEffect para buscar dados quando o componente for montado
  useEffect(() => {
    // Função assíncrona para obter dados do Firestore
    async function getDados() {
      // Comentado: Método para obter documento uma vez
      // const docref = doc(db, "users", "2");
      // getDoc(docref)
      //   .then((snapshot) => { 
      //     setNome(snapshot.data()?.nome);
      //   })
      //   .catch((err) => {
      //     console.log("error: ");
      //     console.log(err);
      //   });

      // Método para obter documento em tempo real
      onSnapshot(doc(db, "users", "1"), (doc) => {
        setNome(doc.data()?.nome); // Atualiza o estado com o nome do documento
      });
    }

    getDados(); // Chama a função para buscar dados

  }, []); // A lista de dependências vazia significa que o efeito só roda uma vez, quando o componente é montado

  return (
    // Container principal que centraliza seu conteúdo
    <View style={styles.container}>
      {/* Exibindo o nome obtido do Firestore */}
      <Text style={{ fontSize: 24 }}>Nome: {nome}</Text>
    </View>
  );
}

// Definindo os estilos do container principal
const styles = StyleSheet.create({
  container: {
    flex: 1, // O container ocupa todo o espaço disponível
    paddingTop: 40, // Espaçamento superior para evitar sobreposição com a barra de status
  },
});
