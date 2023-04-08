import { View, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, styles, onHandlePress }) => {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandlePress}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;
