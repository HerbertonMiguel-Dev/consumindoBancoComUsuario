// Importando as dependências necessárias do React e React Native
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
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
  getDocs,
  updateDoc
} from "firebase/firestore";

import { UsersList } from './src/users'; // Importando o componente UsersList para exibir os usuários

export default function fire() {
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
  const [idade, setIdade] = useState(""); // Estado para armazenar a idade do usuário
  const [cargo, setCargo] = useState(""); // Estado para armazenar o cargo do usuário
  const [isEditing, setIsEditing] = useState(""); // Estado para armazenar o ID do usuário em edição

  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários

  const [showForm, setShowForm] = useState(true); // Estado para controlar a exibição do formulário

  // useEffect para buscar dados quando o componente for montado
  useEffect(() => {
    // Função assíncrona para obter dados do Firestore
    async function getDados() {
      const usersRef = collection(db, "users"); // Referência para a coleção "users" no Firestore

      // Escuta em tempo real para a coleção "users"
      onSnapshot(usersRef, (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo
          });
        });

        setUsers(lista); // Atualiza o estado com a lista de usuários obtida
      });

      // Código comentado para obter documentos sem ser em tempo real
      // getDocs(usersRef)
      // .then((snapshot) =>{
      //   let lista = [];
      //   snapshot.forEach((doc) => {
      //     lista.push({
      //       id:doc.id,
      //       nome: doc.data().nome,
      //       idade: doc.data().idade,
      //       cargo: doc.data().cargo
      //     })
      //   })

      //   setUsers(lista)
      // })
      // .catch((err) =>{
      //   console.log(err)
      // })
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

  // Função para preparar a edição de um usuário
  function editUser(data) {
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id); // Armazena o ID do usuário em edição
  }

  // Função assíncrona para editar um usuário
  async function handleEditUser() {
    const docRef = doc(db, "users", isEditing); // Referência ao documento do usuário no Firestore
    await updateDoc(docRef, {
      nome: nome, // Atualiza o nome do usuário
      idade: idade, // Atualiza a idade do usuário
      cargo: cargo, // Atualiza o cargo do usuário
    });

    // Limpa os campos de entrada e redefine o estado de edição
    setNome("");
    setIdade("");
    setCargo("");
    setIsEditing("");
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

          {/* Botão para adicionar ou editar usuário */}
          {isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handleEditUser}>
              <Text style={styles.buttonText}>Editar usuario</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Botão para mostrar/esconder formulário */}
      <TouchableOpacity style={{ marginTop: 8 }} onPress={handleToggle}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
      </TouchableOpacity>

      {/* Título da lista de usuários */}
      <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: '#000 ' }}>Usuários</Text>

      {/* Lista de usuários cadastrados */}
      <FlatList
        style={styles.list}
        data={users} // Dados da lista de usuários
        keyExtractor={(item) => String(item.id)} // Chave única para cada item da lista
        renderItem={({ item }) => <UsersList data={item} handleEdit={(item) => editUser(item)} />} // Renderiza o componente UsersList para cada item
      />
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
  list: {
    marginTop: 8, // Margem superior para a lista de usuários
    marginLeft: 8, // Margem esquerda para a lista de usuários
    marginRight: 8, // Margem direita para a lista de usuários
  }
});