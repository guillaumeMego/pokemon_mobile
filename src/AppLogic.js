import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Modal, Button, ImageBackground, TouchableOpacity } from "react-native";
import Letters from "./components/Letters";
import PokemonList from "./components/PokemonList";
import { fetchKantoPokemon } from "./api/fetchKantoPokemon";

function AppLogic() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [letterCorrect, setLetterCorrect] = useState([]);
  const [letterIncorrect, setLetterIncorrect] = useState([]);
  const [life, setLife] = useState(7);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWinVisible, setModalWinVisible] = useState(false);
  const [selectedPokemonImage, setSelectedPokemonImage] = useState(null);
  // etat visible du bouton
  const [buttonVisible, setButtonVisible] = useState(true);



  const handleLetterSelected = (letter) => {
    setSelectedLetter(letter);
  };

  const handleButtonClick = async () => {
    const fetchedData = await fetchKantoPokemon();
    const randomIndex = Math.floor(Math.random() * fetchedData.length);
    const randomPokemon = fetchedData[randomIndex];
    setSelectedPokemon(randomPokemon);
    setSelectedPokemonName(randomPokemon.name.toUpperCase());
    setSelectedPokemonImage(randomPokemon.imageUrl);
    setModalVisible(false);
    setModalWinVisible(false);
    setLetterCorrect([]);
    setLetterIncorrect([]);
    setSelectedLetter(null);
    setLife(7);
    setButtonVisible(false);
  };

  useEffect(() => {
    setSelectedLetter(null);
    if (selectedLetter && selectedPokemonName) {
      const normalizedLetter = selectedLetter.toUpperCase();// Normalize the letter to lowercase
      if (selectedPokemonName.includes(normalizedLetter)) {
        if (letterCorrect.includes(normalizedLetter)) {
          return;
        }
        setLetterCorrect((prevLetterCorrect) => [...prevLetterCorrect, normalizedLetter]);
      } else {
        if (letterIncorrect.includes(normalizedLetter)) {
          return;
        }
        setLetterIncorrect((prevLetterIncorrect) => [...prevLetterIncorrect, normalizedLetter]);
        setLife((prevLife) => prevLife - 1);
        checkLose();
      }
    }
  }, [selectedLetter, selectedPokemonName, letterCorrect, letterIncorrect]);


  useEffect(() => {
    checkWin();
  }, [letterCorrect, selectedPokemonName]);



  function checkedWord(word, letterCorrect) {
    const wordArray = word.split('');
    return wordArray.map((letter) => {
      if (letterCorrect.includes(letter) || letter === ' ') {
        return letter;
      } else {
        return '_';
      }
    }).join(' ');
  }

  function checkWin() {
    if (selectedPokemonName && letterCorrect.length > 0) {
      const pokemonNameArray = selectedPokemonName.split('');
      if (pokemonNameArray.every((letter) => letterCorrect.includes(letter) || letter === ' ')) {
        setModalWinVisible(true);
      }
    }
  }
  

  function checkLose() {
    if (life === 1 && selectedPokemonName) {
      setModalVisible(true);
      setLetterCorrect([]);
      setLetterIncorrect([]);
    }
  }
  


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/fondpika.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Image source={require('../assets/pokemon.png')} style={styles.image} />
            <Text style={styles.titleText}>Pendu</Text>
          </View>
          <View style={styles.gameContainer}>
            <View style={styles.vie}>
              {Array.from({ length: life }, (_, index) => (
                <Image key={index} source={require('../assets/pika.png')} style={styles.imagevie} />
              ))}
            </View>
            <TouchableOpacity style={[styles.button, { display: buttonVisible ? 'flex' : 'none' }]} onPress={handleButtonClick}>
  <Text>Commencer une partie</Text>
</TouchableOpacity>

            <PokemonList
              selectedPokemon={selectedPokemon}
            />
            {selectedPokemonName && <Text style={styles.tiret}>{checkedWord(selectedPokemonName, letterCorrect)}</Text>}
          </View>
          <View style={styles.lettre}>
            <Letters
              onLetterSelected={handleLetterSelected}
              letterCorrect={letterCorrect}
              letterIncorrect={letterIncorrect}
            />
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Vous avez perdu !</Text>
            <Text>Le pokemon était {selectedPokemonName}</Text>
            {selectedPokemonImage && <Image source={{ uri: selectedPokemonImage }} style={styles.modalImage} />}
            <Button
              title="Rejouer"
              onPress={() => {
                setModalVisible(false);
                setButtonVisible(true);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalWinVisible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Vous avez gagné !</Text>
            <Text>Le pokemon était {selectedPokemonName}</Text>
            {selectedPokemonImage && <Image source={{ uri: selectedPokemonImage }} style={styles.modalImage} />}
            <Button
              title="Rejouer"
              onPress={() => {
                setModalWinVisible(false);
                setButtonVisible(true);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lettre: {
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 75,
  },
  button: {
    marginTop: -110,
    lineHeight: 60,
    fontWeight: "500",
    padding: 20,
    backgroundColor: "#FFF491",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#00060c",
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 20,
    shadowOpacity: 0.6,
    fontSize: 20,
  },
  image: {
    width: 290,
    height: 100,
    marginTop: 10,
  },
  vie: {
    position: 'absolute',
    left: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lettre: {
    marginBottom: 100, // Augmentez cette valeur pour décaler davantage le clavier du bas de la page
  },
  imagevie: {
    width: 35,
    height: 35,
    marginTop: 10,
  },
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  tiret: {
    fontSize: 30,
    fontWeight: '100',
    marginTop: 10,
  },
});

export default AppLogic;
