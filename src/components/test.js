import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchKantoPokemon } from '../api/fetchKantoPokemon';

const PokemonList = ({ onPokemonSelected }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchKantoPokemon();
      setPokemonList(data);
    };

    fetchData();
  }, []);

  const handlePokemonClick = (pokemonName) => {
    if (onPokemonSelected) {
      onPokemonSelected(pokemonName);
    }
  };

  return (
    <View>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePokemonClick(item.name)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PokemonList;
