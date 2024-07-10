// Importando as dependências necessárias do React e React Native
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

// Importando a conexão com o Firestore e métodos específicos
import { db } from "./src/firebaseConnection";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

export default function fire() {
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
  const [idade, setIdade] = useState(""); // Estado para armazenar a idade do usuário
  const [cargo, setCargo] = useState(""); // Estado para armazenar o cargo do usuário

  const [showForm, setShowForm] = useState(true); // Estado para controlar a exibição do formulário

  // useEffect para buscar dados quando o componente for montado
  useEffect(() => {
    // Função assíncrona para obter dados do Firestore
    async function getDados() {
      // Método para obter documento em tempo real
      // onSnapshot(doc(db, "users", "1"), (doc) => {
      //   setNome(doc.data()?.nome); // Atualiza o estado com o nome do documento
      // });
    }

    getDados(); // Chama a função para buscar dados
  }, []); // A lista de dependências vazia significa que o efeito só roda uma vez, quando o componente é montado

  // Função assíncrona para lidar com o registro de um novo usuário no Firestore
  async function handleRegister() {
    // Adicionando um novo documento na coleção "users" com um ID gerado automaticamente
    await addDoc(collection(db, "users"), {
      nome: nome, // Nome do usuário
      idade: idade, // Idade do usuário
      cargo: cargo, // Cargo do usuário
    })
      .then(() => {
        alert("CADASTRADO COM SUCESSO"); // Exibe mensagem de sucesso
        setNome(""); // Limpa o campo de nome
        setIdade(""); // Limpa o campo de idade
        setCargo(""); // Limpa o campo de cargo
      })
      .catch((err) => {
        console.log(err); // Exibe erro no console
      });
  }

  // Função para alternar a exibição do formulário
  function handleToggle() {
    setShowForm(!showForm); // Inverte o estado de exibição do formulário
  }

  return (
    // Container principal que centraliza seu conteúdo
    <View style={styles.container}>
      {/* Exibindo o formulário de entrada de dados */}
      {showForm && (
        <View>
          <Text style={styles.label}>Nome:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={{ marginTop: 8 }} onPress={handleToggle}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
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
  button: {
    backgroundColor: "#000", // Cor de fundo preta para o botão
    marginLeft: 8, // Margem esquerda para o botão
    marginRight: 8, // Margem direita para o botão
  },
  buttonText: {
    padding: 8, // Espaçamento interno do texto do botão
    color: "#fff", // Cor do texto do botão branca
    textAlign: "center", // Centraliza o texto do botão
  },
  input: {
    borderWidth: 1, // Largura da borda do campo de entrada
    marginLeft: 8, // Margem esquerda para o campo de entrada
    marginRight: 8, // Margem direita para o campo de entrada
    marginBottom: 8, // Margem inferior para o campo de entrada
  },
  label: {
    color: "#000", // Cor do texto do rótulo preta
    fontSize: 18, // Tamanho da fonte do rótulo
    marginBottom: 4, // Margem inferior para o rótulo
    marginLeft: 8, // Margem esquerda para o rótulo
  },
});
