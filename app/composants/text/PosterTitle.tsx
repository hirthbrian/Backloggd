import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

type PosterTitleProps = {
  text: string;
};

export default function PosterTitle({ text }: PosterTitleProps) {
  return (
    <Text numberOfLines={2} style={styles.container}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 142,
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: "300",
    color: Colors.text,
    fontFamily: "Roboto-Light",
  },
});
