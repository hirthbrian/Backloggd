import { useEffect, useState } from "react";
import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import Title from "../composants/text/Title";
import Subtitle from "../composants/text/Subtitle";
import GameList from "../composants/list/GameList";
import Colors from "../constants/Colors";

import mockGameList from "../mock";
import { GameDetails } from "../constants/Types";

export default function HomeScreen({ route }) {
  const id = route?.params?.id;
  const { width } = useWindowDimensions();

  const [details, setDetails] = useState<GameDetails>();

  useEffect(() => {
    setDetails(mockGameList.game);
  }, [id]);

  if (!details) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://img.opencritic.com/${details.images.square.og}`,
        }}
        style={{ width, height: width }}
      />
      <View
        style={{
          marginTop: -5,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          backgroundColor: Colors.background,
        }}
      >
        <Title text={details.name} />
        {/* <Subtitle text={Date(details.firstReleaseDate)} /> */}
        <Subtitle text={details.Companies.map(({ name }) => name).join(", ")} />
        <Subtitle text={details.Platforms.map(({ name }) => name).join(", ")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
