import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item.employer_logo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
        <Text>{item.employer_name}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
