import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import Title from "../composants/text/Title";
import Subtitle from "../composants/text/Subtitle";
import { getRatingBig } from "../utils/Rating";
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
    <ScrollView style={styles.container}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.scroreContainer}>
            <Image
              style={{ width: 79, height: 74 }}
              source={{ uri: getRatingBig(details.medianScore) }}
            />
            <Subtitle textAlign="center" text="OpenCritic Rating" />
          </View>
          <View style={styles.scroreContainer}>
            <Title text={details.topCriticScore.toFixed()} />
            <Subtitle textAlign="center" text="Top Critic Average" />
          </View>
          <View style={styles.scroreContainer}>
            <Title text={details.percentRecommended.toFixed()} />
            <Subtitle textAlign="center" text="Critics Recommend" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroreContainer: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
