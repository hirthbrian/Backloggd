import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <Text style={styles.container}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: "300",
    color: Colors.text,
    paddingTop: 24,
    paddingBottom: 8,
    fontFamily: "Roboto-Light",
  },
});
