import { StyleSheet, View } from "react-native";
import Title from "../composants/text/Title";
import Subtitle from "../composants/text/Subtitle";
import GameList from "../composants/list/GameList";

import mockGameList from "../mock";

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.titles}>
        <Title text="Popular Games" />
        <Subtitle text="Don't miss the most popular games on OpenCritic today" />
      </View>
      <GameList data={mockGameList.popular} />
    </View>
  );
}

const styles = StyleSheet.create({
  titles: {
    paddingHorizontal: 15,
  },
});
