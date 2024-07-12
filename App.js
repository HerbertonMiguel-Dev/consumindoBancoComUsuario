import { useEffect, useState } from 'react'; // Importando useEffect e useState do React
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'; // Importando componentes do React Native
import { FormUsers } from './src/FormUsers'; // Importando o componente FormUsers
import { auth } from './src/firebaseConnection'; // Importando a instância de autenticação do Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; // Importando métodos de autenticação do Firebase

export default function App() {
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [authUser, setAuthUser] = useState(null); // Estado para armazenar o usuário autenticado

  // useEffect para verificar o estado de autenticação quando o componente é montado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email, // Atualiza o estado com o email do usuário
          uid: user.uid // Atualiza o estado com o UID do usuário
        });
        return;
      }
    });
  }, []); // A lista de dependências vazia significa que o efeito só roda uma vez, quando o componente é montado

  // Função assíncrona para criar um novo usuário com email e senha
  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password); // Cria um novo usuário
    console.log(user); // Loga os detalhes do usuário criado no console
  }

  // Função para fazer login com email e senha
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password) // Faz o login com email e senha
      .then((user) => {
        console.log(user); // Loga os detalhes do usuário autenticado no console
        setAuthUser({
          email: user.user.email, // Atualiza o estado com o email do usuário
          uid: user.user.uid // Atualiza o estado com o UID do usuário
        });
      })
      .catch((err) => {
        if (err.code === "auth/missing-password") {
          alert("A senha é obrigatória"); // Alerta se a senha estiver faltando
          return;
        }
        if (err.code === "auth/invalid-credential") {
          alert("Senha incorreta"); // Alerta se as credenciais forem inválidas
          return;
        }
        console.log(err.code); // Loga o código de erro no console
      });
  }

  // Função assíncrona para fazer logout do usuário
  async function handleLogout() {
    await signOut(auth); // Faz o logout do usuário
    setAuthUser(null); // Reseta o estado do usuário autenticado
  }

  return (
    <View style={styles.container}>
      {/* Exibindo o email do usuário autenticado */}
      <Text style={{ fontSize: 16, color:'#000', marginLeft: 8, marginBottom: 14 }}>
        Usuário logado: {authUser && authUser.email}
      </Text>

      {/* Campo de entrada para o email */}
      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email..."
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Campo de entrada para a senha */}
      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha..."
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true} // Torna o campo de senha seguro
      />

      {/* Botão para fazer login */}
      <TouchableOpacity style={[styles.button, { marginBottom: 8 }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      {/* Botão para criar uma conta */}
      <TouchableOpacity style={[styles.button, { marginBottom: 8 }]} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      {/* Botão para fazer logout */}
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para os componentes da aplicação
const styles = StyleSheet.create({
  container: {
    flex: 1, // O container ocupa todo o espaço disponível
    paddingTop: 40 // Espaçamento superior para evitar sobreposição com a barra de status
  },
  input: {
    marginLeft: 8, // Margem esquerda para o campo de entrada
    marginRight: 8, // Margem direita para o campo de entrada
    borderWidth: 1, // Largura da borda do campo de entrada
    marginBottom: 14 // Margem inferior para o campo de entrada
  },
  button: {
    backgroundColor: "#000", // Cor de fundo preta para o botão
    marginRight: 8, // Margem direita para o botão
    marginLeft: 8, // Margem esquerda para o botão
    padding: 8 // Espaçamento interno do botão
  },
  buttonText: {
    color: "#FFF", // Cor do texto branca
    textAlign: 'center' // Centraliza o texto no botão
  }
});
