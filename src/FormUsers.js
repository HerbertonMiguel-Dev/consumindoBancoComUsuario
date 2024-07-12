import { useEffect, useState } from 'react' // Importando useEffect e useState do React
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'; // Importando componentes do React Native
import { db, auth } from './firebaseConnection' // Importando a instância do Firestore e a autenticação do Firebase
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore' // Importando métodos do Firestore
import { UsersList } from './users' // Importando o componente UsersList

import { signOut } from 'firebase/auth'; // Importando método de logout do Firebase

export function FormUsers() {
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
  const [idade, setIdade] = useState(""); // Estado para armazenar a idade do usuário
  const [cargo, setCargo] = useState(""); // Estado para armazenar o cargo do usuário

  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários

  const [showForm, setShowForm] = useState(true); // Estado para controlar a visibilidade do formulário
  const [isEditing, setIsEditing] = useState(""); // Estado para armazenar o ID do usuário que está sendo editado

  // useEffect para buscar os dados dos usuários quando o componente é montado
  useEffect(() => {
    async function getDados() {
      const usersRef = collection(db, "users"); // Referência à coleção "users" no Firestore
      onSnapshot(usersRef, (snapshot) => {
        let lista = []; // Lista para armazenar os usuários

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo
          });
        });

        setUsers(lista); // Atualiza o estado com a lista de usuários
      });
    }

    getDados(); // Chama a função para buscar os dados
  }, []); // A lista de dependências vazia significa que o efeito só roda uma vez, quando o componente é montado

  // Função assíncrona para registrar um novo usuário
  async function handleRegister() {
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO");
      setNome(""); // Limpa o campo de nome
      setIdade(""); // Limpa o campo de idade
      setCargo(""); // Limpa o campo de cargo
    })
    .catch((err) => {
      console.log(err); // Loga o erro no console
    });
  }

  // Função para alternar a visibilidade do formulário
  function handleToggle() {
    setShowForm(!showForm); // Alterna o estado de visibilidade do formulário
  }

  // Função para iniciar a edição de um usuário
  function editUser(data) {
    setNome(data.nome); // Atualiza o estado com o nome do usuário
    setIdade(data.idade); // Atualiza o estado com a idade do usuário
    setCargo(data.cargo); // Atualiza o estado com o cargo do usuário
    setIsEditing(data.id); // Atualiza o estado com o ID do usuário que está sendo editado
  }

  // Função assíncrona para editar um usuário existente
  async function handleEditUser() {
    const docRef = doc(db, "users", isEditing); // Referência ao documento do usuário no Firestore
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
    });

    setNome(""); // Limpa o campo de nome
    setCargo(""); // Limpa o campo de cargo
    setIdade(""); // Limpa o campo de idade
    setIsEditing(""); // Reseta o estado de edição
  }

  // Função assíncrona para fazer logout do usuário
  async function handleLogout() {
    await signOut(auth); // Faz o logout do usuário
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

      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={{ color: "#fff" }}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O container ocupa todo o espaço disponível
  },
  button: {
    backgroundColor: "#000", // Cor de fundo preta para o botão
    marginLeft: 8, // Margem esquerda para o botão
    marginRight: 8, // Margem direita para o botão
  },
  buttonText: {
    padding: 8, // Espaçamento interno do botão
    color: "#FFF", // Cor do texto branca
    textAlign: 'center' // Centraliza o texto no botão
  },
  label: {
    color: "#000", // Cor do texto preta
    fontSize: 18, // Tamanho da fonte
    marginBottom: 4, // Margem inferior
    marginLeft: 8, // Margem esquerda
  },
  input: {
    borderWidth: 1, // Largura da borda
    marginLeft: 8, // Margem esquerda
    marginRight: 8, // Margem direita
    marginBottom: 8, // Margem inferior
  },
  list: {
    marginTop: 8, // Margem superior
    marginLeft: 8, // Margem esquerda
    marginRight: 8, // Margem direita
  },
  buttonLogout: {
    backgroundColor: 'red', // Cor de fundo vermelha para o botão de logout
    alignSelf: 'flex-start', // Alinha o botão no início do eixo principal
    margin: 14, // Margem
    padding: 8, // Espaçamento interno do botão
    borderRadius: 4, // Borda arredondada
  },
});