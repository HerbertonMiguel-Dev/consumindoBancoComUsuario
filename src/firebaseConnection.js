// Importando funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

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

// Exportando a instância do Firestore para ser usada em outras partes da aplicação
export { db };
