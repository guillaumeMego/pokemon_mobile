import React from "react";
import { View, Image, StyleSheet } from "react-native";

function PokemonList({ selectedPokemon }) {
  return (
    <View style={styles.container}>
      <View style={styles.pokemon}>
        {selectedPokemon && (
          <View style={styles.infos}>
            <Image
              source={{ uri: selectedPokemon.imageUrl }}
              style={styles.image}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  pokemon: {
    alignItems: "center",
  },
  infos: {
    marginTop: 10,
  },
  image: {
    height: 150,
    width: 150,
  },
});

export default PokemonList;
