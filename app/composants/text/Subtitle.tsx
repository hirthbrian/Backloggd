import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

type SubtitleProps = {
  text: string;
};

export default function Subtitle({ text }: SubtitleProps) {
  return <Text style={styles.container}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: Colors.text,
    paddingBottom: 16,
    fontFamily: "Roboto-Regular",
  },
});
