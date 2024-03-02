import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const LetterButton = ({ letter, onPress }) => (
  <TouchableOpacity style={styles.lettersKey} onPress={() => onPress(letter)}>
    <Text>{letter}</Text>
  </TouchableOpacity>
);

function Letters(props) {
  const handleButtonClick = (letter) => {
    props.onLetterSelected(letter.toUpperCase());
  };

  const renderRow = (letters) => (
    <View style={styles.firstLine}>
      {letters.map((letter) => (
        <LetterButton key={letter} letter={letter} onPress={handleButtonClick} />
      ))}
    </View>
  );

  return (
    <View style={styles.letters}>
      <View style={styles.row}>
        {renderRow(["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"])}
        {renderRow(["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"])}
      </View>
      <View style={styles.row}>
        {renderRow(["W", "X", "C", "V", "B", "N"])}
      </View>
    </View>
  );
}

const styles = {
  // Vos styles restent les mêmes
  firstLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  thirdLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  lettersKey: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffa7",
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
};

export default Letters;
