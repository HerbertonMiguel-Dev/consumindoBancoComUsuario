// Componente UsersList para exibir e deletar usuários
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {db} from './firebaseConnection'
import {deleteDoc, doc} from 'firebase/firestore'

export function UsersList({ data }) {
  // Função assíncrona para deletar um usuário
  async function handleDeleteItem() {
    const docRef = doc(db, "users", data.id) // Referência ao documento do usuário no Firestore
    await deleteDoc(docRef) // Deletando o documento do Firestore
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Nome: {data.nome}</Text>
      <Text style={styles.item}>Idade: {data.idade}</Text>
      <Text style={styles.item}>Cargo: {data.cargo}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Deletar usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para o componente UsersList
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0", // Cor de fundo do container
    padding: 8, // Espaçamento interno do container
    borderRadius: 4, // Bordas arredondadas do container
    marginBottom: 14, // Margem inferior do container
  },
  item: {
    color: "#000", // Cor do texto do item
    fontSize: 16, // Tamanho da fonte do texto do item
  },
  button: {
    backgroundColor: "#b3261e", // Cor de fundo do botão
    alignSelf: "flex-start", // Alinhamento do botão
    padding: 4, // Espaçamento interno do botão
    borderRadius: 4, // Bordas arredondadas do botão
    marginTop: 16, // Margem superior do botão
  },
  buttonText: {
    color: "#fff", // Cor do texto
    paddingLeft: 8, // Espaçamento à esquerda do texto do botão
    paddingRight: 8, // Espaçamento à direita do texto do botão
  },
});