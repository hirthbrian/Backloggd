import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

type ScoreSmallProps = {
  text: string;
};

export default function ScoreSmall({ text }: ScoreSmallProps) {
  return <Text style={styles.container}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
    color: Colors.text,
    paddingLeft: 8,
    fontFamily: "Roboto-Bold",
  },
});
