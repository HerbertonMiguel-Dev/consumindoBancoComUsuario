// Importando as dependências necessárias do React e React Native
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,} from "react-native";

import { FormUsers } from './src/FormUsers'

export default function fire() {

  return (
    // Container principal que centraliza seu conteúdo
    <View style={styles.container}>
     <FormUsers/>
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