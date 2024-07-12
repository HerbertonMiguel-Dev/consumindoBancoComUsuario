// Importando funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";


// Configuração do Firebase com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyD--4YGAGfMD9KXw5qmk0iURsiznKSl6Kc",
  authDomain: "curso-fc1cb.firebaseapp.com",
  projectId: "curso-fc1cb",
  storageBucket: "curso-fc1cb.appspot.com",
  messagingSenderId: "724062277502",
  appId: "1:724062277502:web:3ad607e00aae3be858ad2f"
};

// Inicializando o aplicativo Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);

// Obtendo uma instância do Firestore para o aplicativo inicializado
const db = getFirestore(app);

// Inicializando a autenticação com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

// Exportando as instâncias do Firestore e Auth para serem usadas em outras partes da aplicação
export { db, auth };