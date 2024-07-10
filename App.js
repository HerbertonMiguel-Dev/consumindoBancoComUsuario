// Importando as dependências necessárias do React e React Native
import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Importando a conexão com o Firestore e métodos específicos
import { db } from './src/firebaseConnection';
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc } from 'firebase/firestore';

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

  // Função assíncrona para lidar com o registro de um novo usuário no Firestore
async function handleRegister() {
    // Exemplo comentado de como definir um documento com um ID específico
    // await setDoc(doc(db, "users", "3"), {
    //   nome: "jose",
    //   idade: "30",
    //   cargo: "Backend"
    // })
    // .then(() => {
    //   console.log("cadastrado com sucesso")  Mensagem de sucesso no console
    // })
    // .catch((erro) => {
    //   console(erro)  Exibe o erro no console
    // })

    // Adicionando um novo documento na coleção "users" com um ID gerado automaticamente
    await addDoc(collection(db, "users"), {
        nome: "fulano", // Nome do usuário
        idade: "25", // Idade do usuário
        cargo: "estagiario" // Cargo do usuário
    });
}

  return (
    // Container principal que centraliza seu conteúdo
    <View style={styles.container}>
      {/* Exibindo o nome obtido do Firestore */}
      <Text style={{ fontSize: 24 }}>Nome: {nome}</Text>

      <TouchableOpacity style={styles.button} onPress={handleRegister}> 
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Definindo os estilos do container principal
const styles = StyleSheet.create({
  container: {
    flex: 1, // O container ocupa todo o espaço disponível
    paddingTop: 40, // Espaçamento superior para evitar sobreposição com a barra de status
  },
  button:{
    backgroundColor: '#000',
    alignSelf: 'flex-start'
  },
  buttonText:{
    padding: 8,
    color: '#fff'
  },
});
