import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

type SubtitleProps = {
  text: string;
  textAlign?: "left" | "auto" | "center" | "right" | "justify";
};

export default function Subtitle({ text, textAlign = "left" }: SubtitleProps) {
  return <Text style={{ ...styles.container, textAlign }}>{text}</Text>;
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
